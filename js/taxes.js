window.renderTaxes = function() {
    const container = document.getElementById('my-taxes-container');
    const activeProfile = getActiveProfile();

    if (!activeProfile) {
        container.innerHTML = '<p class="text-gray-500 col-span-3">Оберіть або створіть профіль для перегляду податків.</p>';
        return;
    }

    // 1. ЄСВ
    const esv = activeProfile.minWage * 0.22;
    
    // 2. Єдиний податок / ПДФО
    let ep = 0;
    let epName = "Єдиний податок";
    let epInfoKey = activeProfile.taxSystem;
    const income = calculateTotalIncome(activeProfile);

    // 3. Військовий збір (ВЗ) для ФОП
    let vzFop = 0;
    let vzFopName = "Військовий збір";

    switch(activeProfile.taxSystem) {
        case 'fop1': 
            ep = 302.80; 
            vzFop = activeProfile.minWage * 0.10; // 10% від мінімалки
            vzFopName = "ВЗ (10% від мін. ЗП)";
            break;
        case 'fop2': 
            ep = activeProfile.minWage * 0.20; 
            vzFop = activeProfile.minWage * 0.10; // 10% від мінімалки
            vzFopName = "ВЗ (10% від мін. ЗП)";
            break;
        case 'fop3_5': 
            ep = income * 0.05; 
            vzFop = income * 0.01; // 1% від доходу для 3 групи
            vzFopName = "ВЗ (1% від доходу)";
            break;
        case 'fop3_3': 
            ep = income * 0.03; 
            vzFop = income * 0.01; // 1% від доходу для 3 групи
            vzFopName = "ВЗ (1% від доходу)";
            break;
        case 'general': 
            epName = "ПДФО (18%)";
            ep = income * 0.18; 
            vzFop = income * 0.015; // 1.5% для загальної системи (можна змінити на 5% якщо застосовуються нові норми)
            vzFopName = "ВЗ (1.5% від доходу)";
            break;
    }

    container.innerHTML = `
        <div class="border border-gray-200 rounded-lg p-5 bg-white shadow-sm relative hover:shadow-md transition">
            <button onclick="showTaxInfo('esv')" class="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"><i class="fa-solid fa-circle-info text-xl"></i></button>
            <div class="text-gray-500 text-sm mb-1 font-medium">ЄСВ (22% від мінімалки)</div>
            <div class="text-2xl font-bold text-gray-800">${esv.toLocaleString('uk-UA')} ₴</div>
            <div class="text-xs text-gray-400 mt-2">Обов'язковий платіж</div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-5 bg-white shadow-sm relative hover:shadow-md transition">
            <button onclick="showTaxInfo('${epInfoKey}')" class="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"><i class="fa-solid fa-circle-info text-xl"></i></button>
            <div class="text-gray-500 text-sm mb-1 font-medium">${epName}</div>
            <div class="text-2xl font-bold ${ep > 0 ? 'text-orange-500' : 'text-gray-800'}">${ep.toLocaleString('uk-UA', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₴</div>
            <div class="text-xs text-gray-400 mt-2">Базується на доході/ставці</div>
        </div>

        <div class="border border-gray-200 rounded-lg p-5 bg-white shadow-sm relative hover:shadow-md transition">
            <button onclick="showTaxInfo('vz_fop')" class="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition"><i class="fa-solid fa-circle-info text-xl"></i></button>
            <div class="text-gray-500 text-sm mb-1 font-medium">${vzFopName}</div>
            <div class="text-2xl font-bold ${vzFop > 0 ? 'text-red-500' : 'text-gray-800'}">${vzFop.toLocaleString('uk-UA', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ₴</div>
            <div class="text-xs text-gray-400 mt-2">Обов'язковий збір для ФОП</div>
        </div>
    `;
};

// Словник "Людською мовою"
window.showTaxInfo = function(type) {
    const title = document.getElementById('info-title');
    const desc = document.getElementById('info-desc');
    const human = document.getElementById('info-human');

    if (type === 'esv') {
        title.innerText = "ЄСВ (Єдиний соціальний внесок)";
        desc.innerText = "Офіційно: Консолідований страховий внесок до системи загальнообов'язкового державного соціального страхування.";
        human.innerHTML = "<b>Людською мовою:</b> Це платіж «на пенсію». Рахується жорстко як 22% від встановленої вами мінімальної зарплати.";
    } else if (type === 'vz_fop') {
        title.innerText = "Військовий збір (для ФОП)";
        desc.innerText = "Офіційно: Загальнодержавний збір на підтримання обороноздатності держави.";
        human.innerHTML = "<b>Людською мовою:</b> Новий обов'язковий податок для ФОПів. На 1-2 групі ви платите фіксований відсоток від мінімалки, а на 3 групі — 1% від усього вашого заробітку. Ці гроші йдуть безпосередньо на ЗСУ.";
    } else if (type.includes('fop3')) {
        title.innerText = "Єдиний податок (3 група)";
        desc.innerText = "Офіційно: Місцевий податок для суб'єктів спрощеної системи.";
        human.innerHTML = "<b>Людською мовою:</b> Отримали гроші — віддаєте 5% (або 3%) державі. Якщо доходу не було — не платите нічого. Все просто.";
    } else if (type.includes('fop1') || type.includes('fop2')) {
        title.innerText = "Єдиний податок (1-2 група)";
        desc.innerText = "Офіційно: Фіксована ставка податку.";
        human.innerHTML = "<b>Людською мовою:</b> Платите фіксовану суму щомісяця, незалежно від того, скільки заробили.";
    }

    openModal('info-modal');
};

