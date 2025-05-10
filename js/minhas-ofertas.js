document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.ofertas-list');
    const statusSelect = document.getElementById('status');
    const ordenarSelect = document.getElementById('ordenar');

    // Dispara o carregamento inicial e ao mudar filtros
    statusSelect.addEventListener('change', carregarOfertas);
    ordenarSelect.addEventListener('change', carregarOfertas);

    // Carrega ao abrir a página
    carregarOfertas();

    async function carregarOfertas() {
        const status = statusSelect.value;
        const ordenar = ordenarSelect.value;

        try {
            const response = await fetch(`https://hackercidadao.onrender.com/api/oferta/minhas?status=${status}&ordenar=${ordenar}`, {
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Erro ao carregar ofertas');

            const ofertas = await response.json();
            container.innerHTML = '';

            if (ofertas.length === 0) {
                container.innerHTML = '<p>Você ainda não cadastrou nenhuma oferta.</p>';
                return;
            }

            ofertas.forEach(oferta => {
                const isCancelada = oferta.status?.toLowerCase() === 'cancelada';

                const card = document.createElement('div');
                card.className = `oferta-card ${oferta.status || 'ativa'}`;
                card.dataset.id = oferta.id;

                const primeiraImagem = Array.isArray(oferta.fotos) ? oferta.fotos[0] : '';

                card.innerHTML = `
                    <div class="oferta-imagem" style="background-image: url('${primeiraImagem}')"></div>
                    <div class="oferta-info">
                        <h3>${oferta.quantidade}${oferta.unidade} de ${oferta.tipoAlimento}</h3>
                        <div class="oferta-meta">
                            <span><i class="fas fa-weight-hanging"></i> ~${oferta.quantidade}${oferta.unidade}</span>
                            <span><i class="fas fa-clock"></i> Disponível até: ${new Date(oferta.prazoRetirada).toLocaleDateString()}</span>
                        </div>
                        <div class="oferta-status">
                            <span class="status-badge ${oferta.status || 'ativa'}"><i class="fas fa-check-circle"></i> ${oferta.status || 'Ativa'}</span>
                            <span>${oferta.solicitacoes?.length || 0} solicitações</span>
                        </div>
                    </div>
                    <div class="oferta-actions">
                        <a href="detalhes-oferta.html?id=${oferta.id}" class="btn-action"><i class="fas fa-eye"></i> Ver</a>
                        <a href="editar-oferta.html?id=${oferta.id}" class="btn-action"><i class="fas fa-edit"></i> Editar</a>
                        <button class="btn-action btn-danger"><i class="fas fa-times"></i> Cancelar</button>
                    </div>
                `;

                if (isCancelada) {
                    aplicarEstiloCancelado(card);
                } else {
                    const btnCancelar = card.querySelector('.btn-danger');
                    btnCancelar.addEventListener('click', async () => {
                        const titulo = card.querySelector('h3')?.textContent.trim();
                        if (!confirm(`Tem certeza que deseja cancelar a oferta: "${titulo}"?`)) return;

                        try {
                            const response = await fetch(`https://hackercidadao.onrender.com/api/oferta/${oferta.id}/cancelar`, {
                                method: 'PATCH',
                                credentials: 'include'
                            });

                            const result = await response.json();

                            if (response.ok) {
                                alert('Oferta cancelada com sucesso!');
                                aplicarEstiloCancelado(card);
                            } else {
                                alert(result.erro || 'Erro ao cancelar a oferta.');
                            }
                        } catch (error) {
                            console.error('Erro na requisição de cancelamento:', error);
                            alert('Erro ao comunicar com o servidor.');
                        }
                    });
                }

                container.appendChild(card);
            });

        } catch (err) {
            console.error(err);
            container.innerHTML = '<p>Erro ao carregar suas ofertas.</p>';
        }
    }
});

/**
 * Aplica o estilo de oferta cancelada ao card
 */
function aplicarEstiloCancelado(card) {
    card.classList.add('oferta-cancelada');
    card.querySelectorAll('a, button').forEach(el => {
        el.setAttribute('disabled', 'true');
        el.classList.add('desabilitado');
    });
}
