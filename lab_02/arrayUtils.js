/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

function isArray(value, expression){
  if(typeof value != "object") throw `${expression} must be an array`;
  if(Array.isArray(value) != true) throw `${expression} must be an array`;
}

function onlyTwo(value, expression){
  if(value.length != 2) throw `${expression} must be an array with only two elements`
}

let arrayStats = (array) => {
  isArray(array, "Input");
  if(!array.length) throw "Array can not be empty";
  
  array.forEach((element) => {
    if(typeof element != "number") throw "Array must contain only numbers";
  });

  //sorts least to greatest
  array.sort((a, b) => a-b);

  //caluclates sum
  let sum = 0;
  array.forEach(element => { sum += element})

  //how many numbers in the array
  let count = array.length;

  //calculates mean
  let mean = sum/array.length;

  //calculates max and min / range
  let maximum = array[array.length-1];
  let minimum = array[0];
  let range = Math.abs(minimum) + maximum;

  //calculates median
  let median;
  if(array.length % 2 == 0){
    let topMedian = array[(array.length/2)];
    let lowMedian = array[(array.length/2)-1];
    median = (topMedian+lowMedian)/2;
  } else {
    median = array[((array.length+1)/2)-1];
  }

  // mode ->dictionary
  let dict = {};

  for(let m = 0; m < array.length; m++){
    if(dict.hasOwnProperty(array[m])){
      dict[array[m]] += 1;
      continue;
    }
    dict[array[m]] = 0;
  }
  let modeArray = [];
  let keys = Object.keys(dict);
  for(let k = 0; k < keys.length; k++){
    if(dict[keys[k+1]] - dict[keys[k]] >0){
      modeArray.push(keys[k+1]);
    }
  }

  modeArray.sort((a, b) => a-b);
  
  let arrayStat = (mean, median, mode, range, minium, maximum, count, sum) => ({
    mean: mean, 
    median: median,
    mode: mode,
    range: range,
    minimum: minium,
    maximum: maximum,
    count: count,
    sum: sum
  });

  return arrayStat(mean,median, modeArray, range, minimum, maximum, count, sum);
};



let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  let newObject = {}

  for(let i = 0; i < arrays.length; i++){
    onlyTwo(arrays[i]);
    isArray(arrays[i]);

    for(let x = 0; x < arrays[i].length; x++){
      if(arrays[i][0] === newObject[arrays[i]]){
        newObject[arrays[i][1]] = arrays[i][1];
      } else{
        newObject[arrays[i][0]] = arrays[i][1];
      }
    }
  }

  return newObject;
};



let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  let commonArray = [];
  if(arrays.length < 2) throw "Need at least two input parameters";
  if(!arrays[0].length) throw "Array can't be empty";
  isArray(arrays[0]);

  function compare(value1, value2){
    if(typeof value1 === "object" && typeof value2 === "object"){
      for(let x = 0; x < value1.length; x++){
        if(!compare(value1[x], value2[x])){
            return false;
        }
      }
      return true;
    }

    return value1 === value2;
}

  let count = 0;

  for(let k = 0; k < arrays[0].length; k++){

    for(let x = 1; x < arrays.length; x++){
      if(!arrays[x].length) throw "Array can not be empty";
      isArray(arrays[x]);
      for(let l = 0; l < arrays[x].length; l++){
        if(compare(arrays[0][k], arrays[x][l])){
          count ++;
          break;
        }
      }
    }
    
    if((count == (arrays.length-1))){
      commonArray.push(arrays[0][k]);
    }

    count = 0;
  }

   return commonArray;
};

module.exports = {
  arrayStats,
  makeObjects,
  commonElements
}