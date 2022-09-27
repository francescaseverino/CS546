const axios = require('axios');

// recieves people data in JSON file with axios
async function getPeople(){
    const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
}

function isID(id) {
    if(!id){throw "No paramter provided"} 
    if(typeof id !== "string"){throw "Parameter is not a string"}
    if(id.trim().length == 0){throw "Parameter is just empty spaces"}
}

function isJob(job){
    if(!job){throw "No parameter provided"}
    if(typeof job != "string"){throw "Paramter is not a string"}
    if(job.trim().length == 0){throw "Parameter is just empty spaces"}
}

function isCityState(city, state){
    if(!city || !state){throw "Missing one or both parameters"}
    if(typeof city !== "string" || typeof state !== "string"){throw "Both parameters must be type string"}
    if(city.trim().length == 0 || state.trim().length == 0){throw "One or both parameters are just spaces"}
}

const getPersonById = async (id) => {
    isID(id);
    let data = await getPeople();
    let person = data.find((object) => {
        return object.id === id;
    })

    if(!person){throw "Person not found."}

    return person;
};

const sameJobTitle = async (jobTitle) => {
    isJob(jobTitle);
    let data = await getPeople();
    let job = data.filter((object) => {
        return object.job_title.toLowerCase() === jobTitle.toLowerCase();
    })

    if(job.length < 2){throw "There are not more then two people with that job title"}

    return job;
};

const getPostalCodes = async (city, state) => {
    isCityState(city, state);
    let data = await getPeople();
    let cityState = data.filter((object) =>{
        return object.city.toLowerCase() === city.toLowerCase() && object.state.toLowerCase() === state.toLowerCase();
    })

    if(cityState.length == 0){throw "There are no postal codes for the given city and state combination."}
    
    let collection =[];

    for(let i = 0; i < cityState.length; i++){
        collection.push(cityState[i].postal_code);
    }

    return collection.sort();
};

const sameCityAndState = async (city, state) => {
    isCityState(city, state);
    let data = await getPeople();
    let neighbors = data.filter((object) =>{
        return object.city.toLowerCase() === city.toLowerCase() && object.state.toLowerCase() === state.toLowerCase();
    })

    if(neighbors.length < 2){throw "There are not two people who live in the same city and state"}

    let lastnames = [];
    let collection = [];

    for(let i = 0; i < neighbors.length; i++){
        let lastname = neighbors[i].last_name;
        lastnames.push(lastname);
    }
    lastnames.sort();

    for(let i = 0; i < lastnames.length; i++){
        for(let x = 0; x < neighbors.length; x++){
            if(lastnames[i] === neighbors[x].last_name){
                let firstname = neighbors[x].first_name;
                collection.push(firstname.concat(" ", lastnames[i]));
            }
        }
        
    }
    return collection;
};

module.exports = {
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};
