/* THE LALIT INTERNATIONAL SCHOOL - ORIGINAL CODE RESTORED */

// 1. Firebase Config (Jo aapne di thi)
const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

// Initialization fix: Taki firebase error na de
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function loadMenu() {
    if (document.getElementById('sidebar-wrapper')) return;

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
        <div id="menu-trigger" onclick="handleMenuClick(event)">
            <div class="bar1"></div><div class="bar2"></div><div class="bar3"></div>
        </div>
        <div id="mySidebar" class="sidebar">
            <div class="sidebar-header">
                <img src="logo.png" class="menu-logo" onerror="this.src='https://via.placeholder.com/65'">
                <h4 class="school-name">THE LALIT INTERNATIONAL SCHOOL</h4>
            </div>
            <nav class="nav-links" id="dynamic-nav-links">
                <p style="color:#D4AF37; padding:20px; font-size:12px;"><i class="fas fa-spinner fa-spin me-2"></i>Verifying Registry...</p>
            </nav>
        </div>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Poppins:wght@400;500&display=swap');
            #menu-trigger { position: fixed; top: 20px; left: 20px; z-index: 20000; cursor: pointer; padding: 5px; }
            .bar1, .bar2, .bar3 { width: 30px; height: 3px; background-color: #002366; margin: 6px 0; transition: 0.4s; border-radius: 2px; }
            .change .bar1 { transform: rotate(-45deg) translate(-8px, 7px); background-color: #D4AF37; }
            .change .bar2 { opacity: 0; }
            .change .bar3 { transform: rotate(45deg) translate(-8px, -8px); background-color: #D4AF37; }
            .sidebar { width: 280px; background: #002366; height: 100vh; position: fixed; left: -300px; top: 0; transition: 0.4s; z-index: 15000; border-right: 4px solid #D4AF37; overflow-y: auto; font-family: 'Poppins', sans-serif; }
            .sidebar.open { left: 0; }
            #sidebar-overlay { position: fixed; display: none; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0,0,0,0.5); z-index: 10000; }
            .sidebar-header { padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.2); }
            .menu-logo { width: 80px; height: 80px; background: white; border-radius: 50%; padding: 5px; border: 3px solid #D4AF37; }
            .school-name { color: #D4AF37; font-family: 'Cinzel', serif; margin-top:10px; font-size: 1.1rem; }
            .nav-links { padding: 20px 10px; }
            .menu-divider { color: rgba(255,255,255,0.4); font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; padding: 15px 20px 5px; font-weight: bold; }
            .nav-links a { color: #ffffff; display: flex; align-items: center; padding: 12px 20px; text-decoration: none; font-size: 14px; border-radius: 8px; margin-bottom: 2px; transition: 0.3s; }
            .nav-links a i { margin-right: 15px; width: 20px; text-align: center; color: #D4AF37; }
            .nav-links a:hover { background: rgba(212,175,55,0.15); color: #D4AF37; }
            .logout-link { color: #ff6b6b !important; margin-top: 20px !important; border: 1px solid rgba(255,107,107,0.2) !important; }
        </style>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    renderDynamicLinks();
}

async function renderDynamicLinks() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const nav = document.getElementById('dynamic-nav-links');
        if (!user) { window.location.href = "login.html"; return; }

        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            if (!doc.exists) {
                nav.innerHTML = `<p style="color:red; padding:20px;">Unauthorized. Contact Admin.</p>
                <a href="#" onclick="handleLogout()" class="nav-links logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
                return;
            }

            const data = doc.data();
            const p = data.permissions || {};
            const role = data.role || 'staff';

            let html = `<a href="dashboard.html"><i class="fas fa-home"></i> Dashboard</a>`;

            if (role === 'admin') {
                html += `
                <div class="menu-divider">Registry</div>
                <a href="view-students.html"><i class="fas fa-users"></i> Student Registry</a>
                <a href="add-student.html"><i class="fas fa-user-plus"></i> New Admission</a>
                <a href="edit-student.html"><i class="fas fa-user-edit"></i> Edit Student</a>
                <div class="menu-divider">Academic & Exams</div>
                <a href="exam-master.html"><i class="fas fa-layer-group"></i> Exam Master</a>
                <a href="exam-marks-entry.html"><i class="fas fa-pen-nib"></i> Marks Entry</a>
                <a href="exam-repot-card.html"><i class="fas fa-file-alt"></i> Report Card</a>
                <a href="attendance.html"><i class="fas fa-calendar-check"></i> Attendance</a>
                <div class="menu-divider">Treasury & Accounts</div>
                <a href="fee-master.html"><i class="fas fa-cog"></i> Fee Structure</a>
                <a href="collect-fees.html"><i class="fas fa-vault"></i> Collect Fees</a>
                <a href="fee-history.html"><i class="fas fa-history"></i> Fee History</a>
                <a href="fee-demand-slip.html"><i class="fas fa-file-invoice"></i> Demand Slips</a>
                <a href="master-ledger.html"><i class="fas fa-book"></i> Master Ledger</a>
                <a href="defaulter-list.html"><i class="fas fa-exclamation-triangle"></i> Defaulter List</a>
                <div class="menu-divider">Administration</div>
                <a href="manage-users.html"><i class="fas fa-user-shield"></i> Staff & Roles</a>
                <a href="web-control.html"><i class="fas fa-globe"></i> Website Manager</a>`;
            } else {
                if (p.view_students || p.add_student || p.edit_student) {
                    html += `<div class="menu-divider">Registry</div>`;
                    if (p.view_students) html += `<a href="view-students.html"><i class="fas fa-users"></i> Student Registry</a>`;
                    if (p.add_student) html += `<a href="add-student.html"><i class="fas fa-user-plus"></i> New Admission</a>`;
                    if (p.edit_student) html += `<a href="edit-student.html"><i class="fas fa-user-edit"></i> Edit Student</a>`;
                }
                if (p.attendance || p.marks_entry || p.report_card || p.exam_master) {
                    html += `<div class="menu-divider">Academic & Exams</div>`;
                    if (p.exam_master) html += `<a href="exam-master.html"><i class="fas fa-layer-group"></i> Exam Master</a>`;
                    if (p.marks_entry) html += `<a href="exam-marks-entry.html"><i class="fas fa-pen-nib"></i> Marks Entry</a>`;
                    if (p.report_card) html += `<a href="exam-repot-card.html"><i class="fas fa-file-alt"></i> Report Card</a>`;
                    if (p.attendance) html += `<a href="attendance.html"><i class="fas fa-calendar-check"></i> Attendance</a>`;
                }
            }
            html += `<a href="#" onclick="handleLogout()" class="nav-links logout-link"><i class="fas fa-sign-out-alt"></i> Logout Registry</a>`;
            nav.innerHTML = html;
        } catch (e) { console.error(e); }
    });
}

function handleMenuClick(e) {
    e.stopPropagation();
    const sidebar = document.getElementById('mySidebar');
    if (sidebar) toggleMenu(!sidebar.classList.contains('open'));
}

function toggleMenu(isOpen) {
    const sidebar = document.getElementById('mySidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const trigger = document.getElementById('menu-trigger');
    if (isOpen) {
        sidebar.classList.add('open');
        overlay.style.display = 'block';
        trigger.classList.add('change');
    } else {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
        trigger.classList.remove('change');
    }
}

function handleLogout() {
    if(confirm("Exit Registry?")) {
        firebase.auth().signOut().then(() => window.location.href = "login.html");
    }
}

// Initialization
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadMenu);
else loadMenu();

