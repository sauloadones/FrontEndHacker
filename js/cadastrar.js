document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.getElementById('form-cadastro');
    const erroCadastro = document.getElementById('erro-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (erroCadastro) erroCadastro.textContent = '';

            const tipoUsuario = document.getElementById('tipo-conta')?.value;
            const nomeCompleto = document.getElementById('nome')?.value;
            const email = document.getElementById('email')?.value;
            const telefone = document.getElementById('telefone')?.value;
            const endereco = document.getElementById('endereco')?.value;
            const senha = document.getElementById('senha')?.value;
            const confirmarSenha = document.getElementById('confirmar-senha')?.value;

            if (senha !== confirmarSenha) {
                erroCadastro.textContent = 'As senhas não coincidem!';
                return;
            }

            const dadosCadastro = {
                tipoUsuario,
                nomeCompleto,
                email,
                telefone,
                endereco,
                senha,
                confirmarSenha
            };

            try {
                const response = await fetch('https://hackercidadao.onrender.com/api/auth/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(dadosCadastro)
                });

                const result = await response.json();

                if (response.ok) {
                    formCadastro.removeEventListener('submit', arguments.callee);

                    window.location.href = 'dashboard.html';
                } else {
                    erroCadastro.textContent = result.erro || 'Erro ao cadastrar.';
                }
            } catch (error) {
                console.error('Erro ao cadastrar:', error);
                erroCadastro.textContent = 'Erro de comunicação com o servidor.';
            }
        });
    }

    // Menu responsivo
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<span></span><span></span><span></span>';

    const header = document.querySelector('header .container');
    if (header && window.innerWidth <= 768) {
        header.appendChild(menuToggle);

        const nav = document.querySelector('nav ul');
        menuToggle.addEventListener('click', function () {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});
