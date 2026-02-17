<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Login | The Lalit Intl.</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root { --royal-blue: #002366; --gold: #D4AF37; }
        body { background: #001a4d; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: sans-serif; }
        .login-card { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 380px; text-align: center; border-top: 5px solid var(--gold); }
        .form-control { margin-bottom: 15px; border-radius: 5px; }
        .btn-login { background: var(--royal-blue); color: var(--gold); font-weight: bold; width: 100%; padding: 12px; border: none; cursor: pointer; }
        #statusMsg { font-size: 0.8rem; margin-top: 10px; font-weight: bold; min-height: 20px; }
    </style>
</head>
<body>

<div class="login-card">
    <h4 class="fw-bold mb-4" style="color: var(--royal-blue);">STAFF LOGIN</h4>
    <input type="email" id="email" class="form-control" placeholder="Email Address">
    <input type="password" id="pass" class="form-control" placeholder="Password">
    <button class="btn btn-login" id="loginBtn">AUTHENTICATE</button>
    <div id="statusMsg"></div>
    <hr>
    <a href="index.html" class="text-muted small text-decoration-none">Back to Website</a>
</div>

<script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore-compat.js"></script>

<script src="firebase-config.js"></script>

<script>
    const loginBtn = document.getElementById('loginBtn');
    const msg = document.getElementById('statusMsg');

    async function processLogin() {
        const emailInput = document.getElementById('email').value.trim();
        const passInput = document.getElementById('pass').value;

        if(!emailInput || !passInput) {
            msg.innerHTML = "<span class='text-danger'>Fields cannot be empty!</span>";
            return;
        }

        loginBtn.disabled = true;
        loginBtn.innerText = "VERIFYING...";
        msg.innerHTML = "Processing...";

        try {
            // 1. Firebase Authentication se check karein
            await auth.signInWithEmailAndPassword(emailInput, passInput);
            
            msg.innerHTML = "<span class='text-success'>Auth Success! Checking Role...</span>";

            // 2. Firestore Database mein role check karein
            const snap = await db.collection('users').where('email', '==', emailInput.toLowerCase()).get();

            if (!snap.empty) {
                const userData = snap.docs[0].data();
                const role = userData.role;

                // Sahi page par redirect karein
                if (role === 'admin') window.location.href = "dashboard.html";
                else if (role === 'accountant') window.location.href = "collect-fees.html";
                else if (role === 'teacher') window.location.href = "attendance.html";
                else window.location.href = "dashboard.html";
            } else {
                // Agar Auth me hai par Database me entry nahi hai
                msg.innerHTML = "<span class='text-success'>Welcome! Redirecting to Dashboard...</span>";
                setTimeout(() => { window.location.href = "dashboard.html"; }, 1000);
            }

        } catch (error) {
            loginBtn.disabled = false;
            loginBtn.innerText = "AUTHENTICATE";
            // Agar password galat hoga toh yahan error dikhayega
            msg.innerHTML = "<span class='text-danger'>" + error.message + "</span>";
            console.error("Login Error:", error);
        }
    }

    // Button click event
    loginBtn.addEventListener('click', processLogin);

    // Enter key support
    document.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            processLogin();
        }
    });
</script>

</body>
</html>
