document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');

    // 1. Browser-oda internal database-la irundhu data-va load seiyuroom
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // 2. Data-va dynamic-a table row-la display seiyum function
    function renderTable() {
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888; padding: 20px;">No student records found. Add a student above!</td></tr>`;
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

        // Delete button click panna row-a remove pannum event listener
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteStudent);
        });
    }

    // 3. Form submit (Add Student) aagumpodhu nadakiratha logic
    if (studentForm) {
        studentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Page reload aaguradha thadukum

            // Text inputs-la irundhu values-a read pannuthu
            const newStudent = {
                id: document.getElementById('studentId').value.trim(),
                name: document.getElementById('studentName').value.trim(),
                email: document.getElementById('studentEmail').value.trim(),
                course: document.getElementById('studentCourse').value.trim(),
                phone: document.getElementById('studentPhone').value.trim()
            };

            // Database array-il push seithu save pannugiroom
            students.push(newStudent);
            localStorage.setItem('students', JSON.stringify(students));

            // Table refresh and form input fields clear loop
            renderTable();
            studentForm.reset();
        });
    }

    // 4. Student record-a list-la irundhu delete pannum logic
    function deleteStudent(e) {
        const targetIndex = e.target.getAttribute('data-index');
        students.splice(targetIndex, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }

    // Page startup-il table data-va load panna call
    renderTable();
});
