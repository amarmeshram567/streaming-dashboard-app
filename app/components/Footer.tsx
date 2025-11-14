"use client";

import Link from "next/link";
import { Film, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-white">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Film className="w-6 h-6 text-primary" />
                            <span className="font-bold text-lg">STREAMR</span>
                        </div>
                        <p className="text-muted-foreground text-sm max-w-xs">
                            Watch your favorite movies and TV shows. Stream anytime, anywhere.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="text-sm text-muted-foreground hover:text-primary">Home</Link>
                        <Link href="/movies" className="text-sm text-muted-foreground hover:text-primary">Movies</Link>
                        <Link href="/tv-shows" className="text-sm text-muted-foreground hover:text-primary">TV Shows</Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col gap-2">
                        <h4 className="font-semibold">Follow Us</h4>
                        <div className="flex gap-4 mt-1">
                            <a href="#" className="hover:text-primary"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-primary"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 border-t border-border pt-6 text-center text-muted-foreground text-sm">
                    &copy; {new Date().getFullYear()} STREAMR. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
