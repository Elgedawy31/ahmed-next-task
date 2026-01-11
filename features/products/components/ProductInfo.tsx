"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, Minus, Plus } from "lucide-react";
import { Fade, Slide, AttentionSeeker } from "react-awesome-reveal";
import { cn } from "@/lib/utils";

const colors = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#BFDBFE" },
    { name: "Gold", value: "#9A8D5F" },
    { name: "Navy", value: "#6D91C2" },
    { name: "Gray", value: "#5C5C5C" },
];

export default function ProductInfo() {
    const [selectedColor, setSelectedColor] = useState(colors[1]);
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <Fade direction="right" triggerOnce>
            <div className="flex flex-col space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <Fade direction="up" triggerOnce cascade damping={0.1}>
                        <div className="space-y-4">
                            <Badge variant="outline" className="rounded-full text-primary text-sm px-4 py-1 font-normal">
                                T-Shirt
                            </Badge>
                            <h1 className="text-2xl md:text-[28px] font-[500] leading-tight text-foreground max-w-[600px]">
                                J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With Blue
                            </h1>
                        </div>
                    </Fade>
                    <div className="flex space-x-2">
                        <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                            <ShoppingBag className="w-8 h-8 text-primary cursor-pointer" />
                        </button>
                        <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                            <Heart className="w-8 h-8 text-primary cursor-pointer" />
                        </button>
                    </div>
                </div>

                {/* Price */}
                <Fade direction="up" triggerOnce>
                    <div className="space-y-1">
                        <div className="flex items-baseline space-x-3">
                            <span className="text-[20px] font-[500]">$300.00</span>
                            <span className="text-lg text-muted-foreground line-through">$360.00</span>
                        </div>
                        <p className="text-sm text-muted-foreground">This price is exclusive of taxes.</p>
                    </div>
                </Fade>

                <Fade direction="up" triggerOnce delay={100}>
                    <p className="leading-relaxed text-sm">
                        Lorem ipsum dolor sit , consectetuer adipiscing elit, sed diam nonummy
                        Lorem ipsum dolor sit amet, diam nonummy
                    </p>
                </Fade>

                <Separator className="bg-border/50" />

                {/* Options */}
                <div className="flex flex-col space-y-6">
                    <Slide direction="up" triggerOnce cascade damping={0.1}>
                        <div className="relative group">
                            <label className="absolute -top-3 left-8 z-10 bg-white px-2 text-sm font-medium text-black transition-colors group-focus-within:text-primary">
                                Type
                            </label>
                            <Select defaultValue="cotton">
                                <SelectTrigger className="md:w-1/2 w-full min-h-12 bg-background border-[#E5E5E5] rounded-lg px-8 text-base font-semibold focus:ring-primary focus:border-primary">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-[#E5E5E5]">
                                    <SelectItem value="cotton">Cotton</SelectItem>
                                    <SelectItem value="polyester">Polyester</SelectItem>
                                    <SelectItem value="silk">Silk</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="relative group">
                            <label className="absolute -top-3 left-8 z-10 bg-white px-2 text-sm font-medium text-black transition-colors group-focus-within:text-primary">
                                Size
                            </label>
                            <Select defaultValue="2xl">
                                <SelectTrigger className="md:w-1/2 w-full min-h-12 bg-background border-[#E5E5E5] rounded-lg px-8 text-base font-semibold focus:ring-primary focus:border-primary">
                                    <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-[#E5E5E5]">
                                    <SelectItem value="xl">XL</SelectItem>
                                    <SelectItem value="2xl">2XL</SelectItem>
                                    <SelectItem value="3xl">3XL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </Slide>
                </div>

                {/* Colors */}
                <Fade direction="up" triggerOnce delay={200}>
                    <div className="space-y-3">
                        <label className="text-sm font-medium">Colors</label>
                        <div className="flex flex-wrap gap-3">
                            {colors.map((color) => (
                                <div key={color.name} className="flex flex-col items-center space-y-2">
                                    <button
                                        onClick={() => setSelectedColor(color)}
                                        className={cn(
                                            "w-15 h-15 bg-[#F4F7F9] rounded-full border-[1.5px] transition-all p-3",
                                            selectedColor.name === color.name ? "border-foreground" : "border-transparent"
                                        )}
                                    >
                                        <div
                                            className="w-full h-full rounded-full border border-black/5"
                                            style={{ backgroundColor: color.value }}
                                        />
                                    </button>

                                </div>
                            ))}
                        </div>
                    </div>
                </Fade>

                {/* Quantity & Add to Cart */}
                <div className="space-y-4 pt-4">
                    <Fade direction="up" triggerOnce delay={300}>
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-semibold text-foreground">Quantity</span>
                                <span className="text-sm text-muted-foreground">($300.00 for Piece)</span>
                            </div>

                            <div className="flex  justify-between gap-4 md:flex-row flex-col">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center bg-[#F8F8F8] rounded-xl p-3 gap-4">
                                        <button
                                            onClick={decrement}
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-foreground hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="w-12 text-center font-semibold text-lg">{quantity.toString().padStart(2, '0')}</span>
                                        <button
                                            onClick={increment}
                                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-foreground hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="text-[24px] font-[500] text-foreground">
                                        ${(300 * quantity).toFixed(2)}
                                    </div>
                                </div>

                                <AttentionSeeker effect="pulse" triggerOnce delay={500} className="flex-1 max-w-[200px]">
                                    <button className="w-full h-12 bg-primary cursor-pointer hover:bg-primary/90 text-white rounded-xl flex items-center justify-center font-medium text-base transition-colors group shadow-sm">
                                        Add To Cart
                                        <ShoppingBag className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                </AttentionSeeker>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </Fade>
    );
}
