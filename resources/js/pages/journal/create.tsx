import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function JournalCreate({ errors = {} }: Props) {
    const [formData, setFormData] = useState({
        entry_date: new Date().toISOString().split('T')[0],
        class_name: '',
        subject: '',
        start_time: '',
        end_time: '',
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

        router.post('/journal', formData, {
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

    return (
        <AppShell>
            <Head title="Add Journal Entry" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">➕ Add Journal Entry</h1>
                        <p className="text-gray-600 mt-1">
                            Log a new teaching session with class details and time
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/journal">
                            📖 Back to Journal
                        </Link>
                    </Button>
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
                                    {isSubmitting ? '⏳ Saving...' : '💾 Save Journal Entry'}
                                </Button>
                                <Button asChild variant="outline" type="button">
                                    <Link href="/journal">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </Card>

                    {/* Preview/Info Panel */}
                    <div className="space-y-6">
                        {/* Duration Preview */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">⏱️ Session Duration</h3>
                            {getEstimatedDuration() ? (
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">
                                        {getEstimatedDuration()}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Estimated session length
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500">
                                    <div className="text-2xl mb-2">⏰</div>
                                    <p className="text-sm">
                                        Enter start and end times to see duration
                                    </p>
                                </div>
                            )}
                        </Card>

                        {/* Tips */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Use descriptive class names like "Grade 10A Biology Lab"</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Be specific with subjects for better tracking</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Double-check your time entries for accuracy</span>
                                </div>
                                <div className="flex items-start space-x-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Duration is automatically calculated</span>
                                </div>
                            </div>
                        </Card>

                        {/* Common Subjects */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold mb-4">📚 Common Subjects</h3>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Literature', 'History', 'Geography', 'Computer Science'].map((subject) => (
                                    <button
                                        key={subject}
                                        type="button"
                                        className="text-left p-2 rounded hover:bg-gray-100 text-gray-700"
                                        onClick={() => setFormData(prev => ({ ...prev, subject }))}
                                    >
                                        {subject}
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}