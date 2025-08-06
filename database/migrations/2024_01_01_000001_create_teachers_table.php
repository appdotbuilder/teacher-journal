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
        Schema::create('teachers', function (Blueprint $table) {
            $table->id();
            $table->string('teacher_id')->unique()->comment('Unique teacher identifier');
            $table->string('name')->comment('Teacher full name');
            $table->string('email')->unique()->comment('Teacher email address');
            $table->boolean('is_admin')->default(false)->comment('Administrative privileges indicator');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('teacher_id');
            $table->index('email');
            $table->index('is_admin');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};