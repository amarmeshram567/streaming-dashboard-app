import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";


interface MovieRowProps {
    title: string;
    movies: Movie[];
}


const MovieRow = ({ title, movies }: MovieRowProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            const newScrollPosition =
                scrollContainerRef.current.scrollLeft + (direction === "right" ? scrollAmount : -scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="space-y-4 relative group/row mb-5">
            <h2 className="text-xl md:text-2xl font-bold px-4 md:px-8">{title}</h2>

            <div className="relative px-4 md:px-8">
                {/* Left scroll button */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:block"
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Movie cards container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth-x pb-4"
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Right scroll button */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:block"
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default MovieRow;
