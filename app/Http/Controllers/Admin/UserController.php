<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\AccessException;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserRequest;
use App\Http\Requests\UsersIndexRequest;
use App\Interfaces\UserRepositoryInterface;
use App\Models\User;
use App\Services\CalculateUserHours;
use App\Services\CalendarService;
use App\Utils\FileAction;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    private UserRepositoryInterface $userRepository;
    private CalendarService $calendarService;
    private CalculateUserHours $calculateUserHours;

    public function __construct(UserRepositoryInterface $userRepository, CalendarService $calendarService, CalculateUserHours $calculateUserHours)
    {
        $this->userRepository = $userRepository;
        $this->calendarService = $calendarService;
        $this->calculateUserHours = $calculateUserHours;
        $this->middleware("indexProvider")->only(["index"]);
    }

    /**
     * Display a listing of the resource.
     *
     * @param UsersIndexRequest $request
     * @return Response
     */
    public function index(UsersIndexRequest $request): Response
    {
        $defaultValues = $request->all();
        $users = $this->userRepository->list($defaultValues);
        return Inertia::render('Admin/User/Index', compact("users", "defaultValues"));
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return RedirectResponse|Response
     * @throws AccessException
     */
    public function create(): Response|RedirectResponse
    {
        if (auth()->user()->can("admin.users.create"))
            return Inertia::render('Admin/User/Add');
        throw new AccessException(__("access.not_allowed"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     * @return RedirectResponse
     */
    public function store(UserRequest $request)
    {
        $avatar = "";
        if (isset($request["avatar"]) && $request["avatar"])
            $avatar = FileAction::upload($request->file('avatar'));
        $user = $this->userRepository->create([
            ...$request->except(['avatar', 'password_confirmation', "id"]),
            "avatar" => $avatar,
        ]);
        if ($user->avatar != "")
            FileAction::move($user->avatar, "/users/$user->id");

        return redirect()->route('admin.users.index')->with(["status" => "$user->name Successfully Added", "success" => true]);

    }

    public function show(User $user, Request $request)
    {
        $user = $this->userRepository->show($user);
        $shifts = $this->calendarService->listShifts($request->get("defaultDate", null), $user->id,$request->get("defaultView","month"));
        $leaves = $this->calendarService->listLeaves($request->get("defaultDate", null), $user->id,$request->get("defaultView","month"));
        $sumShifts = $this->calculateUserHours->calculateSumOfShiftsHours($user->id, $request->get("defaultDate", null), $request->get("defaultView","month"));
        $sumLeaves = $this->calculateUserHours->calculateSumOfLeavesHours($user->id, $request->get("defaultDate", null), $request->get("defaultView","month"));
        $events = array_merge($shifts, $leaves);
        $defaults=$request->all();
        return Inertia::render("Admin/User/Show", compact("user", "defaults", "events", "sumShifts", "sumLeaves",));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param User $user
     * @return RedirectResponse|Response
     */
    public function edit(User $user)
    {
        $user->roles = $user->roles->pluck(["id", "name"]);
        return Inertia::render('Admin/User/Edit', ["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUserRequest $request
     * @param User $user
     * @return RedirectResponse|\Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $avatar = $user->avatar;
        if (isset($request["avatar"]) && $request["avatar"] && typeOf($request["avatar"]) != "string") {
            $avatar = FileAction::upload($request->file('avatar'));
            FileAction::move($avatar, "/users/$user->id");
        }
        $this->userRepository->edit($user, [
            ...$request->except(['avatar', 'password', 'password_confirmation']),
            "avatar" => $avatar,
        ]);
        return redirect()->route('admin.users.index')->with(["status" => __("messages.successful_update", ["model" => $user->name]), "success" => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param User $user
     * @return RedirectResponse
     */
    public function destroy(User $user)
    {

        $title = $user->name;
        try {
            $user->delete();
        } catch (\Exception $e) {
            return redirect()->route('admin.users.index')->withErrors($e->getMessage());
        }
        return redirect()->route('admin.users.index')->with(["success" => true, "status" => "$title Successfully Deleted"]);
    }


}
