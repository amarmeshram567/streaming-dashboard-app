'use client';

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import MovieRow from "./components/MovieRow";
import { useEffect, useState } from "react";
import { fetchPopular, fetchTopRated, fetchUpcoming } from "@/lib/tmdb";
import { Movie } from "@/types/movie";



export default function Home() {

  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularData = await fetchPopular();
        const topRatedData = await fetchTopRated();
        const upcomingData = await fetchUpcoming();

        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setUpcoming(upcomingData.results);
        setHeroMovie(popularData.results[0]);

        setHeroMovie(popularData.results[0]);


      } catch (error) {
        console.log(error)
      }
    }

    fetchData();
  }, [])

  if (!heroMovie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {/* Hero Banner - dummyMovies[0] */}

      <HeroBanner movie={heroMovie} />

      {/* Popular Movies */}
      <MovieRow movies={popular} title="Popular Movies" />
      {/* Top Rated Movies */}
      <MovieRow movies={topRated} title="Top Rated Movies" />
      {/* Upcoming Movies */}
      <MovieRow movies={upcoming} title="Upcoming Movies" />
    </>
  );
}
