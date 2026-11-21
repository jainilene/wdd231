const botaoMenu = document.querySelector('#ham-btn');
const menu = document.querySelector('#nav-bar');
botaoMenu?.addEventListener('click', () => {
  const aberto = menu.classList.toggle('show');
  botaoMenu.classList.toggle('show', aberto);
  botaoMenu.setAttribute('aria-expanded', String(aberto));
  botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});
const ano = document.querySelector('#ano-atual');
if (ano) ano.textContent = new Date().getFullYear();
const modificado = document.querySelector('#ultima-modificacao');
if (modificado) modificado.textContent = new Date(document.lastModified).toLocaleString('pt-BR');
