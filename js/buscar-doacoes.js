document.addEventListener('DOMContentLoaded', () => {
    carregarDoacoes();

    // Botão aplicar filtros
    document.querySelector('.btn-aplicar').addEventListener('click', carregarDoacoes);

    // Paginação (ainda estática)
    const paginaBtns = document.querySelectorAll('.pagina-btn:not(.disabled)');
    paginaBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (!this.classList.contains('active')) {
                document.querySelector('.pagina-btn.active').classList.remove('active');
                this.classList.add('active');
                console.log('Ir para página:', this.textContent);
            }
        });
    });

    // Dropdown do usuário
    const userMenu = document.querySelector('.user-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    userMenu.addEventListener('click', () => {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Logout
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
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
});

async function carregarDoacoes() {
    const tipo = document.getElementById('tipoAlimento').value;
    const ordenar = document.getElementById('ordenar').value;

    try {
        const response = await fetch(`https://hackercidadao.onrender.com/api/oferta/doacoes?tipo=${tipo}&ordenar=${ordenar}`, {
            credentials: 'include'
        });

        if (!response.ok) throw new Error('Erro ao buscar doações');

        const ofertas = await response.json();
        const lista = document.querySelector('.doacoes-list');

        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }

        if (ofertas.length === 0) {
            lista.innerHTML = '<p>Nenhuma doação encontrada com os filtros selecionados.</p>';
            return;
        }

        ofertas.forEach(oferta => {
            const card = document.createElement('div');
            card.className = 'doacao-card';

            card.innerHTML = `
                <div class="doacao-imagem" style="background-image: url('${oferta.fotos?.[0] || 'fotos/padrao.jpg'}');"></div>
                <div class="doacao-info">
                    <h3>${oferta.quantidade}${oferta.unidade} de ${oferta.tipoAlimento}</h3>
                    <div class="doacao-meta">
                        <span><i class="fas fa-store"></i> ${oferta.usuario?.nomeCompleto || 'Doador'}</span>
                        <span><i class="fas fa-map-marker-alt"></i> Localização indisponível</span>
                        <span><i class="fas fa-weight-hanging"></i> ~${oferta.quantidade}${oferta.unidade}</span>
                        <span><i class="fas fa-clock"></i> Até: ${new Date(oferta.prazoRetirada).toLocaleDateString()}</span>
                    </div>
                    <div class="doacao-descricao">
                        <p>${oferta.instrucoes || 'Sem instruções adicionais.'}</p>
                    </div>
                </div>
                <div class="doacao-actions">
                    <a href="detalhes-oferta.html?id=${oferta.id}" class="btn-ver">Ver Detalhes</a>
                    <button class="btn-solicitar" data-id="${oferta.id}">Solicitar Doação</button>
                </div>
            `;

            card.querySelector('.btn-solicitar').addEventListener('click', (e) => {
                const ofertaId = e.target.dataset.id;
                window.location.href = `solicitar-doacao.html?id=${ofertaId}`;
            });

            lista.appendChild(card);
        });

    } catch (err) {
        console.error('Erro ao carregar doações:', err);
        document.querySelector('.doacoes-list').innerHTML = '<p>Erro ao carregar doações.</p>';
    }
}
