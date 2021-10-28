$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
      let searchText = $('#searchText').val();
      getMovies(searchText);
       e.preventDefault();
    });
  });


  function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output ='';
      $.each(movies, (index, movie) => {
          output +=`
              <div class="col-md-3 movie-blog">
                   <div class="well text-center">
                      <img src="${movie.Poster}">
                      <h5>${movie.Title}</h5>
                      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                   </div>
              </div>
          `;
      });
      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });


  }

  function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
  }

  function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com/?i='+ movieId +'&apikey=thewdb')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
            <div class"row">
               <div class="col-md-4">
                   <img src="${movie.Poster}" class="thumbnail"s>
               </div>
               <div class="col-md-8">
                     <h2>${movie.Title}</h1>
                     <ul class="list-group>
                         <li class="list-group-item">Genre:<strong>${movie.Genre}</Strong</li>
                         <li class="list-group-item">Released:<strong>${movie.Released}</Strong</li>
                         <li class="list-group-item">Rated:<strong>${movie.Rated}</Strong</li>
                         <li class="list-group-item">IMDB Rating:<strong>${movie.imdbRating}</Strong</li>
                         <li class="list-group-item">Director:<strong>${movie.Director}</Strong</li>
                         <li class="list-group-item">Writer:<strong>${movie.Writer}</Strong</li>
                         <li class="list-group-item">Actors:<strong>${movie.Actors}</Strong</li>
                     </ul>
               </div>
            </div>

            <div class="row">
                  <div class="row">
                      <h3>Plot:</h3>
                      ${movie.Plot}
                      <hr>
                      <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View in IMDB</a>
                      <a href="index.html" class="btn btn-primary">Go to Home</a>
                  </div>
            </div>
      `;

      $('#movie').html(output);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }