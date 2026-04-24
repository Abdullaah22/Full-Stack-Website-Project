// ============================================================
// students.js — Student CRUD Frontend Logic
// ============================================================

let allStudents = [];
let deleteTargetId = null;

async function loadStudents() {
  try {
    const res = await fetch('/api/students');
    const { data } = await res.json();
    allStudents = data;
    renderStudents(data);
  } catch (e) {
    document.getElementById('studentsBody').innerHTML =
      '<tr><td colspan="8" class="text-center" style="color:#ef4444">Failed to load students.</td></tr>';
  }
}

function renderStudents(students) {
  const tbody = document.getElementById('studentsBody');
  document.getElementById('studentCount').textContent = students.length;

  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="8" class="text-center" style="color:var(--text-secondary)">No students found.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><code>${s.rollNo}</code></td>
      <td><strong>${s.name}</strong></td>
      <td style="color:var(--text-secondary);font-size:0.82rem">${s.email}</td>
      <td><span class="dept-chip">${s.department}</span></td>
      <td style="font-family:var(--font-mono);font-size:0.85rem">${s.semester}</td>
      <td><span class="cgpa-badge">${s.cgpa}</span></td>
      <td><span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span></td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn-icon" onclick="editStudent(${s.id})" title="Edit"><i class="fas fa-pen"></i></button>
          <button class="btn-icon btn-del" onclick="deleteStudent(${s.id}, '${s.name}')" title="Delete"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterStudents() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const dept   = document.getElementById('deptFilter').value;
  const status = document.getElementById('statusFilter').value;

  const filtered = allStudents.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search) || s.rollNo.toLowerCase().includes(search);
    const matchDept   = !dept   || s.department === dept;
    const matchStatus = !status || s.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  renderStudents(filtered);
}

async function submitStudent(e) {
  e.preventDefault();
  const id = document.getElementById('studentId').value;
  const payload = {
    name:       document.getElementById('name').value,
    rollNo:     document.getElementById('rollNo').value,
    email:      document.getElementById('email').value,
    phone:      document.getElementById('phone').value,
    department: document.getElementById('department').value,
    semester:   document.getElementById('semester').value,
    cgpa:       document.getElementById('cgpa').value || 0,
    status:     document.getElementById('status').value,
  };

  try {
    const url    = id ? `/api/students/${id}` : '/api/students';
    const method = id ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data   = await res.json();

    if (data.success) {
      closeModal('addModal');
      showToast(id ? 'Student updated!' : 'Student added!');
      document.getElementById('studentForm').reset();
      document.getElementById('studentId').value = '';
      document.getElementById('modalTitle').textContent = 'Add New Student';
      loadStudents();
    } else {
      showToast(data.message || 'Error saving student', 'error');
    }
  } catch (err) {
    showToast('Network error', 'error');
  }
}

function editStudent(id) {
  const s = allStudents.find(s => s.id === id);
  if (!s) return;
  document.getElementById('studentId').value  = s.id;
  document.getElementById('name').value        = s.name;
  document.getElementById('rollNo').value      = s.rollNo;
  document.getElementById('email').value       = s.email;
  document.getElementById('phone').value       = s.phone;
  document.getElementById('department').value  = s.department;
  document.getElementById('semester').value    = s.semester;
  document.getElementById('cgpa').value        = s.cgpa;
  document.getElementById('status').value      = s.status;
  document.getElementById('modalTitle').textContent = 'Edit Student';
  openModal('addModal');
}

function deleteStudent(id, name) {
  deleteTargetId = id;
  document.getElementById('deleteStudentName').textContent = name;
  openModal('deleteModal');
}

async function confirmDelete() {
  if (!deleteTargetId) return;
  try {
    const res  = await fetch(`/api/students/${deleteTargetId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      closeModal('deleteModal');
      showToast('Student deleted.');
      loadStudents();
    } else {
      showToast('Error deleting student', 'error');
    }
  } catch (e) {
    showToast('Network error', 'error');
  }
  deleteTargetId = null;
}

document.addEventListener('DOMContentLoaded', loadStudents);
