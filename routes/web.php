<?php

use App\Http\Controllers\Admin\ConfirmClientRequestController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RejectClientRequestController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CancelClientRequestController;
use App\Http\Controllers\ClientRequestController;
use App\Http\Controllers\ClientShiftListController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OptionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', HomeController::class);


Route::middleware('auth')->group(function () {

    Route::name("admin.")->prefix("admin")->group(function () {
        Route::get('/', App\Http\Controllers\Admin\DashboardController::class)->name('dashboard');
        Route::resource('/users', UserController::class);
        Route::resource('/roles', RoleController::class);
        Route::resource('/permissions', PermissionController::class);
        Route::resource('/departments', DepartmentController::class)->except(["edit"]);
        Route::resource('/rooms', RoomController::class)->except(["edit"]);
        Route::resource('/shifts', ShiftController::class)->except(["edit", "create"]);
        Route::post("/client-requests/{clientRequest}/confirm", ConfirmClientRequestController::class)->name("clientRequests.confirm");
        Route::post("/client-requests/{clientRequest}/reject", RejectClientRequestController::class)->name("clientRequests.reject");
    });

    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource("/messages", MessageController::class);
    Route::post("/requests/{clientRequest}", CancelClientRequestController::class)->name("clientRequests.cancel");
    Route::post("/client-requests/{clientRequest}/reject", [ClientRequestController::class, "reject"])->name("client.clientRequests.reject");
    Route::post("/client-requests/{clientRequest}/confirm", [ClientRequestController::class, "confirm"])->name("client.clientRequests.confirm");
    Route::resource("/client-requests", ClientRequestController::class, [
        "names" => [
            "index" => "client.clientRequests.index",
            "store" => "client.clientRequests.store",
            "update" => "client.clientRequests.update",
            "destroy" => "client.clientRequests.destroy"
        ]
    ])->except(["create", "edit", "show"]);

    Route::get("/shifts", ClientShiftListController::class)->name("client.shifts.index");

});
require __DIR__ . '/auth.php';
