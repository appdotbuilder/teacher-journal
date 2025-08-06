import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="Welcome - Teacher Journal" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="text-2xl font-bold text-indigo-600">
                                    📚 TeachLog
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-2">
                                        <Link
                                            href="/login"
                                            className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            📊 Digital Teaching Journal
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Streamline your daily teaching activities with our comprehensive logging system. 
                            Track classes, subjects, hours, and generate insightful reports - all in one secure platform.
                        </p>
                        
                        {!auth?.user && (
                            <div className="flex justify-center space-x-4">
                                <Button asChild size="lg" className="text-lg px-8 py-3">
                                    <Link href="/register">
                                        🚀 Start Teaching Journal
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
                                    <Link href="/login">
                                        📝 Sign In
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="text-3xl mb-4">⏰</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Time Tracking</h3>
                            <p className="text-gray-600">
                                Automatically calculate session durations and track your daily teaching hours with precision.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="text-3xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Class Management</h3>
                            <p className="text-gray-600">
                                Log multiple classes and subjects with detailed information about each teaching session.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="text-3xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Weekly Reports</h3>
                            <p className="text-gray-600">
                                Generate comprehensive weekly summaries and track your teaching progress over time.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <div className="text-3xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                            <p className="text-gray-600">
                                Your teaching data is completely private and secure. Only you can access your journal entries.
                            </p>
                        </div>
                    </div>

                    {/* Demo Screenshot Placeholder */}
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                            See Your Teaching Data Come to Life
                        </h2>
                        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-8">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                                <h3 className="text-xl font-semibold mb-2">📊 Today's Overview</h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold">6.5h</div>
                                        <div className="text-sm opacity-90">Hours Today</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">32h</div>
                                        <div className="text-sm opacity-90">This Week</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">4</div>
                                        <div className="text-sm opacity-90">Classes</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Recent Journal Entries</h4>
                                    <div className="space-y-3">
                                        <div className="border border-gray-200 rounded-lg p-3">
                                            <div className="font-medium">Mathematics - Grade 10A</div>
                                            <div className="text-sm text-gray-600">9:00 AM - 10:30 AM (1.5h)</div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-3">
                                            <div className="font-medium">Physics - Grade 11B</div>
                                            <div className="text-sm text-gray-600">11:00 AM - 12:00 PM (1h)</div>
                                        </div>
                                        <div className="border border-gray-200 rounded-lg p-3">
                                            <div className="font-medium">Chemistry Lab - Grade 12</div>
                                            <div className="text-sm text-gray-600">2:00 PM - 4:00 PM (2h)</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                                    <div className="space-y-2">
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                                            ➕ Add New Journal Entry
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                                            📋 View All Entries
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                                            📊 Generate Weekly Report
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    {!auth?.user && (
                        <div className="mt-20 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Ready to Transform Your Teaching Records?
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Join educators who are already streamlining their daily teaching activities.
                            </p>
                            <Button asChild size="lg" className="text-lg px-8 py-3">
                                <Link href="/register">
                                    🎯 Get Started Now
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="text-xl font-bold mb-2">📚 TeachLog</div>
                        <p className="text-gray-400">
                            Professional teaching journal management system for educators
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}