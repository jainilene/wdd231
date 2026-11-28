const registro = document.querySelector('#timestamp');
registro.value = new Date().toISOString();
document.querySelectorAll('[data-modal]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const modal = document.getElementById(link.dataset.modal);
        modal.showModal();
        modal.addEventListener('close', () => link.focus(), { once: true });
    });
});

// Fecha os modais sem utilizar formulários auxiliares.
document.querySelectorAll(".fechar-modal").forEach(botao => {
    botao.addEventListener("click", () => {
        botao.closest("dialog").close();
    });
});
