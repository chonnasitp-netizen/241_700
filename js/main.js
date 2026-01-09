
/*
//ข้อความนะจ๊ะ
let fname =  'john'
console.log('name',fname)
const idcard = '123'
//ตัวเลข
let age = 30
//ทศนิยม
let height = 170.5
const pi = 3.14
fname = 'Tom'

// boolean
// อะไรก็ตามที่อยู่ใน '' เป็นตัวแปร string ข้อความ เสมอ

console.log('name',fname,'age',age)
console.log('idcard',idcard)
*/

/**
 + บวก
 - ลบ
 * คูณ
 / หาร
 % mod
 */
  
/**
 condition statement (if,else,switch)
 == เท่า
 != ไม่เท่า
 > , >= มากกว่า,มากกว่าเท่ากับ
 < , <=
 */

 /**
let num1 = prompt('ใส่เลข')
if(num1>=80){
    console.log('You have grade A')
} else if(num1>=70){
    console.log('You have grade B')
} else if(num1>=60){
    console.log('You have grade C')
} else if(num1>=50){
    console.log('You have grade D')
} else{
    console.log('You have grade F')
}
  */

/**
 && และ ทั้งสองตัว
 || หรือ สักตัว
 ! not ไม่่่
 */

 /*
for
*/
/*
let  counter = 0

while(counter = 10) {//เปลี่ยน True เป็น false
    console.log('hi')
    counter = counter + 1
}

for (let counter=0;counter<10;counter++)
{
    console.log('HI')
}
*/

/*
let age1= 20
let age2= 25
let age3= 30

let ages= [20,25,30]

console.log('age1 age2 age3',age1,age2,age3)
console.log(`age1 age2 age3 ${age1} ${age2} ${age3}`)
console.log('array',ages)

//ต่อ array
ages.push(25)
console.log('push array',ages)
//ลบarrayตัวสุดท้าย
ages.push()
console.log('pop array',ages)
*/
 /*
let ages = [20,25,30,35,40]

if(ages.includes(30)) {
    console.log('has 30 in array')
}

ages.sort()
console.log(ages)

let name_list = ['aa','bb','cc']
name_list.push('dd')
console.log(name_list)

name_list.pop()
console.log('pop name_list',name_list)

//ขนาด array
console.log('name_list',name_list.length)

for (let index = 0 ; index< name_list.length; index++)
{
    console.log('name list',name_list[index])
}
*/
/*
//odject เก็บหลายตัวแปรในตัวแปรเดียว
let student = [{
    age:30,
    name: 'aa',
    grade: 'A'
},{
    age:35,
    name: 'bb',
    grade: 'B'
}]
for (let index = 0 ; index < student.length;index++){
    console.log('student number',(index +1))
    console.log('age',student[index].age)
    console.log('name',student[index].name)
    console.log('grade',student[index].grade)
}
*/
//function

/*
let score1 =5
let score2 = 65
//ประกาศ
let grade=''
function calculat_garde(parameter){
 if(score>=80){
    grade ='A'
 } else if(score>=70){
    grade ='B'
 } else if(score>=60){
    grade ='C'
 } else if(score>=50){
    grade ='D'
 } else{
    grade = 'F'
 }
 return grade
}

//เรียกใช้
let grade1 = calculat_garde(score1)
console.log('Grade',grade1)
let grade2 =calculat_garde(score2)
*/

//array
/*let score = [20,30,40,50]

for (let index = 0 ; index < score.length; index++){
    console.log('score',score[index])
}

score[0] = score[0]*2
score[1] = score[1]*2
score[2] = score[2]*2
score[3] = score[3]*2

score = score.map ((s) => {
    return s * 2
})
score.forEach((s)=>{
    console.log('forEach Score',s)
})
*/
/*
let score = [20,30,40,50]

for (let index = 0; index <  score.length;index++){
    console.log('score',score[index])
}

let newScore = score.filter((s) => {
   return s >= 30
})

newScore,forEach((ns)=> {
    console.log('New Score',ns)
})
*/

let students = [
    {
        name:'aa',
        scoer: 50,
        grede:'A'
    },{
        name:'bb',
        scoer: 650,
        grede:'B'
    }
]

let student= students.find((s) => {
    if (s.name == 'aa'){
        return true
    }
})
let double_score = students.map((s) => {
    s.scoer = s.scoer * 2 
    return s
})
let heightScore = students.filter((s) => {
    if(s.scoer >= 60){
        return true
    }
})

console.log(student)

console.log('double_score',double_score)
console.log('highScore',heightScore)