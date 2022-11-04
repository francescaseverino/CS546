const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;
const path = require("path");

router.route("/").get(async (req, res) => {

  try{
    res.sendFile(path.resolve('static/homepage.html'));
  } catch (e) {
    res.status(500);
  }
});

router.route("/searchpeople").post(async (req, res) => {

  try{
    if(!req.body.searchPersonName){throw "Error: Must provide either first or last name."}
    if(typeof req.body.searchPersonName != "string" || req.body.searchPersonName.trim().length == 0){ throw "Error: Must be a string and no empty spaces."}
    if(req.body.searchPersonName.search(/[0123456789]/g) != -1 || req.body.searchPersonName.search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Must provide a valid name with no special characters and numbers"}
    req.body.searchPersonName = req.body.searchPersonName.trim();

  } catch(e){
    res.status(400).render("error", {
      error: e,
      class: "error",
      title: "Error",
    })
    return;
  }

  try {
    const people = await peopleData.searchPeopleByName(req.body.searchPersonName);

    if(people.length == 0){throw "Error: No one found."}

    res.render("peopleFound", {
      people: people,
      searchPersonName: req.body.searchPersonName,
      title: 'People Found',
    });
    
  } catch (e) {
    res.status(404).render("personNotFound", {
      searchPersonName: req.body.searchPersonName,
      title: "People Not Found",
    });
  }

});

router.route("/persondetails/:id").get(async (req, res) => {

  try{
    if(!req.params.id){throw "Error: Must provide a valid ID."}
    if(typeof req.params.id != "string"|| req.params.id.trim().length == 0){throw "Error: Id must be a string and not just empty spaces."}
    if(isNaN(req.params.id)){throw "Error: Must be a valid ID number."}
    req.params.id = req.params.id.trim();

    if(Number.isInteger(req.params.id) || Number.parseInt(req.params.id) < 1){throw "Error: Must be an valid ID number."}
    if(Number.parseInt(req.params.id) < 10 && req.params.id.length == 2){throw "Error: Must be a valid ID number."}
  } catch (e) {
    res.status(400).render("error", {
      class: "error",
      error: e,
      title: "Error",
    });
    return;
  }

  try {
    const person = await peopleData.searchPeopleByID(req.params.id);
    if(person.length == 0){throw "Error: No one found with that ID."}

    res.render("personFoundByID", {
      person: person,
      title: "Person Found"
    });

  } catch (e) {
    res.status(404).render("personNotFound", {
      searchPersonName: req.params.id,
      title: "Person Not Found",
    });
  }

});

module.exports = router;