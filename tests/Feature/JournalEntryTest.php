<?php

use App\Models\User;
use App\Models\Teacher;
use App\Models\JournalEntry;

beforeEach(function () {
    $this->user = User::factory()->create([
        'email' => 'test@school.edu'
    ]);
    
    $this->teacher = Teacher::factory()->create([
        'email' => 'test@school.edu',
        'teacher_id' => 'T123'
    ]);
});

it('displays journal entries in index', function () {
    JournalEntry::factory(3)->create([
        'teacher_id' => $this->teacher->id
    ]);

    $this->actingAs($this->user)
        ->get('/journal')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('journal/index')
            ->has('entries.data', 3)
            ->has('teacher')
        );
});

it('can create journal entry', function () {
    $entryData = [
        'entry_date' => '2024-01-15',
        'class_name' => 'Grade 10A',
        'subject' => 'Mathematics',
        'start_time' => '09:00',
        'end_time' => '10:30',
    ];

    $this->actingAs($this->user)
        ->post('/journal', $entryData)
        ->assertRedirect();

    expect(JournalEntry::where('teacher_id', $this->teacher->id)->count())->toBe(1);
    
    $entry = JournalEntry::where('teacher_id', $this->teacher->id)->first();
    expect($entry->class_name)->toBe('Grade 10A');
    expect($entry->subject)->toBe('Mathematics');
    expect($entry->duration_minutes)->toBe(90);
});

it('validates journal entry data', function () {
    $this->actingAs($this->user)
        ->post('/journal', [])
        ->assertSessionHasErrors([
            'entry_date',
            'class_name',
            'subject',
            'start_time',
            'end_time'
        ]);
});

it('requires end time to be after start time', function () {
    $entryData = [
        'entry_date' => '2024-01-15',
        'class_name' => 'Grade 10A',
        'subject' => 'Mathematics',
        'start_time' => '10:30',
        'end_time' => '09:00',
    ];

    $this->actingAs($this->user)
        ->post('/journal', $entryData)
        ->assertSessionHasErrors(['end_time']);
});

it('can view specific journal entry', function () {
    $entry = JournalEntry::factory()->create([
        'teacher_id' => $this->teacher->id
    ]);

    $this->actingAs($this->user)
        ->get("/journal/{$entry->id}")
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('journal/show')
            ->where('entry.id', $entry->id)
        );
});

it('cannot view other teachers entries', function () {
    $otherTeacher = Teacher::factory()->create();
    $entry = JournalEntry::factory()->create([
        'teacher_id' => $otherTeacher->id
    ]);

    $this->actingAs($this->user)
        ->get("/journal/{$entry->id}")
        ->assertStatus(403);
});

it('can update journal entry', function () {
    $entry = JournalEntry::factory()->create([
        'teacher_id' => $this->teacher->id
    ]);

    $updateData = [
        'entry_date' => '2024-01-16',
        'class_name' => 'Updated Class',
        'subject' => 'Updated Subject',
        'start_time' => '10:00',
        'end_time' => '11:30',
    ];

    $this->actingAs($this->user)
        ->put("/journal/{$entry->id}", $updateData)
        ->assertRedirect("/journal/{$entry->id}");

    $entry->refresh();
    expect($entry->class_name)->toBe('Updated Class');
    expect($entry->subject)->toBe('Updated Subject');
    expect($entry->duration_minutes)->toBe(90);
});

it('can delete journal entry', function () {
    $entry = JournalEntry::factory()->create([
        'teacher_id' => $this->teacher->id
    ]);

    $this->actingAs($this->user)
        ->delete("/journal/{$entry->id}")
        ->assertRedirect('/journal');

    expect(JournalEntry::find($entry->id))->toBeNull();
});

it('shows teacher statistics on dashboard', function () {
    JournalEntry::factory(5)->create([
        'teacher_id' => $this->teacher->id
    ]);

    $this->actingAs($this->user)
        ->get('/dashboard')
        ->assertStatus(200)
        ->assertInertia(fn ($assert) => $assert
            ->component('dashboard')
            ->has('teacher')
            ->has('recentEntries')
            ->has('totalEntries')
        );
});