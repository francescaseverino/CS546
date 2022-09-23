/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

function isString(value, expression){
      if(typeof value != "string") throw `${expression} must be a string`;
      if(value.trim().length === 0 || !value.length) throw "Input can not be empty";
}


let palindromes = (string) => {
      isString(string, "Input");
      let finalArr = [];

      // clears string of any punctuation and places into an array of
      let newString = string.replace(/[!@#$%^&*><}?{()_+-=:;,.'"]/g, "");
      const arr = newString.split(" ");

      //helper to determine if word is pal 
      let isPalindromes = (value) =>{
            let reverseWord = value.split("").reverse().join("");
            return value.toLowerCase() === reverseWord.toLowerCase();
      };

      for (let a = 0; a < arr.length; a++){
            if(isPalindromes(arr[a]) == true){
                  finalArr.push(arr[a]);
            }
      }
      return finalArr;
};

let replaceChar = (string) => {
      isString(string, "Input");
      let arr = [];
      let count = 0;

      for(let i = 0; i < string.length; i += 1){
            if(i%2 != 0){
                  if(count == 0){
                        arr.push("*");
                        count++;
                  } else {
                        arr.push("$");
                        count--;
                  }
            } else {
                  arr.push(string[i]);
            }
      }
      return arr.join("");
};

let charSwap = (string1, string2) => {
      isString(string1);
      isString(string2);

      if(string1.includes(" ")) throw "String must not have spaces";
      if(string2.includes(" ")) throw "String must not have spaces";
      
      if((string1.length < 4) || (string2.length < 4)) throw "String input need to be at least 4 characters."

      let swap1a = string1.substring(0, 4);
      let swap1b = string1.substring(4, string1.length);
      let swap2a = string2.substring(0, 4);
      let swap2b = string2.substring(4, string2.length);

      let firstString = swap2a.concat(swap1b);
      let secondString = swap1a.concat(swap2b);
      
      return firstString.concat(" ", secondString);
};

module.exports = {
      palindromes,
      replaceChar,
      charSwap,
}