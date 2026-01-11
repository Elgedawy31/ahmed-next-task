import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { cn } from "@/lib/utils";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
    label: string;
    href?: string;
}

interface ProductBreadcrumbProps {
    items: BreadcrumbItemType[];
}

export default function ProductBreadcrumb({ items }: ProductBreadcrumbProps) {
    return (
        <Fade direction="right" triggerOnce>
            <nav className="container max-w-[1440px] mx-auto px-5 md:px-8 lg:px-10 py-6 bg-[#ECECEC66] rounded-[16px]">
                <Breadcrumb>
                    <BreadcrumbList className="flex items-center gap-2">
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    {item.href ? (
                                        <BreadcrumbLink
                                            asChild
                                            className={cn(
                                                "text-base font-[500] transition-colors hover:text-muted-foreground text-foreground"
                                            )}
                                        >
                                            <Link href={item.href}>{item.label}</Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        <BreadcrumbPage className="text-base font-[500] text-muted-foreground">
                                            {item.label}
                                        </BreadcrumbPage>
                                    )}
                                </BreadcrumbItem>
                                {index < items.length - 1 && (
                                    <BreadcrumbSeparator className="text-foreground">
                                        <ChevronRight className="w-4 h-4" />
                                    </BreadcrumbSeparator>
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
        </Fade>
    );
}

