const axios = require("axios");

const pokemon = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/");
    return data;
}

const pokemonById = async (id) => { 
    if(!id){throw 'Invalid URL Parameter'} 
    if(typeof id !== "string" || id.trim().length == 0){throw 'Invalid URL Parameter'}
    id = id.trim();
    
    if(id.includes('.')){throw 'Invalid URL Parameter'}
    if(isNaN(id)){throw 'Invalid URL Parameter'}
    if(Number(id) <=0){throw 'Invalid URL Parameter'}
    if(Number(id)%1 != 0){throw 'Invalid URL Parameter'}
    if(!Number.isInteger(Number(id))){throw 'Invalid URL Parameter'}

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).catch(function (error){
        throw ('Pokémon Not Found!');
    });

    return data;
};

module.exports = {
    pokemon,
    pokemonById
};