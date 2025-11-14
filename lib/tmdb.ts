const BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!API_KEY) {
    throw new Error("API key is not defined");
}


export async function fetchPopular() {
    const res = await fetch(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error("Failed to fetch popular movies");
    return res.json();
}

export async function fetchTopRated() {
    const res = await fetch(`${BASE}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error("Failed to fetch top rated movies");
    return res.json();
}

export async function fetchUpcoming() {
    const res = await fetch(`${BASE}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
    if (!res.ok) throw new Error("Failed to fetch upcoming movies");
    return res.json();
}

export async function fetchMovieById(id: string) {
    const res = await fetch(`${BASE}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch movie');
    return res.json();
}

export const getImageUrl = (path: string | null, size: string = 'w500') => {
    if (!path) return '/placeholder.png'; // fallback image
    return `https://image.tmdb.org/t/p/${size}${path}`;
};


export async function searchMovies(query: string) {
    if (!query || query.trim().length < 2) return [];

    const res = await fetch(`${BASE}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
        console.error("Search API error:", res.status);
        return [];
    }

    const data = await res.json();
    return data.results || [];
}


