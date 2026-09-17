let students = [];

function addStudent() {

    let id = document.getElementById("studentId").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let course = document.getElementById("course").value;
    let phone = document.getElementById("phone").value;

    if (id == "" || name == "" || email == "" || course == "" || phone == "") {
        alert("Please fill all fields");
        return;
    }

    let student = {
        id: id,
        name: name,
        email: email,
        course: course,
        phone: phone
    };

    students.push(student);

    displayStudents();

    clearForm();

    alert("Student added successfully");
}


function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    for (let i = 0; i < students.length; i++) {

        let row = `
            <tr>

                <td>${students[i].id}</td>

                <td>${students[i].name}</td>

                <td>${students[i].email}</td>

                <td>${students[i].course}</td>

                <td>${students[i].phone}</td>

                <td>

                    <button class="edit" onclick="editStudent(${i})">
                        Edit
                    </button>

                    <button class="delete" onclick="deleteStudent(${i})">
                        Delete
                    </button>

                </td>

            </tr>
        `;

        table.innerHTML += row;
    }
}


function deleteStudent(index) {

    if (confirm("Do you want to delete this student?")) {

        students.splice(index, 1);

        displayStudents();
    }
}


function editStudent(index) {

    document.getElementById("studentId").value = students[index].id;

    document.getElementById("name").value = students[index].name;

    document.getElementById("email").value = students[index].email;

    document.getElementById("course").value = students[index].course;

    document.getElementById("phone").value = students[index].phone;

    students.splice(index, 1);

    displayStudents();
}


function searchStudent() {

    let search = document.getElementById("search").value.toLowerCase();

    let rows = document
        .getElementById("studentTable")
        .getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {

        let text = rows[i].innerText.toLowerCase();

        if (text.includes(search)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("email").value = "";

    document.getElementById("course").value = "";

    document.getElementById("phone").value = "";
}
