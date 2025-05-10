document.addEventListener('DOMContentLoaded', function() {
    const formSolicitacao = document.getElementById('form-solicitacao');
    
    if (formSolicitacao) {
        formSolicitacao.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação dos campos
            const tipoAlimento = document.getElementById('tipo-alimento').value;
            const quantidade = document.getElementById('quantidade').value;
            const dataNecessidade = document.getElementById('data-necessidade').value;
            
            if (!tipoAlimento || !quantidade || !dataNecessidade) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Simulação de envio (substitua por sua lógica real)
            console.log('Dados da solicitação:', {
                tipoAlimento,
                quantidade,
                dataNecessidade,
                descricao: document.getElementById('descricao').value,
                localRetirada: document.getElementById('local-retirada').value,
                horarioRetirada: document.getElementById('horario-retirada').value,
                contato: document.getElementById('contato').value
            });
            
            // Feedback ao usuário
            alert('Solicitação enviada com sucesso! Você será notificado quando houver uma doação disponível.');
            formSolicitacao.reset();
            
            // Redirecionamento (opcional)
            // window.location.href = 'dashboard.html';
        });
    }
    
    // Botão cancelar
    const btnCancelar = document.querySelector('.btn-cancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', function() {
            if (confirm('Deseja realmente cancelar esta solicitação?')) {
                window.location.href = 'dashboard.html';
            }
        });
    }
    
    // Validação em tempo real do telefone
    const inputTelefone = document.getElementById('contato');
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Formatação do telefone (XX) XXXXX-XXXX
            if (value.length > 0) {
                value = `(${value.substring(0, 2)}`;
                
                if (value.length > 2) {
                    value += `) ${value.substring(2, 7)}`;
                }
                
                if (value.length > 7) {
                    value += `-${value.substring(7, 11)}`;
                }
            }
            
            e.target.value = value;
        });
    }
});