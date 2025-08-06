<?php

namespace Database\Factories;

use App\Models\JournalEntry;
use App\Models\Teacher;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\JournalEntry>
 */
class JournalEntryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\JournalEntry>
     */
    protected $model = JournalEntry::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Generate random times for the session
        $startHour = random_int(7, 15); // Classes between 7 AM and 3 PM
        $startMinute = fake()->randomElement([0, 15, 30, 45]);
        $start = Carbon::createFromTime($startHour, $startMinute);
        
        // Duration between 30 minutes and 3 hours
        $durationMinutes = fake()->randomElement([30, 45, 60, 90, 120, 150, 180]);
        $end = $start->copy()->addMinutes($durationMinutes);
        
        // If end time goes past 6 PM, adjust
        if ($end->hour >= 18) {
            $end = $start->copy()->addMinutes(60); // Make it 1 hour session
            $durationMinutes = 60;
        }

        $subjects = [
            'Mathematics',
            'Physics',
            'Chemistry',
            'Biology',
            'Literature',
            'History',
            'Geography',
            'Computer Science',
            'Art',
            'Music',
            'Physical Education',
            'English',
            'Foreign Language',
        ];

        $classes = [
            'Grade 9A', 'Grade 9B', 'Grade 9C',
            'Grade 10A', 'Grade 10B', 'Grade 10C',
            'Grade 11A', 'Grade 11B', 'Grade 11C',
            'Grade 12A', 'Grade 12B', 'Grade 12C',
            'Physics Lab', 'Chemistry Lab', 'Biology Lab',
            'Computer Lab', 'Advanced Math', 'Honors Science',
        ];

        return [
            'teacher_id' => Teacher::factory(),
            'entry_date' => fake()->dateTimeBetween('-2 months', 'now')->format('Y-m-d'),
            'class_name' => fake()->randomElement($classes),
            'subject' => fake()->randomElement($subjects),
            'start_time' => $start->format('H:i'),
            'end_time' => $end->format('H:i'),
            'duration_minutes' => $durationMinutes,
        ];
    }

    /**
     * Create an entry for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'entry_date' => Carbon::today()->format('Y-m-d'),
        ]);
    }

    /**
     * Create an entry for this week.
     */
    public function thisWeek(): static
    {
        return $this->state(fn (array $attributes) => [
            'entry_date' => fake()->dateTimeBetween('monday this week', 'now')->format('Y-m-d'),
        ]);
    }
}