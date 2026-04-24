// ============================================================
// courses.js — Course CRUD Frontend Logic
// ============================================================

let allCourses = [];
let deleteTargetCourseId = null;

async function loadCourses() {
  try {
    const res = await fetch('/api/courses');
    const { data } = await res.json();
    allCourses = data;
    renderCourses(data);
  } catch (e) {
    document.getElementById('coursesGrid').innerHTML = '<p style="color:#ef4444">Failed to load courses.</p>';
  }
}

function renderCourses(courses) {
  document.getElementById('courseCount').textContent = courses.length;
  const grid = document.getElementById('coursesGrid');

  if (!courses.length) {
    grid.innerHTML = '<p style="color:var(--text-secondary)">No courses found.</p>';
    return;
  }

  grid.innerHTML = courses.map(c => {
    const pct = Math.round((c.enrolled / c.maxSeats) * 100);
    return `
      <div class="course-card">
        <div class="course-code">${c.code}</div>
        <div class="course-name">${c.name}</div>
        <div class="course-meta">
          <span><i class="fas fa-user-tie"></i>${c.instructor}</span>
          <span><i class="fas fa-building"></i>${c.department} · Semester ${c.semester}</span>
          <span><i class="fas fa-star"></i>${c.credits} Credit Hours</span>
        </div>
        <div class="course-progress">
          <div class="progress-label">
            <span>Enrollment</span>
            <span>${c.enrolled}/${c.maxSeats}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="course-actions">
          <button class="btn-icon" onclick="editCourse(${c.id})"><i class="fas fa-pen"></i></button>
          <button class="btn-icon btn-del" onclick="deleteCourse(${c.id})"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

async function submitCourse(e) {
  e.preventDefault();
  const id = document.getElementById('courseId').value;
  const payload = {
    code:       document.getElementById('code').value,
    name:       document.getElementById('courseName').value,
    instructor: document.getElementById('instructor').value,
    department: document.getElementById('courseDept').value,
    credits:    document.getElementById('credits').value,
    semester:   document.getElementById('courseSemester').value,
    maxSeats:   document.getElementById('maxSeats').value,
  };

  try {
    const url    = id ? `/api/courses/${id}` : '/api/courses';
    const method = id ? 'PUT' : 'POST';
    const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data   = await res.json();

    if (data.success) {
      closeModal('addCourseModal');
      showToast(id ? 'Course updated!' : 'Course added!');
      document.getElementById('courseForm').reset();
      document.getElementById('courseId').value = '';
      loadCourses();
    } else {
      showToast(data.message, 'error');
    }
  } catch (err) {
    showToast('Network error', 'error');
  }
}

function editCourse(id) {
  const c = allCourses.find(c => c.id === id);
  if (!c) return;
  document.getElementById('courseId').value        = c.id;
  document.getElementById('code').value            = c.code;
  document.getElementById('courseName').value      = c.name;
  document.getElementById('instructor').value      = c.instructor;
  document.getElementById('courseDept').value      = c.department;
  document.getElementById('credits').value         = c.credits;
  document.getElementById('courseSemester').value  = c.semester;
  document.getElementById('maxSeats').value        = c.maxSeats;
  document.getElementById('coursesModalTitle').textContent = 'Edit Course';
  openModal('addCourseModal');
}

function deleteCourse(id) {
  deleteTargetCourseId = id;
  openModal('deleteModal');
}

async function confirmDeleteCourse() {
  if (!deleteTargetCourseId) return;
  try {
    const res  = await fetch(`/api/courses/${deleteTargetCourseId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      closeModal('deleteModal');
      showToast('Course deleted.');
      loadCourses();
    }
  } catch (e) {
    showToast('Network error', 'error');
  }
  deleteTargetCourseId = null;
}

document.addEventListener('DOMContentLoaded', loadCourses);
