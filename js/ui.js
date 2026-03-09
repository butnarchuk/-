document.addEventListener("DOMContentLoaded", () => {
    
    const navLinks = document.querySelectorAll('.nav-link');
    const viewSections = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => {
                l.classList.remove('bg-blue-50', 'text-blue-600');
                l.classList.add('hover:bg-gray-50', 'text-gray-600');
            });
            
            link.classList.remove('hover:bg-gray-50', 'text-gray-600');
            link.classList.add('bg-blue-50', 'text-blue-600');

            viewSections.forEach(view => {
                view.classList.add('hidden');
                view.classList.remove('block');
            });

            const targetId = link.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('hidden');
                targetView.classList.add('block');
            }

            // Рендеримо контент
            if (targetId === 'view-dashboard' && typeof renderDashboard === 'function') {
                renderDashboard();
            }
            if (targetId === 'view-taxes' && typeof renderTaxes === 'function') {
                renderTaxes();
            }
            if (targetId === 'view-calendar' && typeof renderCalendar === 'function') {
                renderCalendar();
            }
            // ДОДАНО: рендер налаштувань
            if (targetId === 'view-settings' && typeof renderSettings === 'function') {
                renderSettings();
            }
        });
    });

    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('hidden');
    };

    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('hidden');
    };

    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.getAttribute('data-modal'));
        });
    });

    document.querySelectorAll('.fixed.inset-0').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    });
});