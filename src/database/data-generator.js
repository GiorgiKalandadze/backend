const fs = require('fs');
const {generateRandomNumber} = require('../utils');

const STEPS = 10000;

const firstNames = await getTxtAsList('firstNames.txt');
const secondNames = await getTxtAsList('secondNames.txt');
const departments = await getTxtAsList('departments.txt');
const employees = generateEmployeeData(STEPS, firstNames, secondNames, departments);

fs.writeFileSync('./json/employees.json', JSON.stringify(employees));

const firstNamesJSON = indexedJSONFromTxt(firstNames, 'firstName');
fs.writeFileSync('./json/firstNames.json', JSON.stringify(firstNamesJSON));
const secondNamesJSON = indexedJSONFromTxt(secondNames, 'secondName');
fs.writeFileSync('./json/secondNames.json', JSON.stringify(secondNamesJSON));
const departmentsJSON = indexedJSONFromTxt(departments, 'department');
fs.writeFileSync('./json/departments.json', JSON.stringify(departmentsJSON));

function indexedJSONFromTxt(array, key) {
    const resultArray = [];
    for(const index in array) {
        const obj = {id: index};
        obj[key] = array[index];
        resultArray.push(obj);
    }
    return resultArray;
}

async function getTxtAsList(fileName) {
    let data = await fs.readFile(`./txt/${fileName}`, 'utf8');
    return data.split(/\r?\n/);
}

function generateEmployeeData(steps, firstNames, secondNames, departments) {
    const employees = [];
    let firstName, secondName, department;
    for(let i = 0; i < STEPS; i++){
        firstName = firstNames[generateRandomNumber(0, firstNames.length - 1)];
        secondName = secondNames[generateRandomNumber(0, secondNames.length - 1)];
        department = departments[generateRandomNumber(0, departments.length - 1)];
        const employee = {id: i, firstName, secondName, department};
        employees.push(employee);
    }
    return employees;
}

