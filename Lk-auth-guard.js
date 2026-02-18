// auth-guard.js
if (user.email === "ariyanlalitkumar@gmail.com") return; 
firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
        // Agar user logged in nahi hai toh login page par bhejo
        window.location.href = "login.html";
    } else {
        const doc = await db.collection('users').doc(user.uid).get();
        if (doc.exists) {
            const userData = doc.data();
            const path = window.location.pathname;
            const page = path.split("/").pop().replace(".html", "").replace(/-/g, "_");

            // 1. Admin ko sab kuch access karne do
            if (userData.role === 'admin') return;

            // 2. Staff ke liye specific permission check karo
            // Hum 'manage_staff' ko staff ke liye hamesha block rakhenge
            if (page === "manage_staff" || !userData.permissions || !userData.permissions[page]) {
                alert("Access Denied! Aapke paas is page ka adhikaar nahi hai.");
                window.location.href = "dashboard.html"; // Ya jo bhi aapka home page ho
            }
        } else {
            // Agar user record nahi mila toh logout kar do
            firebase.auth().signOut();
        }
    }
});
