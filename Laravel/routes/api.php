<?php

use App\Http\Controllers\TopicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('topics', [TopicController::class, 'index']);
Route::get('topics/{id}', [TopicController::class, 'show']);
Route::post('topics', [TopicController::class, 'store']);
Route::put('topicsupdate/{id}', [TopicController::class, 'update']);
Route::delete('topicsdelete/{id}', [TopicController::class, 'destroy']);