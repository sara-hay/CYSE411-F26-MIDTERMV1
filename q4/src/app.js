// CYSE 411 Exam Application
// WARNING: This code contains security vulnerabilities.
// Students must repair the implementation.

const loadBtn = document.getElementById("loadBtn");
const saveBtn = document.getElementById("saveSession");
const loadSessionBtn = document.getElementById("loadSession");

loadBtn.addEventListener("click", loadProfile);
saveBtn.addEventListener("click", saveSession);
loadSessionBtn.addEventListener("click", loadSession);

let currentProfile = null;


/* -------------------------
   Load Profile
-------------------------- */

function loadProfile() {
    const text = document.getElementById("profileInput").value;
    currentProfile = profile;
    try {
        if (typeof text !== 'string') return null;
        const profile = JSON.parse(text);
        if (!profile || typeof profile !== 'object') return null;
        if (typeof profile.displayName !== "string") return null;
        if (profile.role !== "user" && profile.role !== "admin") return null;
        if (!Array.isArray(profile.notifications)) return null;
        const allStrings = profile.notifications.every(item => typeof item === "string");
        if (!allStrings) return null;

        return profile

    } catch (error) {
        return null;
    }
}
    renderProfile(profile);

/* -------------------------
   Render Profile
-------------------------- */

function renderProfile(profile) {

    
    document.getElementById("username").innerHTML = profile.username;

    const list = document.getElementById("notifications");
    list.innerHTML = "";

    for (let n of profile.notifications) {

        const li = document.createElement("li");
        
        li.textContent = n;

        list.appendChild(li);
    }
}


/* -------------------------
   Browser Storage
-------------------------- */

function saveSession() {
    localStorage.setItem("profile", JSON.stringify(currentProfile));

    if (!profile || typeof profile !== 'object') return;
    const currentProfile = {
        displayName: profile.displayName,
        role: profile.role
    }
    alert("Session saved");
}


function loadSession() {
    try {
        const stored = localStorage.getItem("profile");
        if (!stored) return null;
        const profile = JSON.parse(stored);
        if (
            profile &&
            typeof profile.displayName !== "string" &&
            (profile.role === "user" || profile.role === "admin")
        ) {
            currentProfile = profile;
            renderProfile(profile)
            return {
                currentProfile,
            };
        };
            return null;

    } catch (error) {
        return null
    };

}
