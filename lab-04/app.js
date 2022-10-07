/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require("./data/movies");
const connection = require('./config/mongoConnection');

async function main(){
    const db = await connection.dbConnection();
    await db.dropDatabase();

    // adding first movie
    let LordOfRings
    try{
        LordOfRings = await movies.createMovie(
            "Lord of the Rings",
            "Lord of the Rings is about the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.",
            ["Fantasy Fiction", "Heroic Fantasy"],
            " PG-13 ",
            "New Line Cinema WingNut Films",
            "Peter Jackson",
            ["Elijah Wood", "Viggo Mortensen", "Sean Astion", "Orlando Bloom", "Billy Boyd"],
            "12/19/2001",
            "2h 58min"
        )
        console.log(LordOfRings);

    } catch(e){
        console.log(e);
    }

    //adding second movie
    let StarWars;
    try{
        StarWars = await movies.createMovie(
            " Star Wars The Last Jedi ",
            " Luke Skywalker's peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force. Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever. Meanwhile, Kylo Ren and General Hux lead the First Order in an all-out assault against Leia and the Resistance for supremacy of the galaxy. ",
            [" Science Fiction ", " Fantasy ", "Space Opera"],
            "PG-13",
            "Lucasfilm Ltd.",
            "Rian Johnson",
            ["Daisy Ridley", "Mark Hamill", "John Boyega", "Carrie Fisher", "Adam Driver"],
            "12/31/2017",
            "2h 32min"
        )
        console.log(StarWars);
    } catch(e){
        console.log(e);
    }

    // log all current movies
    try{
        const allMovies = await movies.getAllMovies();
        console.log(allMovies);
    } catch(e){
        console.log(e)
    }

    // adding third movie
    let GodFather;
    try{
        GodFather = await movies.createMovie(
            "The Godfather",
            "This film focuses on the powerful Italian-American crime family of Don Vito Corleone (Marlon Brando). When the don's youngest son, Michael (Al Pacino), reluctantly joins the Mafia, he becomes involved in the inevitable cycle of violence and betrayal. Although Michael tries to maintain a normal relationship with his wife, Kay (Diane Keaton), he is drawn deeper into the family business.",
            ["Crime Film", "Drama", "Mafia"],
            "R",
            "Paramount Pictures Alfran Productions",
            "Francis Coppola",
            ["Alfre'do Pacino", "Marlon Brando", "John Cazale", "Talia Shire", "Gianni Russo", "Diane Keaton"],
            "03/24/1972",
            "2h 55min"
        )
        console.log(GodFather);
    } catch(e){
        console.log(e);
    }
    
    //rename first movie
    let renameLord;
    try{
        renameLord = await movies.renameMovie(LordOfRings._id, "The Fellowship of The Ring");
        console.log(renameLord);
    } catch (e){
        console.log(e);
    }

    // delete second movie
    let deleteSecond;
    try{
        deleteSecond = await movies.removeMovie(StarWars._id);
        console.log(deleteSecond);
    } catch(e){
        console.log(e);
    }
    
    //log the remaining
    try{
        const allMovies = await movies.getAllMovies();
        console.log(allMovies);
    } catch(e){
        console.log(e);
    }

    // error check create a movie 
    let errorMovie;
    try{
        errorMovie = await movies.createMovie(
            " The Foundation of youth",
            "Jack sparwo wants the eat food.",
            ["Fantasy"],
            "PG ",
            "Hello there",
            "TheThe Albert",
            ["Albert Albert"],
            "12/02/2024",
            "0h 59min"
        )
        console.log(errorMovie);
    } catch(e){
        console.log(e);
    }

    // error check remove a movie
    try{
        const removeMovie = await movies.removeMovie("633f5009136cd75211197915");
        console.log(removeMovie);
    } catch(e){
        console.log(e);
    }

    // error check rename a movie
    try{
        const renameMovie = await movies.renameMovie("633f5009136cd75211197915", "The fellowship");
        console.log(renameMovie);
    } catch(e){
        console.log(e);
    }

    // error check rename a movie passing in invalid data 
    try{
        const renameMovie2 = await movies.renameMovie(LordOfRings._id, " the fellowship of the ring ");
        console.log(renameMovie2);
    } catch(e){
        console.log(e);
    }

    // error check movie by ID
    try{
        const validId = await movies.getMovieById("633f5009136cd75211197915");
        console.log(validId);
    } catch(e){
        console.log(e);
    }

    await connection.closeConnection();
    console.log('Done!');
}

main();