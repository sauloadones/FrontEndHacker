document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('https://hackercidadao.onrender.com/api/auth/perfil', {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Sessão inválida');

        const data = await response.json();

        // ✅ Atualiza o nome do usuário no menu
        const spans = document.getElementsByClassName('user-name');
        for (let span of spans) {
            span.textContent = data.nome;
        }

        // ✅ Atualiza saudação se existir (ex: "Bem-vindo(a), Fulano")
        const h2s = document.getElementsByTagName('h2');
        for (let h2 of h2s) {
            if (h2.textContent.trim().toLowerCase().startsWith('bem-vind')) {
                h2.textContent = `Bem-vindo(a), ${data.nome}!`;
                break;
            }
        }

    } catch (error) {
        console.error('Usuário não autenticado:', error);
        window.location.href = 'entrar.html';
        return;
    }

    // ✅ Gerencia dropdown do menu do usuário (se existir)
    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (userMenu && dropdownMenu) {
        userMenu.addEventListener('click', function () {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        // Fecha se clicar fora
        document.addEventListener('click', function (e) {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
});
