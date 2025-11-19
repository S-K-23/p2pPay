'use client';

const SpeakersWanted = () => {
    return (
        <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden py-24">

            {/* Central Figure Placeholder - Pixelated Statue */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-[500px] h-[800px] bg-gradient-to-b from-gray-800 to-black" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)' }}></div>
            </div>

            {/* Orbiting Portraits Placeholders */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-gray-800 border border-gray-600"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-gray-800 border border-gray-600"></div>
                <div className="absolute bottom-1/3 left-1/3 w-14 h-14 rounded-full bg-gray-800 border border-gray-600"></div>
                <div className="absolute bottom-1/4 right-1/3 w-18 h-18 rounded-full bg-gray-800 border border-gray-600"></div>
            </div>

            <div className="z-10 text-center max-w-3xl px-6">
                <h2 className="font-serif text-6xl md:text-8xl mb-12">
                    Speakers wanted
                </h2>

                <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
                    Last year, 52 keynote speakers and workshop coaches lit up the stage.
                    In 2026, we're curating an even bolder lineup—builders, designers, and
                    visionaries shaping what's next. If you've got a story, a breakthrough, or
                    a hard-won lesson, we want to hear it!
                </p>

                <button className="bg-white text-black px-8 py-3 text-sm font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
                    Apply to speak <span>↱</span>
                </button>
            </div>
        </section>
    );
};

export default SpeakersWanted;
