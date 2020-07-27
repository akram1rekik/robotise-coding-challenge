const moment = require('moment');
const fs = require('fs');

const DATE_FORMAT = 'DD.MM.YYYY';
const MINIMUM_ANNUAL_VACATION = 26;
const MINIMUM_AGE_FOR_VACATION_BONUS = 30;


/**
 * calculate number of years of experience for a given year
 *
 * @param { String } startDate - format: 'DD.MM.YYYY'
 * @param { Number } year
 *
 * @return { Number }
 */
const getWorkExperience = ({ startDate, year }) => {
    return moment(`01.01.${year}`, DATE_FORMAT).diff(moment(startDate,DATE_FORMAT), 'year',false);
};


/**
 * get the age based on the birth date
 *
 * @param {String} birthDate - format: 'DD.MM.YYYY'
 *
 * @return {number}
 */
const getAge = (birthDate) => {
    return moment().diff(moment(birthDate, 'DD.MM.YYYY'), 'year',false);
};


/**
 * calculate additional vacation based on employee age and experience
 *
 * @param { String } startDate - format: 'DD.MM.YYYY'
 * @param { String } birthDate - format: 'DD.MM.YYYY'
 * @param { Number } year
 *
 * @return { Number }
 */
const getAdditionalVacation = ({ startDate, birthDate, year }) => {
    const age = getAge(birthDate);
    const workExperience = getWorkExperience({ startDate, year });

    if(age >= MINIMUM_AGE_FOR_VACATION_BONUS) {
        return Math.floor(workExperience / 5);
    }

    return 0;
};


/**
 * get annual vacation
 *
 * @param { Number } specialContract
 * @return { Number }
 */
const getAnnualVacation = (specialContract) => {
    if(specialContract && specialContract > MINIMUM_ANNUAL_VACATION) {
        return specialContract;
    }

    return MINIMUM_ANNUAL_VACATION;
};


/**
 * calculate vacation for a given year
 *
 * @param { String } startDate - format: 'DD.MM.YYYY'
 * @param { String } birthDate - format: 'DD.MM.YYYY'
 * @param { Number } year
 * @param { Number }specialContract
 *
 * @return { Number }
 */
const calculateVacation = ({ startDate, birthDate, specialContract, year }) => {
    const vacationBonus = getAdditionalVacation({ startDate, birthDate, year });
    const annualVacation = getAnnualVacation(specialContract);
    const yearOfStartDate = moment(startDate, DATE_FORMAT).year();

    if(year < yearOfStartDate) {
        return 0;
    }

    if(year > yearOfStartDate) {
        return annualVacation + vacationBonus;
    }

    let monthOfStartDate = moment(startDate, DATE_FORMAT).month();
    const dayOfStartDate = moment(startDate, DATE_FORMAT).date();

    if(dayOfStartDate !== 1) {
        monthOfStartDate += 1;
    }

    return Math.floor((annualVacation / 12) * (12-monthOfStartDate));
};


/**
 * read employees contracts in json format
 *
 * @param { String } path
 *
 * @return {Array}
 */
const readEmployeesContracts = (path) => {
    return JSON.parse(fs.readFileSync(path, 'utf8'));
};


/**
 * write all employees vacation for a given year to file
 */
const printAllEmployeesVacationForAGivenYear = () => {
    const year = parseInt(process.argv[2]);
    let output = `Name\t\t\tYearly Vacation (in days)\n\n`;
    const employeesContracts = readEmployeesContracts('./employees-contracts.json');

    for(const { name, startDate, birthDate, specialContract } of employeesContracts) {
        const vacation = calculateVacation({ startDate, birthDate, specialContract, year });
        output += `${name}\t\t\t${vacation}\n`;
    }

    fs.writeFileSync('./output', output);
};

// main method to be run via command line
// output will be written to file named "output" in the current directory
printAllEmployeesVacationForAGivenYear();

// export some method for testing
module.exports = { calculateVacation };