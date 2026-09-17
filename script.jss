let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {

    let id = document.getElementById("studentId").value;
    let name = document.getElementById("studentName").value;
    let email = document.getElementById("studentEmail").value;
    let course = document.getElementById("studentCourse").value;
    let phone = document.getElementById("studentPhone").value;

    if (id === "" || name === "" || email === "" ||
        course === "" || phone === "") {

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

    localStorage.setItem("students", JSON.stringify(students));

    clearForm();
    displayStudents();

    alert("Student added successfully!");
}


function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student, index) {

        table.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.phone}</td>
                <td>
                    <button class="delete"
                    onclick="deleteStudent(${index})">
                    Delete
                    </button>
                </td>
            </tr>
        `;
    });
}


function deleteStudent(index) {

    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
}


function clearForm() {

    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentCourse").value = "";
    document.getElementById("studentPhone").value = "";
}


function searchStudent() {

    let search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

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


displayStudents();
