'use client';

const TicketSection = () => {
    return (
        <section className="min-h-screen bg-black text-white py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-serif text-6xl md:text-8xl mb-24">
                    Get your tickets
                </h2>

                <div className="space-y-12">
                    {/* Booth Tier */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
                        <div className="flex flex-col gap-4">
                            <div className="w-24 h-24 border border-gray-700 rounded-lg flex items-center justify-center text-3xl grayscale opacity-50">
                                🏛️
                            </div>
                            <h3 className="font-serif text-5xl">Booth</h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-6 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-2">
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Access to 100+ booths</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Exclusive swags</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="font-serif text-5xl">¥99</span>
                                <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    Purchase <span>🎫</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Basic Tier */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
                        <div className="flex flex-col gap-4">
                            <div className="w-24 h-24 border border-gray-700 rounded-lg flex items-center justify-center text-3xl grayscale opacity-50">
                                💺
                            </div>
                            <h3 className="font-serif text-5xl">Basic</h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-6 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-2 flex-wrap justify-end">
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Everything in Booth</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Access to 40+ sessions</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Full workshop access</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="font-serif text-5xl">¥699</span>
                                <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    Purchase <span>🎫</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pro Tier */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-serif text-5xl">Pro</h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-6 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-2 flex-wrap justify-end">
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Everything in Basic</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Community member access</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Access to our special events</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="font-serif text-5xl">¥1,299</span>
                                <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    Purchase <span>🎫</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Premium Tier */}
                    <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-8">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-serif text-5xl">Premium</h3>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-6 mb-4 md:mb-0 w-full md:w-auto justify-between md:justify-end">
                            <div className="flex gap-2 flex-wrap justify-end">
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Everything in Pro</span>
                                <span className="border border-orange-400 text-orange-400 px-4 py-1 rounded-full text-xs uppercase tracking-wider">Exclusive VIP dinners</span>
                            </div>
                            <div className="flex items-center gap-8">
                                <span className="font-serif text-5xl">¥2,499</span>
                                <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    Purchase <span>🎫</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TicketSection;
