export interface Movie {
    id: number;
    title: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    tagline?: string;
    runtime?: number;
    status?: string;
    genres?: { id: number; name: string }[];
}