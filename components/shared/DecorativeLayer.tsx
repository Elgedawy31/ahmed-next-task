import Image from "next/image";
import { cn } from "@/lib/utils";

interface DecorativeLayerProps {
    className?: string;
}

export default function DecorativeLayer({ className }: DecorativeLayerProps) {
    return (
        <div className={cn("relative w-[98px] h-[58px]", className)}>
            <Image
                src="/Layer.svg"
                alt="Decorative Layer"
                fill
                className="object-contain"
            />
        </div>
    );
}
