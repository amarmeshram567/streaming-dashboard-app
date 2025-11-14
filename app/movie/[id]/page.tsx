"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play, Star, Clock } from "lucide-react";
import Header from "@/app/components/Header";
import { Movie } from "@/types/movie";
import { fetchMovieById, getImageUrl } from "@/lib/tmdb";
import Footer from "@/app/components/Footer";

export default function MovieDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const loadMovie = async () => {
            try {
                const movieData = await fetchMovieById(Number(id));
                setMovie(movieData);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="animate-spin h-8 w-8 border-4 border-primary border-r-transparent rounded-full"></span>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
                    <button className="gap-2 flex justify-center items-center text-sm bg-cyan-500 hover:bg-cyan-600 duration-200 text-white py-2 px-4 rounded" onClick={() => router.push("/")}>Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background mb-10">
            <Header />

            <main className="pt-16">
                {/* Hero Section */}
                <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                    <Image
                        src={getImageUrl(movie.backdrop_path, "original")}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-8 -mt-48 relative z-10">
                    <div className="grid md:grid-cols-[300px_1fr] gap-8">
                        {/* Poster */}
                        <div className="hidden md:block relative h-[450px] w-[300px]">
                            <Image
                                src={getImageUrl(movie.poster_path, "w500")}
                                alt={movie.title}
                                fill
                                className="rounded-lg shadow-2xl object-cover"
                            />
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">{movie.title}</h1>
                                {movie.tagline && (
                                    <p className="text-lg text-muted-foreground italic">"{movie.tagline}"</p>
                                )}
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                {movie.vote_average && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-primary text-primary" />
                                        <span className="font-semibold text-lg">{movie.vote_average.toFixed(1)}</span>
                                        <span className="text-muted-foreground">/10</span>
                                    </div>
                                )}
                                {movie.runtime && (
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{movie.runtime} min</span>
                                    </div>
                                )}
                                {movie.release_date && (
                                    <span className="text-muted-foreground">
                                        {new Date(movie.release_date).getFullYear()}
                                    </span>
                                )}
                                {movie.status && (
                                    <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                        {movie.status}
                                    </span>
                                )}
                            </div>

                            {/* Genres */}
                            {movie.genres && movie.genres.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="gap-2 flex justify-center items-center text-sm bg-cyan-500 hover:bg-cyan-600 duration-200 text-white py-2 px-4 rounded">
                                    <Play className="w-4 h-4" />
                                    Play
                                </button>
                                <Link href="/">
                                    <button className="gap-2 flex justify-center items-center text-sm border border-gray-600 hover:bg-cyan-500 duration-200 text-white py-2 px-4 rounded">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back
                                    </button>
                                </Link>
                            </div>

                            {/* Overview */}
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Overview</h2>
                                <p className="text-lg text-foreground/90 leading-relaxed">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
