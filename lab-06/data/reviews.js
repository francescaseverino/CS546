const mongoCollections = require("../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectId } = require("mongodb");
const movieFun = require("./movies");

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  if(!movieId){throw "Error: Must provide a movie Id"}
  if(!reviewTitle){throw "Error: Must provide a title"}
  if(!reviewerName){throw "Error: Must provide a name of the reviewer"}
  if(!review){throw "Error: Must provide a review"}
  if(!rating){throw "Error: Must provide a rating"}

  if(typeof movieId != "string" || movieId.trim().length == 0){throw "Error: MovieId must be a string"}
  if(typeof reviewTitle != "string" || reviewTitle.trim().length == 0){throw "Error: reviewTitle must be a string"}
  if(typeof reviewerName != "string" || reviewerName.trim().length == 0){throw "Error: reviewerName must be a string"}
  if(typeof rating != "number" || rating < 1 || rating > 5 || isNaN(rating)){throw "Error: rating must be a number between 1 and 5"}

  //movie id
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)){throw "Error: Invalid Object Id"}

  const moviecollection = await movies();
  const movie = await moviecollection.findOne({_id: ObjectId(movieId)});
  if(!movie){throw "Error: No movie with that id"}

  //reviewTitle
  if(reviewTitle.length < 2 || reviewTitle.search(/[@#$%^&*><}{()_/+=:;\-,"]/g) != -1){throw "Error: Title must be at least 2 characters with no special characters"}
  reviewTitle = reviewTitle.trim();

  //reveiwerName
  reviewerName = reviewerName.trim();
  let nameArray = reviewerName.split(" ");
  if (nameArray.length != 2) {throw "Error: Reviewer's name must only include a First and Last name"}
  for(let x = 0; x < nameArray.length; x++){
    if(nameArray[x].length < 3 || nameArray[x].search(/[0123456789]/g) != -1 || nameArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Reviewer's first and last name must be at least 3 characters long with no punctation and numbers"}
    nameArray[x] = nameArray[x].trim();
  }

  reviewerName = nameArray.join(' ');

  //rating
  if(!Number.isInteger(rating)){
    if(rating != parseFloat(rating.toFixed(1))){
      throw "Error: Must be a whole number or decimal to the tenths place."
    }
  }
  
  //reviewDate
  let reviewDate = '';
  let date = new Date();

  let month = date.getMonth()+1;
  let day = date.getDate();
  let year = date.getFullYear();

  if(day < 10){
    reviewDate = `${month}/ 0${day}/${year}`;
  } else if(month < 9){
    reviewDate = `0${month}/${day}/${year}`;
  } else{
    reviewDate = `${month}/${day}/${year}`;
  }

  //overall rating
  let num = rating;
  let count = 1;
  movie.reviews.forEach((obj)=>{
    count++
    num = num + obj.rating;
  });

  if(count != 0){
    num = num / count;
  }
  num = parseFloat(num.toFixed(1));

  let newReview = {
    _id: ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: reviewDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating
  }

  let updatedInfo = await moviecollection.updateOne(
    {_id: ObjectId(movieId)},
    {$addToSet: {reviews: newReview}},
  );

  if (!updatedInfo.modifiedCount && !updatedInfo.matchedCount) {throw "Error: Could not add review"}

  let updatedRating = await moviecollection.updateOne(
    {_id: ObjectId(movieId)},
    {$set: {overallRating: num}}
  );

  if (!updatedRating.modifiedCount && !updatedRating.matchedCount) {throw "Error: Could not update overallRating"}

  newReview._id = newReview._id.toString();
  return await getReview(newReview._id);
};

const getAllReviews = async (movieId) => {
  if(!movieId){throw "Error: Must provide a movie Id"}
  if(typeof movieId != "string" || movieId.trim().length == 0){throw "Error: MovieId must be a string"}
  movieId = movieId.trim();
  if(!ObjectId.isValid(movieId)){throw "Error: Invalid Object Id"}

  const moviecollection = await movies();
  const movie = await moviecollection.findOne({_id: ObjectId(movieId)});
  if(!movie){throw "Error: No movie with that id"}

  movie.reviews.forEach((obj)=>{
    obj._id = obj._id.toString();
  });
  return movie.reviews;
};

const getReview = async (reviewId) => {
  if(!reviewId){throw "Error: Must provide a reviewId"}
  if(typeof reviewId != "string" || reviewId.trim().length == 0){throw "Error: ReviewId must be a string"}
  reviewId = reviewId.trim();
  if(!ObjectId.isValid(reviewId)){throw "Error: Invalid Object Id"}

  const moviecollection = await movies();
  const movie = await moviecollection.findOne(
    { "reviews": { $elemMatch: { _id: ObjectId(reviewId) } } },
    {projection: {_id:0, reviews:1}}
  );
  if (!movie) {throw "Error: Review not found"}

  let review = movie.reviews.find((obj)=>{
    return obj._id.toString() === ObjectId(reviewId).toString();
  });

  review._id = review._id.toString();
  return review;
};

const removeReview = async (reviewId) => {
  if(!reviewId){throw "Error: Must provide a review Id"}
  if(typeof reviewId != "string" || reviewId.trim().length == 0){throw "Error: ReviewId must be a string"}
  reviewId = reviewId.trim();
  if(!ObjectId.isValid(reviewId)){throw "Error: Invalid Object Id"}

  const moviecollection = await movies();
  const review = await moviecollection.findOne({"reviews._id": ObjectId(reviewId)});
  if (!review) {throw "Error: Review not found"}
  
  let id = review._id.toString();

  const updateInfo = await moviecollection.updateOne(
    { _id: review._id },
    { $pull: { reviews: { _id: ObjectId(reviewId) } } }
  );
  if (!updateInfo.modifiedCount && !updateInfo.matchedCount) {throw 'Error: Could not update movie info'}
  
  //overall rating
  const movie = await moviecollection.findOne({_id: ObjectId(id)});

  let num = 0;
  let count = 0;
  movie.reviews.forEach((obj)=>{
    count++
    num = num + obj.rating;
  });

  console.log(num);
  if(count != 0){
    num = num / count;
  }
  num = parseFloat(num.toFixed(1));
  console.log(num);
  let updatedRating = await moviecollection.updateOne(
    {_id: movie._id},
    {$set: {overallRating: num}}
  );
  if (!updatedRating.modifiedCount && !updatedRating.matchedCount) {throw "Error: Could not update overallRating"}

  return movieFun.getMovieById(id);;
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
