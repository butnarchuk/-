// Повна, деталізована база податкових дедлайнів на 2026 рік
const getTaxEvents = () => {
    let events = [];

    // Константи груп для фільтрації
    const allFops = ['fop1', 'fop2', 'fop3_5', 'fop3_3', 'general'];
    const fop12 = ['fop1', 'fop2'];
    const fop3 = ['fop3_5', 'fop3_3'];
    const pdvPayers = ['fop3_3', 'general'];

    // --- 1. ЄСВ "ЗА СЕБЕ" (Квартально) ---
    events.push({ id: 'esv_q4_25', title: 'Сплата ЄСВ (4 кв. 2025)', description: 'Обов\'язковий платіж ЄСВ за себе (за жовтень, листопад, грудень).', date: '2026-01-20', type: 'payment', targets: allFops });
    events.push({ id: 'esv_q1_26', title: 'Сплата ЄСВ (1 кв. 2026)', description: 'Обов\'язковий платіж ЄСВ за себе (за січень, лютий, березень).', date: '2026-04-20', type: 'payment', targets: allFops });
    events.push({ id: 'esv_q2_26', title: 'Сплата ЄСВ (2 кв. 2026)', description: 'Обов\'язковий платіж ЄСВ за себе (за квітень, травень, червень).', date: '2026-07-20', type: 'payment', targets: allFops });
    events.push({ id: 'esv_q3_26', title: 'Сплата ЄСВ (3 кв. 2026)', description: 'Обов\'язковий платіж ЄСВ за себе (за липень, серпень, вересень).', date: '2026-10-20', type: 'payment', targets: allFops });

    // --- 2. ОБ'ЄДНАНИЙ ЗВІТ ЗА ПРАЦІВНИКІВ (Квартально) ---
    events.push({ id: 'emp_rep_q4_25', title: 'Об\'єднаний звіт за працівників (4 кв. 2025)', description: 'Податковий розрахунок сум доходу (ПДФО, ВЗ, ЄСВ) за найманих працівників.', date: '2026-02-09', type: 'report', targets: allFops });
    events.push({ id: 'emp_rep_q1_26', title: 'Об\'єднаний звіт за працівників (1 кв. 2026)', description: 'Податковий розрахунок сум доходу (ПДФО, ВЗ, ЄСВ) за найманих працівників.', date: '2026-05-11', type: 'report', targets: allFops });
    events.push({ id: 'emp_rep_q2_26', title: 'Об\'єднаний звіт за працівників (2 кв. 2026)', description: 'Податковий розрахунок сум доходу (ПДФО, ВЗ, ЄСВ) за найманих працівників.', date: '2026-08-10', type: 'report', targets: allFops });
    events.push({ id: 'emp_rep_q3_26', title: 'Об\'єднаний звіт за працівників (3 кв. 2026)', description: 'Податковий розрахунок сум доходу (ПДФО, ВЗ, ЄСВ) за найманих працівників.', date: '2026-11-09', type: 'report', targets: allFops });

    // --- 3. ЄДИНИЙ ПОДАТОК (Група 3) - Декларації та Сплата ---
    events.push({ id: 'ep3_decl_q4', title: 'Декларація ЄП (за 2025 рік)', description: 'Річна декларація платника єдиного податку 3 групи (з додатком ЄСВ).', date: '2026-02-09', type: 'report', targets: fop3 });
    events.push({ id: 'ep3_pay_q4', title: 'Сплата ЄП (4 кв. 2025)', description: 'Сплата єдиного податку за результатами 4 кварталу.', date: '2026-02-19', type: 'payment', targets: fop3 });
    events.push({ id: 'ep3_decl_q1', title: 'Декларація ЄП (1 квартал)', description: 'Декларація платника єдиного податку 3 групи за 1 квартал.', date: '2026-05-11', type: 'report', targets: fop3 });
    events.push({ id: 'ep3_pay_q1', title: 'Сплата ЄП (1 квартал)', description: 'Сплата єдиного податку за результатами 1 кварталу.', date: '2026-05-20', type: 'payment', targets: fop3 });
    events.push({ id: 'ep3_decl_q2', title: 'Декларація ЄП (Півріччя)', description: 'Декларація платника єдиного податку 3 групи за півріччя.', date: '2026-08-10', type: 'report', targets: fop3 });
    events.push({ id: 'ep3_pay_q2', title: 'Сплата ЄП (2 квартал)', description: 'Сплата єдиного податку за результатами 2 кварталу.', date: '2026-08-19', type: 'payment', targets: fop3 });
    events.push({ id: 'ep3_decl_q3', title: 'Декларація ЄП (9 місяців)', description: 'Декларація платника єдиного податку 3 групи за 3 квартали.', date: '2026-11-09', type: 'report', targets: fop3 });
    events.push({ id: 'ep3_pay_q3', title: 'Сплата ЄП (3 квартал)', description: 'Сплата єдиного податку за результатами 3 кварталу.', date: '2026-11-19', type: 'payment', targets: fop3 });

    // --- 4. РІЧНІ ДЕКЛАРАЦІЇ (1-2 група та Загальна система) ---
    events.push({ id: 'ep12_decl', title: 'Річна Декларація ЄП (1-2 гр)', description: 'Річна декларація платника єдиного податку 1 або 2 групи (з додатком ЄСВ).', date: '2026-03-02', type: 'report', targets: fop12 });
    events.push({ id: 'gen_decl', title: 'Декларація про доходи (Загальна)', description: 'Подання податкової декларації про майновий стан і доходи (з додатком ЄСВ).', date: '2026-02-09', type: 'report', targets: ['general'] });
    events.push({ id: 'gen_pay_annual', title: 'Сплата ПДФО та ВЗ (Річна)', description: 'Остаточний розрахунок з ПДФО та військового збору за результатами року.', date: '2026-02-19', type: 'payment', targets: ['general'] });

    // --- 5. ЩОМІСЯЧНІ ПЛАТЕЖІ ТА ЗВІТИ (Цикл на 12 місяців) ---
    const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    
    for (let i = 1; i <= 12; i++) {
        let mStr = String(i).padStart(2, '0');
        
        // А) ЄП 1-2 група (Авансовий платіж до 20 числа поточного місяця)
        let payDay12 = (i === 9 || i === 12) ? '21' : '20'; 
        events.push({ 
            id: `ep12_pay_${i}`, 
            title: `ЄП за ${monthNames[i-1]} (1-2 гр)`, 
            description: 'Авансовий внесок єдиного податку за поточний місяць.', 
            date: `2026-${mStr}-${payDay12}`, 
            type: 'payment', 
            targets: fop12 
        });

        // Б) Загальна система - Авансовий платіж ПДФО (до 20 числа квітня, липня, жовтня)
        if (i === 4 || i === 7 || i === 10) {
            events.push({
                id: `gen_adv_pay_${i}`,
                title: `Авансовий платіж ПДФО (Загальна)`,
                description: 'Авансовий платіж податку на доходи фіз. осіб за поточний квартал.',
                date: `2026-${mStr}-20`,
                type: 'payment',
                targets: ['general']
            });
        }

        // В) ПДВ (Щомісячно: Звіт до 20-го, Оплата до 30-го)
        let prevMonthName = i === 1 ? 'Грудень' : monthNames[i-2];
        
        events.push({ 
            id: `pdv_decl_${i}`, 
            title: `Декларація з ПДВ (${prevMonthName})`, 
            description: 'Подання щомісячної податкової декларації з податку на додану вартість.', 
            date: `2026-${mStr}-20`, 
            type: 'report', 
            targets: pdvPayers 
        });
        
        let pdvPayDay = new Date(2026, i, 0).getDate(); 
        events.push({ 
            id: `pdv_pay_${i}`, 
            title: `Сплата ПДВ (${prevMonthName})`, 
            description: 'Сплата суми податкового зобов\'язання з ПДВ.', 
            date: `2026-${mStr}-${pdvPayDay}`, 
            type: 'payment', 
            targets: pdvPayers 
        });
    }

    // Автоматично додаємо початок періоду (startPeriod)
    return events.map(ev => {
        if (!ev.startPeriod) {
            let d = new Date(ev.date);
            let daysToSubtract = ev.type === 'report' ? 20 : 10;
            d.setDate(d.getDate() - daysToSubtract);
            ev.startPeriod = d.toISOString().split('T')[0];
        }
        return ev;
    });
};

