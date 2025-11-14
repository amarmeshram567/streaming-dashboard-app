'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Film, Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { searchMovies, getImageUrl } from "@/lib/tmdb";
import { Movie } from "@/types/movie";


export default function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSearchOpen(false);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    const handleSearch = async (value: string) => {
        setQuery(value);
        if (value.trim().length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const data = await searchMovies(value);
        setResults(data);
        setIsSearching(false);
    };

    const openMovie = (id: number) => {
        router.push(`/movie/${id}`);
        setSearchOpen(false);
        setQuery("");
        setResults([]);
    };

    return (
        <>
            {/* HEADER */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm px-4 py-4 md:px-8 shadow-sm">
                <div className="flex items-center justify-between max-w-7xl mx-auto text-white">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Film className="w-8 h-8 text-primary group-hover:scale-110 transition" />
                        <span className="text-2xl font-bold tracking-tight">STREAMR</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="hover:text-primary">Home</Link>
                        <Link href="/" className="hover:text-primary">Movies</Link>
                        <Link href="/" className="hover:text-primary">TV Shows</Link>
                        <button onClick={() => setSearchOpen(true)}>
                            <Search className="w-6 h-6" />
                        </button>
                    </nav>

                    {/* Mobile Nav */}
                    <div className="md:hidden flex items-center gap-2">
                        <button className="hover:bg-accent rounded-lg p-2" onClick={() => setSearchOpen(true)}>
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="hover:bg-accent rounded-lg p-2" onClick={() => setSidebarOpen(true)}>
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* SIDEBAR BACKDROP */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
            )}

            {/* SIDEBAR */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-neutral-900 text-white z-50 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 p-6`}>
                <button className="absolute top-5 right-5" onClick={() => setSidebarOpen(false)}>
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-xl font-bold mb-8">Menu</h2>

                <nav className="flex flex-col text-sm gap-5">
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Home</Link>
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="hover:text-primary">Movies</Link>
                    <Link href="/" onClick={() => setSidebarOpen(false)} className="hover:text-primary">TV Shows</Link>
                    <button onClick={() => { setSidebarOpen(false); setSearchOpen(true); }} className="flex items-center gap-2 hover:text-primary">
                        <Search className="w-4 h-4" /> Search
                    </button>
                </nav>
            </div>

            {/* SEARCH MODAL */}
            {searchOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setSearchOpen(false)}>
                    <div className="bg-background w-full max-w-3xl max-h-[80vh] p-6 rounded-xl shadow-lg overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <Search className="w-5 h-5" /> Search Movies
                            </h2>
                            <button className="text-muted-foreground" onClick={() => setSearchOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search for movies..."
                                autoFocus
                                className="w-full h-11 rounded-md border border-border bg-background px-10 focus:ring-2 focus:ring-primary"
                            />
                            {query && (
                                <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => { setQuery(""); setResults([]); }}>
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            )}
                        </div>

                        {/* Results */}
                        <div className="mt-4 flex-1 overflow-y-auto">
                            {isSearching ? (
                                <p className="text-center py-6 text-muted-foreground">Searching...</p>
                            ) : results.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {results.map(movie => (
                                        <button key={movie.id} onClick={() => openMovie(movie.id)} className="group text-left">
                                            <div className="relative aspect-[2/3] bg-muted rounded-lg overflow-hidden mb-2">
                                                <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition" />
                                            </div>
                                            <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary">{movie.title}</h3>
                                            <p className="text-xs text-muted-foreground">{movie.release_date?.split("-")[0]}</p>
                                        </button>
                                    ))}
                                </div>
                            ) : query.length >= 2 ? (
                                <p className="text-center py-6 text-muted-foreground">No results found</p>
                            ) : (
                                <p className="text-center py-6 text-muted-foreground">Type at least 2 characters</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
