// Function to securely set session cookie
function setSessionCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
}

// Function to get session cookie value by name
function getSessionCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cookieName) === 0) {
      return c.substring(cookieName.length, c.length);
    }
  }
  return "";
}

// Function to check if session exists and handle accordingly
function checkSession() {
  const sessionId = getSessionCookie("session_id");
  if (sessionId !== "") {
    console.log("Session ID:", sessionId);
  } else {
    console.log("No session found. Setting new session.");
    const newSessionId = crypto.randomUUID();
    setSessionCookie("session_id", newSessionId, 1); // expires in 1 day
  }
}

// Initialize session checking on page load
document.addEventListener('DOMContentLoaded', checkSession);

