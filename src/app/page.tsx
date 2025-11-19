'use client';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import SpeakersWanted from '@/components/landing/SpeakersWanted';
import TicketSection from '@/components/landing/TicketSection';

export default function Home() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar />
            <Hero />
            <SpeakersWanted />
            <TicketSection />
        </main>
    );
}
