document.addEventListener("DOMContentLoaded", async () => {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    // 1. Authentication & Role Check
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            menuContainer.innerHTML = "";
            return;
        }

        try {
            const userDoc = await db.collection('users').doc(user.uid).get();
            if (!userDoc.exists) return;

            const userData = userDoc.data();
            const isAdmin = userData.role === 'admin';
            const perms = userData.permissions || {};

            // 2. Menu Structure (Synced with your GitHub filenames)
            const menuData = [
                {
                    category: "Academic",
                    icon: "fas fa-user-graduate",
                    items: [
                        { name: "Add Student", link: "add-student.html", id: "admission" },
                        { name: "View Registry", link: "view-students.html", id: "registry" },
                        { name: "Edit Student", link: "edit-student.html", id: "edit_student" },
                        { name: "Attendance", link: "attendance.html", id: "attendance" }
                    ]
                },
                {
                    category: "Finance",
                    icon: "fas fa-coins",
                    items: [
                        { name: "Collect Fees", link: "collect-fees.html", id: "fees" },
                        { name: "Fee History", link: "fee-history.html", id: "ledger" },
                        { name: "Defaulter List", link: "defaulter-list.html", id: "defaulter" },
                        { name: "Demand Slips", link: "fee-demand-slip.html", id: "demand" },
                        { name: "Fee Master", link: "fee-master.html", id: "master" }
                    ]
                },
                {
                    category: "Exams",
                    icon: "fas fa-file-invoice",
                    items: [
                        { name: "Exam Master", link: "exam-master.html", id: "exam_master" },
                        { name: "Marks Entry", link: "exam-marks-entry.html", id: "marks_entry" },
                        { name: "Report Cards", link: "exam-repot-card.html", id: "report_card" }
                    ]
                },
                {
                    category: "System",
                    icon: "fas fa-user-shield",
                    items: [
                        { name: "Manage Staff", link: "manage-users.html", id: "staff" },
                        { name: "Staff Attendance", link: "staff-attendance.html", id: "staff_attendance" },
                        { name: "Profile", link: "profile.html", id: "profile" }
                    ]
                }
            ];

            // 3. Build Navigation HTML
            let menuHtml = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4 no-print">
                <div class="container-fluid">
                    <a class="navbar-brand brand-font" href="index.html">
                        <img src="logo.png" width="30" class="me-2"> TLIS REGISTRY
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminMenu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="adminMenu">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="index.html"><i class="fas fa-th-large me-1"></i> Dashboard</a>
                            </li>
            `;

            menuData.forEach(cat => {
                // Filter items: Agar admin hai to sab dikhao, staff hai to perms check karo
                const allowedItems = cat.items.filter(item => isAdmin || perms[item.id] === true);

                if (allowedItems.length > 0) {
                    menuHtml += `
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="${cat.icon} me-1"></i> ${cat.category}
                        </a>
                        <ul class="dropdown-menu shadow border-0">`;
                    
                    allowedItems.forEach(item => {
                        menuHtml += `<li><a class="dropdown-item" href="${item.link}">${item.name}</a></li>`;
                    });

                    menuHtml += `</ul></li>`;
                }
            });

            menuHtml += `
                        </ul>
                        <div class="d-flex align-items-center">
                            <div class="text-light me-3 text-end d-none d-md-block">
                                <div class="fw-bold small" style="line-height:1;">${userData.name}</div>
                                <span class="badge bg-gold text-dark" style="font-size:10px;">${userData.role.toUpperCase()}</span>
                            </div>
                            <button onclick="firebase.auth().signOut()" class="btn btn-sm btn-danger shadow-sm">
                                <i class="fas fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>`;

            menuContainer.innerHTML = menuHtml;

        } catch (error) {
            console.error("Menu Error:", error);
        }
    });
});
