document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTableBody');
    const searchName = document.getElementById('searchName');

    // 1. Load students from localStorage database when page opens
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // 2. Function to render the student list inside the table
    function renderTable(filteredStudents = students) {
        studentTableBody.innerHTML = '';

        if (filteredStudents.length === 0) {
            studentTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">No student records found.</td></tr>`;
            return;
        }

        filteredStudents.forEach((student, index) => {
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

        // Attach event listeners to all newly created delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteStudent);
        });
    }

    // 3. Function to add a student to the database array
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop page refresh

        const newStudent = {
            id: document.getElementById('studentId').value.trim(),
            name: document.getElementById('studentName').value.trim(),
            email: document.getElementById('studentEmail').value.trim(),
            course: document.getElementById('studentCourse').value.trim(),
            phone: document.getElementById('studentPhone').value.trim()
        };

        // Save into our records array
        students.push(newStudent);

        // Sync with browser database storage
        localStorage.setItem('students', JSON.stringify(students));

        // Re-render table and clear form fields
        renderTable();
        studentForm.reset();
    });

    // 4. Function to delete a student row
    function deleteStudent(e) {
        const targetIndex = e.target.getAttribute('data-index');
        
        // Remove from memory array
        students.splice(targetIndex, 1);
        
        // Sync update back to browser database storage
        localStorage.setItem('students', JSON.stringify(students));
        
        // Refresh table view
        renderTable();
    }

    // 5. Real-time Search functionality
    searchName.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = students.filter(student => 
            student.name.toLowerCase().includes(searchTerm)
        );
        renderTable(filtered);
    });

    // Initial render call on page startup
    renderTable();
});
