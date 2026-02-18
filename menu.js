/* THE LALIT INTERNATIONAL SCHOOL - UNIVERSAL MODULAR MENU */

const menuConfig = [
    { title: "Dashboard", icon: "fa-home", link: "index.html", role: "all" },
    { title: "My Profile", icon: "fa-user-circle", link: "profile.html", role: "all" },
    
    { type: "divider", title: "Student Management" },
    { title: "Student Registry", icon: "fa-users", link: "view-students.html", role: "all" },
    { title: "Admission", icon: "fa-user-plus", link: "add-student.html", role: "admin" },
    { title: "Edit Student", icon: "fa-user-edit", link: "edit-student.html", role: "admin" },
    { title: "Attendance", icon: "fa-calendar-check", link: "attendance.html", role: "all" },
    { title: "Staff Attendance", icon: "fa-clipboard-user", link: "staff-attendance.html", role: "admin" },

    { type: "divider", title: "Academic & Exams" },
    { title: "Exam Master", icon: "fa-layer-group", link: "exam-master.html", role: "admin" },
    { title: "Marks Entry", icon: "fa-pen-nib", link: "exam-marks-entry.html", role: "teacher" },
    { title: "Report Card", icon: "fa-file-alt", link: "exam-repot-card.html", role: "all" },

    { type: "divider", title: "Treasury & Accounts" },
    { title: "Fee Master", icon: "fa-file-invoice-dollar", link: "fee-master.html", role: "admin" },
    { title: "Collect Fees", icon: "fa-vault", link: "collect-fees.html", role: "admin" },
    { title: "Fee History", icon: "fa-history", link: "fee-history.html", role: "all" },
    { title: "Fee Demand Slip", icon: "fa-receipt", link: "fee-demand-slip.html", role: "admin" },
    { title: "Defaulter List", icon: "fa-exclamation-triangle", link: "defaulter-list.html", role: "admin" },

    { type: "divider", title: "Administration" },
    { title: "Manage Users", icon: "fa-user-shield", link: "manage-users.html", role: "admin" },
    { title: "Fees Settings", icon: "fa-cog", link: "fees.html", role: "admin" },

    { type: "divider", title: "Security" },
    { title: "Logout Registry", icon: "fa-sign-out-alt", link: "#", role: "all", id: "logoutBtn" }
];
