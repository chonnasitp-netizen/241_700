<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

const port = 8000;

app.get('/testdb', (req, res) =>{
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        databast: 'webdb',
        pory:8700
    }).then((conn)=>{
        conn
        .queny('SELECT * FROM users')
        .then((results)=>{
            res.json(results[0]);
        }).catch((err)=> {
            res.json({error:err.message});
        });
    })
})

let users = [];
let counter = 1;

/**
 *  GET/user - ดึงข้อมูลผู้ใช้ทั้งหมก
 *  POST/user - เพิ่มผู้ใช้ใหม่
 *  GET/user:id - ดึงข้อมูลผู้ใช้ตาม ID
 *  PUT/user:id - แก้ข้อมูลผู้ใช้ตาม ID
 *  DELETE/user:id - ฃบผู้ใช้ตาม IDที่บันทึก  
 */
app.get('/users',(req, res) => {

    res.json(users);
});


//post
app.post('/user',(req, res) => {
    let user = req.body;
    user.id = counter
    counter += 1;
    users.push(user);
    res.json({
        message:'User added successfully',
        user: user
    });
});



//past:=PUT /user/:id
app.patch('/user/:id',(req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    //หา user จาก id ที่ส่งมา
    let selectIndex = users.findIndex(user => user.id == id);
    
    
    //อัพเดตข้อมูล users
    users[selectIndex].firstname = updateUser.firstname || users[selectIndex].firstname;
    users[selectIndex].lastname = updateUser.lastname || users[selectIndex].lastname;
    if (updateUser.firstname) {
        users[selectIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        data: {
            user: updateUser,
            indexUpdate: selectIndex
        }
          
    });
    //ส่ง users ที่อัพเดตแล้วกลับไป
})

app.delete('/user/:id',(req,res) => {
    let id =req.params.id;
      let selectIndex = users.findIndex(user => user.id == id);
    
    delete users[selectIndex];
    res.json({
        message:'User deleted succeddfully',
        indexDelete: selectIndex
    });
})

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`)

//ทำการ import โมดูล HTTP
const http = require('http');
const host = 'localhost';
const port = 8000;


const reqestlistener  = function(req,res){
    res.writeHead(200);
    res.end('Hello, World! This is my first server.');
}


const server = http.createServer(reqestlistener);
server.listen(port,host,() => {
    console.log(`Server is running on http://${host}:${port}`);

});