// ============================================================
// app.js — Shared Frontend Utilities
// ============================================================

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

function openModal(id) {
  const el = document.getElementById(id);
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  el.classList.remove('open');
  document.body.style.overflow = '';
}

// Click outside modal to close
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// Toast notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = (type === 'success' ? '✓ ' : '✗ ') + message;
  toast.className = `toast ${type} show`;
  setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

// Grade color helper
function gradeClass(grade) {
  if (!grade) return '';
  if (grade === 'A') return 'grade-A';
  if (grade.startsWith('B')) return 'grade-Bpl';
  if (grade.startsWith('C')) return 'grade-C';
  if (grade === 'D') return 'grade-D';
  if (grade === 'F') return 'grade-F';
  return '';
}
