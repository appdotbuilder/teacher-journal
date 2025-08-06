<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JournalEntryController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Journal entry routes
    Route::resource('journal', JournalEntryController::class, [
        'parameters' => ['journal' => 'journalEntry']
    ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
