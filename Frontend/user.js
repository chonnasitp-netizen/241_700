//1. โหลดตัว user ทั้งหมดจากเส้น api http://localhost:8000/users

//2. นำ user ที่ได้มาแสดงในหน้าเว็บใน html 
const BASE_URL = "http://localhost:8000";
window.onload = async () => {
    await loadData();
}

const loadData = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    console.log(response.data);
    const userDOM = document.getElementById("user");
    let htmlData = '<div>';
    for (let i = 0; i < response.data.length; i++) {
        let user = response.data[i];
        htmlData += ` <div>
        ${user.firstname} ${user.lastname} 
        <a href ="index.html?id=${user.id}"><button>Edit</button></a>
        <button class='delete' data-id='${user.id}'>Delete</button>
        </div>`
    } // edit แล้วต้องกลับไปที่หน้าเพิ่มข้อมูล เราต้องการแก้ข้อมูลจะต่อuil แบบ 
    htmlData += '</div>';
    userDOM.innerHTML = htmlData;

    const deleteDOMs = document.getElementsByClassName("delete");
    for (let i = 0; i < deleteDOMs.length; i++) {
        deleteDOMs[i].addEventListener("click", async (event) => {
            // ดึง id ของ user ที่ต้องการลบจาก data-id attribute
            const id = event.target.dataset.id;
            try{
                //เอาไว้บน โหลดก่อนลบ 
                await axios.delete(`${BASE_URL}/users/${id}`);
                //เอาไว้ล่าง ลบแล้วโหลดเช็ด
                loadData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
            }catch(error){
                console.error("Error deleting user:", error);
            }    
        });
    }
}