// Калькулятор працівника
window.calculateEmployeeTaxes = function() {
    const salary = Number(document.getElementById('employee-salary').value);
    if(!salary || salary < 1) return alert("Введіть коректну суму зарплати!");

    const pdfo = salary * 0.18; 
    const vz = salary * 0.015;  
    const netSalary = salary - pdfo - vz; 
    const esv = salary * 0.22; 

    const resDiv = document.getElementById('employee-results');
    resDiv.classList.remove('hidden');
    
    // Створюємо глобальний об'єкт з останніми розрахунками, щоб передати їх у PDF
    window.lastCalculatedSalaryData = { salary, pdfo, vz, netSalary, esv };

    resDiv.innerHTML = `
        <div class="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-5 p-4 bg-white rounded border border-gray-100 shadow-inner">
            <div class="flex justify-between border-b pb-1"><span class="text-gray-500">ПДФО (18%):</span><span class="font-bold text-red-600">-${pdfo.toFixed(2)} ₴</span></div>
            <div class="flex justify-between border-b pb-1"><span class="text-gray-500">ВЗ (1.5%):</span><span class="font-bold text-red-600">-${vz.toFixed(2)} ₴</span></div>
            <div class="flex justify-between items-center pt-2 col-span-2 sm:col-span-1 bg-green-50 p-2 rounded">
                <span class="text-green-800 font-medium">На руки:</span><span class="font-bold text-green-600 text-lg">${netSalary.toFixed(2)} ₴</span>
            </div>
            <div class="flex justify-between items-center pt-2 col-span-2 sm:col-span-1 bg-orange-50 p-2 rounded">
                <span class="text-orange-800 font-medium">ЄСВ (зверху):</span><span class="font-bold text-orange-600">${esv.toFixed(2)} ₴</span>
            </div>
        </div>
        <button onclick="generatePDF()" class="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 rounded transition flex justify-center items-center gap-2">
            <i class="fa-solid fa-file-pdf"></i> Завантажити платіжку (PDF)
        </button>
    `;
};

// Генерація PDF для друку
window.generatePDF = function() {
    const data = window.lastCalculatedSalaryData;
    if (!data) return;

    // Створюємо тимчасовий HTML-елемент, який буде перетворено в PDF (він невидимий для користувача)
    const element = document.createElement('div');
    element.innerHTML = `
        <div style="padding: 40px; font-family: sans-serif; color: #1f2937;">
            <h1 style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 30px;">
                Розрахунковий лист (Платіжка)
            </h1>
            <p style="font-size: 14px; margin-bottom: 20px;"><strong>Дата формування:</strong> ${new Date().toLocaleDateString('uk-UA')}</p>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
                <tr style="background-color: #f3f4f6;">
                    <td style="padding: 12px; border: 1px solid #d1d5db;">Нарахована зарплата (Брудними)</td>
                    <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold; text-align: right;">${data.salary.toFixed(2)} ₴</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #d1d5db;">Податок на доходи фізичних осіб (18%)</td>
                    <td style="padding: 12px; border: 1px solid #d1d5db; color: #dc2626; text-align: right;">- ${data.pdfo.toFixed(2)} ₴</td>
                </tr>
                <tr>
                    <td style="padding: 12px; border: 1px solid #d1d5db;">Військовий збір (1.5%)</td>
                    <td style="padding: 12px; border: 1px solid #d1d5db; color: #dc2626; text-align: right;">- ${data.vz.toFixed(2)} ₴</td>
                </tr>
                <tr style="background-color: #dcfce7;">
                    <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold; color: #166534;">До виплати працівнику (На руки)</td>
                    <td style="padding: 12px; border: 1px solid #d1d5db; font-weight: bold; color: #166534; text-align: right; font-size: 18px;">${data.netSalary.toFixed(2)} ₴</td>
                </tr>
            </table>

            <div style="margin-top: 30px; padding: 15px; background-color: #fff7ed; border-left: 4px solid #f97316;">
                <p style="margin: 0; font-size: 14px; color: #9a3412;">
                    <strong>Довідково для роботодавця:</strong> ЄСВ (22%), що сплачується за рахунок підприємства, становить <b>${data.esv.toFixed(2)} ₴</b>.
                </p>
            </div>
        </div>
    `;

    // Налаштування для html2pdf
    const opt = {
        margin:       10,
        filename:     `platizhka_${new Date().toLocaleDateString('uk-UA')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Генеруємо і завантажуємо
    html2pdf().set(opt).from(element).save();
};