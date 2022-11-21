const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const data = require('../data');
const users = data.users;

router
  .route('/')
  .get(async (req, res) => {

    if(req.session.user){
      res.redirect('/protected');
    } else{
      res.render('userLogin');
    }

  })

router
  .route('/register')
  .get(async (req, res) => {

    if(req.session.user){
      res.redirect('/protected');
    } else {
      res.render('userRegister');    
    }

  })
  .post(async (req, res) => {

    let input = req.body;

    try{
      if (!input.usernameInput){ throw 'Error: Must provide a username'}
      if(typeof input.usernameInput != 'string'|| input.usernameInput.trim().length == 0){throw 'Error: Must provide a username'}

      if(input.usernameInput.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1 || input.usernameInput.search(" ") != -1 || input.usernameInput.length < 4){throw "Error: Must provide a username with only alphanumeric characters and at least 4 characters long"}
      
    } catch(e){
      return res.status(400).render('userRegister', {
        error: e
      });
    }

    try{
      if (!input.passwordInput){throw 'Error: Must provide a password'}
      if(typeof input.passwordInput != 'string'|| input.passwordInput.trim().length == 0){throw 'Error: Must provide a password'}

      if(input.passwordInput.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) == -1 || input.passwordInput.search(/[0123456789]/g) == -1 || input.passwordInput.search(/[A-Z][a-z]/) == -1 || input.passwordInput.search(" ") != -1 || input.passwordInput.length < 6){throw "Error: Must provide a password with at least one number, one uppercase and one lowercase letter, and one special character"}

    } catch(e){
      return res.status(400).render('userRegister', {
        error: e
      });
    }

    try{

      const user = await users.createUser(input.usernameInput, input.passwordInput);
      if(user.insertedUser == true){
        res.redirect('/');
      } else {
        res.status(500).json("Internal Server Error");
      }
    } catch(e){
      return res.status(500).render('userRegister', {
        error: e
      });
    }

  })
 
router
  .route('/login')
  .post(async (req, res) => {

    let input = req.body;
    try{
      if (!input.usernameInput){ throw 'Error: Must provide a username'}
      if(typeof input.usernameInput != 'string'|| input.usernameInput.trim().length == 0){throw 'Error: Must provide a username'}

      if(input.usernameInput.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1 || input.usernameInput.search(" ") != -1 || input.usernameInput.length < 4){throw "Error: Must provide a username with only alphanumeric characters and at least 4 characters long"}
      
    } catch(e){
      return res.status(400).render('userLogin', {
        error: e
      });
    }

    try{
      if (!input.passwordInput){throw 'Error: Must provide a password'}
      if(typeof input.passwordInput != 'string'|| input.passwordInput.trim().length == 0){throw 'Error: Must provide a password'}

      if(input.passwordInput.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) == -1 || input.passwordInput.search(/[0123456789]/g) == -1 || input.passwordInput.search(/[A-Z][a-z]/) == -1 || input.passwordInput.search(" ") != -1 || input.passwordInput.length < 6){throw "Error: Must provide a password with at least one number, one uppercase and one lowercase letter, and one special character"}

    } catch(e){
      return res.status(400).render('userLogin', {
        error: e
      });
    }

    try{
      const user = await users.checkUser(input.usernameInput, input.passwordInput);
      if(user.authenticatedUser == true){
        req.session.user = {username: input.usernameInput};
        res.redirect('/protected');
      }
    } catch (e){
      return res.status(400).render('userLogin', {
        error: e
      });
    }
  })

router
  .route('/protected')
  .get(async (req, res) => {

    res.render('private', {
      username: req.session.user.username,
      date_time: new Date().toUTCString(),
    });

  })

router
  .route('/logout')
  .get(async (req, res) => {

    if(req.session.user){
      req.session.destroy();
      res.render('logout');
    } else{
      res.redirect('/');
    }


  })

module.exports = router;