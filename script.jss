document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');

    // Load data from LocalStorage
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Render Table Function
    function renderTable() {
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888; padding: 15px;">No student records found.</td></tr>`;
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

        // Add delete action to buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteStudent);
        });
    }

    // Form Submission Logic
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const newStudent = {
                id: document.getElementById('studentId').value.trim(),
                name: document.getElementById('studentName').value.trim(),
                email: document.getElementById('studentEmail').value.trim(),
                course: document.getElementById('studentCourse').value.trim(),
                phone: document.getElementById('studentPhone').value.trim()
            };

            students.push(newStudent);
            localStorage.setItem('students', JSON.stringify(students));

            renderTable();
            studentForm.reset();
        });
    }

    // Delete Record Function
    function deleteStudent(e) {
        const targetIndex = e.target.getAttribute('data-index');
        students.splice(targetIndex, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }

    renderTable();
});
