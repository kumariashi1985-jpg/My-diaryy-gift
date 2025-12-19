window.onload = function() {
    const savedPassword = localStorage.getItem('userSecretPass');
    if (!savedPassword) {
        document.getElementById('lock-title').innerText = "Welcome, Superstar! ✨";
        document.getElementById('lock-instruction').innerText = "Create your secret password:";
        document.getElementById('lock-button').innerText = "Set Password";
    }
};

function handlePassword() {
    const input = document.getElementById('passInput').value;
    const savedPassword = localStorage.getItem('userSecretPass');
    
    if (!input) return alert("Enter a password!");

    if (!savedPassword) {
        localStorage.setItem('userSecretPass', input);
        alert("Password set! 🔒");
        location.reload(); 
    } else if (input === savedPassword) {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        displayEntries();
    } else {
        alert("Wrong key! 🎤");
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
    document.getElementById('savedEntries').innerHTML = entries.map(e => `
        <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 10px; margin-top: 10px; border-left: 3px solid gold;">
            <small style="color: gold;">${e.date}</small>
            <p style="color: white;">${e.content}</p>
        </div>`).join('');
}
