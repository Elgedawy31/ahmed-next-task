"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Heart,
  ChevronDown,
  UserRound,
  Home,
  HelpCircle,
  Info,
  Grid2X2,
  Handbag,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Fade } from "react-awesome-reveal";
import React, { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/categories", label: "Our Category", icon: Grid2X2 },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact Us", icon: Mail },
  { href: "/faqs", label: "FAQs", icon: HelpCircle },
];

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 flex justify-between max-w-[1440px] mx-auto w-full items-center px-5 md:px-8 lg:px-10 py-5 text-sm backdrop-blur-md bg-white/80",
          className
        )}
      >
        {/* Left: logo & Desktop Nav */}
        <div className="flex items-center gap-12">
          <Fade triggerOnce direction="down">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={50}
                height={32}
                className="h-10 md:h-13 w-auto"
                priority
              />
            </Link>
          </Fade>

          <nav className="hidden lg:flex items-center gap-6">
            <Fade triggerOnce direction="down" cascade damping={0.1}>
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 text-[14px] font-medium text-[#8A8A8A] transition-colors hover:text-primary"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{label}</span>
                </Link>
              ))}
            </Fade>
          </nav>
        </div>

        {/* Right: actions & Mobile Toggle */}
        <div className="flex items-center gap-1 md:gap-3">
          <div className="hidden sm:flex items-center gap-3 md:gap-3">
            <Fade triggerOnce direction="down" cascade damping={0.05} delay={200}>
              <Button
                type="button"
                variant="ghost"
                className="text-black hover:bg-primary/10 hover:text-primary rounded-xl"
              >
                <Handbag className="h-6 w-6" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-black hover:bg-primary/10 hover:text-primary rounded-xl"
              >
                <Bell className="h-6 w-6" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-black hover:bg-primary/10 hover:text-primary rounded-xl"
              >
                <Heart className="h-6 w-6" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="items-center text-black gap-1 rounded-full px-4 font-medium hover:bg-primary/10 hover:text-primary transition-all"
              >
                <span>EN</span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="flex h-10 px-4 text-black items-center justify-center rounded-full hover:bg-primary/10 transition-all font-medium"
              >
                <UserRound className="h-6 w-6 mr-1.5" />
                <ChevronDown className="h-3 w-3" />
              </Button>
            </Fade>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            className="lg:hidden text-black h-10 w-10 rounded-xl hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden pt-24 px-6",
          isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        <nav className="flex flex-col gap-6">
          {navLinks.map(({ href, label, icon: Icon }, idx) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "flex items-center gap-4 text-xl font-semibold text-[#1A1A1A] py-3 border-b border-gray-100 transition-all active:scale-95",
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              )}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className=" rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {Icon && <Icon className="h-6 w-6" />}
              </div>
              {label}
            </Link>
          ))}

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button variant="outline" className="h-12 rounded-xl text-black font-semibold">
              EN / AR
            </Button>
            <Button className="h-12 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2">
              <UserRound className="h-6 w-6" />
              Account
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
