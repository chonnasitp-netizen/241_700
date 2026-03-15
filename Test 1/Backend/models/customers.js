const { getConnection } = require('../config/db')

//ตรงนี้เรียกดูลูกค้าาาาทั้งหมด
const findAll = async () => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT * 
    FROM customers
    ORDER BY ID_customers ASC 
    `)
  return rows
}

//เรียก ลูกค้าา ตาม id 
const findById = async (id) => {
    const conn = await getConnection()
    const [rows] = await conn.query(`
        SELECT * 
        FROM customers
        WHERE ID_customers = ?
    `,[id])
   return rows[0]     
}

//สร้างข้อมูล ลูกค้า เพิ่มนะ
const create = async (data) => {
    const conn = await getConnection()
    const [result] = await conn.query(
        'INSERT INTO customers (Name, Phone, Email, Password, Created_date) VALUES(?, ?, ?, ?, ?)',
        [Name, Phone, Email, Password, Created_date]
     )
     return result
}

//อัฟเดต
const update = async (id,data) => {
  const conn = await getConnection()
  const [result] = await conn.query(
    'UPDATE customers SET '
  )
}