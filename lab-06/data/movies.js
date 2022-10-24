const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require("mongodb");

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if(!title){throw "Error: Must provide a title"}
  if(!plot){throw "Error: Must provide a plot"}
  if(!genres){throw "Error: Must provide at least one genre"}
  if(!rating){throw "Error: Must provide a rating"}
  if(!studio){throw "Error: Must provide a studio"}
  if(!director){throw "Error: Must provide a director"}
  if(!castMembers){throw "Error: Must provide an array with at least one cast member"}
  if(!dateReleased){throw "Error: Must provide a valid date"}
  if(!runtime){throw "Error: Must provide a runtime"}

  if(typeof title !== 'string' || title.trim().length == 0){throw "Error: Title must be a valid string"}
  if(typeof plot !== 'string' || plot.trim().length == 0){throw "Error: Plot must be a valid string"}
  if(typeof rating !== 'string' || rating.trim().length == 0){throw "Error: Rating must be a valid string"}
  if(typeof studio !== 'string' || studio.trim().length == 0){throw "Error: Studio must be a valid string"}
  if(typeof director !== 'string' || director.trim().length == 0){throw "Error: Director must be a valid string"}
  if(typeof dateReleased !== 'string' || dateReleased.trim().length == 0 || dateReleased.length != 10){throw "Error: Date Released must be a valid date string mm/dd/yyyy"}
  if(typeof runtime !== 'string' || runtime.trim().length == 0){throw "Error: Runtime must be a valid string"}
  if(!Array.isArray(genres) || genres.length < 1){throw "Error: Genres must be an array with a length of at least 1"}
  if(!Array.isArray(castMembers) || castMembers.length < 1){throw "Error: Cast Memebers must be an array with a length of at least 1"}

  // title
  if(title.length < 2 || title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
   title = title.trim();

  // studio
  if(studio.length < 5 || studio.search(/[!@#$%^&*><}?{()_+/=:;"]/g) != -1 || studio.search(/[0123456789]/g) != -1){throw "Error: Studio must be at least 5 characters with no numbers and special characters"}
  studio = studio.trim();

  // director
  director = director.trim();
  let directorArray = director.split(" ");
  if (directorArray.length != 2) {throw "Error: Director's name must only include a First and Last name"}
  for(let x = 0; x < directorArray.length; x++){
    if(directorArray[x].length < 3 || directorArray[x].search(/[0123456789]/g) != -1 || directorArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Directer's first and last name must be at least 3 characters long with no punctation and numbers"}
    directorArray[x] = directorArray[x].trim();
  }

  director = directorArray.join(' ');

  // ratings
  rating = rating.trim();
  if(!rating.includes("G")){
    if(!rating.includes("PG")){
      if(!rating.includes("PG-13")){
        if(!rating.includes("R")){
          if(!rating.includes("NC-17")){
            throw "Error: Rating must be a valid rating";
          }
        }
      }
    }
  }

  //genres
  for(let x = 0; x < genres.length; x++){
    if(genres[x].trim().length == 0 || typeof genres[x] !== 'string'){throw "Error: Each genre must be a valid string"}
    if(genres[x].length < 3 || genres[x].search(/[0123456789]/g) != -1 || genres[x].search(/[~`!@#$/%^&*-<}?{()_+\-=:;,.'"]/g) != -1){throw "Error: Each genre must be at least 3 characters and contain only letters"}
    genres[x] = genres[x].trim();
  }

  // cast members
  for(let x = 0; x < castMembers.length; x++){
    let castMem = castMembers[x];
    if(castMem.trim().length === 0){throw "Error: Cast Members must have a First and Last name"}
    castMem = castMem.trim();
    
    let castMemFL = castMem.split(" ");

    if(castMemFL.length < 2){throw "Error: Cast Members must have a First and Last name"}

    for(let i = 0; i < castMemFL.length; i++){
      if(typeof castMemFL[i] !== 'string'){throw "Error: Each name must be a valid string"}
      if(castMemFL[i].length < 3 || castMemFL[i].search(/[0123456789]/g) != -1 || castMemFL[i].search(/[~`!@#$%^&*><}?{()_/+\-=:;,."]/g) != -1){throw "Error: Each name must be at least 3 characters and contain only letters"}
      castMemFL[i] = castMemFL[i].trim();
    }
    castMembers[x] = castMemFL.join(' ');
  }

  // dateReleased
  dateReleased = dateReleased.trim();
  let dateArray = dateReleased.split('/');
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
  runtime = runtime.trim();
  let runArray = runtime.split(' ');
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

  runtime = `${hour}h ${min}min`;

  // mongodb
  const moviecollection = await movies();

  let newMovie = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    reviews: [],
    overallRating: 0
  };

  const insertInfo = await moviecollection.insertOne(newMovie);

  if(insertInfo.insertedCount === 0 || !insertInfo.acknowledged){throw "Error: Could not add movie"}

  const movieid = insertInfo.insertedId.toString();
  return await getMovieById(movieid);
};

const getAllMovies = async () => {
  const moviecollection = await movies();
  const movieList = await moviecollection.find({}, {projection:{_id:1, title:1}}).toArray();
  if(!movieList){throw "Error: Could not get all the movies"}
  // for(let x = 0; x < movieList.length; x++){
  //   movieList[x] = await getMovieById(movieList[x]._id.toString());
  // }
  return movieList;
};

const getMovieById = async (movieId) => {
  if(!movieId){throw "Error: Must provide a vaild id"}
  if(typeof movieId !== 'string'){throw "Error: Must provide a type string id"}
  if(movieId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)){throw "Error: Invalid object id"}

  const moviecollection = await movies();
  const movie = await moviecollection.findOne({_id: ObjectId(movieId)});
  if(!movie){throw "Error: No movie with that id"}
  movie._id = movie._id.toString();

  movie.reviews.forEach((obj)=>{
    obj._id = obj._id.toString();
  });

  return movie;
};

const removeMovie = async (movieId) => {
  if(!movieId){throw "Error: Must provide a vaild id"}
  if(typeof movieId !== 'string'){throw "Error: Must provide a type string id"}
  if(movieId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)){throw "Error: Invalid object id"}

  const moviecollection = await movies();
  const movie = await getMovieById(movieId);
  let name = movie['title'];

  const deleteInfo = await moviecollection.deleteOne({ _id: ObjectId(movieId) });
  if(deleteInfo.deletedCount === 0){throw "Error: Could not delete movie"}

  return `${name} has been successfully deleted!`
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  if(!movieId){throw "Error: Must provide an Id"}
  if(!title){throw "Error: Must provide a title"}
  if(!plot){throw "Error: must provide a plot"}
  if(!genres){throw "Error: Must provide at least one Genre"}
  if(!rating){throw "Error: Must provide a rating"}
  if(!studio){throw "Error: Must provide a studio"}
  if(!director){throw "Error: Must provide a director"}
  if(!castMembers){throw "Error: Must provide an array with at least one cast member"}
  if(!dateReleased){throw "Error: Must provide a valid date"}
  if(!runtime){throw "Error: Must provide a runtime"}

  if(typeof movieId !== 'string' || movieId.trim().length === 0){throw "Error: Must provide a valid id"}
  if(typeof title !== 'string' || title.trim().length == 0){throw "Error: Title must be a valid string"}
  if(typeof plot !== 'string' || plot.trim().length == 0){throw "Error: Plot must be a valid string"}
  if(typeof rating !== 'string' || rating.trim().length == 0){throw "Error: Rating must be a valid string"}
  if(typeof studio !== 'string' || studio.trim().length == 0){throw "Error: Studio must be a valid string"}
  if(typeof director !== 'string' || director.trim().length == 0){throw "Error: Director must be a valid string"}
  if(typeof dateReleased !== 'string' || dateReleased.trim().length == 0 || dateReleased.length != 10){throw "Error: Date Released must be a valid date string mm/dd/yyyy"}
  if(typeof runtime !== 'string' || runtime.trim().length == 0){throw "Error: Runtime must be a valid string"}
  if(!Array.isArray(genres) || genres.length < 1){throw "Error: Genres must be an array with a length of at least 1"}
  if(!Array.isArray(castMembers) || castMembers.length < 1){throw "Error: Cast Memebers must be an array with a length of at least 1"}

  //id 
  if(typeof movieId !== 'string' || movieId.trim().length === 0){throw "Error: Must provide a valid id"}
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)){throw "Error: Invalid object id"}

  // title
  if(title.length < 2 || title.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
  title = title.trim();

  // studio
  if(studio.length < 5 || studio.search(/[!@#$%^&*><}?{()_+/=:;"]/g) != -1 || studio.search(/[0123456789]/g) != -1){throw "Error: Studio must be at least 5 characters with no numbers and special characters"}
  studio = studio.trim();

  // director
  director = director.trim();
  let directorArray = director.split(" ");
  if (directorArray.length != 2) {throw "Error: Director's name must only include a First and Last name"}
  for(let x = 0; x < directorArray.length; x++){
    if(directorArray[x].length < 3 || directorArray[x].search(/[0123456789]/g) != -1 || directorArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Directer's first and last name must be at least 3 characters long with no punctation and numbers"}
    directorArray[x] = directorArray[x].trim();
  }

  director = directorArray.join(' ');

  // ratings
  rating = rating.trim();
  if(!rating.includes("G")){
    if(!rating.includes("PG")){
      if(!rating.includes("PG-13")){
        if(!rating.includes("R")){
          if(!rating.includes("NC-17")){
            throw "Error: Rating must be a valid rating";
          }
        }
      }
    }
  }

  //genres
  for(let x = 0; x < genres.length; x++){
    if(genres[x].trim().length == 0 || typeof genres[x] !== 'string'){throw "Error: Each genre must be a valid string"}
    if(genres[x].length < 3 || genres[x].search(/[0123456789]/g) != -1 || genres[x].search(/[~`!@#$/%^&*-<}?{()_+\-=:;,.'"]/g) != -1){throw "Error: Each genre must be at least 3 characters and contain only letters"}
    genres[x] = genres[x].trim();
  }

  // cast members
  for(let x = 0; x < castMembers.length; x++){
    let castMem = castMembers[x];
    if(castMem.trim().length === 0){throw "Error: Cast Members must have a First and Last name"}
    castMem = castMem.trim();
    
    let castMemFL = castMem.split(" ");

    if(castMemFL.length < 2){throw "Error: Cast Members must have a First and Last name"}

    for(let i = 0; i < castMemFL.length; i++){
      if(typeof castMemFL[i] !== 'string'){throw "Error: Each name must be a valid string"}
      if(castMemFL[i].length < 3 || castMemFL[i].search(/[0123456789]/g) != -1 || castMemFL[i].search(/[~`!@#$%^&*><}?{()_/+\-=:;,."]/g) != -1){throw "Error: Each name must be at least 3 characters and contain only letters"}
      castMemFL[i] = castMemFL[i].trim();
    }
    castMembers[x] = castMemFL.join(' ');
  }

  // dateReleased
  dateReleased = dateReleased.trim();
  let dateArray = dateReleased.split('/');
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
  runtime = runtime.trim();
  let runArray = runtime.split(' ');
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

  runtime = `${hour}h ${min}min`;
  

  const moviecollection = await movies();

  const movieUpdateInfo = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime
  };

  const updateInfo = await moviecollection.updateOne({ _id: ObjectId(movieId) },{ $set: movieUpdateInfo });
  if (!updateInfo.modifiedCount && !updateInfo.matchedCount) {throw 'Error: Could not update movie info'}

  return await getMovieById(movieId);

};

const renameMovie = async (id, newName) => {
  //Not used for this lab
  if(!id){throw "Error: Must provide an id"}
  if(typeof id !== 'string' || id.trim().length === 0){throw "Error: Must provide a valid id"}
  id = id.trim();
  if(!ObjectId.isValid(id)){throw "Error: Invalid object id"}

  if(!newName){throw "Error: Must provide a name"}
  if(typeof newName !== 'string' || newName.trim().length == 0){throw "Error: Must provide a valid name"}
  if(newName.length < 2 || newName.search(/[!@#$%^&*><}?{()_/+\-=:;,.'"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
  newName = newName.trim();

  const moviecollection = await movies();
  const movie = await getMovieById(id);
  if(movie['title'].toLowerCase() === newName.toLowerCase()){throw "Error: Same value as the one stored in database"}

  const movieUpdate = {
    title: newName,
  };

  const updateInfo = await moviecollection.updateOne({ _id: ObjectId(id) },{ $set: movieUpdate });
  if (updateInfo.modifiedCount === 0) {throw 'Error: Could not update movie title'}

  return await getMovieById(id);
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  removeMovie,
  updateMovie,
  renameMovie
};
