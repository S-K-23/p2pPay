'use client';

import { useEffect } from 'react';

const Hero = () => {
    useEffect(() => {
        // Simple glitch effect interval if needed, or CSS driven
    }, []);

    return (
        <section className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-center items-center pt-20">

            {/* Top Glitch Text */}
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 opacity-30 pointer-events-none">
                <h1 className="text-[10vw] font-black tracking-tighter leading-none text-gray-800 glitch-text" data-text="LET'S VISION">
                    LET'S VISION
                </h1>
            </div>

            <div className="z-10 text-center flex flex-col items-center gap-4">
                <h1 className="font-serif text-8xl md:text-[12rem] leading-[0.8] tracking-tighter mix-blend-difference">
                    Born to Create
                </h1>

                <div className="relative">
                    <h2 className="font-serif text-6xl md:text-8xl italic text-gray-400 blur-reveal" style={{ animationDelay: '0.2s' }}>
                        Powered by AI
                    </h2>
                </div>
            </div>

            {/* Right Sidebar Info */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-right hidden md:block">
                <div className="mb-8">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Meet us in</p>
                    <p className="text-xl font-medium">Shanghai, China</p>
                </div>
                <div className="mb-8">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">2026</p>
                    <p className="text-xl font-medium">March 27 - 29</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">70+ booths</p>
                    <p className="text-xl font-medium">3,000+ attendees</p>
                </div>
            </div>

            {/* Bottom Gradient/Blur */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
        </section>
    );
};

export default Hero;
