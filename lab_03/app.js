/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.
*/
const people = require("./people");
const companies = require("./companies");

//getPersonById
async function main(){
    try{
        const peopledata = await people.getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

//sameJobTitle
async function main(){
    try{
        const jobdata = await people.sameJobTitle('recruiting manager'); //returns nine people
        console.log (jobdata);
    }catch(e){
        console.log (e);
    }
}

//getPostalCodes
async function main(){
    try{
        const pcodedata = await people.getPostalCodes("Austin", "Texas");
        console.log (pcodedata);
    }catch(e){
        console.log (e);
    }
}
async function main(){
    try{
        const pcodedata = await people.getPostalCodes("Las Vegas", "New York");
        console.log (pcodedata);
    }catch(e){
        console.log (e);
    }
}

//sameCityandState
async function main(){
    try{
        const neighbordata = await people.sameCityAndState("Austin", "Texas");
        console.log (neighbordata);
    }catch(e){
        console.log (e);
    }
}
async function main(){
    try{
        const neighbordata = await people.sameCityAndState("Salt Lake City", "Utah");
        console.log (neighbordata);
    }catch(e){
        console.log (e);
    }
}

//getCompanyById
async function main(){
    try{
        const company = await companies.getCompanyById("e5d40f28-1a0d-41af-89a1-4d1a3e70f51d");
        console.log (company);
    }catch(e){
        console.log (e);
    }
}

//sameIndustry
async function main(){
    try{
        const industry = await companies.sameIndustry('Auto Parts:O.E.M.');
        console.log (industry);
    }catch(e){
        console.log (e);
    }
}

//listEmployees
async function main(){
    try{
        const employees = await companies.listEmployees("Kemmer-Mohr");
        console.log (employees);
    }catch(e){
        console.log (e);
    }
}
main();
