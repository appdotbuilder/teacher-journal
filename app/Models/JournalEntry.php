<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

/**
 * App\Models\JournalEntry
 *
 * @property int $id
 * @property int $teacher_id
 * @property string $entry_date
 * @property string $class_name
 * @property string $subject
 * @property string $start_time
 * @property string $end_time
 * @property int $duration_minutes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Teacher $teacher
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereClassName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereEntryDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereTeacherId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|JournalEntry whereUpdatedAt($value)
 * @method static \Database\Factories\JournalEntryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class JournalEntry extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'teacher_id',
        'entry_date',
        'class_name',
        'subject',
        'start_time',
        'end_time',
        'duration_minutes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'entry_date' => 'date',
        'duration_minutes' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the teacher that owns this journal entry.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class);
    }

    /**
     * Calculate and set the duration in minutes based on start and end times.
     *
     * @return void
     */
    public function calculateDuration(): void
    {
        if ($this->start_time && $this->end_time) {
            try {
                $start = Carbon::createFromFormat('H:i', $this->start_time);
                $end = Carbon::createFromFormat('H:i', $this->end_time);
                
                $this->duration_minutes = (int) abs($end->diffInMinutes($start));
            } catch (\Exception $e) {
                // Fallback calculation if format is different
                $startTime = strtotime('1970-01-01 ' . $this->start_time);
                $endTime = strtotime('1970-01-01 ' . $this->end_time);
                $this->duration_minutes = (int) abs(($endTime - $startTime) / 60);
            }
        } else {
            $this->duration_minutes = 0;
        }
    }

    /**
     * Get duration as formatted hours and minutes.
     *
     * @return string
     */
    public function getFormattedDurationAttribute(): string
    {
        $hours = intval($this->duration_minutes / 60);
        $minutes = $this->duration_minutes % 60;
        
        if ($hours > 0) {
            return $hours . 'h ' . $minutes . 'm';
        }
        
        return $minutes . 'm';
    }

    /**
     * Boot the model and set up event listeners.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($journalEntry) {
            $journalEntry->calculateDuration();
        });
    }
}