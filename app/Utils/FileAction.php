<?php


namespace App\Utils;


use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileAction
{
    static public function upload($file)
    {
        $fileName = Str::uuid() . "." . $file->getClientOriginalExtension();
        Storage::disk('local')->putFileAs('tmp', $file, $fileName);
        return $fileName;
    }

    static public function move($fileName, $path)
    {
        Storage::move(storage_path("/tmp/$fileName"), storage_path("$path/$fileName"));
    }
}
