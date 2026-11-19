// Initialize default localStorage states
if (!localStorage.getItem('user_balance')) localStorage.setItem('user_balance', '15.00');
if (!localStorage.getItem('user_orders')) localStorage.setItem('user_orders', JSON.stringify([]));
if (!localStorage.getItem('entered_giveaways')) localStorage.setItem('entered_giveaways', JSON.stringify([]));

// Update wallet balance UI across all pages
function updateWalletUI() {
    const currentBalance = parseFloat(localStorage.getItem('user_balance'));
    document.querySelectorAll('.wallet-balance').forEach(el => {
        el.textContent = `$${currentBalance.toFixed(2)}`;
    });
}

// Stage 1: Open steel vault door when clicked
function openSteelVault() {
    const wheel = document.getElementById('steel-wheel');
    const gateWrapper = document.getElementById('gate-wrapper');
    const promptText = document.getElementById('press-prompt');

    if (!wheel || !gateWrapper || gateWrapper.classList.contains('door-opened')) return;
    if (promptText) promptText.textContent = "UNLOCKING MECHANISM...";
    wheel.classList.add('spin-unlock');

    setTimeout(() => gateWrapper.classList.add('door-opened'), 650);
}

// Stage 2: Verify Telegram group membership (t.me/DVD_shxp)
function verifyTelegramAccess() {
    const statusText = document.getElementById('tg-status');
    const loginBtn = document.getElementById('tg-login-btn');

    if (loginBtn) loginBtn.disabled = true;
    if (statusText) {
        statusText.style.color = "#00a8ff";
        statusText.textContent = "[...] CHECKING SUBSCRIPTION AT t.me/DVD_shxp";
    }

    setTimeout(() => {
        const gateWrapper = document.getElementById('gate-wrapper');
        if (gateWrapper) gateWrapper.classList.add('fully-unlocked');
        document.querySelectorAll('.gated-nav').forEach(nav => nav.classList.add('visible'));
    }, 1200);
}

function lockVaultDemo() {
    location.href = 'index.html';
}

// Shop: Purchase item
function buyItem(itemName, price) {
    let balance = parseFloat(localStorage.getItem('user_balance'));
    if (balance < price) {
        alert(`Insufficient funds! You need $${price.toFixed(2)}. Top up in the Wallet page.`);
        return;
    }
    balance -= price;
    localStorage.setItem('user_balance', balance.toFixed(2));

    const orders = JSON.parse(localStorage.getItem('user_orders'));
    orders.push({ item: itemName, price: price.toFixed(2), date: new Date().toLocaleDateString() });
    localStorage.setItem('user_orders', JSON.stringify(orders));

    updateWalletUI();
    alert(`Purchase successful: ${itemName} unlocked! View it in your Profile.`);
}

// Wallet: Top up funds
function topUpWallet(amount) {
    let balance = parseFloat(localStorage.getItem('user_balance'));
    balance += parseFloat(amount);
    localStorage.setItem('user_balance', balance.toFixed(2));
    updateWalletUI();
    alert(`Added $${parseFloat(amount).toFixed(2)} to your balance!`);
}

// Giveaways: Enter drop
function enterGiveaway(title, btnElement) {
    const entered = JSON.parse(localStorage.getItem('entered_giveaways'));
    if (!entered.includes(title)) {
        entered.push(title);
        localStorage.setItem('entered_giveaways', JSON.stringify(entered));
    }
    if (btnElement) {
        btnElement.textContent = "ENTRY CONFIRMED";
        btnElement.disabled = true;
    }
    alert(`You are entered into: ${title}`);
}

// Profile: Load order history table if on profile.html
function renderProfileOrders() {
    const tableBody = document.getElementById('order-history-body');
    if (!tableBody) return;

    const orders = JSON.parse(localStorage.getItem('user_orders'));
    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">No unlocked assets yet. Visit the Shop to acquire tools.</td></tr>';
        return;
    }
    tableBody.innerHTML = orders.map(o => `
        <tr>
            <td>${o.item}</td>
            <td>$${o.price}</td>
            <td>${o.date}</td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    updateWalletUI();
    renderProfileOrders();
});
