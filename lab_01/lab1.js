function questionOne(arr) {
  
  const originalArray = arr;
  let resultArray = [];

  for(let n = 0; n < originalArray.length; n++){
    let num = originalArray[n];

    if (num == 2 || num == 3){
      resultArray.push(true);
      continue;
    }

    if(num <= 1 || num % 2 == 0 || num % 3 == 0){
      resultArray.push(false);
      continue;
    } 
    
    //if not prime, one of its factors is less than sqrt of that num
    for(let x = 5; x < Math.sqrt(num); x += 6){
      if(num % x == 0 || num % (x + 2) == 0){
        resultArray.push(false);
        break;
      }
    }

    if(resultArray.length != n+1){
      resultArray.push(true);
    }
  }
  return resultArray;
}


function questionTwo(startingNumber, commonRatio, numberOfTerms) {

  let a = startingNumber;
  let r = commonRatio;
  let terms = numberOfTerms;
  let sum = 0;

  if(terms <= 0 || terms % 1 != 0){
    return NaN;
  }

  if(a == 0 || r == 0){
    return 0;
  }

  //mathematical equation for geometric sum
  return (a * ((1- Math.pow(r, terms))/(1 - r)));
}


function questionThree(str) {

  let phrase = str;
  let count = 0;
  const vowels = {
    a: 97,
    A: 65,
    e: 101,
    E: 69,
    i: 105,
    I: 73,
    o: 111,
    O: 79,
    u: 117,
    U: 85, 
  }

  for(let x = 0; x < phrase.length; x++){

    if((65 <= phrase.charCodeAt(x) && phrase.charCodeAt(x) <= 90)){
      count++;
    }
    if((97 <= phrase.charCodeAt(x) && phrase.charCodeAt(x) <= 122)){
      count++;
    }
    //loop through object list of vowels
    for(const vowel in vowels){
      if(vowels[vowel] === phrase.charCodeAt(x)){
        count--;
        break;
      }
    }
    
  }
  return count;
}


function questionFour(fullString, substring) {

  let full = fullString;
  let sub = substring;
  let length = sub.length;
  let count = 0;

  for(let x = 0; x < fullString.length; x++){
    if(full.substring(x, x+length) == sub){
      x = x + length -1;
      count++;
    }
  }
  return count;
}


//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Francesca',
  lastName: 'Severino',
  studentId: '10444975',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};