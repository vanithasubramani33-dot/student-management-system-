document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');

    // 1. Browser-oda local storage database-la irundhu data-va edukurom
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // 2. Data-va table-la render (display) panna koodiya function
    function renderTable() {
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">No records found.</td></tr>`;
            return;
        }

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.phone}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            studentTableBody.appendChild(row);
        });

        // Delete button-ukku click functionality tharugirom
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteStudent);
        });
    }

    // 3. Form Submit aagumpodhu data-va database array-la pushed seiyum logic
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Default page refresh-a thadukum

        const newStudent = {
            id: document.getElementById('studentId').value.trim(),
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            course: document.getElementById('studentCourse').value.trim(),
            phone: document.getElementById('studentPhone').value.trim()
        };

        // Data-va array-la push panni local storage database-la sync seiyuroom
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        // Table-a refresh panni form-a reset pannuvom
        renderTable();
        studentForm.reset();
    });

    // 4. Record-ai delete seiyum function
    function deleteStudent(e) {
        const targetIndex = e.target.getAttribute('data-index');
        students.splice(targetIndex, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }

    // Page open aagumpodhu renderTable call aagum
    renderTable();
});
