import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Movie } from "@/types/movie";
import { getImageUrl } from "@/lib/tmdb";


interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    return (
        <Link href={`/movie/${movie.id}`} className="group block flex-shrink-0">
            <div className="relative w-40 md:w-48 lg:w-56 rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-primary">
                <Image
                    src={getImageUrl(movie.poster_path, "w500")}
                    alt={movie.title}
                    width={224}
                    height={336}
                    className="w-full h-60 md:h-72 lg:h-80 object-cover"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                        <h3 className="font-semibold text-sm line-clamp-2 text-shadow-lg">
                            {movie.title}
                        </h3>
                        {movie.vote_average && (
                            <div className="flex items-center gap-1 text-xs">
                                <Star className="w-3 h-3 fill-primary text-primary" />
                                <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;

