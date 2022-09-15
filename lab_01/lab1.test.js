const lab1 = require('./lab1');

//TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log(lab1.questionOne([901, 3, 1223, 60, -1, 12889]));  // Returns and then outputs [false, true, true, false, false, true]
console.log(lab1.questionOne([2, 1, 2])); // Returns and then outputs[true, false, true] 
console.log(lab1.questionOne([769, 1007, 17388])); //Returns and then outputs [true, false, true]
console.log(lab1.questionOne([0, 13441, 12910])); //Returns and then outputs [false, true, false]
console.log(lab1.questionOne([-11, 11])); //Returns and then outputs [false, true]

console.log(lab1.questionTwo(5.6, 0.5, 5));  // Returns and then outputs 10.85 
console.log(lab1.questionTwo(-22, -4.5, 2)); // Returns and then outputs 77 
console.log(lab1.questionTwo(512, 1007, -5)); //Returns and then outputs NaN
console.log(lab1.questionTwo(2, 0, 4)); //Returns and then outputs 0
console.log(lab1.questionTwo(0, 3, -5)); //Returns and then outputs NaN
console.log(lab1.questionTwo(10, -5.5, 4)); //Returns and then outputs -1406.25


console.log(lab1.questionThree("I am going to give him an offer that he won't refuse"));  // Returns and then outputs 23
console.log(lab1.questionThree("Frankly, * my dear * , @%#$ I don't give a damn!")); // Returns and then outputs 18
console.log(lab1.questionThree("JavaScript is kind of fun, buttttt definitly excitingZZ!")); //Returns and then outputs 33
console.log(lab1.questionThree("As Captain Jack Sparrow said, 'If you were waiting for the opportune moment, that was it.' ")) //Returns and then outputs 42
console.log(lab1.questionThree("We made it to the unknown myy Friend!")) //Return and then outputs 19



console.log(lab1.questionFour("welllllllllcome to my llllovely home here in the uncontrollable willllld", "lll"));  // Returns and then outputs 5
console.log(lab1.questionFour("You just added stuborness, foolishness, agressiveness, sleeplessness to your attiude ", "ss")); // Returns and then outputs 6 
console.log(lab1.questionFour("she sells sea shells by the sea shore", "s")) //Returns and then outputs 8
console.log(lab1.questionFour("peter piper picked a peck of pickled peppers pipipipi", "pi")) //Returns and then outputs 7
console.log(lab1.questionFour("nationalization of the nature world is documentational", "na")) //Returns and then outputs 4