const parametros = new URLSearchParams(window.location.search);
const campos = { nome: 'Nome', sobrenome: 'Sobrenome', email: 'E-mail', celular: 'Celular', empresa: 'Empresa', timestamp: 'Data e hora de carregamento' };
const resumo = document.querySelector('#resumo');
for (const [chave, rotulo] of Object.entries(campos)) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = rotulo;
    let valor = parametros.get(chave);
    if (chave === 'timestamp' && valor) {
        const data = new Date(valor);
        valor = Number.isNaN(data.getTime()) ? '' : data.toLocaleString('pt-BR');
    }
    dd.textContent = valor || 'Não informado';
    resumo.append(dt, dd);
}
