window.onload = function() {
    const savedPassword = localStorage.getItem('userSecretPass');
    if (!savedPassword) {
        document.getElementById('lock-title').innerText = "Hello Aishwaryaka! ✨";
        document.getElementById('lock-instruction').innerText = "Set your secret diary key:";
    }
};

function handlePassword() {
    const input = document.getElementById('passInput').value;
    const savedPassword = localStorage.getItem('userSecretPass');
    
    if (!input) return alert("Please enter a key!");

    if (!savedPassword) {
        localStorage.setItem('userSecretPass', input);
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('birthday-modal').style.display = 'flex';
        displayEntries();
    } else if (input === savedPassword) {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        displayEntries();
    } else {
        alert("Wrong key! ❌");
    }
}

function saveEntry() {
    const text = document.getElementById('diaryInput').value;
    if(!text) return;
    const entries = JSON.parse(localStorage.getItem('myDiaryEntries') || '[]');
    entries.unshift({ date: new Date().toLocaleDateString(), content: text });
    localStorage.setItem('myDiaryEntries', JSON.stringify(entries));
    document.getElementById('diaryInput').value = '';
    displayEntries();
    alert("Saved to your heart! ❤️");
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('myDiaryEntries') || '[]');
    document.getElementById('savedEntries').innerHTML = entries.map(e => `
        <div style="background: white; padding: 15px; border-radius: 15px; margin-top: 15px; border-left: 5px solid #f472b6;">
            <small style="color: #f472b6; font-weight: bold;">${e.date}</small>
            <p style="color: #475569; margin-top: 5px;">${e.content}</p>
        </div>`).join('');
}

function closeModal() {
    document.getElementById('birthday-modal').style.display = 'none';
}

// Magic Touch Stars
document.addEventListener('click', (e) => {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.innerHTML = '⭐';
    star.style.left = e.pageX + 'px';
    star.style.top = e.pageY + 'px';
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 1000);
});
