<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\JournalEntry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the teacher dashboard.
     */
    public function index(Request $request)
    {
        $teacher = Teacher::where('email', $request->user()->email)->first();
        
        if (!$teacher) {
            return Inertia::render('dashboard', [
                'error' => 'Teacher profile not found. Please contact administrator.',
                'showCreateForm' => false,
            ]);
        }

        // Get recent entries
        $recentEntries = $teacher->journalEntries()
            ->latest('entry_date')
            ->latest('start_time')
            ->take(5)
            ->get();

        // Calculate statistics
        $todayMinutes = $teacher->getTotalHoursForDate(Carbon::today()->format('Y-m-d'));
        $todayHours = round($todayMinutes / 60, 1);

        $weekStart = Carbon::now()->startOfWeek();
        $weekEnd = Carbon::now()->endOfWeek();
        $weeklyMinutes = $teacher->getTotalHoursForWeek($weekStart->format('Y-m-d'), $weekEnd->format('Y-m-d'));
        $weeklyHours = round($weeklyMinutes / 60, 1);

        $totalEntries = $teacher->journalEntries()->count();
        $totalMinutes = $teacher->journalEntries()->sum('duration_minutes');
        $totalHours = round($totalMinutes / 60, 1);

        return Inertia::render('dashboard', [
            'teacher' => $teacher,
            'recentEntries' => $recentEntries,
            'todayHours' => $todayHours,
            'weeklyHours' => $weeklyHours,
            'totalHours' => $totalHours,
            'totalEntries' => $totalEntries,
            'weekStart' => $weekStart->format('M j'),
            'weekEnd' => $weekEnd->format('M j, Y'),
            'showCreateForm' => true,
        ]);
    }
}