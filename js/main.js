// Centraliza a requisição do JSON simulado
async function carregarProdutos() {
    try {
        const response = await fetch('produtos.json');
        if (!response.ok) throw new Error('Erro ao carregar banco de dados.');
        return await response.json();
    } catch (error) {
        console.error('Erro de renderização de vitrine:', error);
        return [];
    }
}

// Renderiza os cards de produto respeitando boas práticas de SEO (tags a, imagens estruturadas)
function renderizarProdutos(produtos, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (produtos.length === 0) {
        container.innerHTML = '<p>Nenhum produto encontrado para esta seleção.</p>';
        return;
    }

    container.innerHTML = produtos.map(produto => `
        <article class="product-card">
            <a href="produto.html?id=${produto.slug}" aria-label="Ver detalhes de ${produto.nome}">
                <!-- Lazy loading nativo para imagens abaixo da dobra da página -->
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" width="300" height="300">
                <h3>${produto.nome}</h3>
            </a>
            <p class="price">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
        </article>
    `).join('');
}

// Inicialização na Home
document.addEventListener('DOMContentLoaded', async () => {
    const produtos = await carregarProdutos();
    renderizarProdutos(produtos, 'vitrine-home');
});
