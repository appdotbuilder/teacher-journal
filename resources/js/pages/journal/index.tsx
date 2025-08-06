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
    formatted_duration: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedEntries {
    data: JournalEntry[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    entries: PaginatedEntries;
    teacher: Teacher;
    weeklyHours: number;
    todayHours: number;
    weekStart: string;
    weekEnd: string;
    [key: string]: unknown;
}

export default function JournalIndex({
    entries,
    weeklyHours,
    todayHours,
    weekStart,
    weekEnd,
}: Props) {
    const handleDelete = (entryId: number) => {
        if (confirm('Are you sure you want to delete this journal entry?')) {
            router.delete(`/journal/${entryId}`);
        }
    };

    return (
        <AppShell>
            <Head title="Journal Entries" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📖 Journal Entries</h1>
                        <p className="text-gray-600 mt-1">
                            Track and manage your teaching sessions
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/journal/create">
                            ➕ Add New Entry
                        </Link>
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{todayHours}h</div>
                            <div className="text-gray-600 font-medium">Today's Hours</div>
                            <div className="text-sm text-gray-500">📅 {new Date().toLocaleDateString()}</div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{weeklyHours}h</div>
                            <div className="text-gray-600 font-medium">This Week</div>
                            <div className="text-sm text-gray-500">📊 {weekStart} - {weekEnd}</div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{entries.total}</div>
                            <div className="text-gray-600 font-medium">Total Entries</div>
                            <div className="text-sm text-gray-500">📝 All time</div>
                        </div>
                    </Card>
                </div>

                {/* Entries List */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">All Journal Entries</h2>
                    
                    {entries.data.length > 0 ? (
                        <div className="space-y-4">
                            {entries.data.map((entry) => (
                                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-2">
                                                <h3 className="font-semibold text-lg">{entry.subject}</h3>
                                                <span className="text-blue-600 font-medium">{entry.class_name}</span>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    📅 {new Date(entry.entry_date).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center">
                                                    🕐 {entry.start_time} - {entry.end_time}
                                                </div>
                                                <div className="flex items-center">
                                                    ⏱️ {Math.round(entry.duration_minutes / 60 * 10) / 10} hours
                                                </div>
                                                <div className="flex items-center">
                                                    📊 {entry.duration_minutes} minutes
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex space-x-2 ml-4">
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/journal/${entry.id}`}>
                                                    👁️ View
                                                </Link>
                                            </Button>
                                            <Button asChild size="sm" variant="outline">
                                                <Link href={`/journal/${entry.id}/edit`}>
                                                    ✏️ Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(entry.id)}
                                            >
                                                🗑️ Delete
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {/* Pagination */}
                            {entries.last_page > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-6">
                                    {entries.links.map((link, index) => (
                                        <div key={index}>
                                            {link.url ? (
                                                <Button
                                                    asChild
                                                    variant={link.active ? "default" : "outline"}
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={link.url}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Journal Entries Yet</h3>
                            <p className="text-gray-600 mb-6">
                                Start by adding your first teaching session to track your daily activities.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/journal/create">
                                    🚀 Create First Entry
                                </Link>
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </AppShell>
    );
}