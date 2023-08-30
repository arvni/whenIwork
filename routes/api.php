<?php

use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RolesController;
use App\Http\Controllers\Api\RoomListController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\UserController;
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
        Route::get('/rooms/{room}', [\App\Http\Controllers\Api\RoomController::class, "show"])->name("admin.roomApi.show");
        Route::get('/departments/{department}', [\App\Http\Controllers\Api\DepartmentController::class, "show"])->name("admin.departmentApi.show");
        Route::get('/departments', [\App\Http\Controllers\Api\DepartmentController::class, "index"])->name("admin.departmentApi.index");
        Route::get('/users', [\App\Http\Controllers\Api\UserController::class, "index"])->name("admin.userApi.index");
        Route::get("shifts/{shift}", [\App\Http\Controllers\Api\ShiftController::class, "show"])->name("admin.shiftApi.show");
    });
    Route::post('/files', [FileController::class, 'upload'])->name('files.upload');
    Route::get('/files/{document}', [FileController::class, 'download'])->name('files.download');
    Route::get("rooms/{room}/users", [\App\Http\Controllers\Api\RoomController::class, "listUsers"])->name("client.roomsApi.users");
    Route::get("rooms/{room}/roles", [\App\Http\Controllers\Api\RoomController::class, "listRoles"])->name("client.roomsApi.roles");
    Route::get("client-requests/{clientRequests}", [\App\Http\Controllers\Api\ClientRequestController::class, "show"])->name("clientRequestsApi.show");
    Route::get("rooms", RoomListController::class)->name("roomsApi.index");
});
