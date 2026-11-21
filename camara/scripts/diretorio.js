const lista = document.querySelector('#lista-empresas');
const grade = document.querySelector('#botao-grade');
const modoLista = document.querySelector('#botao-lista');
function alterarVisualizacao(modo) {
  lista.classList.toggle('grade', modo === 'grade');
  lista.classList.toggle('lista', modo === 'lista');
  grade.setAttribute('aria-pressed', String(modo === 'grade'));
  modoLista.setAttribute('aria-pressed', String(modo === 'lista'));
}
grade.addEventListener('click', () => alterarVisualizacao('grade'));
modoLista.addEventListener('click', () => alterarVisualizacao('lista'));
function elemento(tag, texto, classe) {
  const el = document.createElement(tag);
  if (texto !== undefined) el.textContent = texto;
  if (classe) el.className = classe;
  return el;
}
async function carregarEmpresas() {
  try {
    const resposta = await fetch('dados/membros.json');
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    const empresas = Array.isArray(dados) ? dados : dados.empresas ?? dados.membros;
    if (!Array.isArray(empresas)) throw new Error('JSON deve conter uma lista de empresas');
    lista.replaceChildren();
    for (const empresa of empresas) {
      const cartao = elemento('article', undefined, 'empresa');
      const img = elemento('img');
      img.src = `imagens/${empresa.imagem}`;
      img.alt = `Logotipo de ${empresa.nome}`;
      img.loading = 'lazy';
      img.width = 150; img.height = 110;
      cartao.append(img, elemento('h2', empresa.nome), elemento('p', empresa.endereco), elemento('p', empresa.telefone));
      const link = elemento('a', 'Visitar site');
      link.href = empresa.site;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      const site = elemento('p'); site.append(link); cartao.append(site);
      const niveis = {1:'Membro',2:'Prata',3:'Ouro'};
      cartao.append(elemento('p', `Associação: ${niveis[empresa.nivelAssociacao] ?? 'Membro'}`, 'nivel-associacao'));
      lista.append(cartao);
    }
  } catch (erro) {
    lista.replaceChildren(elemento('p', 'Não foi possível carregar as empresas. Confira dados/membros.json e execute o projeto com Live Server.'));
    console.error('Erro ao carregar diretório:', erro);
  }
}
carregarEmpresas();
