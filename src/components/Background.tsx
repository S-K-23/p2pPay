'use client';

import { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const anime = require('animejs').default || require('animejs');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);

        // Create a grid of points
        const points: { x: number; y: number; originX: number; originY: number }[] = [];
        const spacing = 50;
        const rows = Math.ceil(height / spacing);
        const cols = Math.ceil(width / spacing);

        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                const x = i * spacing;
                const y = j * spacing;
                points.push({ x, y, originX: x, originY: y });
            }
        }

        // Animate points
        const animation = anime({
            targets: points,
            x: (p: any) => p.originX + anime.random(-20, 20),
            y: (p: any) => p.originY + anime.random(-20, 20),
            easing: 'easeInOutSine',
            duration: 2000,
            direction: 'alternate',
            loop: true,
            autoplay: false
        });

        animation.play();

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.beginPath();

            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                // Draw small dot
                ctx.fillStyle = 'rgba(0, 243, 255, 0.3)';
                ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
            }
            ctx.stroke();

            requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            if (animation) animation.pause();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' }}
        />
    );
};

export default Background;
