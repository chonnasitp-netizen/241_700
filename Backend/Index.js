const express = require('express');
// ดึงเอาไลบรารี express มาใช้สำหรับสร้างเว็บเซิร์ฟเวอร์และ API

const bodyParser = require('body-parser');
//ดึงตัวช่วยสำหรับแปลงข้อมูลที่ส่งเข้ามา (Request Body) ให้อ่านง่ายขึ้น

const mysql = require('mysql2/promise');
//ดึงไลบรารีสำหรับต่อฐานข้อมูล MySQL (ใช้เวอร์ชัน promise เพื่อให้เขียนโค้ดแบบรอจังหวะ

const app = express();
//สร้างตัวแทนเซิร์ฟเวอร์ของเราขึ้นมาและเก็บไว้ในตัวแปร app

const cors = require('cors'); 
app.use(cors());      
//ดึงเครื่องมือแก้ปัญหา "CORS (Cross-Origin Resource Sharing)" ซึ่งจำเป็นมากเวลาที่ตัวหน้าเว็บ (เช่น รันพอร์ต 3000) จะเรียกใช้งาน API (รันพอร์ต 8000) ที่อยู่คนละโดเมนกัน
//เปิดให้หน้าเว็บจากแหล่งอื่นสามารถเข้ามาดึงข้อมูลจาก API นี้ได้

app.use(bodyParser.json());
// สั่งให้เซิร์ฟเวอร์แปลงข้อมูลที่แนบมาแบบ JSON ให้กลายเป็น Object อัตโนมัติ เพื่อให้เราเอาไปใช้ต่อได้ง่ายๆ


const port = 8000;//กำหนดว่า API Server นี้จะรันอยู่ที่พอร์ต 8000 (เช่น http://localhost:8000)
let conn; // ประกาศตัวแปรเปล่าๆ เตรียมไว้เก็บสถานะการเชื่อมต่อฐานข้อมูล เพื่อให้ทุกๆ ฟังก์ชันในไฟล์นี้เรียกใช้ได้


const initmySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
};
//26 สร้างฟังก์ชันสำหรับสตาร์ทการเชื่อมต่อ MySQL
//27 - 33 ระบุข้อมูลสำหรับต่อฐานข้อมูล (สังเกตว่าพอร์ตคือ 8700 ซึ่งตรงกับที่ตั้งค่าไว้ในไฟล์ Docker Compose ก่อนหน้านี้พอดีครับ)
//34 พิมพ์แจ้งเตือนในหน้าต่าง Console ว่าต่อฐานข้อมูลสำเร็จแล้ว


// เส้นการทำงาน
// GET /users - ดึงข้อมูลทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});
//43 กำหนดเส้นทางแบบ GET ไปที่ /users asyncรันตัวอื่นได้ไม่ต้องรอตัวนี้เสร็จก่อน (req = คำร้องขอ,res = การตอบกลับ)
//try { ... } catch (error) { ... }: เป็นการดักจับข้อผิดพลาด ถ้าฐานข้อมูลล่ม มันจะไม่ทำเซิร์ฟเวอร์พัง แต่จะวิ่งไปที่ catch แทน
//await conn.query(...): สั่งรันคำสั่ง SQL เพื่อดึงข้อมูลทั้งหมดจากตาราง users
//res.json(results[0]);: ส่งข้อมูลกลับไปให้หน้าเว็บในรูปแบบ JSON (เหตุผลที่ต้องใช้ [0] เพราะไลบรารีนี้จะคืนค่ามาเป็น Array 2 ก้อน ก้อนแรกคือข้อมูลจริง ก้อนสองคือข้อมูลโครงสร้างตาราง เราต้องการแค่ก้อนแรกครับ)
// res.status(500)...: ส่งรหัส Error 500 (Internal Server Error) พร้อมข้อความ 'Error fetching users' กลับไปหากเกิดปัญหา


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
//58 คำสั่งตรวจสอบข้อมูล
//59 สร้าง error เป็นกล่องที่พร้อมเก็บค่า
//  ตรวจสอบค่าใน userDataของแต่ละช่องว่าเป็นค่า ว่าง หรือ ไม่ ถ้าว่างใส่ค่าเข้าไปใน error ที่รออยู่ว่าเป็น error ตัวไหน

// POST /users - เพิ่มผู้ใช้ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        //เช็ค error โยนสคริปไปขว้าง
        if (errors.length > 0){
            throw {
                message :  'กรุณากรอกข้อมูลให้ครอบถ้วน' ,
                errors : errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    } catch (error) {
        const errorMessage = error.message || 'Error adding user';
        const errors = error.error || {};
        console.error('Error inserting user:', error);
        res.status(500).json({ 
            message:errorMessage,
            errors: errors
        });
    }
});

// GET /users/:id - ดึง user ตาม id
app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id); // แก้ SQL และ space
        if (results[0].length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0][0]); // แก้การเข้าถึงข้อมูลตัวแรก
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
}); 

// PUT /user/:id - แก้ไขข้อมูล
app.put('/user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]); // แก้ await และ space
        res.json({
            message: 'User updated successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// DELETE /users/:id - ลบ user
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', id);
        res.json({
            message: 'User deleted successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

app.listen(port, async () => {
    await initmySQL();
    console.log(`Server is running on http://localhost:${port}`);
});