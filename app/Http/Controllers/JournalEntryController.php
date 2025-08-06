<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJournalEntryRequest;
use App\Http\Requests\UpdateJournalEntryRequest;
use App\Models\JournalEntry;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class JournalEntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $teacher = Teacher::where('email', $request->user()->email)->first();
        
        if (!$teacher) {
            return Inertia::render('dashboard', [
                'error' => 'Teacher profile not found. Please contact administrator.',
            ]);
        }

        $entries = $teacher->journalEntries()
            ->latest('entry_date')
            ->latest('start_time')
            ->paginate(10);

        // Calculate weekly hours
        $weekStart = Carbon::now()->startOfWeek();
        $weekEnd = Carbon::now()->endOfWeek();
        $weeklyMinutes = $teacher->getTotalHoursForWeek($weekStart->format('Y-m-d'), $weekEnd->format('Y-m-d'));
        $weeklyHours = round($weeklyMinutes / 60, 1);

        // Calculate today's hours
        $todayMinutes = $teacher->getTotalHoursForDate(Carbon::today()->format('Y-m-d'));
        $todayHours = round($todayMinutes / 60, 1);

        return Inertia::render('journal/index', [
            'entries' => $entries,
            'teacher' => $teacher,
            'weeklyHours' => $weeklyHours,
            'todayHours' => $todayHours,
            'weekStart' => $weekStart->format('M j'),
            'weekEnd' => $weekEnd->format('M j, Y'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('journal/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJournalEntryRequest $request)
    {
        $teacher = Teacher::where('email', $request->user()->email)->first();
        
        if (!$teacher) {
            return redirect()->back()->with('error', 'Teacher profile not found.');
        }

        $entry = JournalEntry::create([
            ...$request->validated(),
            'teacher_id' => $teacher->id,
        ]);

        return redirect()->route('journal.show', $entry)
            ->with('success', 'Journal entry created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(JournalEntry $journalEntry)
    {
        // Ensure the entry belongs to the authenticated teacher
        $teacher = Teacher::where('email', request()->user()->email)->first();
        
        if (!$teacher || $journalEntry->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized access to journal entry.');
        }

        return Inertia::render('journal/show', [
            'entry' => $journalEntry,
            'teacher' => $teacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JournalEntry $journalEntry)
    {
        // Ensure the entry belongs to the authenticated teacher
        $teacher = Teacher::where('email', request()->user()->email)->first();
        
        if (!$teacher || $journalEntry->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized access to journal entry.');
        }

        return Inertia::render('journal/edit', [
            'entry' => $journalEntry,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJournalEntryRequest $request, JournalEntry $journalEntry)
    {
        // Ensure the entry belongs to the authenticated teacher
        $teacher = Teacher::where('email', $request->user()->email)->first();
        
        if (!$teacher || $journalEntry->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized access to journal entry.');
        }

        $journalEntry->update($request->validated());

        return redirect()->route('journal.show', $journalEntry)
            ->with('success', 'Journal entry updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JournalEntry $journalEntry)
    {
        // Ensure the entry belongs to the authenticated teacher
        $teacher = Teacher::where('email', request()->user()->email)->first();
        
        if (!$teacher || $journalEntry->teacher_id !== $teacher->id) {
            abort(403, 'Unauthorized access to journal entry.');
        }

        $journalEntry->delete();

        return redirect()->route('journal.index')
            ->with('success', 'Journal entry deleted successfully.');
    }
}