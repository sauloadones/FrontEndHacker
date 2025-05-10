document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.getElementById('form-login');
    const erroLogin = document.getElementById('erro-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async function (e) {
            e.preventDefault();

            if (erroLogin) erroLogin.textContent = '';

            const email = document.getElementById('email')?.value;
            const senha = document.getElementById('senha')?.value;

            const dadosLogin = { email, senha };

            try {
                const response = await fetch('https://hackercidadao.onrender.com/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', // 🔐 ESSENCIAL para usar a sessão
                    body: JSON.stringify(dadosLogin)
                });

                const result = await response.json();

                if (response.ok) {
                    window.location.href = 'dashboard.html';
                } else {
                    if (erroLogin) erroLogin.textContent = result.erro || 'Erro ao logar.';
                }
            } catch (error) {
                console.error('Erro ao tentar login:', error);
                alert('Erro de comunicação com o servidor.');
            }
        });
    }
});

