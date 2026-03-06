/*const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { use, memo } = require('react');
const mysql = require('mysql2/promise')
app.use(bodyParser.json())



const port = 8000;
const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    })
    console.log('Connected to MySQL database');
}

app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
});

app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'User added successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('Error inserting user', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', id);
        if (results[0].length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.json(results[0][0]);
    } catch (error) {
        console.error('Error fetching user:'.error);
        let statussCode = error.statussCode || 500;
        res.status(statussCode).json({
            message: error.message || 'Error fetching user'
        })
    }
});

app.put('/users/:id',async(req, res)=>{
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
        res.json({
            message: 'User deleted successfully',
            data: results[0]
            });
    } catch (error) {
        console.error('Error updated user:', error)
        res.status(500).json({ message: 'Error updated user' });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id=?', id)
        res.json({
            message: 'User deleted successfully',
            data: results[0]
        })
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

app.listen(port, async () => {
    await initMySQL();
    console.log(`Sever is running on http://localhost:${port}`)
});*/




const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

const cors = require('cors'); 
app.use(cors());      

app.use(bodyParser.json());

const port = 8000;
let conn; // ประกาศไว้ตรงนี้เพื่อให้เรียกใช้ได้ทุกที่

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

// GET /users - ดึงข้อมูลทั้งหมด
app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// POST /users - เพิ่มผู้ใช้ใหม่
app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({ message: 'Error adding user' });
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