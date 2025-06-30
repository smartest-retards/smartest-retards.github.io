let usernames = [];

window.onload = () => {
    Papa.parse('members.csv', {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
            usernames = results.data
                .map(m => m["Discord username"])
                .filter(Boolean)
                .map(u => u.trim());
        }
    });
};

function handleInput() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const suggestionBox = document.getElementById('suggestions');
    suggestionBox.innerHTML = '';

    if (input.length === 0) {
        suggestionBox.classList.add('hidden');
        return;
    }

    const filtered = usernames.filter(u => u.toLowerCase().startsWith(input)).slice(0, 8);

    if (filtered.length === 0) {
        suggestionBox.classList.add('hidden');
        return;
    }

    filtered.forEach(name => {
        const item = document.createElement('div');
        item.className = 'px-4 py-2 hover:bg-gray-100 cursor-pointer text-left';
        item.textContent = name;
        item.onclick = () => {
            document.getElementById('searchInput').value = name;
            suggestionBox.classList.add('hidden');
        };
        suggestionBox.appendChild(item);
    });

    suggestionBox.classList.remove('hidden');
}

function searchMember() {
    const input = document.getElementById('searchInput').value.trim();
    if (input) {
        const encoded = encodeURIComponent(input);
        window.location.href = `member?username=${encoded}`;
    }
}