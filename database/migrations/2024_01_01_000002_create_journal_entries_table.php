<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('journal_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('teacher_id')->constrained('teachers')->onDelete('cascade');
            $table->date('entry_date')->comment('Date of the teaching session');
            $table->string('class_name')->comment('Name of the class taught');
            $table->string('subject')->comment('Subject taught');
            $table->time('start_time')->comment('Session start time');
            $table->time('end_time')->comment('Session end time');
            $table->integer('duration_minutes')->comment('Calculated duration in minutes');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['teacher_id', 'entry_date']);
            $table->index('entry_date');
            $table->index(['teacher_id', 'subject']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_entries');
    }
};