<?php

use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\ShiftController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ClientRequestController;
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

Route::get('/', function () {
    if(auth()->user())
        return redirect()->route("dashboard");
    return Inertia::render('Welcome', [
        'captchaSrc' => captcha_src('flat'),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {

    Route::name("admin.")->prefix("admin")->group(function () {
        Route::resource('/users', UserController::class);
        Route::resource('/roles', RoleController::class);
        Route::resource('/permissions', PermissionController::class);
        Route::resource('/departments', DepartmentController::class)->except(["edit"]);
        Route::resource('/rooms', RoomController::class)->except(["edit"]);
        Route::resource('/shifts', ShiftController::class)->except(["edit", "create"]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource("/messages", MessageController::class);

    Route::resource("/requests", ClientRequestController::class, [
        "names" => [
            "index" => "clientRequests.index",
            "store" => "clientRequests.store",
            "update" => "clientRequests.update",
            "destroy" => "clientRequests.destroy"
        ]
    ])->except(["create", "edit", "show"]);

    Route::get("/shifts",\App\Http\Controllers\ClientShiftListController::class)->name("client.shifts.index");

});
require __DIR__ . '/auth.php';
