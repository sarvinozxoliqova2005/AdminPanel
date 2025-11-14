let students = JSON.parse (localStorage.getItem ("students") || "[]");
let search = document.getElementById ("search-input");
localStorage.setItem ("students" , JSON.stringify(students));
let selectGroup = document.getElementById ("select-group");
let selectAddress = document.getElementById ("select-address");
let tbody = document.getElementById ("tbody");

search.addEventListener ("input" , function(e) {
  let searchValue = e.target.value;
  if(searchValue === " "){
    showStudents (tbody , students);
  }else {
     let studentsSearched = students.filter((el) => 
      el.FirstName.toLowerCase().includes(searchValue.toLowerCase())
    );
    showStudents (tbody , studentsSearched);
  };
});

// selectGroup.addEventListener ( "change" , function(e){

//   let selectt = e.target.value
  
//   console.log(selectt);
//   let filtered = selectt === "All"
//   ? students
//   : students.filter((e) =>  e.PositionType  === selectt)
//   console.log(filtered);
  
// })

selectGroup.addEventListener("change", (e) => {
    const selected = e.target.value;
    const filtered = selected === "All"
      ? students
      : students.filter(e => e.PositionType  === selected);
      
    if (filtered.length > 0) {
      showStudents(tbody, filtered);
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-[20px] text-black font-bold py-4">
            Ma'lumot topilmadi!
          </td>
        </tr>
      `;
    }

    console.log(filtered);
    
  });


  selectAddress.onchange = () => {
  let value = selectAddress.value;
  let filtered = value ? students.filter((el) => el.Address === value) : students;
  showStudents(tbody, filtered);

  if (filtered.length > 0) {
      showStudents(tbody, filtered);
    } else {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="text-center text-black text-[20px] font-bold py-4">
            Ma'lumot topilmadi!
          </td>
        </tr>
      `;
    }

    console.log(filtered);
    
};




let outerModal = document.getElementById ("outer-modal");
let innerModal = document.getElementById ("inner-modal");
let addBtn = document.getElementById ("add-btn");
let selected = null;
let btn = document.getElementById ("btn");




addBtn.addEventListener ("click" , function(){
    outerModal.classList.remove ("hidden");
    selected ? btn.textContent = "Student tahrirlash" : btn.textContent = "Add Students"
});

outerModal.addEventListener ("click" , function(){
    outerModal.classList.add ("hidden");
    selected = null;
    innerModal[0].value = "";
    innerModal[1].value = "";
    innerModal[2].value = "";
    innerModal[3].value = "";
    innerModal[4].value = "";
    innerModal[5].value = "";
    innerModal[6].value = "";
    innerModal[7].checked = "";
});

innerModal.addEventListener ("click" , function (e){
  e.stopPropagation();
});

innerModal.addEventListener ("submit" , function (e){
    e.preventDefault();
    let studentObj = {};

    if (selected){
        students = students.map((el) => {
            if (el.id === selected){
                 el.FirstName = e.target[0].value;
                 el.LastName = e.target[1].value;
                 el.Address = e.target[2].value;
                 el.DateofBirthday = e.target[3].value;
                 el.Position = e.target[4].value;
                 el.PositionType = e.target[5].value;
                 el.Salary = e.target[6].value;
                 el.IsMarried = e.target[7].checked;
            }
            return el;
        })
    }else {
                 studentObj.FirstName = e.target[0].value;
                 studentObj.LastName = e.target[1].value;
                 studentObj.Address = e.target[2].value;
                 studentObj.DateofBirthday = e.target[3].value;
                 studentObj.Position = e.target[4].value;
                 studentObj.PositionType = e.target[5].value;
                 studentObj.Salary = e.target[6].value;
                 studentObj.IsMarried = e.target[7].checked;
                 studentObj.id = students.length + 1;
                students.push(studentObj); 
    }

    
      localStorage.setItem ("students" , JSON.stringify(students));
     showStudents (tbody , students);
     selected = null;
     outerModal.classList.add ("hidden");
     innerModal[0].value = "";
    innerModal[1].value = "";
    innerModal[2].value = "";
    innerModal[3].value = "";
    innerModal[4].value = "";
    innerModal[5].value = "";
    innerModal[6].value = "";
    innerModal[7].checked = "";
});


function showStudents (content , data){
    content.innerHTML = "";
    data.map((el , index) => {
        content.innerHTML += `
         <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-[300px]:mt-[60px]"
            >
              ${index + 1}
            </th>
            <td class="px-6 py-4">${el.FirstName}</td>
            <td class="px-6 py-4">${el.LastName}</td>
            <td class="px-6 py-4">${el.Address}</td>
            <td class="px-6 py-4">${el.DateofBirthday}</td>
            <td class="px-6 py-4">${el.Position}</td>
            <td class="px-6 py-4">${el.PositionType}</td>
            <td class="px-6 py-4">${el.Salary}</td>
            <td class="px-6 py-4">${el.IsMarried}</td>
            <td class="px-6 py-4 flex items-center gap-[10px]">
              <button onClick = "edit (${el.id})" class="px-6 py-2 bg-[green] text-white cursor-pointer">
                Edit
              </button>
              <button onClick = "deleteStudent(${el.id})" class="px-6 py-2 bg-[red] text-white cursor-pointer">
                Delete
              </button>
            </td>
          </tr>
        `; 
       
    })
  } ; 



showStudents (tbody , filtered);


function deleteStudent (id) {
    students = students.filter ((el) => el.id !== id);
     localStorage.setItem ("students" , JSON.stringify(students));
     showStudents (tbody , students);
};

function edit (id) {
    selected = id;
    let student = students.find ((el) => el.id === id);
    btn.textContent = "Studentni tahrirlash"
    outerModal.classList.remove ("hidden");
    innerModal[0].value = student.FirstName;
    innerModal[1].value = student.LastName;
    innerModal[2].value = student.Address;
    innerModal[3].value = student.DateofBirthday;
    innerModal[4].value = student.Position;
    innerModal[5].value = student.PositionType;
    innerModal[6].value = student.Salary;
    innerModal[7].checked = student.IsMarried;
}
