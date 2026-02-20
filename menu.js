/* THE LALIT INTERNATIONAL SCHOOL - UNIVERSAL MODULAR MENU */

const menuConfig = [
    { title: "Dashboard", icon: "fa-home", link: "index.html", role: "all" },
    { title: "Admission", icon: "fa-user-plus", link: "add-student.html", role: "admin" },
    { title: "Admission", icon: "fa-user-plus", link: "add-staff.html", role: "admin" },
    { type: "divider", title: "Academic & Exams" },
    { title: "Attendance", icon: "fa-calendar-check", link: "attendance.html", role: "all" },
    { title: "Staff Attendance", icon: "fa-calendar-check", link: "staff-attendance.html", role: "admin" },
    { title: "Exam Master", icon: "fa-layer-group", link: "exam-master.html", role: "admin" },
    { title: "Marks Entry", icon: "fa-pen-nib", link: "exam-marks-entry.html", role: "teacher" },
    { title: "Report Card", icon: "fa-file-alt", link: "exam-repot-card.html", role: "all" },

    { type: "divider", title: "Treasury & Accounts" },
    { title: "Fees Settings", icon: "fa-cog", icon: "fa-file-invoice-dollar", link: "fee-master.html", role: "admin" },
    { title: "Collect Fees", icon: "fa-vault", link: "collect-fees.html", role: "admin" },
    { title: "Ledger", icon: "fa-history", link: "fee-history.html", role: "admin" },
    { title: "Fee Demand Slip", icon: "fa-receipt", link: "fee-demand-slip.html", role: "admin" },
    { title: "Defaulter List", icon: "fa-exclamation-triangle", link: "defaulter-list.html", role: "admin" },

    { type: "divider", title: "Administration" },
    { title: "Manage Users", icon: "fa-user-shield", link: "manage-users.html", role: "admin" },

    { type: "divider", title: "Security" },
    { title: "Logout Registry", icon: "fa-sign-out-alt", link: "#", role: "all", id: "logoutBtn" }
];

function initUniversalMenu() {
    // 1. Sidebar aur Overlay ka Structure create karna
    const menuWrapper = document.createElement('div');
    menuWrapper.id = 'imperial-menu-wrapper';

    let menuItemsHTML = '';
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';

    menuConfig.forEach(item => {
        if (item.type === "divider") {
            menuItemsHTML += `<div class="menu-divider">${item.title}</div>`;
        } else {
            const isActive = currentPage === item.link ? 'active-link' : '';
            menuItemsHTML += `
                <a href="${item.link}" class="nav-item ${isActive}" id="${item.id || ''}">
                    <i class="fas ${item.icon}"></i> <span>${item.title}</span>
                </a>`;
        }
    });

    menuWrapper.innerHTML = `
        <div id="menu-overlay"></div>
        <div id="sidebar-panel">
            <div class="sidebar-header">
                <img src="logo.png" class="menu-logo" onerror="this.src='https://via.placeholder.com/60'">
                <h3>THE LALIT</h3>
                <p>INTERNATIONAL SCHOOL</p>
            </div>
            <nav class="nav-links">${menuItemsHTML}</nav>
        </div>
        <button id="menu-trigger-btn">
            <span></span><span></span><span></span>
        </button>
    `;

    document.body.prepend(menuWrapper);

    // 2. CSS Inject Karna
    const style = document.createElement('style');
    style.textContent = `
        #menu-trigger-btn {
            position: fixed; top: 15px; left: 15px; width: 45px; height: 45px;
            background: #002366; border: 1px solid #D4AF37; border-radius: 8px;
            z-index: 20001; cursor: pointer; display: flex; flex-direction: column;
            justify-content: center; align-items: center; gap: 5px; transition: 0.3s;
        }
        #menu-trigger-btn span { width: 25px; height: 3px; background: #D4AF37; border-radius: 2px; transition: 0.4s; }
        
        #sidebar-panel {
            position: fixed; top: 0; left: -300px; width: 280px; height: 100vh;
            background: #002366; z-index: 20000; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 5px 0 25px rgba(0,0,0,0.3); overflow-y: auto; color: white;
            border-right: 3px solid #D4AF37;
        }
        #sidebar-panel.open { left: 0; }
        
        #menu-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.6); z-index: 19999; display: none; backdrop-filter: blur(3px);
        }

        .sidebar-header { padding: 30px 20px; text-align: center; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); }
        .menu-logo { width: 65px; height: 65px; border-radius: 50%; border: 2px solid #D4AF37; padding: 3px; background: white; }
        .sidebar-header h3 { font-family: 'Cinzel', serif; color: #D4AF37; margin: 10px 0 0; font-size: 1.2rem; }
        .sidebar-header p { font-size: 0.6rem; letter-spacing: 2px; margin: 0; color: #aaa; }

        .nav-links { padding: 15px; }
        .menu-divider { font-size: 10px; text-transform: uppercase; color: #D4AF37; opacity: 0.6; padding: 20px 10px 5px; letter-spacing: 1.5px; font-weight: bold; }
        
        .nav-item { 
            display: flex; align-items: center; padding: 12px 15px; color: white; text-decoration: none;
            margin-bottom: 5px; border-radius: 6px; transition: 0.3s; font-size: 0.9rem;
        }
        .nav-item i { width: 25px; color: #D4AF37; font-size: 1.1rem; margin-right: 12px; text-align: center; }
        .nav-item:hover { background: rgba(212,175,55,0.15); color: #D4AF37; }
        .active-link { background: rgba(212,175,55,0.2) !important; border-left: 4px solid #D4AF37; color: #D4AF37 !important; font-weight: bold; }

        .open-btn span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .open-btn span:nth-child(2) { opacity: 0; }
        .open-btn span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
    `;
    document.head.appendChild(style);

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

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            if(confirm("Do you want to exit Imperial Registry?")) {
                firebase.auth().signOut().then(() => { window.location.href = "login.html"; });
            }
        };
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUniversalMenu);
} else {
    initUniversalMenu();
}
