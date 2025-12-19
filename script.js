const BIRTHDAY_PASSWORD = "1012"; // This is the default key (Dec 10)
// You can tell her to change this or use a custom one!

function checkPassword() {
    const input = document.getElementById('passInput').value;
    // For ultimate privacy, she can set her own password here.
    if(input === BIRTHDAY_PASSWORD) {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        displayEntries();
    } else {
        alert("Wrong key, Superstar! 🎤");
    }
}

// Create 10 Floating stars (for Dec 10) and Music Notes
function createDecorations() {
    const container = document.getElementById('stars-background');
    const icons = ['⭐', '🎵', '🎶', '✨', '🎤'];
    
    for (let i = 0; i < 25; i++) {
        let el = document.createElement('div');
        el.className = 'musical-note';
        el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDelay = Math.random() * 8 + 's';
        el.style.fontSize = (Math.random() * 20 + 10) + 'px';
        container.appendChild(el);
    }
}

function saveEntry() {
    const text = document.getElementById('diaryInput').value;
    if(!text) return;
    
    const entries = JSON.parse(localStorage.getItem('singerDiary') || '[]');
    entries.unshift({
        date: new Date().toLocaleString(),
        content: text
    });
    
    localStorage.setItem('singerDiary', JSON.stringify(entries));
    document.getElementById('diaryInput').value = '';
    displayEntries();
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('singerDiary') || '[]');
    const html = entries.map(e => `
        <div style="border-left: 4px solid #gold; padding: 10px; margin: 15px 0; background: rgba(255,255,255,0.1); border-radius: 8px;">
            <small style="color: #bbb;">${e.date}</small>
            <p style="margin: 5px 0;">${e.content}</p>
        </div>
    `).join('');
    document.getElementById('savedEntries').innerHTML = html;
}

createDecorations();
