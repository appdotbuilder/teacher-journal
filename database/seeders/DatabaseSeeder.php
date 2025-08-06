<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create teacher accounts that correspond to user accounts
        User::factory()->create([
            'name' => 'Dr. Sarah Johnson',
            'email' => 'sarah.johnson@school.edu',
        ]);

        User::factory()->create([
            'name' => 'Prof. Michael Admin',
            'email' => 'admin@school.edu',
        ]);

        // Seed teachers and journal entries
        $this->call([
            TeacherSeeder::class,
        ]);
    }
}
