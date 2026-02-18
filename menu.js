/* THE LALIT INTERNATIONAL SCHOOL - FULLY FIXED STABLE MENU */

const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

function loadMenu() {
    if (document.getElementById('sidebar-wrapper')) return;

    // FontAwesome Support
    if (!document.getElementById('fa-icons-link')) {
        const fa = document.createElement('link');
        fa.id = 'fa-icons-link';
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    const menuHTML = `
    <div id="sidebar-wrapper">
        <div id="sidebar-overlay" onclick="toggleMenu(false)"></div>
        <div id="menu-trigger" onclick="toggleMenu()" style="position: fixed; top: 20px; left: 20px; z-index: 999999; cursor: pointer; padding: 10px; background: rgba(255,255,255,0.9); border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
        </div>
        <div id="mySidebar" class="sidebar">
            <div class="sidebar-header">
                <img src="logo.png" class="menu-logo" onerror="this.src='https://via.placeholder.com/65'">
                <h4 class="school-name">THE LALIT INTERNATIONAL SCHOOL</h4>
            </div>
            <nav class="nav-links" id="dynamic-nav-links">
                <p style="color:#D4AF37; padding:20px; font-size:12px;"><i class="fas fa-spinner fa-spin me-2"></i>Link Syncing...</p>
            </nav>
        </div>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@400;500&display=swap');
            .bar1, .bar2, .bar3 { width: 25px; height: 3px; background-color: #002366; margin: 5px 0; transition: 0.4s; border-radius: 2px; }
            .change .bar1 { transform: rotate(-45deg) translate(-7px, 5px); background-color: #D4AF37; }
            .change .bar2 { opacity: 0; }
            .change .bar3 { transform: rotate(45deg) translate(-6px, -6px); background-color: #D4AF37; }
            .sidebar { width: 280px; background: #002366; height: 100vh; position: fixed; left: -300px; top: 0; transition: 0.4s; z-index: 1000000; border-right: 4px solid #D4AF37; overflow-y: auto; font-family: 'Poppins', sans-serif; }
            .sidebar.open { left: 0; }
            #sidebar-overlay { position: fixed; display: none; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0,0,0,0.5); z-index: 999998; }
            .sidebar-header { padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.2); }
            .menu-logo { width: 80px; height: 80px; background: white; border-radius: 50%; padding: 5px; border: 3px solid #D4AF37; }
            .school-name { color: #D4AF37; font-family: 'Cinzel', serif; margin-top:10px; font-size: 1.1rem; }
            .nav-links { padding: 20px 10px; }
            .menu-divider { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; padding: 15px 20px 5px; font-weight: bold; }
            .nav-links a { color: #ffffff; display: flex; align-items: center; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 8px; margin-bottom: 2px; transition: 0.3s; cursor: pointer; }
            .nav-links a i { margin-right: 15px; width: 20px; text-align: center; color: #D4AF37; }
            .nav-links a:hover { background: rgba(212,175,55,0.15); color: #D4AF37; }
            .logout-link { color: #ff6b6b !important; border: 1px solid rgba(255,107,107,0.2) !important; margin-top: 20px !important; }
        </style>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    loadBackend();
}

// Global Toggle Function (Turant kaam karega)
window.toggleMenu = function(forceClose) {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const trigger = document.getElementById('menu-trigger');
    
    const shouldOpen = forceClose === undefined ? !sidebar.classList.contains('open') : forceClose;

    if (shouldOpen) {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        trigger.classList.add('change');
    } else {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
        trigger.classList.remove('change');
    }
};

function loadBackend() {
    const scripts = [
        "https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js",
        "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js",
        "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore-compat.js"
    ];

    let loaded = 0;
    scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => {
            if (++loaded === scripts.length) {
                if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
                renderLinks();
            }
        };
        document.head.appendChild(s);
    });
}

async function renderLinks() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const nav = document.getElementById('dynamic-nav-links');
        if (!user) { nav.innerHTML = `<a href="login.html"><i class="fas fa-sign-in-alt"></i> Login Portal</a>`; return; }

        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            const data = doc.exists ? doc.data() : { role: 'staff' };
            const role = data.role || 'staff';
            const p = data.permissions || {};

            let html = `<a href="dashboard.html"><i class="fas fa-home"></i> Dashboard</a>`;
            
            if (role === 'admin') {
                html += `
                <div class="menu-divider">Registry</div>
                <a href="view-students.html"><i class="fas fa-users"></i> Student Registry</a>
                <div class="menu-divider">Academic</div>
                <a href="attendance.html"><i class="fas fa-calendar-check"></i> Student Attendance</a>
                <a href="staff-attendance.html"><i class="fas fa-user-tie"></i> Staff Attendance</a>
                <a href="exam-marks-entry.html"><i class="fas fa-pen-nib"></i> Marks Entry</a>
                <div class="menu-divider">Accounts</div>
                <a href="collect-fees.html"><i class="fas fa-vault"></i> Collect Fees</a>
                <a href="fee-history.html"><i class="fas fa-history"></i> Fee History</a>
                <div class="menu-divider">Admin</div>
                <a href="manage-users.html"><i class="fas fa-user-shield"></i> Manage Staff</a>`;
            } else {
                if (p.attendance) html += `<a href="attendance.html"><i class="fas fa-calendar-check"></i> Attendance</a>`;
            }

            html += `<a href="#" onclick="handleLogout()" class="nav-links logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
            nav.innerHTML = html;
        } catch (e) {
            nav.innerHTML = `<p style="color:red; padding:20px;">Sync Error</p>`;
        }
    });
}

window.handleLogout = function() {
    if(confirm("Logout?")) firebase.auth().signOut().then(() => window.location.href="login.html");
};

// Initialize
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadMenu);
else loadMenu();
