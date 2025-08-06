<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\JournalEntry;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a sample teacher with predictable credentials for testing
        $sampleTeacher = Teacher::create([
            'teacher_id' => 'T001',
            'name' => 'Dr. Sarah Johnson',
            'email' => 'sarah.johnson@school.edu',
            'is_admin' => false,
        ]);

        // Create journal entries for the sample teacher
        JournalEntry::factory(15)->create([
            'teacher_id' => $sampleTeacher->id,
        ]);

        // Create a few more sample entries for this week and today
        JournalEntry::factory(3)->thisWeek()->create([
            'teacher_id' => $sampleTeacher->id,
        ]);

        JournalEntry::factory(2)->today()->create([
            'teacher_id' => $sampleTeacher->id,
        ]);

        // Create admin teacher
        $adminTeacher = Teacher::create([
            'teacher_id' => 'T999',
            'name' => 'Prof. Michael Admin',
            'email' => 'admin@school.edu',
            'is_admin' => true,
        ]);

        // Create some journal entries for admin
        JournalEntry::factory(8)->create([
            'teacher_id' => $adminTeacher->id,
        ]);

        // Create additional teachers with journal entries
        Teacher::factory(5)
            ->has(JournalEntry::factory(random_int(8, 20)))
            ->create();
    }
}