const express = require('express');
const data = require('../data');
const router = express.Router();
const pokemonData = data.pokemons;

router
  .route('/')
//Request Method
  .get(async (req, res)=>{
    try{
      const pokemons = await pokemonData.pokemon();
      res.json(pokemons);
    } catch (e){
      res.status(500).send(e);
    }
  })

router
  .route('/:id')
//Request Method
  .get(async (req, res)=>{

    try{
      if (!req.params.id) {throw 'Invalid URL Parameter'}
      if (typeof req.params.id !== 'string'){throw 'Invalid URL Parameter'}
      req.params.id = req.params.id.trim();
      if (req.params.id.length === 0){throw 'Invalid URL Parameter'}
      
      if(req.params.id.includes('.')){throw 'Invalid URL Parameter'}
      if(isNaN(req.params.id)){throw 'Invalid URL Parameter'}
      if(Number(req.params.id) <=0){throw 'Invalid URL Parameter'}
      if(Number(req.params.id)%1 != 0){throw 'Invalid URL Parameter'}
      if(!Number.isInteger(Number(req.params.id))){throw 'Invalid URL Parameter'}

      try{
        const pokemon = await pokemonData.pokemonById(req.params.id);
        res.json(pokemon);

      } catch(e){
        res.status(404).json(e);
      }

    } catch (e){
      res.status(400).json(e);
    }

  })

module.exports = router;