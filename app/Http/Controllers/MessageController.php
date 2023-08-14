<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return RedirectResponse|Response|\Inertia\Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $sortType = $request['sort']["sort"] ?? "desc";
        $sortColumn = "id";
        $length = $request['pageSize'] ?? 10;
        $search = $request["filterModel"]['search'] ?? "";
        $query = new Message();
        if (!$user->can("Message List All"))
            $query = $user->ReceivedMessages();
        if ($search)
            $query->where(function ($q) use ($search) {
                $q->where('context', 'like', "%$search%");
            })->orWhere(function ($q) use ($search) {
                $q->whereHas("Receivers", function ($qu) use ($search) {
                    $qu->where("name", "like", "%$search%");
                });
            });

        $query->orderBy($sortColumn, $sortType);
        $messages = fn() => $query->paginate($length);
        return Inertia::render("Message/Index", ["messages" => $messages]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param MessageRequest $request
     * @return RedirectResponse
     */
    public function store(MessageRequest $request)
    {
        $message = auth()->user()->sentMessages()->create($request->except("receivers"));
        $receiversIds = $this->getReceivers($request);
        $message->Receivers()->sync($receiversIds);
        return redirect()->back()->with(["success" => true, "status" => "پیام با موفقیت ارسال شد"]);
    }

    /**
     * Display the specified resource.
     *
     * @param $message
     * @return MessageResource
     */
    public function show($message)
    {
        $user = auth()->user();
        if ($user->can("Message List All")) {
            $message = Message::find($message);
            return new MessageResource($message);
        } else {
            $message = $user->ReceivedMessages()->Where("message_user.message_id", $message)->first();
            if ($message->pivot->read_at == null) {
                $message->Receivers()->detach($user);
                $message->Receivers()->attach($user, ["read_at" => Carbon::now()]);
            }
            return new MessageResource($message);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Message $message
     * @param MessageRequest $request
     * @return RedirectResponse
     */

    public function update(Message $message, MessageRequest $request)
    {
        $message->update($request->only(["title", "context"]));
        $receiversIds = $this->getReceivers($request);
        $message->Receivers()->sync($receiversIds);
        return redirect()->back()->with(["success" => true, "status" => "پیام با موفقیت بروزرسانی شد"]);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param Message $message
     * @return RedirectResponse
     */
    public function destroy(Message $message)
    {
        if (!auth()->user()->can("Message Delete"))
            return redirect()->back()->withErrors("شما اجازه دسترسی به این عملیات را ندارید");
        if (!$this->checkMessageNotRead($message))
            return redirect()->back()->withErrors("پیام خوانده شده قابل حذف نمیباشد");
        $message->Receivers()->detach();
        $message->delete();
        return redirect()->back()->with(["success" => true, "status" => "پیام با موفقیت حذف شد"]);
    }

    public function getReceivers(Request $request)
    {
        $receivers = collect($request->get("receivers"))->pluck("id")->toArray();
        if (count($receivers))
            return User::whereIn("userId", $receivers)->get()->pluck("id");
        else
            return User::permission("Payment Add")->get()->pluck("id");
    }

    public function checkMessageNotRead(Message $message)
    {
        $receivers = $message->Receivers;
        $receivers = $receivers->map(function ($item) {
            return !$item->pivot->read_at;
        })->toArray();
        return array_reduce($receivers, fn($v1, $v2) => $v1 && $v2, true);
    }

}
