"use client";

import Image from "next/image";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
    product: {
        id: number | string;
        title: string;
        category: string;
        price: number;
        oldPrice?: number;
        rating: number;
        reviews: number;
        image: string;
        discount?: string | null;
        colors: string[];
        extraColors?: number;
        actionIcon?: string;
    };
    className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {/* Image Card Container */}
            <div className="relative aspect-square bg-[#FBFBFB] border border-[#F0F0F0] rounded-[32px] p-3 flex items-center justify-center">
                {product.discount && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-primary shadow-sm border border-[#F0F0F0]">
                            {product.discount}
                        </span>
                    </div>
                )}

                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                    <button className="p-1 bg-white rounded-lg flex items-center justify-center text-[#C48B8B] hover:bg-[#FBFBFB] transition-all shadow-sm border border-[#F0F0F0]">
                        {product.actionIcon === "bag-check" ? (
                            <div className="relative">
                                <div className="w-6 h-6 bg-[#0E3E14] rounded-md flex items-center justify-center">
                                    <ShoppingBag className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        ) : (
                            <ShoppingBag className="w-6 h-6 stroke-[1.5px]" />
                        )}
                    </button>
                    <button className="p-1 bg-white rounded-lg flex items-center justify-center text-[#C48B8B] hover:bg-[#FBFBFB] transition-all shadow-sm border border-[#F0F0F0]">
                        {product.actionIcon === "bag-check" ? (
                            <Heart className="w-6 h-6 fill-[#0E3E14] text-[#0E3E14]" />
                        ) : (
                            <Heart className="w-6 h-6 stroke-[1.5px]" />
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
                        <span className="font-bold text-xs">{product.rating || "4.5"}</span>
                        <span className="text-[#A4A4A4] text-[10px]">({product.reviews || "2010"})</span>
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
                        {product.extraColors && product.extraColors > 0 && (
                            <span className="text-[11px] font-bold text-[#1A1A1A]">+{product.extraColors}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
