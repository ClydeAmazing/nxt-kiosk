export default function MenuSkeleton() {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-y-auto h-screen">
                {/* Sidebar Skeleton */}
                <div className="w-48 bg-white border-r border-gray-200">
                    <div className="p-4 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <main className="p-4 flex-1 flex flex-col h-full">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="border rounded-lg p-4 space-y-4">
                                <div className="h-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
} 