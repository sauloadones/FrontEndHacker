document.addEventListener('DOMContentLoaded', function() {
    // Menu de configurações
    const menuItems = document.querySelectorAll('.menu-item');
    const configSections = document.querySelectorAll('.config-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove a classe active de todos os itens e seções
            menuItems.forEach(i => i.classList.remove('active'));
            configSections.forEach(s => s.classList.remove('active'));
            
            // Adiciona a classe active ao item clicado
            this.classList.add('active');
            
            // Mostra a seção correspondente
            const target = this.getAttribute('href');
            document.querySelector(target).classList.add('active');
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