// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function () {

    // --- Atualização Automática do Ano no Rodapé ---

    // Busca o elemento onde o ano deve aparecer
    const elementoAno = document.getElementById('ano-atual');

    // Se o elemento existir na página...
    if (elementoAno) {
        // ... pega o ano atual do sistema e insere no texto do elemento
        elementoAno.textContent = new Date().getFullYear();
    }

});