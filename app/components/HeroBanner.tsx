import { getImageUrl } from '@/lib/tmdb';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/movie';
import { Playfair } from 'next/font/google';

interface HeroBannerProps {
    movie: Movie;
}

const HeroBanner = ({ movie }: HeroBannerProps) => {
    return (
        <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden mt-5">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="relative h-[70vh] w-full">
                    <Image
                        src={getImageUrl(movie.backdrop_path, 'original')}
                        alt={movie.title}
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center text-white">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-lg">
                        {movie.title}
                    </h1>

                    <p className="text-lg md:text-xl text-foreground/90 line-clamp-3 text-shadow-lg">
                        {movie.overview}
                    </p>

                    <div className="flex items-center gap-4 pt-4 mb-5">
                        <button className="gap-2 flex justify-center items-center text-sm bg-cyan-500 hover:bg-cyan-600 duration-200 text-white py-2 px-4 rounded">
                            <Play className="w-4 h-4 fill-current" />
                            Play
                        </button>


                        <Link href={`/movie/${movie.id}`} passHref>
                            <button className="gap-2 flex justify-center items-center text-sm bg-gray-600 hover:bg-gray-700 duration-200 text-white py-2 px-4 rounded">
                                <Info className="w-4 h-4" />
                                More Info
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;