// Отримати події ТІЛЬКИ для обраного профілю
const getProfileTaxEvents = () => {
    const profile = getActiveProfile();
    if (!profile) return []; 
    return getTaxEvents().filter(e => e.targets.includes(profile.taxSystem));
};

let currentCalendarDate = new Date();

window.renderCalendar = function() {
    const profile = getActiveProfile();
    
    if (!profile) {
        document.getElementById('upcoming-events-container').innerHTML = '<p class="text-red-500 font-medium">Оберіть або створіть профіль у верхній панелі, щоб побачити свій календар.</p>';
        document.getElementById('calendar-grid').innerHTML = '<div class="col-span-7 p-6 text-center text-gray-400">Календар недоступний без профілю.</div>';
        return;
    }

    renderUpcomingEvents();
    renderCalendarGrid();
    setupCalendarListeners();
};

function renderUpcomingEvents() {
    const container = document.getElementById('upcoming-events-container');
    if (!container) return;

    const todayTime = new Date().setHours(0,0,0,0);
    const upcoming = getProfileTaxEvents()
        .filter(e => new Date(e.date).setHours(0,0,0,0) >= todayTime)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 4);

    container.innerHTML = upcoming.length === 0 ? '<p class="text-gray-500 italic">На найближчий час подій не знайдено.</p>' : '';

    upcoming.forEach(event => {
        const dateStr = new Date(event.date).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' });
        const isPayment = event.type === 'payment';
        const iconColor = isPayment ? 'text-orange-500 bg-orange-50' : 'text-blue-500 bg-blue-50';
        const iconClass = isPayment ? 'fa-money-bill-transfer' : 'fa-file-signature';

        container.innerHTML += `
            <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center justify-between hover:border-blue-300 transition cursor-pointer" onclick="showEventDetails('${event.id}')">
                <div class="flex items-center gap-3">
                    <div class="${iconColor} w-10 h-10 rounded flex items-center justify-center border border-gray-100"><i class="fa-solid ${iconClass}"></i></div>
                    <div>
                        <h4 class="font-bold text-gray-800 text-sm md:text-base">${event.title}</h4>
                        <div class="text-xs font-medium text-red-600"><i class="fa-regular fa-calendar-xmark mr-1"></i> До ${dateStr}</div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderCalendarGrid() {
    const grid = document.getElementById('calendar-grid');
    const header = document.getElementById('calendar-month-year');
    if (!grid || !header) return;

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth(); 
    
    const monthNames = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
    header.innerText = `${monthNames[month]} ${year}`;
    grid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const startDayIndex = firstDay === 0 ? 6 : firstDay - 1; 
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const events = getProfileTaxEvents();

    for (let i = 0; i < startDayIndex; i++) {
        grid.innerHTML += `<div class="min-h-[5rem] md:min-h-[6rem] bg-transparent border border-transparent"></div>`;
    }

    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentObjTime = new Date(currentDateStr).getTime();
        
        let dayNumberStyle = 'text-gray-700';
        let bgClass = 'bg-white border-gray-200';
        
        if (isCurrentMonth && day === today.getDate()) {
            bgClass = 'bg-blue-50 border-blue-300';
            dayNumberStyle = 'text-blue-600 font-bold bg-blue-200 rounded-full w-6 h-6 flex items-center justify-center';
        }

        const activeEvents = events.filter(e => {
            const s = new Date(e.startPeriod).getTime();
            const d = new Date(e.date).getTime();
            return currentObjTime >= s && currentObjTime <= d;
        });

        let barsHtml = '';
        activeEvents.forEach(e => {
            const isStart = currentObjTime === new Date(e.startPeriod).getTime();
            const isEnd = currentObjTime === new Date(e.date).getTime();
            const colorClass = e.type === 'payment' ? 'bg-orange-200 text-orange-900' : 'bg-blue-200 text-blue-900';
            let rounded = isStart && isEnd ? 'rounded mx-1' : (isStart ? 'rounded-l ml-1' : (isEnd ? 'rounded-r mr-1' : ''));
            const dayOfWeek = new Date(currentDateStr).getDay();
            const showText = isStart || dayOfWeek === 1 || day === 1;

            barsHtml += `
                <div onclick="event.stopPropagation(); showEventDetails('${e.id}')" 
                     class="h-4 sm:h-5 text-[10px] sm:text-xs font-medium truncate px-1 mt-1 cursor-pointer hover:brightness-95 transition ${colorClass} ${rounded}" 
                     title="${e.title}">
                    ${showText ? e.title : ''}
                </div>
            `;
        });

        grid.innerHTML += `
            <div onclick="showDayDetails('${currentDateStr}')" class="relative min-h-[5rem] md:min-h-[6rem] border rounded flex flex-col pt-1 pb-1 hover:bg-gray-50 transition cursor-pointer overflow-hidden ${bgClass}">
                <div class="flex justify-center md:justify-start px-2 mb-1"><span class="text-sm ${dayNumberStyle} z-10">${day}</span></div>
                <div class="flex flex-col w-full z-10">${barsHtml}</div>
            </div>
        `;
    }
}

function setupCalendarListeners() {
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const newPrev = prevBtn.cloneNode(true);
    const newNext = nextBtn.cloneNode(true);
    prevBtn.parentNode.replaceChild(newPrev, prevBtn);
    nextBtn.parentNode.replaceChild(newNext, nextBtn);

    newPrev.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1); renderCalendarGrid(); });
    newNext.addEventListener('click', () => { currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1); renderCalendarGrid(); });
}

window.showEventDetails = function(eventId) {
    const event = getTaxEvents().find(e => e.id === eventId);
    if (!event) return;

    const profile = getActiveProfile();
    const isPayment = event.type === 'payment';
    
    const header = document.getElementById('event-details-header');
    const typeEl = document.getElementById('event-details-type');
    const titleEl = document.getElementById('event-details-title');
    const descEl = document.getElementById('event-details-desc');
    const startEl = document.getElementById('event-details-start');
    const endEl = document.getElementById('event-details-end');
    const amountEl = document.getElementById('event-details-amount');
    const instrEl = document.getElementById('event-details-instructions');

    header.className = `p-6 text-white ${isPayment ? 'bg-orange-500' : 'bg-blue-600'}`;
    typeEl.innerHTML = isPayment ? '<i class="fa-solid fa-money-bill-transfer mr-1"></i> Обов\'язковий Платіж' : '<i class="fa-solid fa-file-signature mr-1"></i> Подання Звіту';
    titleEl.innerText = event.title;
    descEl.innerText = event.description;
    startEl.innerText = new Date(event.startPeriod).toLocaleDateString('uk-UA');
    endEl.innerText = new Date(event.date).toLocaleDateString('uk-UA');

    let amountText = "Не застосовується (це звіт)";
    if (isPayment) {
        if (!profile) {
            amountText = "<span class='text-red-500 text-lg'>Створіть або оберіть профіль для розрахунку!</span>";
        } else {
            if (event.id.includes('esv')) {
                const esvQuart = profile.minWage * 0.22 * 3;
                amountText = `${esvQuart.toLocaleString('uk-UA', {minimumFractionDigits: 2})} ₴ <span class="text-sm text-gray-500 font-normal">(за квартал)</span>`;
            } else if (event.id.includes('ep')) {
                if (profile.taxSystem === 'fop1') amountText = `Орієнтовно 302.80 ₴ <span class="text-sm text-gray-500 font-normal">(за місяць)</span>`;
                else if (profile.taxSystem === 'fop2') amountText = `${(profile.minWage * 0.20).toLocaleString('uk-UA', {minimumFractionDigits: 2})} ₴ <span class="text-sm text-gray-500 font-normal">(за місяць)</span>`;
                else if (profile.taxSystem.includes('fop3')) {
                    const income = calculateTotalIncome(profile);
                    const rate = profile.taxSystem === 'fop3_5' ? 0.05 : 0.03;
                    amountText = `${(income * rate).toLocaleString('uk-UA', {minimumFractionDigits: 2})} ₴ <span class="text-sm text-gray-500 font-normal">(від введеного доходу)</span>`;
                } else {
                    amountText = "Згідно з річною декларацією (Загальна система)";
                }
            } else if (event.id.includes('pdv')) {
                 amountText = `<span class="text-gray-600 text-base">Сума визначається відповідно до вашої поданої декларації з ПДВ.</span>`;
            } else if (event.id.includes('gen_adv_pay')) {
                 amountText = `<span class="text-gray-600 text-base">20% від чистого оподатковуваного доходу за поточний квартал.</span>`;
            } else if (event.id.includes('gen_pay_annual')) {
                 amountText = `<span class="text-gray-600 text-base">Згідно з річною декларацією про майновий стан і доходи.</span>`;
            }
        }
    }
    
    if (event.id.includes('emp_rep')) {
        amountText = `<span class="text-gray-600 text-base">Подається обов'язково, якщо протягом кварталу ви нараховували/виплачували доходи фізичним особам.</span>`;
    }

    amountEl.innerHTML = amountText;

    instrEl.innerHTML = '';
    if (isPayment) {
        instrEl.innerHTML = `
            <li><b>Через Приват24 (для бізнесу) або Інший банк:</b> "Платежі" -> "Бюджетні платежі" -> Введіть ІПН та оберіть податок.</li>
            <li><b>Через Monobank (ФОП):</b> Головний екран -> "Податки ФОП" (реквізити підтягнуться автоматично).</li>
            <li><b>Через Taxer.ua:</b> Зручний сервіс, який сам генерує платіжки з правильними рахунками вашої області.</li>
            <li class="text-red-500 font-medium">Важливо: Рахунки для сплати податків можуть змінюватись, завжди перевіряйте їх актуальність у вашому Електронному кабінеті!</li>
        `;
    } else {
        instrEl.innerHTML = `
            <li><b>Електронний кабінет (<a href="https://cabinet.tax.gov.ua" target="_blank" class="text-blue-600 underline">tax.gov.ua</a>):</b> Офіційний портал. Знадобиться ваш КЕП (ключ ПриватБанку або Дія.Підпис).</li>
            <li><b>Через застосунок Дія (тільки для ЄП):</b> "Послуги" -> "Податки ФОП" -> "Декларації".</li>
            <li><b>M.E.Doc / Сота / Taxer:</b> Альтернативні комерційні сервіси для подання складної звітності (ПДВ, Об'єднаний звіт).</li>
        `;
    }

    openModal('event-details-modal');
};

