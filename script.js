// Check if a password already exists on her device
const savedPassword = localStorage.getItem('userSecretPass');
const title = document.getElementById('lock-title');
const instruction = document.getElementById('lock-instruction');
const button = document.getElementById('lock-button');

// If no password exists, it's the first time she's opening it
if (!savedPassword) {
    title.innerText = "Welcome, Superstar! ✨";
    instruction.innerText = "Create your secret password for this diary:";
    button.innerText = "Set My Password";
}

function handlePassword() {
    const input = document.getElementById('passInput').value;
    
    if (!input) {
        alert("Please enter a password! 🎶");
        return;
    }

    if (!savedPassword) {
        // FIRST TIME SETUP
        localStorage.setItem('userSecretPass', input);
        alert("Password set! Only you can access this diary now. 🔒");
        location.reload(); // Refresh to lock it with the new pass
    } else {
        // LOGIN ATTEMPT
        if (input === savedPassword) {
            document.getElementById('lock-screen').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            displayEntries();
        } else {
            alert("Wrong key, Diva! 🎤");
        }
    }
}

function saveEntry() {
    const text = document.getElementById('diaryInput').value;
    if(!text) return;
    const entries = JSON.parse(localStorage.getItem('singerDiary') || '[]');
    entries.unshift({ date: new Date().toLocaleDateString(), content: text });
    localStorage.setItem('singerDiary', JSON.stringify(entries));
    document.getElementById('diaryInput').value = '';
    displayEntries();
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('singerDiary') || '[]');
    const html = entries.map(e => `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-top: 15px; border-left: 3px solid #ffd700; box-shadow: 2px 2px 10px rgba(0,0,0,0.2);">
            <small style="color: #ffd700; font-weight: bold;">${e.date}</small>
            <p style="margin: 8px 0; color: #fff; line-height: 1.4;">${e.content}</p>
        </div>
    `).join('');
    document.getElementById('savedEntries').innerHTML = html;
}
