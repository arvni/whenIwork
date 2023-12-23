<?php

namespace App\Http\Controllers;

use App\Http\Resources\FileResource;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => ['required']
        ]);

        $file = $request->file('file');
        $owner = auth()->user();
        $doc = $owner->Documents()->save(new File([
            'hash' => Str::uuid(),
            'ext' => $file->getClientOriginalExtension(),
            'tag' => 'temp',
            'originalName' => $file->getClientOriginalName()
        ]));
        try {
            Storage::disk('local')->putFileAs($doc->address, $file, $doc->file_name);
            $doc->refresh();
            return new FileResource($doc);
        } catch (\Exception $exception) {
            $doc->delete();
            abort('500', $exception->getMessage());
        }
    }

    public function download(File $document)
    {
        return Response::download(storage_path($document->path), null, [
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ], null);
    }

    public function destroy(File $document)
    {
        $name = $document->originalName;
        $document->delete();
        return response()->json(["originalName" => $name], 204);
    }

    public static function moveFile(File $document, $id, $class, $tag)
    {
        $src = $document->address . '/' . $document->file_name;
        $document->update([
            'related_type' => "App\\Models\\" . $class,
            'related_id' => $id,
            'tag' => $tag
        ]);
        $dest = $document->address . '/' . $document->file_name;
        if (Storage::move($src, $dest))
            return true;
        return false;
    }

}
