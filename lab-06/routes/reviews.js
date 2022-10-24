const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
const movieData = data.movies;
const { ObjectId } = require("mongodb");

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

    try {
        const reviews = await reviewsData.getAllReviews(req.params.movieId);
        if(reviews.length == 0){throw "Error: No reviews for that movie."}
        res.status(200).json(reviews);
    } catch (e) {
        res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    let reviewInfo = req.body;

    try{
        if(!req.params.movieId){throw "Error: Must provide a movie Id"}
        if(!reviewInfo.reviewTitle){throw "Error: Must provide a title"}
        if(!reviewInfo.reviewerName){throw "Error: Must provide a name of the reviewer"}
        if(!reviewInfo.review){throw "Error: Must provide a review"}
        if(!reviewInfo.rating){throw "Error: Must provide a rating"}
      
        if(typeof req.params.movieId != "string" || req.params.movieId.trim().length == 0){throw "Error: MovieId must be a string"}
        if(typeof reviewInfo.reviewTitle != "string" || reviewInfo.reviewTitle.trim().length == 0){throw "Error: reviewTitle must be a string"}
        if(typeof reviewInfo.reviewerName != "string" || reviewInfo.reviewerName.trim().length == 0){throw "Error: reviewerName must be a string"}
        if(typeof reviewInfo.rating != "number" || reviewInfo.rating < 1 || reviewInfo.rating > 5 || isNaN(reviewInfo.rating)){throw "Error: rating must be a number between 1 and 5"}
      
        //movie id
        req.params.movieId = req.params.movieId.trim();
        if(!ObjectId.isValid(req.params.movieId)){throw "Error: Invalid Object Id"}
        const movie = await movieData.getMovieById(req.params.movieId);
        if(!movie){throw "Error: No movie with that id"}
      
        //reviewTitle
        if(reviewInfo.reviewTitle.length < 2 || reviewInfo.reviewTitle.search(/[@#$%^&*><}{()_/+=:;\-,"]/g) != -1){throw "Error: Title must be at least 2 characters with no punctation"}
        reviewInfo.reviewTitle = reviewInfo.reviewTitle.trim();
      
        //reveiwerName
        reviewInfo.reviewerName = reviewInfo.reviewerName.trim();
        let nameArray = reviewInfo.reviewerName.split(" ");
        if (nameArray.length != 2) {throw "Error: Reviewer's name must only include a First and Last name"}
        for(let x = 0; x < nameArray.length; x++){
          if(nameArray[x].length < 3 || nameArray[x].search(/[0123456789]/g) != -1 || nameArray[x].search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Reviewer's first and last name must be at least 3 characters long with no punctation and numbers"}
          nameArray[x] = nameArray[x].trim();
        }
        reviewInfo.reviewerName = nameArray.join(' ');
      
        if(!Number.isInteger(reviewInfo.rating)){
            if(reviewInfo.rating != parseFloat(reviewInfo.rating.toFixed(1))){
              throw "Error: Must be a whole number or decimal to the tenths place."
            }
        }
        
    } catch(e) {
        return res.status(400).json(e);
    }

    try{
        await reviewsData.createReview(
            req.params.movieId.toString(),
            reviewInfo.reviewTitle,
            reviewInfo.reviewerName,
            reviewInfo.review,
            reviewInfo.rating
        )
        const movie = await movieData.getMovieById(req.params.movieId);
        res.status(200).json(movie);
    } catch(e) {
        res.status(404).json(e);
    }

  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    try{
        if(!req.params.reviewId){throw "Error: Must provide a vaild id"}
        if(typeof req.params.reviewId !== 'string'){throw "Error: Must provide a type string id"}
        if(req.params.reviewId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
        req.params.reviewId = req.params.reviewId.trim();
        if(!ObjectId.isValid(req.params.reviewId)){throw "Error: Invalid object id"}
    } catch (e) {
        return res.status(400).json(e);
    }

    try {
        const review = await reviewsData.getReview(req.params.reviewId);
        res.status(200).json(review);
    } catch (e) {
        res.status(404).json(e);
    }
  })
  .delete(async (req, res) => {
    try{
        if(!req.params.reviewId){throw "Error: Must provide a vaild id"}
        if(typeof req.params.reviewId !== 'string'){throw "Error: Must provide a type string id"}
        if(req.params.reviewId.trim().length === 0){throw "Error: Must provide a valid id without spaces"}
        req.params.reviewId = req.params.reviewId.trim();
        if(!ObjectId.isValid(req.params.reviewId)){throw "Error: Invalid object id"}
    } catch (e) {
        return res.status(400).json(e);
    }

    try {
        const review = await reviewsData.removeReview(req.params.reviewId);
        res.status(200).json(review);
    } catch (e) {
        res.status(404).json(e);
    }
  });

module.exports = router;