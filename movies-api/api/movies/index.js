import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {getUpcomingMovies, getGenres, getMovies, getNowPlaying, getTopRated, searchMovies, getMovieImages, getMovie, getMovieReviews, getWatchProviders, getMovieTrailers} from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));



router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    let { page = 1} = req.query;
    const movies = await getMovies(page);
    
    res.status(200).json(movies);
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    let { page = 1} = req.query;
    const upcomingMovies = await getUpcomingMovies(page);
    
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/nowPlaying', asyncHandler(async (req, res) => {
    let { page = 1} = req.query;
    const nowPlayingMovies = await getNowPlaying(page);
    
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/topRated', asyncHandler(async (req, res) => {
    let { page = 1} = req.query;
    const topRatedMovies = await getTopRated(page);
    
    res.status(200).json(topRatedMovies);
}));

router.get('/tmdb/searchMovies', asyncHandler(async (req, res) => {
    let search = req.query.search;
    const searchMovie = await searchMovies(search);
    
    res.status(200).json(searchMovie);
}));

router.get('/tmdb/movieImages/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movieImages = await getMovieImages({ queryKey: ["images", { id }] });
    res.status(200).json(movieImages);
}));

router.get('/tmdb/movie/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movieDetails = await getMovie({ queryKey: ["movie", { id }] });
    res.status(200).json(movieDetails);
}));

router.get('/tmdb/reviews', asyncHandler(async (req, res) => {
    let id = req.query.id;
    const movieReviews = await getMovieReviews(id);
    
    res.status(200).json(movieReviews);
}));

router.get('/tmdb/watchProviders', asyncHandler(async (req, res) => {
    let id = req.query.id;
    const movieProviders = await getWatchProviders(id);
    
    res.status(200).json(movieProviders);
}));

router.get('/tmdb/trailer', asyncHandler(async (req, res) => {
    let id = req.query.id;
    const movieTrailer = await getMovieTrailers(id);
    
    res.status(200).json(movieTrailer);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    
    res.status(200).json(genres);
}));

export default router;