"use client";

import { Star, MessageSquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import DecorativeLayer from "@/components/shared/DecorativeLayer";
import { Fade, Slide, AttentionSeeker } from "react-awesome-reveal";

const ratingBreakdown = [
    { stars: 5, percentage: 67 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 9 },
];

const reviews = [
    {
        name: "Alex Daewn",
        rating: 4,
        date: "4 months ago",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed"
    },
    {
        name: "Alex Daewn",
        rating: 5,
        date: "4 months ago",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed"
    },
    {
        name: "Alex Daewn",
        rating: 4,
        date: "4 months ago",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed"
    },
    {
        name: "Alex Daewn",
        rating: 5,
        date: "4 months ago",
        text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed"
    },
];

export default function ProductReviews() {
    return (
        <section className="container max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10 py-8">
            <Fade direction="up" triggerOnce>
                <div className="mb-12 max-w-[1110px]">
                    <h2 className="text-2xl font-semibold mb-2 relative inline-block">
                        Rating & Reviews
                        <div className="absolute -bottom-1 left-0 w-12 h-1 bg-primary rounded-full"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-8">
                        {/* Overall Rating */}
                        <div className="md:col-span-3 flex flex-col items-center justify-center border-r border-[#E5E5E5] last:border-0 md:border-r">
                            <div className="flex items-baseline gap-1">
                                <span className="text-[120px] font-bold leading-none">4,5</span>
                                <span className="text-2xl text-muted-foreground font-medium">/5</span>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="md:col-span-6 space-y-3 px-4">
                            {ratingBreakdown.map((item) => (
                                <Fade key={item.stars} direction="right" cascade damping={0.1} triggerOnce>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-6 h-6 fill-primary text-primary" />
                                            <span className="text-[20px] font-medium text-muted-foreground">{item.stars}</span>
                                        </div>
                                        <Progress value={item.percentage} className="h-1.5 flex-1 bg-[#F4F4F4]" />
                                        <span className="text-sm font-medium w-10">% {item.percentage}</span>
                                    </div>
                                </Fade>
                            ))}
                        </div>

                        {/* Total Reviews and Add Comment */}
                        <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center gap-4">
                            <div className="text-center md:text-right">
                                <p className="text-muted-foreground text-sm font-medium mb-1">Total Reviews</p>
                                <p className="text-[60px] font-bold leading-none">3.0K</p>
                            </div>
                            <AttentionSeeker effect="pulse" triggerOnce>
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-8 flex items-center gap-2 text-lg font-semibold w-full md:w-auto"
                                >
                                    Add Comment
                                    <MessageSquare className="w-5 h-5 fill-white/20" />
                                </Button>
                            </AttentionSeeker>
                        </div>
                    </div>
                </div>
            </Fade>

            {/* Reviews List */}
            <div className="space-y-12 max-w-[1110px] relative">
                <Fade direction="up" cascade damping={0.1} triggerOnce>
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={cn(
                                "space-y-4 pb-8",
                                index !== reviews.length - 1 && "border-b border-[#F4F4F4]"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-lg">{review.name}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={cn(
                                                    "w-5 h-5",
                                                    i < review.rating ? "fill-primary text-primary" : "text-[#E5E5E5]"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-muted-foreground text-sm">{review.date}</span>
                            </div>
                            <p className="text-foreground leading-relaxed max-w-[90%]">
                                {review.text}
                            </p>
                        </div>
                    ))}
                </Fade>
                <div className="absolute left-0 -bottom-10">
                    <DecorativeLayer className="opacity-80" />
                </div>
            </div>

            <Fade className="mt-12 flex justify-center" direction="up" triggerOnce>
                <Button
                    variant="outline"
                    className="rounded-xl cursor-pointer border-[#E5E5E5] h-12 px-8 text-primary font-bold hover:bg-primary/5 hover:text-primary transition-colors"
                >
                    View More Comments
                </Button>
            </Fade>
        </section>
    );
}

import { cn } from "@/lib/utils";
