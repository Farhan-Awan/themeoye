// Themeoye Quick View JS
// Handles opening/closing product quick view modal
window.themeoye = window.themeoye || {};
window.themeoye.quickView = {
  open(id) {
    document.getElementById('quick-view-modal-' + id).classList.add('active');
  },
  close(id) {
    document.getElementById('quick-view-modal-' + id).classList.remove('active');
  }
};
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.quick-view-modal .modal__close').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var modal = btn.closest('.quick-view-modal');
      if (modal) modal.classList.remove('active');
    });
  });
});
