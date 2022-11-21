const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.user_collection;
const bcrypt = require('bcrypt');
const saltRounds = 16;

const createUser = async (
  username, password
) => { 
  if (!username){ throw 'Error: Must provide a username'}
  if(typeof username != 'string'|| username.trim().length == 0){throw 'Error: Must provide a username'}
  if (!password){throw 'Error: Must provide a password'}
  if(typeof password != 'string'|| password.trim().length == 0){throw 'Error: Must provide a password'}

  if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1 || username.search(" ") != -1 || username.length < 4){throw "Error: Must provide a username with only alphanumeric characters and at least 4 characters long"}
  
  if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) == -1 || password.search(/[0123456789]/g) == -1 || password.search(/[A-Z][a-z]/) == -1 || password.search(" ") != -1 || password.length < 6){throw "Error: Must provide a password with at least one number, one uppercase and one lowercase letter, and one special character"}

  const usercollection = await user();
  const user_status = await usercollection.findOne({
    username: username.toLowerCase(),
  });

  if(user_status){throw "Error: Username already taken."}

  const hashed = await bcrypt.hash(password, saltRounds);

  let newUser = {
    username: username.toLowerCase(),
    password: hashed
  };

  const insertedUser = await usercollection.insertOne(newUser);
  if(insertedUser.insertedCount === 0 || !insertedUser.acknowledged){throw "Error: Could not add user"}

  return {insertedUser: true};
} 

const checkUser = async (username, password) => {

  if (!username){ throw 'Error: Must provide a username'}
  if(typeof username != 'string'|| username.trim().length == 0){throw 'Error: Must provide a username'}
  if (!password){throw 'Error: Must provide a password'}
  if(typeof password != 'string'|| password.trim().length == 0){throw 'Error: Must provide a password'}

  if(username.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) != -1 || username.search(" ") != -1 || username.length < 4){throw "Error: Must provide a username with only alphanumeric characters and at least 4 characters long"}
  
  if(password.search(/[!@#$%^&*><}?{()_/+=:;\-,.'"]/g) == -1 || password.search(/[0123456789]/g) == -1 || password.search(/[A-Z][a-z]/) == -1 || password.search(" ") != -1 || password.length < 6){throw "Error: Must provide a password with at least one number, one uppercase letter, one lowercase letter, and one special character"}
  
  const usercollection = await user();
  const user_username = await usercollection.findOne({
    username: username.toLowerCase(),
  })

  if(!user_username){throw "Either the username or password is invalid"}

  const user_match = await bcrypt.compare(password, user_username.password);
  if(!user_match){throw "Either the username or password is invalid"}
  
  return {authenticatedUser: true};
};

module.exports = {
  createUser,
  checkUser
};
