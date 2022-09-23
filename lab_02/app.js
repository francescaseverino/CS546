/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const array = require('./arrayUtils');
const string = require('./stringUtils');
const object = require('./objectUtils');

// Function: arrayStats

try {
    // Should Pass
    array.arrayStats([4, 7, 7, 10]); // Returns: { mean: 7, median: 7, mode:['7'] , range: 14, minimum: 4, maximum: 10, count: 4, sum:  28}

    console.log('array.arrayStats([4, 7, 7, 10]) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    array.arrayStats([4, [7], 7, 10]); 
    console.error('did not error');
 } catch (e) {
    console.log('array.arrayStats([4, [7], 7, 10]) failed successfully');
 }

// Function: makeObjects

try {
    // Should Pass
    array.makeObjects([4, 6], [3, "7"]);
    console.log('array.makeObjects([4, 6], [3, "7"]) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    array.makeObjects([], [2, 3]);
    console.error('did not error');
 } catch (e) {
    console.log('array.makeObjects([], [2, 3]) failed successfully');
 }

// Function: commonElements

try {
    // Should Pass
    const arr1 = ["francesca", 10]; 
    const arr2 = [10, "francesca"]; 
    const arr3 = [false, 5, "francesca"]; 

    array.commonElements(arr1, arr2, arr3);
    console.log('array.commonElements(arr1, arr2, arr3) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    const str = "francesca"; 
    const arr2 = [10, "francesca"]; 
    const arr3 = [false, 5, "francesca"];

    array.commonElements(str, arr2, arr3);
    console.error('did not error');
 } catch (e) {
    console.log('array.commonElements(arr1, arr2, arr3) failed successfully');
 }

// Function: palindromes

try {
    // Should Pass
    string.palindromes("racecar is on the moom at noon");
    console.log('string.palindromes("racecar is on the moom at noon") passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    string.palindromes(["hello there my friend"]);
    console.error('did not error');
 } catch (e) {
    console.log('string.palindromes(["hello there my friend"]) failed successfully');
 }

// Function: replaceChar

try {
    // Should Pass
    string.replaceChar("I dont know whattttt");
    console.log('string.replaceChar("I dont know whattttt") passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    string.replaceChar(162);
    console.error('did not error');
 } catch (e) {
    console.log('string.replaceChar(162) failed successfully');
 }

// Function: charSwap

try {
    // Should Pass
    string.charSwap("hellothere", "hello");
    console.log('string.charSwap("hellothere", "hello") passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    string.charSwap("hello there", "hello");
    console.error('did not error');
 } catch (e) {
    console.log('string.charSwap("hello there", "hello") failed successfully');
 }

// Function: deepEquality

try {
    // Should Pass
    const first = {a: {sA: "why", sB: "am", sC: "lose"}, b: 7, c: false, d: "Test"}
    const second  = {c: false, b: 7, d: "Test", a: {sB: "am", sC: "lose", sA: "why"}}

    object.deepEquality(first, second);
    console.log('object.deepEquality(first, second) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    
    object.deepEquality({a:0}, [1]);
    console.error('did not error');
 } catch (e) {
    console.log('object.deepEquality({a:0}, [1]) failed successfully');
 }

// Function: commonKeysValues

try {
    // Should Pass
    const first = {name: {first: "nylayah", last: "bins"}, daysOld: 150};
    const second = {school: "Stevens", name: {first: "nylayah", last: "bins"}};

    object.commonKeysValues(first, second);
    console.log('array.commonElements(first, second) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    object.commonKeysValues("yoooo", []);
    console.error('did not error');
 } catch (e) {
    console.log('object.commonKeysValues("yoooo", []) failed successfully');
 }

// Function: calculateObject

try {
    // Should Pass
    
    object.calculateObject({1: 2, 3: 0}, n => n**2);
    console.log('object.calculateObject({1: 2, 3: 0}, n => n**2) passed successfully');
 } catch (e) {
    console.error('failed test case');
 }
 try {
    // Should Fail
    object.calculateObject([1, 0], n**2);
    console.error('did not error');
 } catch (e) {
    console.log('object.calculateObject([1, 0], n**2) failed successfully');
 }
