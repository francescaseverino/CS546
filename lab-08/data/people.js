//Axios call to get all data
const axios = require("axios");

const getAllPeople = async () => {
    const { data } = await axios.get("https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json");
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    if(!searchPersonName){throw "Error: Must provide either first or last name."}
    if(typeof searchPersonName != "string" || searchPersonName.trim().length == 0){ throw "Error: Must be a string and no empty spaces."}
    if(searchPersonName.search(/[0123456789]/g) != -1 || searchPersonName.search(/[~`!@/#$%^&*><}?{()_+\-=:;,."]/g) != -1){throw "Error: Must provide a valid name with no special characters and numbers"}
    searchPersonName = searchPersonName.trim();

    let matches;
    if(searchPersonName.includes(" ")){
        let fullname = searchPersonName.split(" ");
        let data = await getAllPeople();
        matches = data.filter((obj) => {
            return obj.firstName.toLowerCase().search(fullname[0].toLowerCase()) != -1 && obj.lastName.toLowerCase().search(fullname[1].toLowerCase()) != -1;
        });
    } else {
        let data = await getAllPeople();
        matches = data.filter((obj) =>{
            return obj.firstName.toLowerCase().search(searchPersonName.toLowerCase()) != -1 || obj.lastName.toLowerCase().search(searchPersonName.toLowerCase()) != -1;
        });
    }

    if(matches.length == 0){throw "Error: No person found with that name(s)"}
    
    return matches.slice(0, 20);
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    if(!id){throw "Error: Must provide a valid id."}
    if(typeof id != "string"|| id.trim().length == 0){throw "Error: Id must be a string and not just empty spaces."}
    if(isNaN(id)){throw "Error: Must provide a valid ID number."}
    id = id.trim();

    if(Number.isInteger(id) || Number.parseInt(id) < 1){throw "Error: Must be a valid ID number."}
    if(Number.parseInt(id) < 10 && id.length == 2){throw "Error: Must be a valid ID number."}

    let data = await getAllPeople();
    let person = data.find((obj)=>{
        return obj.id === Number.parseInt(id);
    });

    if(person.length == 0){throw "Error: No person found by that ID."}

    return person;
};

module.exports = { searchPeopleByName, searchPeopleByID };