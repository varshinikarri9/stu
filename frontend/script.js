const API = "http://localhost:5000/students";

// ------------------------
// GET (Load Students)
// ------------------------
function loadStudents() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#studentsTable tbody");
            tbody.innerHTML = "";

            data.forEach(s => {
                const row = `
                    <tr>
                        <td>${s.id}</td>
                        <td>${s.name}</td>
                        <td>${s.age}</td>
                        <td>${s.branch}</td>
                        <td>
                            <button onclick="openEdit(${s.id}, '${s.name}', '${s.age}', '${s.branch}')">Edit</button>
                            <button onclick="deleteStudent(${s.id})">Delete</button>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}
loadStudents();

// ------------------------
// POST (Add Student)
// ------------------------
function addStudent() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const branch = document.getElementById("branch").value;

    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, branch })
    }).then(() => {
        loadStudents();
    });
}

// ------------------------
// DELETE
// ------------------------
function deleteStudent(id) {
    fetch(`${API}/${id}`, {
        method: "DELETE"
    }).then(() => loadStudents());
}

// ------------------------
// EDIT FORM OPEN
// ------------------------
function openEdit(id, name, age, branch) {
    document.getElementById("editId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editAge").value = age;
    document.getElementById("editBranch").value = branch;

    document.getElementById("editForm").style.display = "block";
}

function closeEdit() {
    document.getElementById("editForm").style.display = "none";
}

// ------------------------
// PUT (Full Update)
// ------------------------
function updateStudentPUT() {
    const id = document.getElementById("editId").value;

    const updated = {
        name: document.getElementById("editName").value,
        age: document.getElementById("editAge").value,
        branch: document.getElementById("editBranch").value
    };

    fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    }).then(() => {
        closeEdit();
        loadStudents();
    });
}

// ------------------------
// PATCH (Update specific fields)
// ------------------------
function updateStudentPATCH() {
    const id = document.getElementById("editId").value;

    const updated = {
        name: document.getElementById("editName").value || undefined,
        age: document.getElementById("editAge").value || undefined,
        branch: document.getElementById("editBranch").value || undefined
    };

    fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
    }).then(() => {
        closeEdit();
        loadStudents();
    });
}
