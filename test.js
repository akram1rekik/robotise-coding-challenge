const test = require('ava');
const { calculateVacation } = require('./index');


test('calculate vacation for Hans Müller', t => {
    const vacationOf1999 = calculateVacation({
        startDate: '01.01.2002',
        birthDate: '29.11.1951',
        specialContract: undefined,
        year: 1999,
    });

    const vacationOf2002 = calculateVacation({
        startDate: '01.01.2002',
        birthDate: '29.11.1951',
        specialContract: undefined,
        year: 2002,
    });

    const vacationOf2023 = calculateVacation({
        startDate: '01.01.2002',
        birthDate: '29.11.1951',
        specialContract: undefined,
        year: 2023,
    });

    t.is(vacationOf1999, 0);
    t.is(vacationOf2002, 26);
    t.is(vacationOf2023, 30);
});


test('calculate vacation for Peter Becker', t => {
    const vacationOf2017 = calculateVacation({
        startDate: '15.05.2017',
        birthDate: '11.08.1992',
        specialContract: 29,
        year: 2017,
    });

    const vacationOf2020 = calculateVacation({
        startDate: '15.05.2017',
        birthDate: '11.08.1992',
        specialContract: 29,
        year: 2020,
    });

    const vacationOf2030 = calculateVacation({
        startDate: '15.05.2017',
        birthDate: '11.08.1992',
        specialContract: 29,
        year: 2030,
    });

    t.is(vacationOf2017, 16);
    t.is(vacationOf2020, 29);
    t.is(vacationOf2030, 29);
});


test('calculate vacation for Robert Schmidt', t => {
    const vacationOf2018 = calculateVacation({
        startDate: '01.12.2018',
        birthDate: '24.06.1981',
        specialContract: undefined,
        year: 2018,
    });

    const vacationOf2020 = calculateVacation({
        startDate: '01.12.2018',
        birthDate: '24.06.1981',
        specialContract: undefined,
        year: 2020,
    });

    const vacationOf2025 = calculateVacation({
        startDate: '01.12.2018',
        birthDate: '24.06.1981',
        specialContract: undefined,
        year: 2025,
    });

    t.is(vacationOf2018, 2);
    t.is(vacationOf2020, 26);
    t.is(vacationOf2025, 27);
});