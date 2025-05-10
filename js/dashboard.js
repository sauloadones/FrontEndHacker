document.addEventListener('DOMContentLoaded', async function () {
    // 🔒 Verifica sessão e carrega nome do usuário
    try {
        const response = await fetch('https://hackercidadao.onrender.com/api/auth/perfil', {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Sessão inválida');
        
        const data = await response.json();

        // Atualiza saudação se houver <h2> com "Bem-vind"
        const h2s = document.getElementsByTagName('h2');
        for (let h2 of h2s) {
            if (h2.textContent.trim().toLowerCase().startsWith('bem-vind')) {
                h2.textContent = `Bem-vindo(a), ${data.nome}!`;
                break;
            }
        }

        // Atualiza o nome no menu superior
        const spans = document.getElementsByClassName('user-name');
        for (let span of spans) {
            span.textContent = data.nome;
        }

    } catch (error) {
        console.error('Usuário não autenticado:', error);
        window.location.href = 'entrar.html';
        return;
    }

    // 📊 Carrega dados do dashboard (resumo)
    try {
        const response = await fetch('https://hackercidadao.onrender.com/api/oferta/resumo', {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Erro ao carregar resumo');

        const { trocasRealizadas, alimentosDoados, ofertas } = await response.json();

        // Atualiza estatísticas
        document.querySelector('.stat-card:nth-child(1) h3').textContent = trocasRealizadas;
        document.querySelector('.stat-card:nth-child(2) h3').textContent = `${alimentosDoados}kg`;

        // Renderiza cards de ofertas ativas/pendentes
        const trocasList = document.querySelector('.trocas-list');
        trocasList.innerHTML = '';

        ofertas.forEach(oferta => {
            const card = document.createElement('div');
            card.classList.add('troca-card');

            card.innerHTML = `
                <div class="troca-info">
                    <div class="troca-imagem" style="background-image: url('${oferta.fotos?.[0] || 'fotos/padrao.jpg'}');"></div>
                    <div class="troca-detalhes">
                        <h4>${oferta.quantidade}${oferta.unidade} de ${oferta.tipoAlimento}</h4>
                        <p><i class="fas fa-store"></i> Você mesmo</p>
                        <p><i class="fas fa-clock"></i> Disponível até: ${new Date(oferta.prazoRetirada).toLocaleDateString()}</p>
                        <div class="troca-status ${oferta.status}">
                            <i class="fas fa-${oferta.status === 'ativa' ? 'check-circle' : 'hourglass-half'}"></i>
                            ${oferta.status === 'ativa' ? 'Oferta ativa' : 'Aguardando confirmação'}
                        </div>
                    </div>
                </div>
                <div class="troca-actions">
                    <a href="detalhes-oferta.html?id=${oferta.id}" class="btn-chat"><i class="fas fa-eye"></i> Ver</a>
                </div>
            `;

            trocasList.appendChild(card);
        });

    } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
        const trocasList = document.querySelector('.trocas-list');
        trocasList.innerHTML = '<p>Erro ao carregar suas ofertas.</p>';
    }

    // 📂 Dropdown do menu
    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (userMenu && dropdownMenu) {
        userMenu.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', e => {
            if (!userMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // 🚪 Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            try {
                const response = await fetch('https://hackercidadao.onrender.com/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });

                if (response.ok) {
                    alert('Você foi desconectado com sucesso.');
                    window.location.href = 'index.html';
                } else {
                    alert('Erro ao desconectar.');
                }
            } catch (err) {
                alert('Erro ao desconectar.');
                console.error(err);
            }
        });
    }

    // 🔔 Notificações (placeholder)
    const notificacoes = document.querySelector('.notificacoes');
    if (notificacoes) {
        notificacoes.addEventListener('click', function () {
            alert('Abrir lista de notificações (em breve)');
        });
    }
});
