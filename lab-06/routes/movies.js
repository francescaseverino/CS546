const express = require('express');
const router = express.Router();
const data = require('../data');
const movieData = data.movies;
const { ObjectId } = require("mongodb");

router
  .route('/')
  .get(async (req, res) => {
    try{
      const movies = await movieData.getAllMovies();
      res.status(200).json(movies);
    } catch (e) {
      res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    let movieInfo = req.body;

    try{
      if(!movieInfo.title){throw "Error: Must provide a title"}
      if(!movieInfo.plot){throw "Error: Must provide a plot"}
      if(!movieInfo.genres){throw "Error: Must provide at least one genre"}
      if(!movieInfo.rating){throw "Error: Must provide a rating"}
      if(!movieInfo.studio){throw "Error: Must provide a studio"}
      if(!movieInfo.director){throw "Error: Must provide a director"}
      if(!movieInfo.castMembers){throw "Error: Must provide an array with at least one cast member"}
      if(!movieInfo.dateReleased){throw "Error: Must provide a valid date"}
      if(!movieInfo.runtime){throw "Error: Must provide a runtime"}
    
      if(typeof movieInfo.title !== 'string' || movieInfo.title.trim().length == 0){throw "Error: Title must be a valid string"}
      if(typeof movieInfo.plot !== 'string' || movieInfo.plot.trim().length == 0){throw "Error: Plot must be a valid string"}
      if(typeof movieInfo.rating !== 'string' || movieInfo.rating.trim().length == 0){throw "Error: Rating must be a valid string"}
      if(typeof movieInfo.studio !== 'string' || movieInfo.studio.trim().length == 0){throw "Error: Studio must be a valid string"}
      if(typeof movieInfo.director !== 'string' || movieInfo.director.trim().length == 0){throw "Error: Director must be a valid string"}
      if(typeof movieInfo.dateReleased !== 'string' || movieInfo.dateReleased.trim().length == 0 || movieInfo.dateReleased.length != 10){throw "Error: Date Released must be a valid date string mm/dd/yyyy"}
      if(typeof movieInfo.runtime !== 'string' || movieInfo.runtime.trim().length == 0){throw "Error: Runtime must be a valid string"}
      if(!Array.isArray(movieInfo.genres) || movieInfo.genres.length < 1){throw "Error: Genres must be an array with a length of at least 1"}
      if(!Array.isArray(movieInfo.castMembers) || movieInfo.castMembers.length < 1){throw "Error: Cast Memebers must be an array with a length of at least 1"}
    
      // title
      if(movieInfo.title.length < 2 || movieInfo.title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
      movieInfo.title = movieInfo.title.trim();
    
      // studio
      if(movieInfo.studio.length < 5 || movieInfo.studio.search(/[!@#$%^&*><}?{()_+/=:;"]/g) != -1 || movieInfo.studio.search(/[0123456789]/g) != -1){throw "Error: Studio must be at least 5 characters with no numbers and special characters"}
      movieInfo.studio = movieInfo.studio.trim();
    
      // director
      movieInfo.director = movieInfo.director.trim();
      let directorArray = movieInfo.director.split(" ");
      if (directorArray.length != 2) {throw "Error: Director's name must only include a First and Last name"}
      for(let x = 0; x < directorArray.length; x++){
        if(directorArray[x].length < 3 || directorArray[x].search(/[0123456789]/g) != -1 || directorArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Directer's first and last name must be at least 3 characters long with no punctation and numbers"}
        directorArray[x] = directorArray[x].trim();
      }
    
      movieInfo.director = directorArray.join(' ');
    
      // ratings
      movieInfo.rating = movieInfo.rating.trim();
      if(!movieInfo.rating.includes("G")){
        if(!movieInfo.rating.includes("PG")){
          if(!movieInfo.rating.includes("PG-13")){
            if(!movieInfo.rating.includes("R")){
              if(!movieInfo.rating.includes("NC-17")){
                throw "Error: Rating must be a valid rating";
              }
            }
          }
        }
      }
    
      //genres
      for(let x = 0; x < movieInfo.genres.length; x++){
        if(movieInfo.genres[x].trim().length == 0 || typeof movieInfo.genres[x] !== 'string'){throw "Error: Each genre must be a valid string"}
        if(movieInfo.genres[x].length < 3 || movieInfo.genres[x].search(/[0123456789]/g) != -1 || movieInfo.genres[x].search(/[~`!@#$/%^&*-<}?{()_+\-=:;,.'"]/g) != -1){throw "Error: Each genre must be at least 3 characters and contain only letters"}
        movieInfo.genres[x] = movieInfo.genres[x].trim();
      }
    
      // cast members
      for(let x = 0; x < movieInfo.castMembers.length; x++){
        let castMem = movieInfo.castMembers[x];
        if(castMem.trim().length === 0){throw "Error: Cast Members must have a First and Last name"}
        castMem = castMem.trim();
        
        let castMemFL = castMem.split(" ");
    
        if(castMemFL.length < 2){throw "Error: Cast Members must have a First and Last name"}
    
        for(let i = 0; i < castMemFL.length; i++){
          if(typeof castMemFL[i] !== 'string'){throw "Error: Each name must be a valid string"}
          if(castMemFL[i].length < 3 || castMemFL[i].search(/[0123456789]/g) != -1 || castMemFL[i].search(/[~`!@#$%^&*><}?{()_/+\-=:;,."]/g) != -1){throw "Error: Each name must be at least 3 characters and contain only letters"}
          castMemFL[i] = castMemFL[i].trim();
        }
        movieInfo.castMembers[x] = castMemFL.join(' ');
      }
    
      // dateReleased
      movieInfo.dateReleased = movieInfo.dateReleased.trim();
      let dateArray = movieInfo.dateReleased.split('/');
      if(dateArray.length != 3){throw "Error: Date format is mm/dd/yyyy"}
      
      let month = parseInt(dateArray[0]);
      let day = parseInt(dateArray[1]);
      let year = parseInt(dateArray[2]);
    
      if(isNaN(month) || isNaN(day) || isNaN(year)){throw "Error: Date format is mm/dd/yyyy"}
    
      if(month > 12 || month < 1){throw "Error: Invalid Month"}
    
      if(
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ){
        if(day > 31 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      if(
        month == 4 ||
        month == 6 ||
        month == 9 ||
        month == 11
      ){
        if(day > 30 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      if(month == 2){
        if(day > 28 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      const currentYear = new Date('December 31, 2022');
      if(year < 1900 || year > currentYear + 2){throw "Error: Invalid Year"}
    
      //runtime
      movieInfo.runtime = movieInfo.runtime.trim();
      let runArray = movieInfo.runtime.split(' ');
      if(runArray.length != 2){throw "Error: Vaild format is #h #min"}
    
      let hour = runArray[0];
      let min = runArray[1];
    
      if(hour.search("h") == -1 || min.search("min") == -1){throw "Error: Vaild format is #h #min"}
    
      hour.replace('h', '');
      min.replace('min', '');
    
      if(hour.search(/[.]/g) != -1 || min.search(/[.]/g) != -1){throw "Error: Must be a positive whole number"}
    
      hour = parseInt(hour);
      min = parseInt(min);
    
      if(isNaN(hour) || isNaN(min)){throw "Error: Vaild format is #h #min"}
      if(hour < 0 || min < 0){throw "Error: Must be a positive whole"}
      if(hour == 0 && min == 0){throw "Error: Can't have a zero runtime"}
      if(min == 60){throw "Error: Can't have a runtime with minutes 60. Must be in the format for an hour."}
      if(hour == 0 && min > 0){throw "Error: Must be at least an hour runtime"}
    
      movieInfo.runtime = `${hour}h ${min}min`;

    } catch (e) {
      return res.status(400).json(e);
    }

    try {
      const newMovie = await movieData.createMovie(
        movieInfo.title,
        movieInfo.plot,
        movieInfo.genres,
        movieInfo.rating,
        movieInfo.studio,
        movieInfo.director,
        movieInfo.castMembers,
        movieInfo.dateReleased,
        movieInfo.runtime,
      );
      res.status(200).json(newMovie);
    } catch (e) {
      res.status(500).json(e);
    }

  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    try{

      if(!req.params.movieId){throw "Error: Must provide a vaild id"}
      if(typeof req.params.movieId !== 'string'){throw "Error: Must provide a type string id"}
      if(req.params.movieId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
      req.params.movieId = req.params.movieId.trim();
      if(!ObjectId.isValid(req.params.movieId)){throw "Error: Invalid object id"}
    } catch (e) {
      return res.status(400).json(e);
    }

    try{
      let movie = await movieData.getMovieById(req.params.movieId);
      res.status(200).json(movie);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .delete(async (req, res) => {
    
    try{
      if(!req.params.movieId){throw "Error: Must provide a vaild id"}
      if(typeof req.params.movieId !== 'string'){throw "Error: Must provide a type string id"}
      if(req.params.movieId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
      req.params.movieId = req.params.movieId.trim();
      if(!ObjectId.isValid(req.params.movieId)){throw "Error: Invalid object id"}

    } catch (e) {
      return res.status(400).json(e);
    }

    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json(e);
    }

    try {
      await movieData.removeMovie(req.params.movieId);
      res.status(200).json({movieId: req.params.movieId, deleted: true});
    } catch (e) {
      res.status(500).json(e);
    }

  })
  .put(async (req, res) => {
    let movieInfo = req.body;

    try{
      if(!req.params.movieId){throw "Error: Must provide a vaild id"}
      if(typeof req.params.movieId !== 'string'){throw "Error: Must provide a type string id"}
      if(req.params.movieId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
      req.params.movieId = req.params.movieId.trim();
      if(!ObjectId.isValid(req.params.movieId)){throw "Error: Invalid object id"}

      if(!movieInfo.title){throw "Error: Must provide a title"}
      if(!movieInfo.plot){throw "Error: Must provide a plot"}
      if(!movieInfo.genres){throw "Error: Must provide at least one genre"}
      if(!movieInfo.rating){throw "Error: Must provide a rating"}
      if(!movieInfo.studio){throw "Error: Must provide a studio"}
      if(!movieInfo.director){throw "Error: Must provide a director"}
      if(!movieInfo.castMembers){throw "Error: Must provide an array with at least one cast member"}
      if(!movieInfo.dateReleased){throw "Error: Must provide a valid date"}
      if(!movieInfo.runtime){throw "Error: Must provide a runtime"}
    
      if(typeof movieInfo.title !== 'string' || movieInfo.title.trim().length == 0){throw "Error: Title must be a valid string"}
      if(typeof movieInfo.plot !== 'string' || movieInfo.plot.trim().length == 0){throw "Error: Plot must be a valid string"}
      if(typeof movieInfo.rating !== 'string' || movieInfo.rating.trim().length == 0){throw "Error: Rating must be a valid string"}
      if(typeof movieInfo.studio !== 'string' || movieInfo.studio.trim().length == 0){throw "Error: Studio must be a valid string"}
      if(typeof movieInfo.director !== 'string' || movieInfo.director.trim().length == 0){throw "Error: Director must be a valid string"}
      if(typeof movieInfo.dateReleased !== 'string' || movieInfo.dateReleased.trim().length == 0 || movieInfo.dateReleased.length != 10){throw "Error: Date Released must be a valid date string mm/dd/yyyy"}
      if(typeof movieInfo.runtime !== 'string' || movieInfo.runtime.trim().length == 0){throw "Error: Runtime must be a valid string"}
      if(!Array.isArray(movieInfo.genres) || movieInfo.genres.length < 1){throw "Error: Genres must be an array with a length of at least 1"}
      if(!Array.isArray(movieInfo.castMembers) || movieInfo.castMembers.length < 1){throw "Error: Cast Memebers must be an array with a length of at least 1"}
    
      // title
      if(movieInfo.title.length < 2 || movieInfo.title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
      movieInfo.title = movieInfo.title.trim();
    
      // studio
      if(movieInfo.studio.length < 5 || movieInfo.studio.search(/[!@#$%^&*><}?{()_+/=:;"]/g) != -1 || movieInfo.studio.search(/[0123456789]/g) != -1){throw "Error: Studio must be at least 5 characters with no numbers and special characters"}
      movieInfo.studio = movieInfo.studio.trim();
    
      // director
      movieInfo.director = movieInfo.director.trim();
      let directorArray = movieInfo.director.split(" ");
      if (directorArray.length != 2) {throw "Error: Director's name must only include a First and Last name"}
      for(let x = 0; x < directorArray.length; x++){
        if(directorArray[x].length < 3 || directorArray[x].search(/[0123456789]/g) != -1 || directorArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Directer's first and last name must be at least 3 characters long with no punctation and numbers"}
        directorArray[x] = directorArray[x].trim();
      }
    
      movieInfo.director = directorArray.join(' ');
    
      // ratings
      movieInfo.rating = movieInfo.rating.trim();
      if(!movieInfo.rating.includes("G")){
        if(!movieInfo.rating.includes("PG")){
          if(!movieInfo.rating.includes("PG-13")){
            if(!movieInfo.rating.includes("R")){
              if(!movieInfo.rating.includes("NC-17")){
                throw "Error: Rating must be a valid rating";
              }
            }
          }
        }
      }
    
      //genres
      for(let x = 0; x < movieInfo.genres.length; x++){
        if(movieInfo.genres[x].trim().length == 0 || typeof movieInfo.genres[x] !== 'string'){throw "Error: Each genre must be a valid string"}
        if(movieInfo.genres[x].length < 3 || movieInfo.genres[x].search(/[0123456789]/g) != -1 || movieInfo.genres[x].search(/[~`!@#$/%^&*-<}?{()_+\-=:;,.'"]/g) != -1){throw "Error: Each genre must be at least 3 characters and contain only letters"}
        movieInfo.genres[x] = movieInfo.genres[x].trim();
      }
    
      // cast members
      for(let x = 0; x < movieInfo.castMembers.length; x++){
        let castMem = movieInfo.castMembers[x];
        if(castMem.trim().length === 0){throw "Error: Cast Members must have a First and Last name"}
        castMem = castMem.trim();
        
        let castMemFL = castMem.split(" ");
    
        if(castMemFL.length < 2){throw "Error: Cast Members must have a First and Last name"}
    
        for(let i = 0; i < castMemFL.length; i++){
          if(typeof castMemFL[i] !== 'string'){throw "Error: Each name must be a valid string"}
          if(castMemFL[i].length < 3 || castMemFL[i].search(/[0123456789]/g) != -1 || castMemFL[i].search(/[~`!@#$%^&*><}?{()_/+\-=:;,."]/g) != -1){throw "Error: Each name must be at least 3 characters and contain only letters"}
          castMemFL[i] = castMemFL[i].trim();
        }
        movieInfo.castMembers[x] = castMemFL.join(' ');
      }
    
      // dateReleased
      movieInfo.dateReleased = movieInfo.dateReleased.trim();
      let dateArray = movieInfo.dateReleased.split('/');
      if(dateArray.length != 3){throw "Error: Date format is mm/dd/yyyy"}
      
      let month = parseInt(dateArray[0]);
      let day = parseInt(dateArray[1]);
      let year = parseInt(dateArray[2]);
    
      if(isNaN(month) || isNaN(day) || isNaN(year)){throw "Error: Date format is mm/dd/yyyy"}
    
      if(month > 12 || month < 1){throw "Error: Invalid Month"}
    
      if(
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ){
        if(day > 31 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      if(
        month == 4 ||
        month == 6 ||
        month == 9 ||
        month == 11
      ){
        if(day > 30 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      if(month == 2){
        if(day > 28 || day < 1){throw "Error: Invalid Date with a given month"}
      }
    
      const currentYear = new Date('December 31, 2022');
      if(year < 1900 || year > currentYear + 2){throw "Error: Invalid Year"}
    
      //runtime
      movieInfo.runtime = movieInfo.runtime.trim();
      let runArray = movieInfo.runtime.split(' ');
      if(runArray.length != 2){throw "Error: Vaild format is #h #min"}
    
      let hour = runArray[0];
      let min = runArray[1];
    
      if(hour.search("h") == -1 || min.search("min") == -1){throw "Error: Vaild format is #h #min"}
    
      hour.replace('h', '');
      min.replace('min', '');
    
      if(hour.search(/[.]/g) != -1 || min.search(/[.]/g) != -1){throw "Error: Must be a positive whole number"}
    
      hour = parseInt(hour);
      min = parseInt(min);
    
      if(isNaN(hour) || isNaN(min)){throw "Error: Vaild format is #h #min"}
      if(hour < 0 || min < 0){throw "Error: Must be a positive whole"}
      if(hour == 0 && min == 0){throw "Error: Can't have a zero runtime"}
      if(min == 60){throw "Error: Can't have a runtime with minutes 60. Must be in the format for an hour."}
      if(hour == 0 && min > 0){throw "Error: Must be at least an hour runtime"}
    
      movieInfo.runtime = `${hour}h ${min}min`;

    } catch (e) {
      return res.status(400).json(e);
    }

    try {
      await movieData.getMovieById(req.params.movieId);
    } catch (e) {
      return res.status(404).json(e);
    }

    try {
      const movie = await movieData.updateMovie(
        req.params.movieId.toString(),
        movieInfo.title,
        movieInfo.plot,
        movieInfo.genres,
        movieInfo.rating,
        movieInfo.studio,
        movieInfo.director,
        movieInfo.castMembers,
        movieInfo.dateReleased,
        movieInfo.runtime
      )
      res.status(200).json(movie);
    } catch (e) {
      res.status(500).json(e);
    }

  });
module.exports = router;