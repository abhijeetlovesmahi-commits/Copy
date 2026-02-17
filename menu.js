/* THE LALIT INTERNATIONAL SCHOOL - SECURE MENU */

async function renderDynamicLinks() {
    firebase.auth().onAuthStateChanged(async (user) => {
        const nav = document.getElementById('dynamic-nav-links');
        if (!user) { window.location.href = "login.html"; return; }

        try {
            const doc = await firebase.firestore().collection('users').doc(user.uid).get();
            
            // AGAR USER DATABASE ME NAHI HAI TO ACCESS BLOCK
            if (!doc.exists) {
                nav.innerHTML = `<p style="color:red; padding:20px;">Unauthorized Access. Contact Admin.</p>
                <a href="#" onclick="handleLogout()" class="nav-links a"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
                return;
            }

            const data = doc.data();
            const p = data.permissions || {};
            const role = data.role || 'staff';

            // Base Menu (Sabke liye)
            let html = `<a href="dashboard.html"><i class="fas fa-home"></i> Dashboard</a>`;

            // ADMIN LOGIC: Admin ko sab kuch dikhao
            if (role === 'admin') {
                html += `<div class="menu-divider">Registry</div>
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
            } 
            // STAFF LOGIC: Sirf wahi dikhao jo switch ON hai
            else {
                // Registry Section
                if (p.view_students || p.add_student || p.edit_student) {
                    html += `<div class="menu-divider">Registry</div>`;
                    if (p.view_students) html += `<a href="view-students.html"><i class="fas fa-users"></i> Student Registry</a>`;
                    if (p.add_student) html += `<a href="add-student.html"><i class="fas fa-user-plus"></i> New Admission</a>`;
                    if (p.edit_student) html += `<a href="edit-student.html"><i class="fas fa-user-edit"></i> Edit Student</a>`;
                }

                // Academic Section
                if (p.attendance || p.marks_entry || p.report_card || p.exam_master) {
                    html += `<div class="menu-divider">Academic & Exams</div>`;
                    if (p.exam_master) html += `<a href="exam-master.html"><i class="fas fa-layer-group"></i> Exam Master</a>`;
                    if (p.marks_entry) html += `<a href="exam-marks-entry.html"><i class="fas fa-pen-nib"></i> Marks Entry</a>`;
                    if (p.report_card) html += `<a href="exam-repot-card.html"><i class="fas fa-file-alt"></i> Report Card</a>`;
                    if (p.attendance) html += `<a href="attendance.html"><i class="fas fa-calendar-check"></i> Attendance</a>`;
                }

                // Accounts Section
                if (p.collect_fees || p.fee_master || p.master_ledger) {
                    html += `<div class="menu-divider">Treasury & Accounts</div>`;
                    if (p.fee_master) html += `<a href="fee-master.html"><i class="fas fa-cog"></i> Fee Structure</a>`;
                    if (p.collect_fees) html += `<a href="collect-fees.html"><i class="fas fa-vault"></i> Collect Fees</a>`;
                    if (p.fee_history) html += `<a href="fee-history.html"><i class="fas fa-history"></i> Fee History</a>`;
                    if (p.demand_slip) html += `<a href="fee-demand-slip.html"><i class="fas fa-file-invoice"></i> Demand Slips</a>`;
                    if (p.master_ledger) html += `<a href="master-ledger.html"><i class="fas fa-book"></i> Master Ledger</a>`;
                    if (p.defaulter_list) html += `<a href="defaulter-list.html"><i class="fas fa-exclamation-triangle"></i> Defaulter List</a>`;
                }
            }

            html += `<a href="#" onclick="handleLogout()" class="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>`;
            nav.innerHTML = html;

        } catch (e) {
            console.error(e);
            nav.innerHTML = `<p style="color:red; padding:20px;">Connection Error.</p>`;
        }
    });
}