window.showDayDetails = function(dateStr) {
    const events = getProfileTaxEvents().filter(e => e.date === dateStr);
    if(events.length > 0) return; 
    
    document.getElementById('day-modal-title').innerText = `Події: ${new Date(dateStr).toLocaleDateString('uk-UA')}`;
    document.getElementById('day-modal-content').innerHTML = `<div class="text-center text-gray-500 py-6"><i class="fa-regular fa-calendar-check text-4xl mb-3 text-gray-300 block"></i>На цю дату немає дедлайнів. Вихідний!</div>`;
    openModal('calendar-day-modal');
};

window.checkNotifications = function() {
    const banner = document.getElementById('notification-banner');
    if (!banner) return;
    const todayTime = new Date().setHours(0,0,0,0);
    let found = false;
    
    for (let event of getProfileTaxEvents()) {
        const dTime = new Date(event.date).setHours(0,0,0,0);
        const sTime = new Date(event.startPeriod).setHours(0,0,0,0);
        const diffDays = Math.ceil((dTime - todayTime) / 86400000);

        if (diffDays === 1 || diffDays === 0) {
            banner.className = 'border-l-4 p-4 mb-6 shadow-sm relative rounded-r-lg bg-red-100 border-red-500 text-red-800 block';
            document.getElementById('notif-title').innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> Терміново!`;
            document.getElementById('notif-message').innerText = `Сьогодні або завтра останній день для: "${event.title}".`;
            found = true; break; 
        }
        if (todayTime >= sTime && diffDays > 1 && diffDays <= 14) {
            banner.className = 'border-l-4 p-4 mb-6 shadow-sm relative rounded-r-lg bg-blue-100 border-blue-500 text-blue-800 block';
            document.getElementById('notif-title').innerHTML = `<i class="fa-solid fa-circle-info mr-1"></i> Відкрито період подачі`;
            document.getElementById('notif-message').innerText = `Вже можна виконувати: "${event.title}". Дедлайн: ${new Date(event.date).toLocaleDateString('uk-UA')}.`;
            found = true;
        }
    }
    if (!found) banner.classList.add('hidden');
};

document.addEventListener('DOMContentLoaded', () => setTimeout(checkNotifications, 500));