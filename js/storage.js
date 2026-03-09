const PROFILES_KEY = 'taxmanager_profiles';
const ACTIVE_PROFILE_KEY = 'taxmanager_active_profile';

function getProfiles() {
    const data = localStorage.getItem(PROFILES_KEY);
    return data ? JSON.parse(data) : [];
}

function saveProfiles(profilesArray) {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profilesArray));
}

function saveProfile(profileData) {
    const profiles = getProfiles();
    const newProfile = {
        id: Date.now().toString(),
        name: profileData.name,
        taxSystem: profileData.taxSystem,
        minWage: profileData.minWage,
        incomes: [],
        createdAt: new Date().toISOString()
    };
    profiles.push(newProfile);
    saveProfiles(profiles);
    return newProfile;
}

// ДОДАНО: Функція оновлення існуючого профілю
function updateProfile(profileId, updatedData) {
    const profiles = getProfiles();
    const index = profiles.findIndex(p => p.id === profileId);
    if (index !== -1) {
        // Оновлюємо тільки ті поля, які передані в updatedData
        profiles[index] = { ...profiles[index], ...updatedData };
        saveProfiles(profiles);
        return profiles[index];
    }
    return null;
}

// ДОДАНО: Функція видалення профілю
function deleteProfile(profileId) {
    let profiles = getProfiles();
    profiles = profiles.filter(p => p.id !== profileId);
    saveProfiles(profiles);
    
    // Якщо ми видалили активний профіль, скидаємо вибір
    if (getActiveProfileId() === profileId) {
        setActiveProfileId("");
    }
}

function getActiveProfileId() {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

function setActiveProfileId(id) {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
}

function getActiveProfile() {
    const profiles = getProfiles();
    const activeId = getActiveProfileId();
    return profiles.find(p => p.id === activeId) || null;
}

// Запис нової транзакції
function addIncomeToProfile(profileId, amount) {
    const profiles = getProfiles();
    const profile = profiles.find(p => p.id === profileId);
    
    if (profile) {
        if (!profile.incomes) profile.incomes = [];
        profile.incomes.push({
            id: 'inc_' + Date.now().toString(),
            amount: Number(amount),
            date: new Date().toISOString()
        });
        saveProfiles(profiles);
    }
}

// Видалення транзакції
function deleteIncome(profileId, transactionId) {
    const profiles = getProfiles();
    const profile = profiles.find(p => p.id === profileId);
    
    if (profile && profile.incomes) {
        profile.incomes = profile.incomes.filter(inc => inc.id !== transactionId);
        saveProfiles(profiles);
    }
}

// Підрахунок загальної суми з історії
function calculateTotalIncome(profile) {
    if (!profile || !profile.incomes || profile.incomes.length === 0) return 0;
    return profile.incomes.reduce((sum, transaction) => sum + transaction.amount, 0);
}