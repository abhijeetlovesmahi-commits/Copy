/* THE LALIT INTERNATIONAL SCHOOL - UPDATED MENU */

function loadMenu() {
    if (document.getElementById('sidebar-wrapper')) return;

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
                <p style="color:#D4AF37; padding:20px;">Loading Portal...</p>
            </nav>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', menuHTML);
    renderDynamicLinks();
}

async function renderDynamicLinks() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const nav = document.getElementById('dynamic-nav-links');
        if (!user) return;

        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            const data = doc.exists ? doc.data() : { role: 'admin' }; 
            const perms = data.permissions || {};
            const role = data.role;

            let html = `<a href="dashboard.html"><i class="fas fa-home"></i> Dashboard</a>`;

            // Students Registry & Admission
            if (role === 'admin' || perms.p_students) {
                html += `<a href="view-students.html"><i class="fas fa-users"></i> Student Registry</a>`;
            }
            if (role === 'admin') {
                html += `<a href="add-student.html"><i class="fas fa-user-plus"></i> Admission</a>`;
            }

            // Academics
            html += `<div class="menu-divider">Academics</div>`;
            if (role === 'admin' || perms.p_attendance) html += `<a href="attendance.html"><i class="fas fa-calendar-check"></i> Attendance</a>`;
            if (role === 'admin' || perms.p_marks) html += `<a href="exam-marks-entry.html"><i class="fas fa-pen-nib"></i> Marks Entry</a>`;
            html += `<a href="exam-repot-card.html"><i class="fas fa-file-alt"></i> Report Card</a>`;

            // Treasury
            if (role === 'admin' || perms.p_fees) {
                html += `<div class="menu-divider">Treasury</div>`;
                html += `<a href="collect-fees.html"><i class="fas fa-vault"></i> Collect Fees</a>`;
                html += `<a href="fee-history.html"><i class="fas fa-history"></i> Fee History</a>`;
            }

            // Administration (Admin Only)
            if (role === 'admin') {
                html += `<div class="menu-divider">Admin</div>`;
                html += `<a href="manage-users.html"><i class="fas fa-user-shield"></i> Staff & Roles</a>`;
                html += `<a href="web-control.html"><i class="fas fa-globe"></i> Website Manager</a>`;
            }

            html += `<div class="menu-divider">Security</div>`;
            html += `<a href="#" onclick="handleLogout()" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout Registry</a>`;

            nav.innerHTML = html;
        } catch (e) { console.error(e); }
    });
}

// ... toggleMenu and handleLogout functions same as before ...
