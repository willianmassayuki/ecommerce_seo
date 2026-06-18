document.addEventListener('DOMContentLoaded', async () => {
    // Pega parâmetros da URL (Ex: ?cat=gamer)
    const params = new URLSearchParams(window.location.search);
    const catFiltrada = params.get('cat');

    const produtos = await carregarProdutos();
    let produtosFiltrados = [...produtos];

    // Atualiza dinamicamente elementos de SEO na página baseado na categoria passada por parâmetro
    if (catFiltrada) {
        produtosFiltrados = produtos.filter(p => p.categoria === catFiltrada);
        const nomeFormatado = catFiltrada.charAt(0).toUpperCase() + catFiltrada.slice(1);
        
        const tituloCat = document.getElementById('titulo-categoria');
        if (tituloCat) tituloCat.innerText = `Cadeiras ${nomeFormatado}`;
        
        const breadcrumbAtual = document.getElementById('breadcrumb-atual');
        if (breadcrumbAtual) breadcrumbAtual.innerText = nomeFormatado;
        
        document.title = `Cadeiras ${nomeFormatado} Profissionais | NomeLoja`;
    }

    renderizarProdutos(produtosFiltrados, 'lista-produtos');

    // Listener do filtro de preço interativo
    const filtroPreco = document.getElementById('filtro-preco');
    if(filtroPreco) {
        filtroPreco.addEventListener('input', (e) => {
            const valor = e.target.value;
            const valorPrecoSpan = document.getElementById('valor-preco');
            if (valorPrecoSpan) valorPrecoSpan.innerText = `R$ ${valor}`;
            
            const baseProdutos = catFiltrada ? produtos.filter(p => p.categoria === catFiltrada) : produtos;
            const finalFiltrados = baseProdutos.filter(p => p.preco <= valor);
            renderizarProdutos(finalFiltrados, 'lista-produtos');
        });
    }
});
