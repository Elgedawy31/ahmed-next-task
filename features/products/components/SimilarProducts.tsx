"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Star, Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const similarProducts = [
    {
        id: 1,
        title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free With Yello ..",
        category: "Dresses",
        price: 900,
        rating: 4.5,
        reviews: 2010,
        image: "/dress-1.svg",
        discount: null,
        colors: ["#C48B8B", "#333333", "#EEEEEE"],
        extraColors: 2
    },
    {
        id: 2,
        title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free With Yello ..",
        category: "Dresses",
        price: 900,
        oldPrice: 1300,
        rating: 4.5,
        reviews: 2010,
        image: "/dress-2.svg",
        discount: "25% OFF",
        colors: ["#C48B8B", "#333333", "#EEEEEE"],
        extraColors: 2
    },
    {
        id: 3,
        title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free With Yello ..",
        category: "Dresses",
        price: 900,
        rating: 4.5,
        reviews: 2010,
        image: "/dress-3.svg",
        actionIcon: "bag-check", // Special icon in design
        colors: ["#C48B8B", "#333333", "#EEEEEE"],
        extraColors: 2
    },
    {
        id: 4,
        title: "J.VER Women's Dress Shirts Solid Long Sleeve Stretch Wrinkle-Free With Yello ..",
        category: "Dresses",
        price: 900,
        oldPrice: 1300,
        rating: 4.5,
        reviews: 2010,
        image: "/dress-4.svg",
        discount: "25% OFF",
        colors: ["#C48B8B", "#333333", "#EEEEEE"],
        extraColors: 2
    },
    {
        id: 5,
        title: "Premium Elegant Evening Dress - New Arrival",
        category: "Dresses",
        price: 1200,
        rating: 4.8,
        reviews: 150,
        image: "/dress-5.png",
        colors: ["#1B5E20", "#333333"],
        extraColors: 1
    },
    {
        id: 6,
        title: "Modern Vibrant Tunic Shirt Dress",
        category: "Dresses",
        price: 850,
        oldPrice: 1100,
        rating: 4.2,
        reviews: 89,
        image: "/dress-6.png",
        discount: "15% OFF",
        colors: ["#2E7D32", "#1565C0"],
        extraColors: 3
    },
    {
        id: 7,
        title: "Sophisticated Boutique Wrap Dress",
        category: "Dresses",
        price: 1100,
        rating: 4.7,
        reviews: 230,
        image: "/dress-7.png",
        colors: ["#004D40", "#EEEEEE"],
        extraColors: 2
    },
];

export default function SimilarProducts() {
    return (
        <section className="w-full py-12 overflow-hidden">
            {/* Title Container - Still constrained to 1440px */}
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10 mb-10">
                <h2 className="text-2xl font-bold relative inline-block">
                    Similar Items
                    <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#C48B8B] rounded-full"></div>
                </h2>
            </div>

            {/* Slider Container - Bleeds to the right */}
            <div className="relative group/swiper pl-5 md:pl-8 lg:pl-10 2xl:pl-[calc((100vw-1440px)/2+2.5rem)]">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={12}
                    slidesPerView={4.5}
                    navigation={{
                        nextEl: ".similar-next",
                        prevEl: ".similar-prev",
                    }}
                    breakpoints={{
                        480: { slidesPerView: 5.5 },
                        768: { slidesPerView: 6.5 },
                        1024: { slidesPerView: 7.5 },
                        1280: { slidesPerView: 8.5 },
                        1536: { slidesPerView: 10.2 },
                    }}
                    className="pb-16"
                >
                    {similarProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="space-y-4">
                                {/* Image Card Container */}
                                <div className="relative aspect-square bg-[#FBFBFB] border border-[#F0F0F0] rounded-[32px] p-6 flex items-center justify-center">
                                    {product.discount && (
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#A4A4A4] shadow-sm border border-[#F0F0F0]">
                                                {product.discount}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                                        <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#C48B8B] hover:bg-[#FBFBFB] transition-all shadow-sm border border-[#F0F0F0]">
                                            {product.actionIcon === "bag-check" ? (
                                                <div className="relative">
                                                    <div className="w-6 h-6 bg-[#0E3E14] rounded-md flex items-center justify-center">
                                                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
                                            )}
                                        </button>
                                        <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#C48B8B] hover:bg-[#FBFBFB] transition-all shadow-sm border border-[#F0F0F0]">
                                            {product.actionIcon === "bag-check" ? (
                                                <Heart className="w-5 h-5 fill-[#0E3E14] text-[#0E3E14]" />
                                            ) : (
                                                <Heart className="w-5 h-5 stroke-[1.5px]" />
                                            )}
                                        </button>
                                    </div>

                                    <div className="relative w-full h-full transition-transform duration-500 hover:scale-110">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Info Section */}
                                <div className="space-y-2.5 px-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#717171] text-xs font-medium">{product.category}</span>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-[#C48B8B] text-[#C48B8B]" />
                                            <span className="font-bold text-xs">4.5</span>
                                            <span className="text-[#A4A4A4] text-[10px]">(2010)</span>
                                        </div>
                                    </div>

                                    <h3 className="font-semibold text-[13px] leading-tight text-[#1A1A1A] line-clamp-2">
                                        {product.title}
                                    </h3>

                                    <div className="flex justify-between items-end pt-1">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-[#1A1A1A]">AED {product.price}</span>
                                            {product.oldPrice && (
                                                <span className="text-[#A4A4A4] line-through text-[11px]">AED {product.oldPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="flex items-center -space-x-1.5">
                                                {product.colors.map((color, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[11px] font-bold text-[#1A1A1A]">+{product.extraColors}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="flex justify-center items-center gap-4 mt-8 2xl:mr-[calc((100vw-1440px)/2+2.5rem)] pr-5 md:pr-8 lg:pr-10">
                    <button className="similar-prev w-12 h-12 rounded-full bg-[#C48B8B] flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button className="similar-next w-12 h-12 rounded-full bg-[#C48B8B] flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
