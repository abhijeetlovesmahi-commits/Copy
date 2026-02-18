/* THE LALIT INTERNATIONAL SCHOOL - FINAL DESTRUCTIVE FIX */

// 1. Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

// 2. TOGGLE FUNCTION (Sabse upar taaki turant kaam kare)
window.toggleMenu = function(open) {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const trigger = document.getElementById('menu-trigger');
    
    if (!sidebar) return;

    const isCurrentlyOpen = sidebar.classList.contains('open');
    const newState = (open === undefined) ? !isCurrentlyOpen : open;

    if (newState) {
        sidebar.classList.add('open');
        if(overlay) overlay.style.display = 'block';
        if(trigger) trigger.classList.add('change');
    } else {
        sidebar.classList.remove('open');
        if(overlay) overlay.style.display = 'none';
        if(trigger) trigger.classList.remove('change');
    }
};

// 3. UI GENERATION
function loadMenu() {
    if (document.getElementById('sidebar-wrapper')) return;

    const menuHTML = `
    <div id="sidebar-wrapper">
        <div id="sidebar-overlay" onclick="toggleMenu(false)" style="position:fixed; display:none; width:100%; height:100%; top:0; left:0; background:rgba(0,0,0,0.5); z-index:9999;"></div>
        
        <div id="menu-trigger" onclick="toggleMenu()" style="position:fixed; top:20px; left:20px; z-index:10001; cursor:pointer; padding:10px; background:#fff; border-radius:5px; box-shadow:0 2px 10px rgba(0,0,0,0.2);">
            <div class="bar1" style="width:25px; height:3px; background:#002366; margin:5px 0; transition:0.4s;"></div>
            <div class="bar2" style="width:25px; height:3px; background:#002366; margin:5px 0; transition:0.4s;"></div>
            <div class="bar3" style="width:25px; height:3px; background:#002366; margin:5px 0; transition:0.4s;"></div>
        </div>

        <div id="mySidebar" class="sidebar" style="width:280px; background:#002366; height:100vh; position:fixed; left:-300px; top:0; transition:0.4s; z-index:10000; border-right:4px solid #D4AF37; overflow-y:auto; font-family:sans-serif;">
            <div style="padding:40px 20px; text-align:center; border-bottom:1px solid rgba(212,175,55,0.2);">
                <img src="logo.png" style="width:80px; border-radius:50%; border:3px solid #D4AF37; background:#fff;" onerror="this.src='https://via.placeholder.com/80'">
                <h4 style="color:#D4AF37; margin-top:10px; font-size:1.1rem;">THE LALIT INTERNATIONAL SCHOOL</h4>
            </div>
            <nav id="dynamic-nav-links" style="padding:20px 10px;">
                <p style="color:#D4AF37; padding:20px;"><i class="fas fa-spinner fa-spin"></i> Syncing Links...</p>
            </nav>
        </div>
        
        <style>
            .sidebar.open { left: 0 !important; }
            .change .bar1 { transform: rotate(-45deg) translate(-7px, 5px); background:#D4AF37 !important; }
            .change .bar2 { opacity: 0; }
            .change .bar3 { transform: rotate(45deg) translate(-6px, -6px); background:#D4AF37 !important; }
            .nav-link-item { color:#fff; display:flex; align-items:center; padding:12px 20px; text-decoration:none; font-size:14px; border-radius:8px; transition:0.3s; }
            .nav-link-item:hover { background:rgba(212,175,55,0.15); color:#D4AF37; }
            .menu-divider { color:rgba(255,255,255,0.4); font-size:11px; text-transform:uppercase; padding:15px 20px 5px; font-weight:bold; letter-spacing:1px; }
        </style>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    
    // Load Dependencies
    loadScripts();
}

// 4. LOAD FIREBASE SCRIPTS
function loadScripts() {
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
                fetchUserAndRender();
            }
        };
        document.head.appendChild(s);
    });
}

// 5. DATA FETCH
async function fetchUserAndRender() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const nav = document.getElementById('dynamic-nav-links');
        if (!user) { window.location.href = "login.html"; return; }

        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            const data = doc.exists ? doc.data() : { role: 'staff' };
            const role = data.role || 'staff';

            let html = `<a href="dashboard.html" class="nav-link-item"><i class="fas fa-home" style="margin-right:10px;"></i> Dashboard</a>`;
            
            if (role === 'admin') {
                html += `
                <div class="menu-divider">Registry</div>
                <a href="view-students.html" class="nav-link-item">Student Registry</a>
                <div class="menu-divider">Academic</div>
                <a href="attendance.html" class="nav-link-item">Student Attendance</a>
                <a href="staff-attendance.html" class="nav-link-item">Staff Attendance</a>
                <div class="menu-divider">Accounts</div>
                <a href="collect-fees.html" class="nav-link-item">Collect Fees</a>`;
            } else {
                html += `<a href="attendance.html" class="nav-link-item">Attendance</a>`;
            }

            html += `<a href="#" onclick="firebase.auth().signOut().then(()=>window.location.reload())" class="nav-link-item" style="color:#ff6b6b; margin-top:20px; border:1px solid rgba(255,107,107,0.2);">Logout</a>`;
            nav.innerHTML = html;
        } catch (e) {
            nav.innerHTML = `<p style="color:red; padding:20px;">Sync Error</p>`;
        }
    });
}

// RUN
loadMenu();
