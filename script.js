function generatePassword() {
    const length = document.getElementById("length").value;
    const upper = document.getElementById("uppercase").checked;
    const lower = document.getElementById("lowercase").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    let chars = "";
    if (upper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) chars += "0123456789";
    if (symbols) chars += "!@#$%^&*()_+";

    if (chars === "") {
        alert("Select at least one option!");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("password").value = password;

    checkStrength(password);
    addToHistory(password);
}

function copyPassword() {
    const password = document.getElementById("password").value;
    navigator.clipboard.writeText(password);
    alert("Copied!");
}

function checkStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*()_+]/.test(password)) score++;

    const fill = document.getElementById("strength-fill");
    const text = document.getElementById("strength-text");

    if (score <= 2) {
        fill.style.width = "33%";
        fill.style.background = "red";
        text.innerText = "Weak Password";
    }
    else if (score <= 4) {
        fill.style.width = "66%";
        fill.style.background = "orange";
        text.innerText = "Medium Password";
    }
    else {
        fill.style.width = "100%";
        fill.style.background = "green";
        text.innerText = "Strong Password";
    }
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

function addToHistory(password) {
    const historyList = document.getElementById("history");

    const li = document.createElement("li");
    li.textContent = password;
    historyList.prepend(li);

    saveToLocalStorage(password);
}

function saveToLocalStorage(password) {
    let passwords = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    passwords.unshift(password);
    localStorage.setItem("passwordHistory", JSON.stringify(passwords));
}

function loadHistory() {
    let passwords = JSON.parse(localStorage.getItem("passwordHistory")) || [];
    const historyList = document.getElementById("history");

    historyList.innerHTML = "";

    passwords.forEach(password => {
        const li = document.createElement("li");
        li.textContent = password;
        historyList.appendChild(li);
    });
}

function clearHistory() {
    const confirmClear = confirm("Are you sure you want to clear password history?");
    
    if (confirmClear) {
        localStorage.removeItem("passwordHistory");
        document.getElementById("history").innerHTML = "";
    }
}

window.onload = function () {
    loadHistory();
};