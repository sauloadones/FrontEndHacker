document.addEventListener('DOMContentLoaded', function() {
    // Filtros rápidos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            console.log('Filtrar por:', this.textContent);
            // Aqui você implementaria a lógica de filtragem
        });
    });
    
    // Botões de ação
    const cancelButtons = document.querySelectorAll('.btn-danger');
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.troca-card');
            if (confirm('Tem certeza que deseja cancelar esta troca?')) {
                card.style.opacity = '0.5';
                card.style.pointerEvents = 'none';
                alert('Troca cancelada com sucesso.');
            }
        });
    });
    
    // Menu do usuário
    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    userMenu.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Aqui você adicionaria a lógica de logout
            alert('Você foi desconectado com sucesso.');
            window.location.href = 'index.html';
        });
    }
});