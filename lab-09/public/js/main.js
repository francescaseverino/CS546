/*
Using JavaScript in your browser only, you will listen for the form's submit event; when the form is submitted, you will:
-Get the value of the input text element.  
-You should be expecting a variable number of arrays typed into the input separated by commas:  For example: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29]
-All array elements should be whole numbers (negative and 0 are allowed), no decimals. 
-Each array should have at least one element that is a whole number (negative and 0 are allowed), no decimals. 
-You can ignore any extra commas for example, inputting: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29], 
-There should be at least one array inputted. 
-You will then return a single array that has all the values from the arrays inputted sorted from lowest to highest number.  For example:  If our input was: [3,0,1,2,4], [1,2,8,15], [6,3,10,25,29] You would return:  [0,1,1,2,2,3,3,4,6,8,10,15,25,29]
-Add a list item to the #results list of result of the sort you have just completed. You will alternate the class for each list item using the classes is-green and is-red (described below), starting with is-green first.
-If the user does not have a value for the input when they submit, you should not continue processing and instead should inform them of an error somehow.
*/
(function (){
    function isValidInput(input){

        if(!input || input.trim().length == 0){return false}
        input = input.trim();
    
        //removing the spaces
        // and making sure there are no empty arrays + a comma in front
        input = input.replaceAll(' ', '');
        if(input.indexOf("[]") != -1){return false}
        if(input[0]==","){return false}
    
        // make sure each have valid brackets
        let temp = input;
        if(!temp.includes('[') || !temp.includes(']')){return false}
        while(temp.includes('],')){
            temp = temp.replace('],', '] ').split(' ').filter(Boolean);
            for(let x = 0; x < temp.length; x++){
                if(!temp[x].includes('[') || !temp[x].includes(']')){return false}
            }
        }
    
        // reassign variable 'temp' to count how many commas there are
        temp = input;
        let count = 0;
        if(temp[temp.length-1] == ','){count--;}
        while(temp.includes('],')){
            temp = temp.replace('],', '');
            count++;
        }
        console.log(count);
        // setting up for checking each element
        input = input.replaceAll('],', '] ').trim().replaceAll('[', '').replaceAll('[', '').split(']').filter(Boolean);
    
        // make sure there is a comma for each array
        if(count != input.length){
            if(count != input.length-1){
                return false;
            }
        }
    
        // loop to check if each is a whole number, no decimals
        for(let x = 0; x < input.length; x++){
    
            input[x] = input[x].replaceAll('-', '');
    
            let temp = input[x].split(',');
            console.log(temp)
            for(let i = 0; i < temp.length; i++){
                if(temp[i] == '' || temp[i].trim().length == 0){return false}
            }
    
            input[x] = input[x].replaceAll(',', '');
    
            if(isNaN(input[x]) || !Number.isInteger(Number(input[x]))){return false}
            if(input[x].trim().length == 0){return false}
        }
    
        return true;
    }
    
    function sort(input){
        input = input.trim()
            .replaceAll(' ', '')
            .replaceAll('[', '')
            .replaceAll(']', '')
            .split(',')
            .filter(Boolean)
            .sort((a, b) =>{
                    return a - b;
                }
        );
    
        input = "[" + input.toString() + "]";
        return input;
    }
    
    let sortForm = document.getElementById('arraysortForm');
    let input = document.getElementById('input');
    let error = document.getElementById('error');
    let results = document.getElementById('results');
    let output = document.getElementById('output');

    if(sortForm){
        sortForm.addEventListener('submit', (event) => {
            event.preventDefault();

            if(isValidInput(input.value)){
                error.hidden = true;
                results.hidden = false;
                output.hidden = false;
                let li = document.createElement('li');
                li.innerHTML = sort(input.value);
                results.appendChild(li);
                if(li.previousElementSibling && li.previousElementSibling.className == 'is-green'){
                    li.className = 'is-red';
                } else {
                    li.className = 'is-green';
                }
                sortForm.reset();
                input.focus();
            } else {
                error.hidden = false;
                output.hidden = true;
                results.hidden = true;
                error.innerHTML = "Please enter a list arrays with each containing at least one whole number, separated by a comma."
                input.focus();
            }
        });
    }
}) ();