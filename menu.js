const menuHTML = `
<input type="checkbox" id="menu-checkbox">
<label for="menu-checkbox" class="menu-toggle">
    <span></span><span></span><span></span>
</label>
<div class="sidebar">
    <div class="logo-box">
        <img src="logo.png" class="school-logo">
    </div>
    <a href="index.html">Dashboard</a>
    <a href="admission.html">Admission</a>
    <a href="attendance.html">Attendance</a>
    <a href="fees.html">Fees</a>
</div>
<label for="menu-checkbox" class="sidebar-overlay"></label>`;

// Ye line menu ko body ke shuruat mein insert kar degi
document.body.insertAdjacentHTML('afterbegin', menuHTML);
