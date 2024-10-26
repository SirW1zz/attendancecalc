// Sample user database with UIDs and passwords
const userDatabase = [
    { uid: "U2304001", password: "password1" },
    { uid: "U2304002", password: "password2" },
    { uid: "U2304003", password: "password3" },
    { uid: "U2304004", password: "password4" },
    { uid: "U2304005", password: "password5" },
    // Add more users as needed
];

// Function to check login credentials
function login() {
    const uidInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    const user = userDatabase.find(user => user.uid === uidInput && user.password === passwordInput);

    if (user) {
        // Store the logged-in UID in local storage
        localStorage.setItem('loggedInUID', uidInput);
        // Redirect to the index page after successful login
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password. Please try again.';
    }
}

// Add event listener for Enter key press
document.getElementById('loginButton').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});