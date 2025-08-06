import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Teacher {
    id: number;
    teacher_id: string;
    name: string;
    email: string;
    is_admin: boolean;
}

interface JournalEntry {
    id: number;
    entry_date: string;
    class_name: string;
    subject: string;
    start_time: string;
    end_time: string;
    duration_minutes: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    entry: JournalEntry;
    teacher: Teacher;
    [key: string]: unknown;
}

export default function JournalShow({ entry, teacher }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this journal entry?')) {
            router.delete(`/journal/${entry.id}`, {
                onSuccess: () => {
                    // Redirect handled by controller
                }
            });
        }
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString: string) => {
        return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <AppShell>
            <Head title={`Journal Entry - ${entry.subject}`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📖 Journal Entry</h1>
                        <p className="text-gray-600 mt-1">
                            View details of your teaching session
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button asChild variant="outline">
                            <Link href="/journal">
                                📋 All Entries
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={`/journal/${entry.id}/edit`}>
                                ✏️ Edit Entry
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Entry Details */}
                    <Card className="lg:col-span-2 p-6">
                        <div className="space-y-6">
                            {/* Title Section */}
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                    📚 {entry.subject}
                                </h2>
                                <p className="text-lg text-gray-600">
                                    🏫 {entry.class_name}
                                </p>
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">📅 Date</h3>
                                    <p className="text-gray-600">{formatDate(entry.entry_date)}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">⏰ Duration</h3>
                                    <p className="text-xl font-bold text-blue-600">
                                        {formatDuration(entry.duration_minutes)}
                                    </p>
                                </div>
                            </div>

                            {/* Time Details */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-3">🕐 Session Time</h3>
                                <div className="flex items-center justify-between text-lg">
                                    <div>
                                        <span className="text-gray-600">Start: </span>
                                        <span className="font-medium">{formatTime(entry.start_time)}</span>
                                    </div>
                                    <div className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {formatDuration(entry.duration_minutes)}
                                    </div>
                                    <div>
                                        <span className="text-gray-600">End: </span>
                                        <span className="font-medium">{formatTime(entry.end_time)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Metadata */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="font-semibold text-gray-900 mb-3">📊 Entry Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Created:</span> {new Date(entry.created_at).toLocaleString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Last Updated:</span> {new Date(entry.updated_at).toLocaleString()}
                                    </div>
                                    <div>
                                        <span className="font-medium">Teacher:</span> {teacher.name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Teacher ID:</span> {teacher.teacher_id}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Actions Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">⚡ Quick Actions</h3>
                            <div className="space-y-3">
                                <Button asChild className="w-full justify-start">
                                    <Link href={`/journal/${entry.id}/edit`}>
                                        ✏️ Edit This Entry
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/journal/create">
                                        ➕ Add New Entry
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href="/journal">
                                        📋 View All Entries
                                    </Link>
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    className="w-full justify-start"
                                    onClick={handleDelete}
                                >
                                    🗑️ Delete Entry
                                </Button>
                            </div>
                        </Card>

                        {/* Duration Breakdown */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">⏱️ Time Breakdown</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Minutes:</span>
                                    <span className="font-medium">{entry.duration_minutes}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Hours:</span>
                                    <span className="font-medium">{(entry.duration_minutes / 60).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Decimal Hours:</span>
                                    <span className="font-medium">{Math.round(entry.duration_minutes / 60 * 10) / 10}</span>
                                </div>
                            </div>
                        </Card>

                        {/* Teaching Stats */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">📊 Session Type</h3>
                            <div className="space-y-2">
                                {entry.duration_minutes >= 120 && (
                                    <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                                        ✅ Long Session (2+ hours)
                                    </div>
                                )}
                                {entry.duration_minutes >= 60 && entry.duration_minutes < 120 && (
                                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                                        📚 Standard Session (1-2 hours)
                                    </div>
                                )}
                                {entry.duration_minutes < 60 && (
                                    <div className="bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg text-sm">
                                        ⚡ Short Session (&lt;1 hour)
                                    </div>
                                )}
                                
                                {entry.subject.toLowerCase().includes('lab') && (
                                    <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm">
                                        🧪 Laboratory Session
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}