// ============================================================
// grades.js — Grade CRUD Frontend Logic
// ============================================================

let allGrades = [];
let deleteTargetGradeId = null;

async function loadGrades() {
  try {
    const res = await fetch('/api/grades');
    const { data } = await res.json();
    allGrades = data;
    renderGrades(data);
  } catch (e) {
    document.getElementById('gradesBody').innerHTML =
      '<tr><td colspan="9" style="color:#ef4444">Failed to load grades.</td></tr>';
  }
}

function renderGrades(grades) {
  document.getElementById('gradeCount').textContent = grades.length;
  const tbody = document.getElementById('gradesBody');

  if (!grades.length) {
    tbody.innerHTML = '<tr><td colspan="9" class="text-center" style="color:var(--text-secondary)">No grades found.</td></tr>';
    return;
  }

  tbody.innerHTML = grades.map(g => `
    <tr>
      <td><strong>${g.studentName}</strong></td>
      <td><code>${g.rollNo}</code></td>
      <td>${g.courseName}</td>
      <td><span class="dept-chip">${g.courseCode}</span></td>
      <td style="font-family:var(--font-mono)">${g.marks}</td>
      <td><span class="grade-pill ${gradeClass(g.grade)}">${g.grade}</span></td>
      <td style="font-size:0.82rem;color:var(--text-secondary)">${g.semester}</td>
      <td style="font-size:0.82rem;color:var(--text-secondary)">${g.remarks || '—'}</td>
      <td>
        <div style="display:flex;gap:6px">
          <button class="btn-icon" onclick="editGrade(${g.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon btn-del" onclick="deleteGrade(${g.id})"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

async function populateDropdowns() {
  const [sRes, cRes] = await Promise.all([fetch('/api/students'), fetch('/api/courses')]);
  const { data: students } = await sRes.json();
  const { data: courses }  = await cRes.json();

  const sSelect = document.getElementById('gradeStudentId');
  const cSelect = document.getElementById('gradeCourseId');

  students.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = `${s.name} (${s.rollNo})`;
    sSelect.appendChild(opt);
  });

  courses.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.code} — ${c.name}`;
    cSelect.appendChild(opt);
  });
}

async function submitGrade(e) {
  e.preventDefault();
  const id = document.getElementById('gradeId').value;
  const payload = {
    studentId: document.getElementById('gradeStudentId').value,
    courseId:  document.getElementById('gradeCourseId').value,
    marks:     document.getElementById('marks').value,
    semester:  document.getElementById('gradeSemester').value,
    year:      document.getElementById('gradeYear').value,
    remarks:   document.getElementById('remarks').value,
  };

  try {
    const url    = id ? `/api/grades/${id}` : '/api/grades';
    const method = id ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data   = await res.json();

    if (data.success) {
      closeModal('addGradeModal');
      showToast(id ? 'Grade updated!' : 'Grade added!');
      document.getElementById('gradeForm').reset();
      document.getElementById('gradeId').value = '';
      loadGrades();
    } else {
      showToast(data.message, 'error');
    }
  } catch (err) {
    showToast('Network error', 'error');
  }
}

function editGrade(id) {
  const g = allGrades.find(g => g.id === id);
  if (!g) return;
  document.getElementById('gradeId').value         = g.id;
  document.getElementById('gradeStudentId').value  = g.studentId;
  document.getElementById('gradeCourseId').value   = g.courseId;
  document.getElementById('marks').value           = g.marks;
  document.getElementById('gradeSemester').value   = g.semester;
  document.getElementById('gradeYear').value       = g.year;
  document.getElementById('remarks').value         = g.remarks;
  document.getElementById('gradeModalTitle').textContent = 'Edit Grade Record';
  openModal('addGradeModal');
}

function deleteGrade(id) {
  deleteTargetGradeId = id;
  openModal('deleteModal');
}

async function confirmDeleteGrade() {
  if (!deleteTargetGradeId) return;
  try {
    const res  = await fetch(`/api/grades/${deleteTargetGradeId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      closeModal('deleteModal');
      showToast('Grade deleted.');
      loadGrades();
    }
  } catch (e) {
    showToast('Network error', 'error');
  }
  deleteTargetGradeId = null;
}

document.addEventListener('DOMContentLoaded', () => {
  loadGrades();
  populateDropdowns();
});
