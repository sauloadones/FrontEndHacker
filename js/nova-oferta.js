document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.oferta-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('https://hackercidadao.onrender.com/api/oferta/nova', {
        method: 'POST',
        body: formData,
        credentials: 'include' // 🔐 Importante para enviar cookie de sessão
      });

      const result = await response.json();

      if (response.ok) {
        alert('Oferta publicada com sucesso!');
        window.location.href = 'dashboard.html';
      } else {
        alert(result.erro || 'Erro ao publicar oferta.');
      }
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      alert('Erro de rede. Verifique sua conexão ou tente novamente.');
    }
  });

  // Preview de imagens (opcional)
  const inputFotos = document.getElementById('fotos');
  const previewContainer = document.getElementById('previewContainer');

  inputFotos.addEventListener('change', function () {
    previewContainer.innerHTML = '';
    const arquivos = inputFotos.files;

    if (arquivos.length > 5) {
      alert('Você pode enviar no máximo 5 fotos.');
      inputFotos.value = '';
      return;
    }

    for (const file of arquivos) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
});
