"use client";

import Image from "next/image";
import { Fade, Zoom } from "react-awesome-reveal";

interface ProductsHeroProps {
    title?: string;
    outlineTitle?: string;
}

export default function ProductsHero({
    title = "Product Details",
    outlineTitle,
}: ProductsHeroProps) {
    const displayOutline = outlineTitle || title;

    return (
        <section className="relative w-full h-[200px] flex items-center justify-center overflow-hidden bg-section-gray">
            {/* Background Image */}
            <Fade triggerOnce className="absolute inset-0 z-0">
                <div className="relative w-full h-full">
                    <Image
                        src="/hero-bg.svg"
                        alt="Hero Background"
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                </div>
            </Fade>

            {/* Content Container */}
            <div className="relative z-10 h-full w-full flex items-center justify-center">
                {/* Outline Background Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <Zoom triggerOnce>
                        <h2
                            className="whitespace-nowrap text-[50px] md:text-[100px] lg:text-[120px] font-bold text-transparent leading-none"
                            style={{ WebkitTextStroke: "1px #E5E5E5" }}
                        >
                            {displayOutline}
                        </h2>
                    </Zoom>
                </div>

                {/* Main Title */}
                <div className="relative z-10">
                    <Fade direction="up" triggerOnce delay={300}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] text-center leading-tight">
                            {title}
                        </h1>
                    </Fade>
                </div>
            </div>
        </section>
    );
}
