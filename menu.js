/* THE LALIT INTERNATIONAL SCHOOL - CLEAN MENU LOGIC */

const menuConfig = [
    { title: "Dashboard", icon: "fa-home", link: "index.html", role: "all" },
    { type: "divider", title: "Admission & Staff", role: ["admin", "accountant"] },
    { title: "Student Admission", icon: "fa-user-plus", link: "add-student.html", role: ["admin", "accountant"] },
    { title: "Staff Enrollment", icon: "fa-user-tie", link: "add-staff.html", role: ["admin"] },
    { title: "View Students", icon: "fa-users-viewfinder", link: "view-students.html", role: ["admin", "accountant", "teacher"] },

    { type: "divider", title: "Academic & Exams", role: "all" },
    { title: "Student Attendance", icon: "fa-calendar-check", link: "attendance.html", role: ["admin", "teacher"] },
    { title: "Staff Attendance", icon: "fa-clipboard-user", link: "staff-attendance.html", role: ["admin"] },
    { title: "Exam Master", icon: "fa-layer-group", link: "exam-master.html", role: ["admin"] },
    { title: "Marks Entry", icon: "fa-pen-nib", link: "exam-marks-entry.html", role: ["admin", "teacher"] },
    { title: "Report Card", icon: "fa-file-alt", link: "exam-repot-card.html", role: "all" },

    { type: "divider", title: "Treasury & Accounts", role: ["admin", "accountant", "student"] },
    { title: "Fees Settings", icon: "fa-file-invoice-dollar", link: "fee-master.html", role: ["admin"] },
    { title: "Collect Fees", icon: "fa-vault", link: "collect-fees.html", role: ["admin", "accountant"] },
    { title: "Fee History", icon: "fa-history", link: "fee-history.html", role: ["admin", "accountant", "student"] },
    { title: "Fee Demand Slip", icon: "fa-receipt", link: "fee-demand-slip.html", role: ["admin", "accountant"] },
    { title: "Defaulter List", icon: "fa-exclamation-triangle", link: "defaulter-list.html", role: ["admin", "accountant"] },

    { type: "divider", title: "Administration", role: ["admin"] },
    { title: "Manage Users", icon: "fa-user-shield", link: "manage-users.html", role: ["admin"] },

    { type: "divider", title: "Security", role: "all" },
    { title: "Reset Password", icon: "fa-key", link: "#", role: "all", id: "resetPasswordBtn" },
    { title: "Logout", icon: "fa-sign-out-alt", link: "#", role: "all", id: "logoutBtn" }
];

async function initUniversalMenu() {
    const user = firebase.auth().currentUser;
    let userRole = "guest";

    if (user) {
        const staffDoc = await firebase.firestore().collection('staff').where('loginEmail', '==', user.email).get();
        if (!staffDoc.empty) {
            userRole = staffDoc.docs[0].data().role;
        } else {
            const studentDoc = await firebase.firestore().collection('students').where('loginEmail', '==', user.email).get();
            if (!studentDoc.empty) { userRole = "student"; }
        }
    }

    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    const hasAccess = (item) => (item.role === "all") || (Array.isArray(item.role) && item.role.includes(userRole)) || (item.role === userRole);

    const menuWrapper = document.createElement('div');
    menuWrapper.id = 'imperial-menu-wrapper';
    
    let menuItemsHTML = '';
    menuConfig.forEach(item => {
        if (hasAccess(item)) {
            if (item.type === "divider") { 
                menuItemsHTML += `<div class="menu-divider">${item.title}</div>`; 
            } else {
                const isActive = currentPage === item.link ? 'active-link' : '';
                menuItemsHTML += `<a href="${item.link}" class="nav-item ${isActive}" id="${item.id || ''}"><i class="fas ${item.icon}"></i> <span>${item.title}</span></a>`;
            }
        }
    });

    menuWrapper.innerHTML = `
        <div id="menu-overlay"></div>
        <div id="sidebar-panel">
            <div class="sidebar-header">
                <img src="logo.png" class="menu-logo" onerror="this.src='https://via.placeholder.com/60'">
                <h3>THE LALIT</h3>
                <p>INTERNATIONAL SCHOOL</p>
                <div style="font-size:0.6rem; color:var(--gold); margin-top:5px; text-transform:uppercase;">Role: ${userRole}</div>
            </div>
            <nav class="nav-links">${menuItemsHTML}</nav>
        </div>
        <button id="menu-trigger-btn"><span></span><span></span><span></span></button>
    `;
    document.body.prepend(menuWrapper);

    // Sidebar Toggling
    const trigger = document.getElementById('menu-trigger-btn');
    const panel = document.getElementById('sidebar-panel');
    const overlay = document.getElementById('menu-overlay');
    
    const toggle = () => { 
        panel.classList.toggle('open'); 
        trigger.classList.toggle('open-btn'); 
        overlay.style.display = panel.classList.contains('open') ? 'block' : 'none'; 
    };
    
    trigger.onclick = toggle; 
    overlay.onclick = toggle;

    // Password Reset & Logout Logic (Untouched)
    setupMenuActions(user);
}

function setupMenuActions(user) {
    const resetBtn = document.getElementById('resetPasswordBtn');
    if(resetBtn) {
        resetBtn.onclick = async (e) => {
            e.preventDefault();
            const newPass = prompt("Apna Naya Password likhein (Min 6 chars):");
            if (newPass && newPass.length >= 6) {
                const confirmPass = prompt("Confirm karein:");
                if (newPass === confirmPass) {
                    try {
                        await user.updatePassword(newPass);
                        alert("✅ Password Success!");
                    } catch (error) {
                        alert(error.message);
                        if (error.code === 'auth/requires-recent-login') firebase.auth().signOut();
                    }
                }
            }
        };
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            if(confirm("Logout?")) firebase.auth().signOut().then(() => { window.location.href = "login.html"; });
        };
    }
}

firebase.auth().onAuthStateChanged((user) => {
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    if (!user && currentPage !== "login.html") { window.location.href = "login.html"; } 
    else if (user) { initUniversalMenu(); }
});
