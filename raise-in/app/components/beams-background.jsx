"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function BeamsBackground({ className, intensity = "medium", children }) {
    // Lightweight SVG-based background to replace expensive canvas
    // No window/navigator access here to avoid hydration mismatches
    const svgOpacity = intensity === "subtle" ? 0.12 : intensity === "strong" ? 0.22 : 0.16;

    return (
        <div className={cn("relative min-h-screen w-full overflow-hidden bg-transparent", className)}>
            <div className="fixed inset-0 -z-20 bg-neutral-950" />

            <svg
                className="fixed inset-0 -z-10 w-full h-full"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0f172a" stopOpacity="0" />
                        <stop offset="40%" stopColor="#0ea5e9" stopOpacity={svgOpacity} />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="g2" x1="1" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                        <stop offset="50%" stopColor="#60a5fa" stopOpacity={svgOpacity * 0.8} />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#g1)" />
                <rect
                    width="140%"
                    height="60%"
                    x="-20%"
                    y="20%"
                    transform="rotate(-18 50 50)"
                    fill="url(#g2)"
                    opacity={svgOpacity}
                />
                <rect
                    width="120%"
                    height="50%"
                    x="-10%"
                    y="50%"
                    transform="rotate(-30 50 50)"
                    fill="#0ea5e9"
                    opacity={svgOpacity * 0.5}
                />
            </svg>

            <div className="fixed inset-0 -z-10 bg-neutral-950/5" style={{ opacity: 0.06 }} />

            <div className="relative z-10 flex h-screen w-full items-center justify-center">
                {children ? (
                    children
                ) : (
                    <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
                        <motion.h1
                            className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}>
                            Beams
                            <br />
                            Background
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}>
                            For your pleasure
                        </motion.p>
                    </div>
                )}
            </div>
        </div>
    );
}
