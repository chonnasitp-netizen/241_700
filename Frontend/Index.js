<<<<<<< HEAD
function submitData () {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let interest = ''
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value 
        if (i != interestDOMs.length - 1) {
            interest += ','
        }
    }

    let userData ={
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interest: interest
    }
     console.log('submitData', userData);
=======
function submitData () {
    let firstNameDOM = document.querySelector('input[name=firstname]');
    let lastNameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked');
    let interestDOMs = document.querySelectorAll('input[name=interest]:checked');
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let interest = ''
    for (let i = 0; i < interestDOMs.length; i++) {
        interest += interestDOMs[i].value 
        if (i != interestDOMs.length - 1) {
            interest += ','
        }
    }

    let userData ={
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interest: interest
    }
     console.log('submitData', userData);
>>>>>>> 46038cbd6f4c5a9f3229e24d3c53b33949574ba2
}