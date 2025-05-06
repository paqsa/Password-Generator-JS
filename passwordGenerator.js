// DOM Elements
const passwordDisplay = document.querySelector('.generatedPassword');
const lengthDisplay = document.querySelector('.lengthOfPassoword');
const slider = document.getElementById('pricingSlider');
const generateBtn = document.querySelector('.generateSection');
const copyIcon = document.querySelector('.copySVG');
const notification = document.getElementById("notificationSection");
notification.style.display = 'none'

// Update length display from slider
slider.addEventListener('input', () => {
    lengthDisplay.textContent = slider.value * 4; // Adjust multiplier as desired
});

// Get settings from toggles (simulate checkboxes for now)
const options = document.querySelectorAll('.includesPassword');

function getOptions() {
    return {
        uppercase: options[0].querySelector('rect').getAttribute('fill') === '#A4FFAF',
        lowercase: options[1].querySelector('rect').getAttribute('fill') === '#A4FFAF',
        numbers: options[2].querySelector('rect').getAttribute('fill') === '#A4FFAF',
        symbols: options[3].querySelector('rect').getAttribute('fill') === '#A4FFAF',
    };
}

// Toggle logic (optional if replacing with checkboxes later)
options.forEach(option => {
    option.addEventListener('click', () => {
        const rect = option.querySelector('rect');
        const current = rect.getAttribute('fill');
        rect.setAttribute('fill', current === '#A4FFAF' ? '#ddd' : '#A4FFAF');
    });
});

// Password generation logic
function generatePassword(length, opts) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    let chars = "";
    if (opts.uppercase) chars += upper;
    if (opts.lowercase) chars += lower;
    if (opts.numbers) chars += nums;
    if (opts.symbols) chars += syms;

    if (chars.length === 0) return "Please select at least 1 option";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Generate button
generateBtn.addEventListener('click', () => {
    const length = parseInt(lengthDisplay.textContent);
    const opts = getOptions();
    const newPassword = generatePassword(length, opts);
    passwordDisplay.textContent = newPassword;
});

// Copy password
copyIcon.addEventListener('click', () => {
    const text = passwordDisplay.textContent;
    navigator.clipboard.writeText(text).then(() => {
       notification.style.display = '';
       setTimeout(() => {
        notification.style.display = 'none'; // hide after 3 seconds
      }, 3000);
    });
});
