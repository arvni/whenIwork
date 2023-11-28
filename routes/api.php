<?php

use App\Http\Controllers\Api\ClientRequestController;
use App\Http\Controllers\Api\DepartmentController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\RoomListController;
use App\Http\Controllers\Api\ShiftController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth')->group(function () {
    Route::prefix("admin")->group(function () {
        Route::get('/roles', [RolesController::class, "index"])->name("admin.roleApi.index");
        Route::get('/permissions', [PermissionController::class, "index"])->name("permissionApi.index");
        Route::get('/permissions/{permission}', [PermissionController::class, "show"])->name("permissionApi.show");
        Route::get('/rooms/{room}', [RoomController::class, "show"])->name("admin.roomApi.show");
        Route::get('/departments/{department}', [DepartmentController::class, "show"])->name("admin.departmentApi.show");
        Route::get('/departments', [DepartmentController::class, "index"])->name("admin.departmentApi.index");
        Route::get('/users', [UserController::class, "index"])->name("admin.userApi.index");
        Route::get("shifts/{shift}", [ShiftController::class, "show"])->name("admin.shiftApi.show");
    });

    Route::get("rooms/{room}/users", [RoomController::class, "listUsers"])->name("client.roomsApi.users");
    Route::get("rooms/{room}/roles", [RoomController::class, "listRoles"])->name("client.roomsApi.roles");
    Route::get("client-requests/{clientRequests}", [ClientRequestController::class, "show"])->name("clientRequestsApi.show");
    Route::get("rooms", RoomListController::class)->name("roomsApi.index");
});
