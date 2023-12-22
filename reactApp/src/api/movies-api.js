export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=e36b47b5616245acf4e9ff565c5d4c75&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };