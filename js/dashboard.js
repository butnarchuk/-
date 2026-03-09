// Головна функція малювання робочого столу
window.renderDashboard = function() {
    const dashboardContent = document.getElementById('dashboard-content');
    const activeProfile = getActiveProfile();

    if (!activeProfile) {
        dashboardContent.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">Вітаємо у TaxManager!</h1>
            <p class="text-gray-600 mb-4">Створіть свій перший профіль, щоб почати роботу.</p>
            <button onclick="openModal('profile-modal')" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition shadow-sm">
                <i class="fa-solid fa-plus mr-2"></i>Створити профіль
            </button>
        `;
        return;
    }

    let systemName = "";
    let limitMultiplier = 0;

    switch(activeProfile.taxSystem) {
        case 'fop1': systemName = "ФОП 1 група"; limitMultiplier = 167; break;
        case 'fop2': systemName = "ФОП 2 група"; limitMultiplier = 834; break;
        case 'fop3_5': systemName = "ФОП 3 група (5%)"; limitMultiplier = 1167; break;
        case 'fop3_3': systemName = "ФОП 3 група (3% + ПДВ)"; limitMultiplier = 1167; break;
        case 'general': systemName = "Загальна система"; limitMultiplier = 0; break;
    }

    const maxLimit = limitMultiplier * activeProfile.minWage;
    // Отримуємо суму всіх транзакцій через нову функцію з storage.js
    const currentIncome = calculateTotalIncome(activeProfile); 
    
    let percentUsed = 0;
    if (maxLimit > 0) {
        percentUsed = (currentIncome / maxLimit) * 100;
        if (percentUsed > 100) percentUsed = 100;
    }

    let barColor = "bg-green-500";
    if (percentUsed > 75) barColor = "bg-yellow-400";
    if (percentUsed > 90) barColor = "bg-red-500";

    const formatMoney = (sum) => Number(sum).toLocaleString('uk-UA') + ' ₴';

    dashboardContent.innerHTML = `
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Робочий стіл: <span class="text-blue-600">${activeProfile.name}</span></h1>
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded border border-blue-200">${systemName}</span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="text-gray-500 text-sm mb-1">Мін. зарплата</div>
                <div class="text-xl font-bold">${formatMoney(activeProfile.minWage)}</div>
            </div>
            <div class="bg-white border border-blue-300 rounded-lg p-4 shadow-sm cursor-pointer hover:bg-blue-50 transition" onclick="openIncomeHistory()">
                <div class="text-blue-600 text-sm mb-1 font-medium"><i class="fa-solid fa-list mr-1"></i> Загальний дохід (Історія)</div>
                <div class="text-xl font-bold text-green-600">${formatMoney(currentIncome)}</div>
            </div>
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div class="text-gray-500 text-sm mb-1">Найближчий платіж</div>
                <div class="text-xl font-bold text-orange-500">В розробці</div>
            </div>
        </div>

        ${maxLimit > 0 ? `
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <div class="flex justify-between items-end mb-2">
                <div>
                    <h2 class="text-lg font-bold">Контроль ліміту доходу</h2>
                    <p class="text-sm text-gray-500">Доступний ліміт: ${formatMoney(maxLimit)}</p>
                </div>
                <div class="text-right font-medium ${percentUsed > 90 ? 'text-red-600' : 'text-gray-700'}">
                    Використано: ${percentUsed.toFixed(1)}%
                </div>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
                <div class="${barColor} h-4 rounded-full transition-all duration-500" style="width: ${percentUsed}%"></div>
            </div>
            <p class="text-xs text-gray-500">Залишок ліміту: <b>${formatMoney(maxLimit - currentIncome)}</b></p>
        </div>
        ` : `
        <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
            <h2 class="text-lg font-bold">Контроль ліміту</h2>
            <p class="text-sm text-gray-500 mt-1">Для загальної системи оподаткування жорсткий ліміт єдиного податку не застосовується.</p>
        </div>
        `}

        <div class="bg-blue-50 border border-blue-100 rounded-lg p-6">
            <h3 class="text-md font-bold text-blue-800 mb-3">Швидке внесення доходу</h3>
            <form id="quick-income-form" class="flex gap-4 items-end">
                <div class="flex-grow">
                    <label class="block text-sm text-blue-800 mb-1">Сума надходження (грн)</label>
                    <input type="number" id="income-amount" required min="1" step="0.01" class="w-full border border-blue-200 rounded p-2 focus:ring-blue-500 outline-none">
                </div>
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition h-[42px]">
                    <i class="fa-solid fa-plus mr-1"></i> Додати
                </button>
            </form>
        </div>
    `;

    // Обробник форми внесення доходу
    const incomeForm = document.getElementById('quick-income-form');
    if (incomeForm) {
        incomeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('income-amount').value;
            addIncomeToProfile(activeProfile.id, amount);
            renderDashboard(); // Одразу оновлюємо екран
        });
    }
};

// --- ЛОГІКА ІСТОРІЇ ДОХОДІВ ---
window.openIncomeHistory = function() {
    const activeProfile = getActiveProfile();
    if (!activeProfile) return;

    const listContainer = document.getElementById('income-history-list');
    listContainer.innerHTML = ''; // Очищаємо список перед малюванням

    const incomes = activeProfile.incomes || [];

    if (incomes.length === 0) {
        listContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Історія доходів порожня.</p>';
    } else {
        // Сортуємо від новіших до старіших
        const sortedIncomes = [...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedIncomes.forEach(inc => {
            // Форматуємо дату (напр. 25.10.2025 14:30)
            const dateObj = new Date(inc.date);
            const dateStr = dateObj.toLocaleDateString('uk-UA') + ' ' + dateObj.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
            
            const item = document.createElement('div');
            item.className = 'flex justify-between items-center p-3 border rounded bg-gray-50';
            item.innerHTML = `
                <div>
                    <div class="font-bold text-green-600">+ ${Number(inc.amount).toLocaleString('uk-UA')} ₴</div>
                    <div class="text-xs text-gray-500">${dateStr}</div>
                </div>
                <button onclick="removeIncome('${activeProfile.id}', '${inc.id}')" class="text-red-500 hover:text-red-700 p-2 transition" title="Видалити запис">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            listContainer.appendChild(item);
        });
    }

    openModal('income-history-modal');
};

// Видалення доходу та оновлення екранів
window.removeIncome = function(profileId, transactionId) {
    if(confirm('Ви дійсно хочете видалити цей запис про дохід?')) {
        deleteIncome(profileId, transactionId);
        openIncomeHistory(); // Перемальовуємо список у модалці
        renderDashboard();   // Оновлюємо головний екран (цифри і шкалу)
    }
};