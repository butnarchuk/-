document.addEventListener("DOMContentLoaded", () => {
    
    const profileSelect = document.getElementById('profile-select');
    const profileForm = document.getElementById('profile-form');

    // Оновлення списку профілів у верхній шапці
    function updateProfileSelectUI() {
        const profiles = getProfiles();
        const activeId = getActiveProfileId();

        profileSelect.innerHTML = '<option value="" disabled>Оберіть профіль...</option>';
        
        profiles.forEach(profile => {
            const option = document.createElement('option');
            option.value = profile.id;
            option.textContent = profile.name;
            if (profile.id === activeId) option.selected = true;
            profileSelect.appendChild(option);
        });

        const createOption = document.createElement('option');
        createOption.value = 'new';
        createOption.textContent = '+ Додати профіль';
        profileSelect.appendChild(createOption);
        
        if (!activeId && profiles.length === 0) {
            profileSelect.selectedIndex = 0;
        }
    }

    // Обробка зміни профілю в шапці
    profileSelect.addEventListener('change', function(event) {
        if (event.target.value === 'new') {
            openModal('profile-modal');
            updateProfileSelectUI(); // Повертаємо селект, щоб не зависав на "+ Додати"
        } else {
            setActiveProfileId(event.target.value);
            renderDashboard(); // Перемальовуємо робочий стіл
        }
    });

    // Обробка форми створення нового профілю
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const name = document.getElementById('profile-name').value;
            const taxSystem = document.getElementById('profile-tax-system').value;
            const minWage = document.getElementById('profile-min-wage').value;

            const newProfile = saveProfile({
                name: name,
                taxSystem: taxSystem,
                minWage: Number(minWage)
            });

            setActiveProfileId(newProfile.id);
            closeModal('profile-modal');
            profileForm.reset();
            
            updateProfileSelectUI();
            renderDashboard();
        });
    }

    // --- СТАРТ ДОДАТКУ ---
    updateProfileSelectUI();
    
    // Якщо функція рендеру існує, запускаємо її
    if (typeof renderDashboard === 'function') {
        renderDashboard();
    }
});