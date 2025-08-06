<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Teacher
 *
 * @property int $id
 * @property string $teacher_id
 * @property string $name
 * @property string $email
 * @property bool $is_admin
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\JournalEntry> $journalEntries
 * @property-read int|null $journal_entries_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher query()
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Teacher whereUpdatedAt($value)
 * @method static \Database\Factories\TeacherFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Teacher extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'teacher_id',
        'name',
        'email',
        'is_admin',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_admin' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all journal entries for this teacher.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function journalEntries(): HasMany
    {
        return $this->hasMany(JournalEntry::class);
    }

    /**
     * Get journal entries for a specific date.
     *
     * @param  string  $date
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function journalEntriesForDate(string $date): HasMany
    {
        return $this->journalEntries()->where('entry_date', $date);
    }

    /**
     * Get total teaching hours for a specific date.
     *
     * @param  string  $date
     * @return int
     */
    public function getTotalHoursForDate(string $date): int
    {
        return $this->journalEntriesForDate($date)->sum('duration_minutes');
    }

    /**
     * Get total teaching hours for a week.
     *
     * @param  string  $startDate
     * @param  string  $endDate
     * @return int
     */
    public function getTotalHoursForWeek(string $startDate, string $endDate): int
    {
        return $this->journalEntries()
            ->whereBetween('entry_date', [$startDate, $endDate])
            ->sum('duration_minutes');
    }
}