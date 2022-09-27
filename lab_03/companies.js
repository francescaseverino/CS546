const axios = require('axios');

async function getCompany(){
    const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
    return data;
}

async function getPeople(){
    const{data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
    return data;
}

function isID(id){
    if(!id){throw "No paramter provided"} 
    if(typeof id !== "string"){throw "Parameter is not a string"}
    if(id.trim().length == 0){throw "Parameter is just empty spaces"}
}

function isIndustry(industry){
    if(!industry){throw "No paramter provided"} 
    if(typeof industry !== "string"){throw "Parameter is not a string"}
    if(industry.trim().length == 0){throw "Parameter is just empty spaces"}
}

function isCompany(companyName){
    if(!companyName){throw "No paramter provided"} 
    if(typeof companyName !== "string"){throw "Parameter is not a string"}
    if(companyName.trim().length == 0){throw "Parameter is just empty spaces"}
}

const listEmployees = async (companyName) => {
    isCompany(companyName);
    let dataCompany = await getCompany();
    let dataPeople = await getPeople();
    let company = dataCompany.find((object) =>{
        return object.name === companyName;
    })
    
    if(!company){throw `No company with name ${companyName}`}
    let dataEmployee = dataPeople.filter((object) =>{
        return object.company_id === company.id;
    })

    let employees = [];
    let lastnames = [];

    for(let i = 0; i < dataEmployee.length; i++){
        let lastname = dataEmployee[i].last_name;
        lastnames.push(lastname);
    }
    lastnames.sort();

    for(let i = 0; i < lastnames.length; i++){
        for(let x = 0; x < dataEmployee.length; x++){
            if(lastnames[i] === dataEmployee[x].last_name){
                let firstname = dataEmployee[x].first_name;
                employees.push(firstname.concat(" ", lastnames[i]));
            }
        }
        
    }

    company.employees = employees;

    return company;
};

const sameIndustry = async (industry) => {
    isIndustry(industry);
    let data = await getCompany();
    let industrydata = data.filter((object) =>{
        return object.industry === industry;
    })

    if(industrydata.length == 0){throw "No companies in that industry"}

    return industrydata;
};

const getCompanyById = async (id) => {
    isID(id);
    let data = await getCompany();
    let company = data.find((object) => {
        return object.id === id;
    })

    if(!company){throw "Company not found"}

    return company;
};

module.exports = {
    getCompanyById,
    sameIndustry,
    listEmployees
};
