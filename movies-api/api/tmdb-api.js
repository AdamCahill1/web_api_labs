import fetch from 'node-fetch';

export const getMovies = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};


export const getUpcomingMovies = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getNowPlaying = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getTopRated = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const searchMovies = async (query) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}&include_adult=false`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getMovieImages = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const getMovie = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getMovieReviews = (id) => {
  return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
  )
      .then((res) => res.json())
      .then((json) => {
          return json.results;
      });
};

export const getWatchProviders = (id) => {
  return fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.TMDB_KEY}`
  )
      .then((res) => res.json())
      .then((json) => {
          return json.results;
      });
};

export const getMovieTrailers = (id) => {
  return fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`
  )
      .then((res) => res.json())
      .then((json) => {
          return json.results;
      });
};

export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + process.env.TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
};