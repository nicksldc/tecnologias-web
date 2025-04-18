let items = [];

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-btn, .section').forEach(el => {
            el.classList.remove('active');
        });
        btn.classList.add('active');
        document.getElementById(btn.dataset.section).classList.add('active');
    });
});

document.getElementById('itemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const descInput = document.getElementById('description');
    let isValid = true;

    if (!nameInput.value.trim()) {
        showError(nameInput, 'Campo obrigatório');
        isValid = false;
    }

    if (!descInput.value.trim()) {
        showError(descInput, 'Campo obrigatório');
        isValid = false;
    }

    if (isValid) {
        addItem({
            id: Date.now(),
            name: nameInput.value.trim(),
            description: descInput.value.trim()
        });
        nameInput.value = '';
        descInput.value = '';
    }
});

function showError(input, message) {
    const errorElement = input.parentElement.querySelector('.error-message');
    errorElement.textContent = message;
    input.style.borderColor = 'red';
    setTimeout(() => {
        errorElement.textContent = '';
        input.style.borderColor = '#ddd';
    }, 3000);
}

function addItem(item) {
    items.push(item);
    renderItems();
}

function removeItem(id) {
    items = items.filter(item => item.id !== id);
    renderItems();
}

function renderItems() {
    const list = document.getElementById('itemList');
    list.innerHTML = '';
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <button class="delete-btn" onclick="removeItem(${item.id})">Excluir</button>
        `;
        list.appendChild(card);
    });
}