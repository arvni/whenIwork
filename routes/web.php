<?php

use App\Http\Controllers\Admin\ClientRequestListController;
use App\Http\Controllers\Admin\ConfirmClientRequestController;
use App\Http\Controllers\Admin\ConfirmLeaveController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\DepartmentMapViewController;
use App\Http\Controllers\Admin\DuplicateWeekShiftsController;
use App\Http\Controllers\Admin\ListMapViewDepartmentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RejectClientRequestController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Controllers\Admin\ShiftPublishController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\CancelClientRequestController;
use App\Http\Controllers\ClientRequestController;
use App\Http\Controllers\ClientShiftListController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;

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
        Route::get('/departments/map', ListMapViewDepartmentController::class)->name("departments.mapIndex");
        Route::resource('/departments', DepartmentController::class)->except(["edit"]);
        Route::get('/departments/{department}/map', DepartmentMapViewController::class)->name("departments.map");
        Route::resource('/rooms', RoomController::class)->except(["edit"]);
        Route::post("/{room}/duplicate-shifts", DuplicateWeekShiftsController::class)->name("rooms.shifts_duplicate");
        Route::resource('/shifts', ShiftController::class)->except(["edit", "create"]);
        Route::post('/shifts/{shift}/publish', ShiftPublishController::class)->name("shifts.publish");
        Route::post("/client-requests/{clientRequest}/confirm", ConfirmClientRequestController::class)->name("clientRequests.confirm");
        Route::post("/client-requests/{clientRequest}/reject", RejectClientRequestController::class)->name("clientRequests.reject");
        Route::get("/client-requests", ClientRequestListController::class)->name("clientRequests.index");
        Route::post("/leaves/{leave}/confirm", ConfirmLeaveController::class)->name("leaves.confirm");
        Route::post("/leaves/{leave}/reject", RejectClientRequestController::class)->name("leaves.reject");
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
