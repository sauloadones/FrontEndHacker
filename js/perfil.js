document.addEventListener('DOMContentLoaded', function() {
    // Alterar foto
    const alterarFotoBtn = document.querySelector('.btn-alterar-foto');
    if (alterarFotoBtn) {
        alterarFotoBtn.addEventListener('click', function() {
            alert('Funcionalidade de alterar foto será implementada aqui');
        });
    }
    
    // Alterar senha
    const alterarSenhaBtn = document.querySelector('.btn-alterar-senha');
    if (alterarSenhaBtn) {
        alterarSenhaBtn.addEventListener('click', function() {
            alert('Funcionalidade de alterar senha será implementada aqui');
        });
    }
    
    // Formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Alterações salvas com sucesso!');
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