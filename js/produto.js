document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const produtoSlug = params.get('id') || 'cadeira-ergonomica-office-premium';

    const produtos = await carregarProdutos();
    const produto = produtos.find(p => p.slug === produtoSlug);

    if (produto) {
        // 1. Atualização dos Textos e Atributos Semânticos
        document.title = `${produto.nome} | NomeLoja`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', produto.descricao);
        
        document.getElementById('produto-nome').innerText = produto.nome;
        document.getElementById('breadcrumb-produto-atual').innerText = produto.nome;
        document.getElementById('produto-descricao').innerText = produto.descricao;
        
        const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
        document.getElementById('produto-preco').innerText = precoFormatado;
        document.getElementById('produto-preco').setAttribute('content', produto.preco.toFixed(2));
        
        const skuId = produto.id === 1 ? 'CAD-OFF-01' : 'CAD-GAMER-02';
        document.getElementById('produto-sku').innerText = skuId;

        // 2. Ajuste do Link de Categoria no Breadcrumb
        const catLink = document.getElementById('breadcrumb-cat-link');
        catLink.href = `categoria.html?cat=${produto.categoria}`;
        catLink.innerText = produto.categoria.charAt(0).toUpperCase() + produto.categoria.slice(1);

        // 3. Substituição Dinâmica de Imagens usando placehold.co
        const imgPrincipal = document.getElementById('produto-imagem-principal');
        const termoImagem = encodeURIComponent(produto.nome);
        
        imgPrincipal.src = `https://placehold.co/600x600/e2e8f0/475569?text=${termoImagem}`;
        imgPrincipal.alt = `Foto principal do produto ${produto.nome}`;

        // Injeta miniaturas customizadas com variações do placehold.co
        const miniaturasContainer = document.getElementById('produto-miniaturas');
        miniaturasContainer.innerHTML = `
            <button aria-label="Visualizar ângulo frontal" class="active"><img src="https://placehold.co/100x100/e2e8f0/475569?text=Frente" alt="Ângulo frontal de ${produto.nome}" width="100" height="100"></button>
            <button aria-label="Visualizar ângulo lateral"><img src="https://placehold.co/100x100/cbd5e1/475569?text=Lateral" alt="Ângulo lateral de ${produto.nome}" width="100" height="100"></button>
            <button aria-label="Visualizar detalhes do encosto"><img src="https://placehold.co/100x100/94a3b8/475569?text=Detalhes" alt="Detalhes de fabricação de ${produto.nome}" width="100" height="100"></button>
        `;

        // Ativa comportamento básico de troca de imagem da galeria (Acessibilidade + UX)
        const botoes = miniaturasContainer.querySelectorAll('button');
        botoes.forEach(botao => {
            botao.addEventListener('click', () => {
                botoes.forEach(b => b.classList.remove('active'));
                botao.classList.add('active');
                const imgBtn = botao.querySelector('img');
                imgPrincipal.src = imgBtn.src.replace('100x100', '600x600');
            });
        });
    }
});
