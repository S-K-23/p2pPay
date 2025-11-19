'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const features = [
    {
        title: 'Instant Speed',
        description: 'Off-chain state channels allow for millisecond transaction times. No waiting for block confirmations.',
        image: '/luxury-speed.png',
        id: '01'
    },
    {
        title: 'Hybrid Security',
        description: 'Best of both worlds. Local cryptographic signatures for speed, Solana blockchain for final settlement.',
        image: '/luxury-hybrid.png',
        id: '02'
    },
    {
        title: 'Zero Fees',
        description: 'Exchange IOUs for free. Only pay standard Solana network fees when you choose to settle on-chain.',
        image: '/luxury-security.png',
        id: '03'
    }
];

const Features = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const anime = require('animejs').default || require('animejs');

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 1000,
                        easing: 'easeOutExpo'
                    });
                    observerRef.current?.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.feature-item').forEach((el) => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <section className="py-32 px-6 md:px-12 bg-black relative z-10">
            <div className="max-w-[1600px] mx-auto">
                <div className="mb-32 border-b border-white/20 pb-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Core Architecture</h2>
                </div>

                <div className="space-y-32">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-item flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center opacity-0`}
                        >
                            <div className="w-full md:w-1/2 relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={feature.image}
                                    alt={feature.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ objectFit: 'cover' }}
                                    className="grayscale hover:grayscale-0 transition-all duration-700 ease-out hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-sm font-bold">
                                    {feature.id}
                                </div>
                            </div>

                            <div className="w-full md:w-1/2">
                                <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">
                                    {feature.title}
                                </h3>
                                <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                    {feature.description}
                                </p>
                                <div className="mt-8 w-24 h-1 bg-[#ff0000]"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
