const BASE_URL ='http://localhost:8000';

let mode = 'CREATE'; // เพิ่มข้อมูลใหม่
let selectdID = '';

window.onload = async () => {
    const urlParame = new   URLSearchParams(window.location.search);
    const id = urlParame.get('id');
    console.log('id',id);
    if (id) {
        mode ='EDIT';
        selectdID =id;

        //1.ดึงข้อมูล user จาก id นั้น
        try{
            const response = await axios.get(`${BASE_URL}/users/${id}`);
            console.log('response',response.data);
            const users = response.data;
            //2.ข้อมูล user ที่ได้มาแสดงในฟรอม เพื่อให้ผู้ใช้แก้ไขข้อมูล
             let firstnameDOM = document.querySelector('input[name=firstname]');
             let lastnameDOM = document.querySelector('input[name=lastname]');
             let ageDOM = document.querySelector('input[name=age]');
             let descriptionDOM = document.querySelector('textarea[name=description]');

             firstnameDOM.value = users.firstname;
             lastnameDOM.value = users.lastname;
             ageDOM.value = users.age;
             descriptionDOM.value = users.description;

             let genderDOMs = document.querySelectorAll('input[name=gender]');
             let interestDOMs = document.querySelectorAll('input[name=interests]');

             for (let i =0; i <genderDOMs.length; i++){
                if (genderDOMs[i].value == users.gender){
                    genderDOMs[i].checked = true;
                }
             }

             for (let i = 0; i <interestDOMs.length;i++){
                if(users.interests.includes(interestDOMs[i].value)){
                    interestDOMs[i].checked =true;
                }
             }


        }catch(error){
            console.log('error',error);
        }


        
    }
}

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstName) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastName) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
}

const submitData = async () => {
    let firstnameDOM = document.querySelector('input[name=firstname]');
    let lastnameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {}; //input type radio more than one, need to specify checked
    let interestDOMs = document.querySelectorAll('input[name=interests]:checked') || {};
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');
    try {
        let interest = ''
        for (let i = 0; i < interestDOMs.length; i++) {
            interest += interestDOMs[i].value
            if (i != interestDOMs.length - 1) {
                interest += ','
            }
        }

        //const errors = validateData(user);
        //if (errors.length > 0){
        //    throw {
        //        message :  'กรุณากรอกข้อมูลให้ครอบถ้วน' ,
        //        errors : errors
        //    }
        //}

        let userData = {
            firstName: firstnameDOM.value, //get value 
            lastName: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            description: descriptionDOM.value,
            interests: interest //get value from loop(checkbox more than one)
        }
        console.log('submitData', userData);

        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }

        let message = 'บันทึกข้อมูลสำเร็จ';

        if (mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/users`,userData);
            console.log('response',response.data);
        } else {
            const response = await axios.put(`${BASE_URL}/users/${selectdID}`, userData);
            message = 'แก้ไขข้อมูลสำเร็จ';
            console.log('response',response.data);
        }

        const response = await axios.post(`${BASE_URL}/users`, userData);
        console.log('respose', response);

        messageDOM.innerText = "บันทึกข้อมูลสำเร็จ";
        messageDOM.className = "message success";
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);

        if (error.response) {
            console.error('Error response:', error.response.data.message);
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`;
        htmlData += '<ul>'
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }
        htmlData += '</ul>';
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = "message danger";
    }
}