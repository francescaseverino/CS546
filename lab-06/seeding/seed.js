const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const movies = data.movies;
const reviews = data.reviews;

async function main() {
    const db = await dbConnection.dbConnection();
    await db.dropDatabase();

    const LordOfTheRings = await movies.createMovie(
        "Lord of the Rings",
        "Lord of the Rings is about the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil. Its many worlds and creatures were drawn from Tolkien's extensive knowledge of philology and folklore.",
        ["Fantasy Fiction", "Heroic Fantasy"],
        " PG-13 ",
        "New Line Cinema WingNut Films",
        "Peter Jackson",
        ["Elijah Wood", "Viggo Mortensen", "Sean Astion", "Orlando Bloom", "Billy Boyd"],
        "12/19/2001",
        "2h 58min"
    );

    await reviews.createReview(
        LordOfTheRings._id,
        "This is a great",
        "Francesca Severino",
        "I great movie of the epic times.",
        3.5
    );

    await reviews.createReview(
        LordOfTheRings._id,
        "Epic Fail",
        "Tyler Seliber",
        "I wish there were more dragons in the film, and more action scenes",
        1.5
    );

    await reviews.createReview(
        LordOfTheRings._id,
        "It was ok",
        "Judit Severino",
        "Needed more action to with the elves.",
        2
    );

    const StarWars = await movies.createMovie(
        " Star Wars The Last Jedi ",
        " Luke Skywalker's peaceful and solitary existence gets upended when he encounters Rey, a young woman who shows strong signs of the Force. Her desire to learn the ways of the Jedi forces Luke to make a decision that changes their lives forever. Meanwhile, Kylo Ren and General Hux lead the First Order in an all-out assault against Leia and the Resistance for supremacy of the galaxy. ",
        [" Science Fiction ", " Fantasy ", "Space Opera"],
        "PG-13",
        "Lucasfilm Ltd.",
        "Rian Johnson",
        ["Daisy Ridley", "Mark Hamill", "John Boyega", "Carrie Fisher", "Adam Driver"],
        "12/31/2017",
        "2h 32min"
    );

    await reviews.createReview(
        StarWars._id,
        "This is a great",
        "Francesca Severino",
        "I great movie of the epic times.",
        4.5
    );

    await reviews.createReview(
        StarWars._id,
        "Epic Fail",
        "Tyler Seliber",
        "I wish there were more dragons in the film, and more action scenes",
        3.5
    );

    await reviews.createReview(
        StarWars._id,
        "It was ok",
        "Judit Severino",
        "Needed more action to with the elves.",
        2.5
    );

    const GodFather = await movies.createMovie(
        "The Godfather",
        "This film focuses on the powerful Italian-American crime family of Don Vito Corleone (Marlon Brando). When the don's youngest son, Michael (Al Pacino), reluctantly joins the Mafia, he becomes involved in the inevitable cycle of violence and betrayal. Although Michael tries to maintain a normal relationship with his wife, Kay (Diane Keaton), he is drawn deeper into the family business.",
        ["Crime Film", "Drama", "Mafia"],
        "R",
        "Paramount Pictures Alfran Productions",
        "Francis Coppola",
        ["Alfre'do Pacino", "Marlon Brando", "John Cazale", "Talia Shire", "Gianni Russo", "Diane Keaton"],
        "03/24/1972",
        "2h 55min"
    );


    await reviews.createReview(
        GodFather._id,
        "More Guns Please",
        "Francesca Severino",
        "Mafia is something else",
        3.4
    );

    await reviews.createReview(
        GodFather._id,
        "Epic Fail",
        "Tyler Seliber",
        "I wish there were more dragons in the film.",
        1.5
    );

    await reviews.createReview(
        GodFather._id,
        "It was ok",
        "Judit Severino",
        "Needed more action!",
        2.7
    );

    const HocusPocus = await movies.createMovie(
        "Hocus Pocus",
        "After moving to Salem, Mass., teenager Max Dennison (Omri Katz) explores an abandoned house with his sister Dani (Thora Birch) and their new friend, Allison (Vinessa Shaw). After dismissing a story Allison tells as superstitious, Max accidentally frees a coven of evil witches (Bette Midler, Sarah Jessica Parker, Kathy Najimy) who used to live in the house. Now, with the help of a magical cat, the kids must steal the witches' book of spells to stop them from becoming immortal.",
        ["Thriller", "Fantasy"],
        "PG",
        "Walt Disney Pictures",
        "Kenny Ortega",
        ["Bette Midler", "Sarah Jessica", "Kathy Najimy", "Omri Katz", "Thora Birch", "Vinessa Shaw"],
        "07/16/1996",
        "1h 36min"
    );

    await reviews.createReview(
        HocusPocus._id,
        "More Witches",
        "Francesca Severino",
        "Witch is something else",
        4.4
    );

    await reviews.createReview(
        HocusPocus._id,
        "Epic Fail",
        "Tyler Seliber",
        "I wish there were dragons in the film.",
        1.5
    );

    const HungerGames = await movies.createMovie(
        "Hunger Games",
        "The film is set in a dystopian post-apocalyptic future in the nation of Panem, where a boy and a girl from each of the nation's 12 Districts are chosen annually as tributes and forced to compete in the Hunger Games, an elaborate televised fight to the death.",
        ["Dystopian", "Epic", "Fiction"],
        "PG-13",
        "Lionsgate",
        "Gary Ross",
        ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth", "Woody Harrelson", "Elizabeth Banks"],
        "03/12/2015",
        "1h 59min"
    );

    await reviews.createReview(
        HungerGames._id,
        "YESSSSSS",
        "Francesca Severino",
        "Best youth drama I have ever seen",
        4.7
    );

    console.log('Done seeding the database!');
    await dbConnection.closeConnection();
}

main();