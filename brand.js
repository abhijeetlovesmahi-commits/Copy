// brand.js
function applyBranding() {
    const brandContainer = document.getElementById('brand-header-container');
    if (brandContainer) {
        brandContainer.innerHTML = `
            <img src="logo.png" alt="School Logo" class="school-logo" onerror="this.src='https://via.placeholder.com/110'">
            <h1>VIDYA International School</h1>
            <p style="letter-spacing: 5px; font-size: 0.8rem; color: var(--deep-gold);">NURTURING GLOBAL CITIZENS</p>
        `;
    }
    // Browser ka tab title bhi change kar sakte hain
    // document.title = "TLIS | Imperial Registry";
}

document.addEventListener('DOMContentLoaded', applyBranding);
