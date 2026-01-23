'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface SquareRevealProps {
    children: React.ReactNode;
    gridSize?: number;
}

export default function SquareReveal({ children, gridSize = 10 }: SquareRevealProps) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });
    const [mounted, setMounted] = useState(false);
    const [shuffledSquares, setShuffledSquares] = useState<number[]>([]);

    useEffect(() => {
        const squares = Array.from({ length: gridSize * gridSize }, (_, i) => i);
        setShuffledSquares([...squares].sort(() => Math.random() - 0.5));
        setMounted(true);
    }, [gridSize]);

    if (!mounted) {
        return (
            <div ref={containerRef} className="relative w-full h-full overflow-hidden">
                <div>{children}</div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {children}
            </motion.div>

            {/* Grid Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-20 grid"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`
                }}
            >
                {shuffledSquares.map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 1 }}
                        animate={isInView ? { opacity: 0 } : { opacity: 1 }}
                        transition={{
                            duration: 0.4,
                            delay: (i / (gridSize * gridSize)) * 1.5,
                            ease: "easeInOut"
                        }}
                        className="bg-black border-[0.5px] border-white/5"
                    />
                ))}
            </div>
        </div>
    );
}
