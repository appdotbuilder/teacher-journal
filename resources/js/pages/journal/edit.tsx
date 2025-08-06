import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface JournalEntry {
    id: number;
    entry_date: string;
    class_name: string;
    subject: string;
    start_time: string;
    end_time: string;
    duration_minutes: number;
}

interface Props {
    entry: JournalEntry;
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function JournalEdit({ entry, errors = {} }: Props) {
    const [formData, setFormData] = useState({
        entry_date: entry.entry_date,
        class_name: entry.class_name,
        subject: entry.subject,
        start_time: entry.start_time,
        end_time: entry.end_time,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/journal/${entry.id}`, formData, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    // Calculate estimated duration
    const getEstimatedDuration = () => {
        if (formData.start_time && formData.end_time) {
            const start = new Date(`2000-01-01 ${formData.start_time}`);
            const end = new Date(`2000-01-01 ${formData.end_time}`);
            const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
            
            if (diffMinutes > 0) {
                const hours = Math.floor(diffMinutes / 60);
                const minutes = diffMinutes % 60;
                
                if (hours > 0) {
                    return `${hours}h ${minutes}m`;
                }
                return `${minutes}m`;
            }
        }
        return null;
    };

    const getCurrentDuration = () => {
        const hours = Math.floor(entry.duration_minutes / 60);
        const minutes = entry.duration_minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${minutes}m`;
        }
        return `${minutes}m`;
    };

    return (
        <AppShell>
            <Head title={`Edit Journal Entry - ${entry.subject}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Journal Entry</h1>
                        <p className="text-gray-600 mt-1">
                            Update your teaching session details
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button asChild variant="outline">
                            <Link href={`/journal/${entry.id}`}>
                                👁️ View Entry
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/journal">
                                📖 All Entries
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Form */}
                    <Card className="lg:col-span-2 p-6">
                        <h2 className="text-xl font-semibold mb-6">📝 Teaching Session Details</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Date */}
                            <div>
                                <Label htmlFor="entry_date" className="text-base font-medium">
                                    📅 Date *
                                </Label>
                                <Input
                                    id="entry_date"
                                    name="entry_date"
                                    type="date"
                                    value={formData.entry_date}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                />
                                {errors.entry_date && (
                                    <p className="mt-2 text-sm text-red-600">{errors.entry_date}</p>
                                )}
                            </div>

                            {/* Class Name */}
                            <div>
                                <Label htmlFor="class_name" className="text-base font-medium">
                                    🏫 Class Name *
                                </Label>
                                <Input
                                    id="class_name"
                                    name="class_name"
                                    placeholder="e.g., Grade 10A, Physics Lab, Advanced Math"
                                    value={formData.class_name}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                />
                                {errors.class_name && (
                                    <p className="mt-2 text-sm text-red-600">{errors.class_name}</p>
                                )}
                            </div>

                            {/* Subject */}
                            <div>
                                <Label htmlFor="subject" className="text-base font-medium">
                                    📚 Subject *
                                </Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="e.g., Mathematics, Chemistry, Literature"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="mt-2"
                                    required
                                />
                                {errors.subject && (
                                    <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
                                )}
                            </div>

                            {/* Time Range */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="start_time" className="text-base font-medium">
                                        🕐 Start Time *
                                    </Label>
                                    <Input
                                        id="start_time"
                                        name="start_time"
                                        type="time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.start_time && (
                                        <p className="mt-2 text-sm text-red-600">{errors.start_time}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <Label htmlFor="end_time" className="text-base font-medium">
                                        🕐 End Time *
                                    </Label>
                                    <Input
                                        id="end_time"
                                        name="end_time"
                                        type="time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        className="mt-2"
                                        required
                                    />
                                    {errors.end_time && (
                                        <p className="mt-2 text-sm text-red-600">{errors.end_time}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4 pt-4">
                                <Button 
                                    type="submit" 
                                    className="flex-1"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? '⏳ Updating...' : '💾 Update Journal Entry'}
                                </Button>
                                <Button asChild variant="outline" type="button">
                                    <Link href={`/journal/${entry.id}`}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Current vs New Duration */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">⏱️ Session Duration</h3>
                            
                            {/* Current Duration */}
                            <div className="mb-4 pb-4 border-b border-gray-200">
                                <div className="text-sm text-gray-600 mb-1">Current Duration</div>
                                <div className="text-2xl font-bold text-gray-600">
                                    {getCurrentDuration()}
                                </div>
                            </div>

                            {/* New Duration */}
                            {getEstimatedDuration() ? (
                                <div className="text-center">
                                    <div className="text-sm text-gray-600 mb-1">New Duration</div>
                                    <div className="text-2xl font-bold text-blue-600">
                                        {getEstimatedDuration()}
                                    </div>
                                    {getEstimatedDuration() !== getCurrentDuration() && (
                                        <p className="text-xs text-blue-600 mt-1">
                                            ↻ Duration will be updated
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="text-2xl mb-2">⏰</div>
                                    <p className="text-sm">
                                        Adjust times to see new duration
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Original Entry Info */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">📊 Original Entry</h3>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <span className="text-gray-600">Subject:</span> {entry.subject}
                                </div>
                                <div>
                                    <span className="text-gray-600">Class:</span> {entry.class_name}
                                </div>
                                <div>
                                    <span className="text-gray-600">Date:</span> {new Date(entry.entry_date).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="text-gray-600">Time:</span> {entry.start_time} - {entry.end_time}
                                </div>
                            </div>
                        </Card>

                        {/* Tips */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">💡 Editing Tips</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                    <span className="text-blue-600">ℹ️</span>
                                    <span>Duration is automatically recalculated when you change times</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-blue-600">ℹ️</span>
                                    <span>All fields are required for a complete entry</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-blue-600">ℹ️</span>
                                    <span>Changes are saved immediately when you click update</span>
                                </div>
                            </div>
                        </Card>

                        {/* Danger Zone */}
                        <Card className="p-6 border-red-200">
                            <h3 className="text-lg font-semibold text-red-700 mb-4">⚠️ Danger Zone</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Permanently delete this journal entry. This action cannot be undone.
                            </p>
                            <Button 
                                variant="destructive" 
                                size="sm"
                                className="w-full"
                                onClick={() => {
                                    if (confirm('Are you sure you want to delete this journal entry?')) {
                                        router.delete(`/journal/${entry.id}`);
                                    }
                                }}
                            >
                                🗑️ Delete Entry
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}