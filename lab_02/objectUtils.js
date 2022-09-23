/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
function isObject(value, expression){
      if(typeof value != "object") throw `${expression} must be an object`;
      if(Array.isArray(value) == true) throw `${expression} must be an object`;
}


let deepEquality = (obj1, obj2) => {
      isObject(obj1, "first input");
      isObject(obj2, "second input");

      let k1 = Object.keys(obj1);
      let k2 = Object.keys(obj2);
      
      if(k1.length != k2.length) return false;

      for(let k of k1){
            let valueK1 = obj1[k];
            let valueK2 = obj2[k];

            if(typeof valueK1 === "object" && typeof valueK2 === "object"){
                  deepEquality(valueK1, valueK2);
            } else if(valueK1 !== valueK2){
                  return false;
            }
      }

      return true;
};

let commonKeysValues = (obj1, obj2) => {
      isObject(obj1, "first input");
      isObject(obj2, "second input");

      let finalObject = {};
      
      let k1 = Object.keys(obj1);
      
      for(let k of k1){
            let valueK1 = obj1[k];
            let valueK2 = obj2[k];
            
            if(typeof valueK1 === "object" && typeof valueK2 === "object"){
                  commonKeysValues(valueK1, valueK2);
                  finalObject[k] = valueK1;
            } else if(valueK1 == valueK2){
                  finalObject[k] = valueK1;
            }

      }

      return finalObject;
};

let calculateObject = (object, func) => {
      if(typeof func != "function") throw "Must include a function";
      isObject(object);

      let keys = Object.keys(object);

      for(let k of keys){
            let val = object[k];
            if(typeof val != "number") throw "Values must be a number";
            if(isNaN(val)) throw "Values must be a number";

            object[k] = func(val);
      }
      
      keys.forEach( k => {
            if(object[k] < 0){
                  object[k] = isNaN(object[k]);
            } else{
                  object[k] = Number(Math.sqrt(object[k]).toFixed(2));
            }
      });

      return object;
};


module.exports = {
    deepEquality,
    commonKeysValues,
    calculateObject
}