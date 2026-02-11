// --- The Lalit Intl. - Global Menu & Logo Script ---

const githubLogo = "https://raw.githubusercontent.com/abhijeetlovesmahi-commits/the-lalit-school-system/refs/heads/main/logo.png";
const schoolPhone = "+919876543210"; // Ise apne asli number se badal dein

const menuHTML = `
<input type="checkbox" id="menu-checkbox">
<label for="menu-checkbox" class="menu-toggle">
    <span></span><span></span><span></span>
</label>
<div class="sidebar">
    <div class="logo-box" style="text-align:center; padding: 20px 0; border-bottom: 1px solid rgba(212,175,55,0.3);">
        <img src="${githubLogo}" class="school-logo" id="mainLogo" 
             style="width:80px; cursor:pointer; border-radius:50%; border: 2px solid #D4AF37;" 
             title="Click to Call Office">
        <h6 style="color:#D4AF37; margin-top:10px; font-family:serif;">The Lalit Intl.</h6>
    </div>
    <div class="nav-links">
        <a href="index.html"><i class="fas fa-home"></i> Dashboard</a>
        <a href="admission.html"><i class="fas fa-user-plus"></i> New Admission</a>
        <a href="management.html"><i class="fas fa-users"></i> Student Management</a>
        <a href="fees.html"><i class="fas fa-rupee-sign"></i> Fee Collection</a>
        <a href="fee-demand-slip.html"><i class="fas fa-file-invoice"></i> Print Fee Slips</a>
        <a href="fee-history.html"><i class="fas fa-history"></i> Treasury Records</a>
        <a href="fee-master.html"><i class="fas fa-cogs"></i> Master Settings</a>
        <a href="#" onclick="logoutUser()" style="color:#ff4d4d; border-top:1px solid rgba(255,255,255,0.1);"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </div>
</div>
<label for="menu-checkbox" class="sidebar-overlay"></label>`;

// Insert Menu at the start of body
document.body.insertAdjacentHTML('afterbegin', menuHTML);

// --- Logic for Logo Click-to-Call & Image Fixing ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sabhi images ko check karke logo link update karna
    const allImgs = document.querySelectorAll('img');
    allImgs.forEach(img => {
        if (img.src.includes('logo.png') || img.classList.contains('school-logo')) {
            img.src = githubLogo;
            img.style.cursor = "pointer";
            img.onclick = () => { window.location.href = "tel:" + schoolPhone; };
        }
    });

    // 2. Specific main logo event (Backup)
    const logoBtn = document.getElementById('mainLogo');
    if(logoBtn) {
        logoBtn.onclick = () => { window.location.href = "tel:" + schoolPhone; };
    }
});

// Logout Function
function logoutUser() {
    if(confirm("Do you want to exit the Imperial Registry?")) {
        // Agar Firebase use kar rahe hain toh:
        if(typeof firebase !== 'undefined') {
            firebase.auth().signOut().then(() => { window.location.href = "login.html"; });
        } else {
            window.location.href = "login.html";
        }
    }
}
