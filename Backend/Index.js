const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

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
    let selectedIndex = users.findIndex(user => user.id == id);
    
    
    //อัพเดตข้อมูล users
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;
    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
          
    });
    //ส่ง users ที่อัพเดตแล้วกลับไป
})

app.delete('/user/:id',(req,res) => {
    let id =req.params.id;
      let selectedIndex = users.findIndex(user => user.id == id);
    
    delete users[selectedIndex];
    res.json({
        message:'User deleted succeddfully',
        indexDelete: selectedIndex
    });
})

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`)
});