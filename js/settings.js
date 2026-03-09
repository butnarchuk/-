window.renderSettings = function() {
    const container = document.getElementById('settings-content');
    const profile = getActiveProfile();

    if (!profile) {
        container.innerHTML = '<p class="text-gray-500">Оберіть або створіть профіль для редагування налаштувань.</p>';
        return;
    }

    // Малюємо форму з підставленими поточними даними
    container.innerHTML = `
        <div class="flex items-center gap-2 mb-6">
            <i class="fa-solid fa-gear text-blue-600 text-2xl"></i>
            <h2 class="text-2xl font-bold">Налаштування профілю</h2>
        </div>

        <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm max-w-2xl">
            <form id="settings-form" class="space-y-4">
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Назва профілю</label>
                    <input type="text" id="set-profile-name" value="${profile.name}" required class="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 outline-none">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Система оподаткування</label>
                    <select id="set-profile-tax" class="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 outline-none cursor-pointer">
                        <option value="fop1" ${profile.taxSystem === 'fop1' ? 'selected' : ''}>ФОП 1 група</option>
                        <option value="fop2" ${profile.taxSystem === 'fop2' ? 'selected' : ''}>ФОП 2 група</option>
                        <option value="fop3_5" ${profile.taxSystem === 'fop3_5' ? 'selected' : ''}>ФОП 3 група (5%)</option>
                        <option value="fop3_3" ${profile.taxSystem === 'fop3_3' ? 'selected' : ''}>ФОП 3 група (3% + ПДВ)</option>
                        <option value="general" ${profile.taxSystem === 'general' ? 'selected' : ''}>Загальна система</option>
                    </select>
                </div>

                <div class="bg-blue-50 p-4 border border-blue-100 rounded">
                    <label class="block text-sm font-bold text-blue-800 mb-1">Мінімальна зарплата (грн)</label>
                    <p class="text-xs text-blue-600 mb-2">Якщо держава змінила мінімальну заробітну плату, оновіть її тут. Усі подальші податки будуть розраховуватися за новою ставкою.</p>
                    <input type="number" id="set-profile-minwage" value="${profile.minWage}" required min="1" class="w-full border border-blue-300 rounded p-2 focus:ring-blue-500 outline-none">
                </div>

                <div class="pt-4 border-t border-gray-200 flex justify-between items-center mt-6">
                    <button type="button" onclick="deleteCurrentProfile()" class="text-red-500 hover:text-red-700 font-medium transition flex items-center gap-1">
                        <i class="fa-solid fa-trash-can"></i> Видалити профіль
                    </button>
                    <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition shadow-sm">
                        Зберегти зміни
                    </button>
                </div>
            </form>
        </div>
    `;

    // Обробка натискання кнопки "Зберегти"
    document.getElementById('settings-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newName = document.getElementById('set-profile-name').value;
        const newTax = document.getElementById('set-profile-tax').value;
        const newWage = document.getElementById('set-profile-minwage').value;

        // Викликаємо функцію оновлення бази даних
        updateProfile(profile.id, {
            name: newName,
            taxSystem: newTax,
            minWage: Number(newWage)
        });

        // Перезавантажуємо сторінку, щоб усе миттєво оновилося (шапка, меню, податки)
        window.location.reload(); 
    });
};

// Функція видалення поточного профілю
window.deleteCurrentProfile = function() {
    const profile = getActiveProfile();
    if (confirm(`Ви впевнені, що хочете видалити профіль "${profile.name}" та всю його історію доходів? Цю дію неможливо скасувати.`)) {
        deleteProfile(profile.id);
        window.location.reload(); // Оновлюємо сторінку після видалення
    }
};