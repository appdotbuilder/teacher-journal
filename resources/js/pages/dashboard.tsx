import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


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

interface Props {
    teacher?: Teacher;
    recentEntries?: JournalEntry[];
    todayHours?: number;
    weeklyHours?: number;
    totalHours?: number;
    totalEntries?: number;
    weekStart?: string;
    weekEnd?: string;
    error?: string;
    showCreateForm?: boolean;
    [key: string]: unknown;
}

export default function Dashboard({
    teacher,
    recentEntries = [],
    todayHours = 0,
    weeklyHours = 0,
    totalHours = 0,
    totalEntries = 0,
    weekStart = '',
    weekEnd = '',
    error,
}: Props) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        entry_date: new Date().toISOString().split('T')[0],
        class_name: '',
        subject: '',
        start_time: '',
        end_time: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/journal', formData, {
            onSuccess: () => {
                setShowForm(false);
                setFormData({
                    entry_date: new Date().toISOString().split('T')[0],
                    class_name: '',
                    subject: '',
                    start_time: '',
                    end_time: '',
                });
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="text-red-600">⚠️</div>
                            <div className="ml-3">
                                <h3 className="text-red-800 font-medium">Error</h3>
                                <p className="text-red-700 mt-1">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {teacher && (
                    <>
                        {/* Welcome Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-6">
                            <h1 className="text-3xl font-bold mb-2">
                                👋 Welcome back, {teacher.name}!
                            </h1>
                            <p className="text-blue-100">
                                Teacher ID: {teacher.teacher_id} | Ready to log your teaching activities?
                            </p>
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                                    <div className="text-3xl font-bold text-purple-600">{totalHours}h</div>
                                    <div className="text-gray-600 font-medium">Total Hours</div>
                                    <div className="text-sm text-gray-500">🎯 All time</div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-orange-600">{totalEntries}</div>
                                    <div className="text-gray-600 font-medium">Total Entries</div>
                                    <div className="text-sm text-gray-500">📝 Journal entries</div>
                                </div>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Quick Entry Form */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">⚡ Quick Entry</h2>
                                    {!showForm && (
                                        <Button onClick={() => setShowForm(true)}>
                                            ➕ Add New Entry
                                        </Button>
                                    )}
                                </div>

                                {showForm ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="entry_date">Date</Label>
                                            <Input
                                                id="entry_date"
                                                name="entry_date"
                                                type="date"
                                                value={formData.entry_date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="class_name">Class Name</Label>
                                            <Input
                                                id="class_name"
                                                name="class_name"
                                                placeholder="e.g., Grade 10A, Physics Lab"
                                                value={formData.class_name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                placeholder="e.g., Mathematics, Chemistry"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="start_time">Start Time</Label>
                                                <Input
                                                    id="start_time"
                                                    name="start_time"
                                                    type="time"
                                                    value={formData.start_time}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="end_time">End Time</Label>
                                                <Input
                                                    id="end_time"
                                                    name="end_time"
                                                    type="time"
                                                    value={formData.end_time}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="flex space-x-3">
                                            <Button type="submit" className="flex-1">
                                                💾 Save Entry
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowForm(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">📝</div>
                                        <p>Click "Add New Entry" to log your teaching session</p>
                                    </div>
                                )}
                            </Card>

                            {/* Recent Entries */}
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold">📋 Recent Entries</h2>
                                    <Button asChild variant="outline">
                                        <Link href="/journal">View All</Link>
                                    </Button>
                                </div>

                                {recentEntries.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentEntries.map((entry) => (
                                            <div key={entry.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-medium">{entry.subject} - {entry.class_name}</div>
                                                        <div className="text-sm text-gray-600">
                                                            📅 {new Date(entry.entry_date).toLocaleDateString()}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            ⏰ {entry.start_time} - {entry.end_time}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-blue-600">
                                                        {Math.round(entry.duration_minutes / 60 * 10) / 10}h
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">📚</div>
                                        <p>No journal entries yet</p>
                                        <p className="text-sm">Start by adding your first teaching session!</p>
                                    </div>
                                )}
                            </Card>
                        </div>

                        {/* Navigation Links */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Button asChild variant="outline" size="lg" className="h-auto p-6">
                                <Link href="/journal" className="text-center">
                                    <div className="text-2xl mb-2">📖</div>
                                    <div className="font-semibold">Journal Entries</div>
                                    <div className="text-sm text-gray-600">View and manage all entries</div>
                                </Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="h-auto p-6">
                                <Link href="/journal/create" className="text-center">
                                    <div className="text-2xl mb-2">➕</div>
                                    <div className="font-semibold">Add Entry</div>
                                    <div className="text-sm text-gray-600">Log a new teaching session</div>
                                </Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="h-auto p-6">
                                <Link href="/journal" className="text-center">
                                    <div className="text-2xl mb-2">📊</div>
                                    <div className="font-semibold">Reports</div>
                                    <div className="text-sm text-gray-600">View teaching summaries</div>
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </AppShell>
    );
}