document.addEventListener('DOMContentLoaded', function() {
    // Filtros
    const periodoFilter = document.getElementById('periodo');
    const tipoFilter = document.getElementById('tipo');
    
    if (periodoFilter && tipoFilter) {
        periodoFilter.addEventListener('change', function() {
            console.log('Período selecionado:', this.value);
        });
        
        tipoFilter.addEventListener('change', function() {
            console.log('Tipo selecionado:', this.value);
        });
    }
    
    // Paginação
    const paginaBtns = document.querySelectorAll('.pagina-btn:not(.disabled)');
    paginaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                document.querySelector('.pagina-btn.active').classList.remove('active');
                this.classList.add('active');
                console.log('Ir para página:', this.textContent);
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