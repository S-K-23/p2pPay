'use client';

import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 mix-blend-difference text-white">
            <div className="flex gap-8 text-sm font-medium tracking-wide">
                <Link href="#" className="hover:opacity-70 transition-opacity">Sessions</Link>
                <Link href="#" className="hover:opacity-70 transition-opacity">Speakers</Link>
                <Link href="#" className="hover:opacity-70 transition-opacity">Sponsors</Link>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                <span className="text-2xl">👺</span>
                <span className="font-serif text-xl tracking-wider">LET'S VISION</span>
                <span className="border border-white px-1 text-xs rounded-sm">26</span>
            </div>

            <div className="flex items-center gap-8">
                <Link href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">FAQ</Link>
                <button className="bg-white text-black px-6 py-2 text-sm font-bold hover:bg-gray-200 transition-colors">
                    Get Tickets
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
