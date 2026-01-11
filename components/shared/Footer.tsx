"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    MessageCircle, // Proxy for WhatsApp
    Send,
    Phone,
    Mail,
    MapPin
} from "lucide-react";

export default function Footer() {
    return (
        <footer
            className="w-full text-white relative overflow-hidden mt-12 bg-[#3B3026]"
            style={{
                backgroundImage: 'linear-gradient(rgba(2, 2, 2, 0.7), rgba(2, 2, 2, 0.7)), url("/footer-bg.svg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-20 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6 col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.svg" alt="Tinytales" width={100} height={40} className="brightness-0 invert" />
                        </div>
                        <p className="text-[#D1D1D1] leading-relaxed text-sm max-w-[280px]">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                        </p>
                    </div>

                    {/* Contact Us */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-white" />
                                <span className="text-[#D1D1D1] text-sm">+87 01928491</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-white" />
                                <span className="text-[#D1D1D1] text-sm">Named@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-white" />
                                <span className="text-[#D1D1D1] text-sm">381, cairo, egypt</span>
                            </li>
                        </ul>
                    </div>

                    {/* Let Us Help */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Let Us Help</h3>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-[#D1D1D1] hover:text-white transition-colors text-sm">My Account</Link></li>
                            <li><Link href="#" className="text-[#D1D1D1] hover:text-white transition-colors text-sm">FAQs</Link></li>
                            <li><Link href="#" className="text-[#D1D1D1] hover:text-white transition-colors text-sm">Contact & Support</Link></li>
                            <li><Link href="#" className="text-[#D1D1D1] hover:text-white transition-colors text-sm">Categories</Link></li>
                            <li><Link href="#" className="text-[#D1D1D1] hover:text-white transition-colors text-sm">All Products</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter and Social */}
                    <div className="space-y-8 col-span-2 lg:col-span-2">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Send Email</h3>
                            <div className="relative flex items-center bg-white rounded-2xl p-2 h-[64px]">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="bg-transparent border-none outline-none flex-1 px-4 text-black text-sm placeholder:text-[#8A8A8A]"
                                />
                                <button className="bg-primary hover:bg-primary/90 text-white px-8 h-full rounded-xl font-bold transition-colors relative  right-5">
                                    Send
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm font-bold">Follow Us</p>
                            <div className="flex gap-4">
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <Facebook className="w-5 h-5 fill-current" />
                                </Link>
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <Twitter className="w-5 h-5 fill-current" />
                                </Link>
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </Link>
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <Linkedin className="w-5 h-5 fill-current" />
                                </Link>
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <MessageCircle className="w-5 h-5 fill-current" />
                                </Link>
                                <Link href="#" className="p-2 hover:text-primary transition-colors">
                                    <Send className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
