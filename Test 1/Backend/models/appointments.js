const { getConnection } = require('../config/db')

//เรียกดูทั้งหมด
const findAll = async () => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT appointments.*, 
    customers.Name,
    service.Service_name,
    staff.Staff_name, 
    time_slots.Start_time , 
    time_slots.End_time

    FROM appointments

    JOIN customers 
      ON appointments.ID_customers = customers.ID_customer

    JOIN service 
      ON appointments.ID_service = service.ID_service

    JOIN staff 
      ON appointments.ID_staff = staff.ID_staff

    JOIN time_slots 
      ON appointments.ID_time_slots = time_slots.ID_time_slots

    WHERE appointments.Appointments_date >= CURDATE()
    ORDER BY appointments.Appointments_date ASC 
    `)
  return rows
}

//เรียกดูรายละเอียดทั้งหมดตามรายการเดียว
const findById = async (id) => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT appointments.*, 
    customers.Name,
    service.Service_name,
    staff.Staff_name, 
    time_slots.Start_time , 
    time_slots.End_time

    FROM appointments

    JOIN customers 
      ON appointments.ID_customers = customers.ID_customer

    JOIN service 
      ON appointments.ID_service = service.ID_service

    JOIN staff 
      ON appointments.ID_staff = staff.ID_staff

    JOIN time_slots 
      ON appointments.ID_time_slots = time_slots.ID_time_slots

    WHERE appointments.ID_appointments = ?
  `, [id])
  return rows[0]
}


// อันนี้เอาไว้เช็คคิวชน sus หาใน database ว่ามีคิวชนไหม
const sus = async (ID_staff,ID_time_slots,Appointments_date) => {
  const conn = await getConnection()
  const [rows] = await conn.query(`
    SELECT * FROM appointments
     WHERE ID_staff = ?
     AND ID_time_slots = ?
     AND Appointments_date = ?`
    ,[ID_staff, ID_time_slots, Appointments_date]
    )
    
  return rows
}


//อันนี้เป็นการเช็คว่ามีคิวชนไหมถ้ามีแจ้ง ถ้าไม่มีเพิ่มข้อมูลใหม่
const create = async (data) => {
  const conn = await getConnection()
  // เอาข้อมูลจาก sus มาใส่ในตัวแปร existing
  const existing = await sus(
    data.ID_staff,
    data.ID_time_slots,
    data.Appointments_date
  )
  //ตรวจ existing ว่ามีความยาวมากกว่า 0 ไหม คือถ้ามีความยาว=มีข้อมูล ถูกจองไว้แล้ว
  if (existing.length > 0) {
    throw new Error("เวลานี้ถูกจองแล้ว")
  }
  //ถ้าไม่เข้าเงื่อนไข จองคิวใหม่เลย วิธีเดี่ยวกับ create
  const [result] = await conn.query(`
    INSERT INTO appointments
    (ID_customers, ID_service, ID_staff, ID_time_slots, Appointments_date)
    VALUES (?, ?, ?, ?, ?)
  `,
  [
    data.ID_customers,
    data.ID_service,
    data.ID_staff,
    data.ID_time_slots,
    data.Appointments_date
  ])

  return result
}


//การอัปเดตข้อมูล พร้อมเช็คคิวชน
const update = async (id, data) => {
  const conn = await getConnection()
  const { ID_service,
    ID_staff,
    ID_time_slots,
    Appointments_date } = data
//เพิ่มตรงนี้นะที่เป็นเช็คคิวชน เรียกดูข้อมูลทั้งหมดจากตาราง appointments มาเก็บในตัวแปร existing 
  const existing = await conn.query(`
    SELECT*
    FROM appointments
    WHERE  ID_staff = ?
    AND ID_time_slots = ?
    AND Appointments_date = ?
    AND ID_appointments != ?
    `,[
      ID_staff,
      ID_time_slots,
      Appointments_date,
      id
    ])  
// เอา existing มาเช็กกกกกว่ามันมากกว่า 0 ไหม ถ้ามีขึ้น Error 
    if(existing[0].length > 0){
      throw new Error("เวลานี้ถูกจองแล้ว")
    }
// ถ้าผ่านเงื่อนไขอัฟเดตฮ่ะ
  const [result] = await conn.query(
    'UPDATE appointments SET ID_service=?, ID_staff=?, ID_time_slots=?, Appointments_date=? WHERE ID_appointments=?',
    [
    ID_service,
    ID_staff,
    ID_time_slots,
    Appointments_date,
    id
  ]
  )
  return result
}

//ลบข้อมูล
const remove = async (id) => {
  const conn = await getConnection()
  const [result] = await conn.query('DELETE FROM appointments WHERE ID_appointments = ?', [parseInt(id)])
  return result
}

module.exports = { findAll, findById, create, update, remove, sus}