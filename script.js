window.onload = function() {
    const savedPassword = localStorage.getItem('userSecretPass');
    if (!savedPassword) {
        document.getElementById('lock-title').innerText = "Hello Aishwaryaka! ✨";
        document.getElementById('lock-instruction').innerText = "Create your private diary key:";
        document.getElementById('lock-button').innerText = "Set Key";
    }
};

function handlePassword() {
    const input = document.getElementById('passInput').value;
    const savedPassword = localStorage.getItem('userSecretPass');
    
    if (!input) return alert("Please enter a key!");

    if (!savedPassword) {
        localStorage.setItem('userSecretPass', input);
        alert("Key set! Only you can see your secrets now. 🔒");
        location.reload(); 
    } else if (input === savedPassword) {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        displayEntries();
    } else {
        alert("Access Denied! ❌");
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
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('myDiaryEntries') || '[]');
    document.getElementById('savedEntries').innerHTML = entries.map(e => `
        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 15px; margin-top: 15px; border-left: 4px solid #6a11cb; text-align: left;">
            <small style="color: #ffd700;">${e.date}</small>
            <p style="margin: 5px 0; line-height: 1.5;">${e.content}</p>
        </div>`).join('');
}
// Magic Star Effect
document.addEventListener('click', function(e) {
    const star = document.createElement('div');
    star.className = 'star-particle';
    star.innerHTML = '⭐'; // You can change this to 🌸 if you prefer
    
    // Position the star at the touch/click location
    star.style.left = (e.pageX - 10) + 'px';
    star.style.top = (e.pageY - 10) + 'px';
    
    document.body.appendChild(star);
    
    // Remove the star after animation ends
    setTimeout(() => {
        star.remove();
    }, 1500);
});
