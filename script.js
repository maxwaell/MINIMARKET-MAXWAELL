// Array de produtos por categoria
const produtos = {
    frutas_e_verduras: [
      { id: 1, nome: "Maçã", descricao: "Maçã fresca, 1kg.", valor: 5.99, imagem: "./images/maça.webp" },
      { id: 2, nome: "Banana", descricao: "Banana nanica, 1kg.", valor: 3.50, imagem: "./images/banana.webp" },
      { id: 3, nome: "Cenoura", descricao: "Cenoura orgânica, 1kg.", valor: 4.20, imagem: "./images/cenoura.webp" },
      { id: 4, nome: "Tomate", descricao: "Tomate italiano, 1kg.", valor: 6.75, imagem: "./images/tomate.webp" }
    ],
    nao_pereciveis: [
      { id: 13, nome: "Arroz Agulhinha", descricao: "Arroz branco, 1kg.", valor: 4.99, imagem: "./images/arroz.webp" },
      { id: 14, nome: "Feijão Carioca", descricao: "Feijão carioca, 1kg.", valor: 5.50, imagem: "./images/feijao.webp" },
      { id: 15, nome: "Macarrão com Ovos Parafuso", descricao: "Macarrão espaguete, 500g.", valor: 3.20, imagem: "./images/macarrao.webp" },
      { id: 16, nome: "Açúcar Refinado", descricao: "Açúcar refinado, 1kg.", valor: 2.99, imagem: "./images/acucar.webp" }
    ],
    limpeza_higiene: [
      { id: 5, nome: "Detergente Líquido", descricao: "Detergente líquido concentrado, 500ml.", valor: 2.99, imagem: "./images/detergente.webp" },
      { id: 6, nome: "Sabão em Pó", descricao: "Sabão em pó com enzimas ativas, 1kg.", valor: 12.90, imagem: "./images/sabaopo.webp" },
      { id: 7, nome: "Desinfetante", descricao: "Desinfetante perfumado, 2L.", valor: 8.50, imagem: "./images/desinfetante.webp" },
      { id: 8, nome: "Água Sanitária", descricao: "Água sanitária, 1L.", valor: 3.75, imagem: "./images/aguasani.webp" },
      { id: 9, nome: "Detergente Neutro", descricao: "Detergente líquido neutro, 500ml.", valor: 2.75, imagem: "./images/deterneutro.webp" }
    ]
  };
  
  // Array de serviços
  const servicos = [
    { id: 1, nome: "Entrega em Domicílio", descricao: "Entregamos seus produtos em até 2 horas.", valor: 5.00, icone: "fas fa-truck" },
    { id: 2, nome: "Montagem de Cestas", descricao: "Montamos cestas personalizadas.", valor: 10.00, icone: "fas fa-gift" }
  ];
  
  // Carrinho de compras
  let carrinho = {
    produtos: [],
    servicos: [],
    total: 0
  };
  
  // Objeto para mapear categorias aos títulos
  const titulosCategorias = {
    todos: "Nossos Produtos",
    frutas_e_verduras: "Frutas e Verduras",
    nao_pereciveis: "Não Perecíveis",
    limpeza_higiene: "Limpeza e Higiene"
  };
  
  // Função para inicializar a página
  function inicializarPagina() {
    carregarProdutos('todos');
    carregarServicos();
    adicionarEventos();
    showSlide(currentSlide);
  }
  
  // Função para carregar produtos por categoria
  function carregarProdutos(categoria) {
    const containerProdutos = document.querySelector('#categorias .produtos');
    containerProdutos.innerHTML = '';
  
    const titulo = document.querySelector('#categorias .section-title');
    titulo.textContent = titulosCategorias[categoria];
  
    if (categoria === 'todos') {
      Object.keys(produtos).forEach(cat => {
        produtos[cat].forEach(produto => {
          containerProdutos.innerHTML += criarCardProduto(produto, cat);
        });
      });
    } else {
      produtos[categoria].forEach(produto => {
        containerProdutos.innerHTML += criarCardProduto(produto, categoria);
      });
    }
  
    adicionarEventosBotoesCarrinho();
  }
  
  // Função para carregar serviços
  function carregarServicos() {
    const containerServicos = document.querySelector('#servicos .servicos');
    containerServicos.innerHTML = '';
  
    servicos.forEach(servico => {
      containerServicos.innerHTML += criarCardServico(servico);
    });
  }
  
  // Função para criar o HTML de um card de produto com alt
  function criarCardProduto(produto, categoria) {
    const categoriaTexto = {
      'frutas_e_verduras': 'Frutas e Verduras',
      'nao_pereciveis': 'Não Perecíveis',
      'limpeza_higiene': 'Limpeza e Higiene'
    };
  
    return `
      <div class="produto" data-id="${produto.id}" data-categoria="${categoria}">
        <div class="produto-img">
          <img src="${produto.imagem}" alt="${produto.nome}, ${produto.descricao}">
        </div>
        <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p class="produto-categoria">${categoriaTexto[categoria]}</p>
          <p class="produto-descricao">${produto.descricao}</p>
          <div class="produto-footer">
            <span class="produto-preco">R$ ${produto.valor.toFixed(2)}</span>
          </div>
          <div class="produto-actions">
            <div class="quantity-selector">
              <button class="quantity-btn decrease" data-id="${produto.id}" data-categoria="${categoria}">-</button>
              <span class="quantity-display" data-id="${produto.id}" data-categoria="${categoria}">1</span>
              <button class="quantity-btn increase" data-id="${produto.id}" data-categoria="${categoria}">+</button>
            </div>
            <button class="btn-comprar" data-id="${produto.id}" data-categoria="${categoria}">Comprar</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Função para criar o HTML de um card de serviço
  function criarCardServico(servico) {
    return `
      <div class="servico" data-id="${servico.id}">
        <div class="servico-icon">
          <i class="${servico.icone}"></i>
        </div>
        <h3>${servico.nome}</h3>
        <p>${servico.descricao}</p>
        <p class="servico-preco">R$ ${servico.valor.toFixed(2)}</p>
        <button class="btn btn-outline btn-adicionar-servico" data-id="${servico.id}">Contratar</button>
      </div>
    `;
  }
  
  // Função para adicionar eventos aos botões de quantidade e comprar
  function adicionarEventosBotoesCarrinho() {
    document.querySelectorAll('.quantity-btn').forEach(botao => {
      botao.addEventListener('click', function() {
        const produtoId = this.getAttribute('data-id');
        const categoria = this.getAttribute('data-categoria');
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${produtoId}"][data-categoria="${categoria}"]`);
        let quantidade = parseInt(quantityDisplay.textContent);
  
        if (this.classList.contains('increase')) {
          quantidade += 1;
        } else if (this.classList.contains('decrease')) {
          quantidade = Math.max(1, quantidade - 1);
        }
  
        quantityDisplay.textContent = quantidade;
      });
    });
  
    document.querySelectorAll('.btn-comprar').forEach(botao => {
      botao.addEventListener('click', function() {
        const produtoId = parseInt(this.getAttribute('data-id'));
        const categoria = this.getAttribute('data-categoria');
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${produtoId}"][data-categoria="${categoria}"]`);
        const quantidade = parseInt(quantityDisplay.textContent) || 1;
  
        adicionarProdutoAoCarrinho(produtoId, categoria, quantidade);
        mostrarToast(`Adicionado ${quantidade} unidade(s) ao carrinho!`);
      });
    });
  }
  
  // Função para adicionar eventos aos elementos
  function adicionarEventos() {
    document.querySelectorAll('.categoria-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.categoria-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const categoria = this.getAttribute('data-categoria');
        carregarProdutos(categoria);
      });
    });
  
    document.querySelectorAll('.btn-adicionar-servico').forEach(botao => {
      botao.addEventListener('click', function() {
        const servicoId = parseInt(this.getAttribute('data-id'));
        adicionarServicoAoCarrinho(servicoId);
        mostrarToast('Serviço adicionado ao carrinho!');
      });
    });
  
    document.getElementById('btn-ver-carrinho').addEventListener('click', abrirModalCarrinho);
  
    document.getElementById('btn-finalizar-compra').addEventListener('click', function() {
      if (carrinho.produtos.length === 0 && carrinho.servicos.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
      }
      abrirModalCarrinho();
    });
  
    document.getElementById('btn-finalizar-modal').addEventListener('click', function() {
      const opcaoServico = document.getElementById('opcao-servico').value;
      const dataEntrega = document.getElementById('input-data-entrega').value;
  
      if (!opcaoServico) {
        alert('Por favor, escolha uma opção de serviço (Entrega ou Retirada).');
        return;
      }
  
      if (opcaoServico === 'entrega' && !dataEntrega) {
        alert('Por favor, selecione uma data de entrega.');
        return;
      }
  
      finalizarCompra(opcaoServico, dataEntrega);
    });
  
    document.getElementById('btn-esvaziar-carrinho').addEventListener('click', function() {
      if (confirm('Tem certeza que deseja esvaziar o carrinho?')) {
        esvaziarCarrinho();
        atualizarModalCarrinho();
      }
    });
  
    document.querySelector('.close').addEventListener('click', function() {
      document.getElementById('modal-carrinho').style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      const modal = document.getElementById('modal-carrinho');
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    document.getElementById('opcao-servico').addEventListener('change', function() {
      const dataEntregaDiv = document.getElementById('data-entrega');
      if (this.value === 'entrega') {
        dataEntregaDiv.style.display = 'block';
        setMinDate();
      } else {
        dataEntregaDiv.style.display = 'none';
      }
    });
  }
  
  function adicionarProdutoAoCarrinho(produtoId, categoria, quantidade) {
    const produto = produtos[categoria].find(p => p.id === produtoId);
    const itemExistente = carrinho.produtos.find(item => item.id === produtoId);
  
    if (itemExistente) {
      itemExistente.quantidade += quantidade;
    } else {
      carrinho.produtos.push({
        id: produto.id,
        nome: produto.nome,
        valor: produto.valor,
        quantidade: quantidade,
        categoria: categoria
      });
    }
    atualizarTotalCarrinho();
  }
  
  function adicionarServicoAoCarrinho(servicoId) {
    const servico = servicos.find(s => s.id === servicoId);
    const itemExistente = carrinho.servicos.find(item => item.id === servicoId);
  
    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.servicos.push({
        id: servico.id,
        nome: servico.nome,
        valor: servico.valor,
        quantidade: 1
      });
    }
    atualizarTotalCarrinho();
  }
  
  function removerItemDoCarrinho(tipo, id) {
    if (tipo === 'produto') {
      carrinho.produtos = carrinho.produtos.filter(item => item.id !== id);
    } else if (tipo === 'servico') {
      carrinho.servicos = carrinho.servicos.filter(item => item.id !== id);
    }
    atualizarTotalCarrinho();
    atualizarModalCarrinho();
  }
  
  function atualizarQuantidadeItem(tipo, id, operacao) {
    let item = tipo === 'produto' ?
      carrinho.produtos.find(p => p.id === id) :
      carrinho.servicos.find(s => s.id === id);
  
    if (!item) return;
  
    if (operacao === 'aumentar') {
      item.quantidade += 1;
    } else if (operacao === 'diminuir') {
      item.quantidade -= 1;
      if (item.quantidade <= 0) {
        removerItemDoCarrinho(tipo, id);
        return;
      }
    }
    atualizarTotalCarrinho();
    atualizarModalCarrinho();
  }
  
  function atualizarTotalCarrinho() {
    carrinho.total = 0;
    carrinho.produtos.forEach(produto => {
      carrinho.total += produto.valor * produto.quantidade;
    });
    carrinho.servicos.forEach(servico => {
      carrinho.total += servico.valor * servico.quantidade;
    });
  }
  
  function esvaziarCarrinho() {
    carrinho.produtos = [];
    carrinho.servicos = [];
    carrinho.total = 0;
  }
  
  function abrirModalCarrinho() {
    atualizarModalCarrinho();
    document.getElementById('modal-carrinho').style.display = 'block';
  }
  
  function atualizarModalCarrinho() {
    const conteudoCarrinho = document.getElementById('conteudo-carrinho');
    const servicosCarrinho = document.getElementById('servicos-carrinho');
  
    if (carrinho.produtos.length === 0 && carrinho.servicos.length === 0) {
      conteudoCarrinho.innerHTML = '<p>Seu carrinho está vazio.</p>';
      servicosCarrinho.style.display = 'none';
      return;
    }
  
    let html = `
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    carrinho.produtos.forEach(produto => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>R$ ${produto.valor.toFixed(2)}</td>
          <td>
            <div class="item-quantity">
              <button class="btn-quantity" onclick="atualizarQuantidadeItem('produto', ${produto.id}, 'diminuir')">-</button>
              <span>${produto.quantidade}</span>
              <button class="btn-quantity" onclick="atualizarQuantidadeItem('produto', ${produto.id}, 'aumentar')">+</button>
            </div>
          </td>
          <td>R$ ${(produto.valor * produto.quantidade).toFixed(2)}</td>
          <td>
            <button class="remover-item" onclick="removerItemDoCarrinho('produto', ${produto.id})">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  
    carrinho.servicos.forEach(servico => {
      html += `
        <tr>
          <td>${servico.nome}</td>
          <td>R$ ${servico.valor.toFixed(2)}</td>
          <td>
            <div class="item-quantity">
              <button class="btn-quantity" onclick="atualizarQuantidadeItem('servico', ${servico.id}, 'diminuir')">-</button>
              <span>${servico.quantidade}</span>
              <button class="btn-quantity" onclick="atualizarQuantidadeItem('servico', ${servico.id}, 'aumentar')">+</button>
            </div>
          </td>
          <td>R$ ${(servico.valor * servico.quantidade).toFixed(2)}</td>
          <td>
            <button class="remover-item" onclick="removerItemDoCarrinho('servico', ${servico.id})">
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
  
    html += `
        </tbody>
      </table>
      <div class="cart-summary">
        <div class="cart-total">
          <span>Total:</span>
          <span>R$ ${carrinho.total.toFixed(2)}</span>
        </div>
      </div>
    `;
  
    conteudoCarrinho.innerHTML = html;
    servicosCarrinho.style.display = 'block';
  }
  
  // Função para definir a data mínima como o dia seguinte
  function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];
    document.getElementById('input-data-entrega').setAttribute('min', minDate);
  }
  
  function mostrarToast(mensagem) {
    const toast = document.getElementById('toast');
    const toastText = document.querySelector('.toast-text');
  
    toastText.textContent = mensagem;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
  
  function finalizarCompra(opcaoServico, dataEntrega) {
    let totalFinal = carrinho.total;
    if (opcaoServico === 'entrega') {
      totalFinal += 5.00;
    }
  
    alert(`Compra finalizada com sucesso! Total: R$ ${totalFinal.toFixed(2)} (Opção: ${opcaoServico === 'entrega' ? 'Entrega' : 'Retirada'}, Data: ${dataEntrega || 'N/A'})`);
    esvaziarCarrinho();
    document.getElementById('modal-carrinho').style.display = 'none';
  }
  
  // Carrossel
  let currentSlide = 0;
  const slides = document.querySelectorAll('.carrossel-slide');
  const totalSlides = slides.length;
  const carrosselContainer = document.querySelector('.carrossel-container');
  
  function showSlide(index) {
    if (index >= totalSlides) index = 0;
    else if (index < 0) index = totalSlides - 1;
    currentSlide = index;
    carrosselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  document.querySelector('.carrossel-next').addEventListener('click', () => showSlide(currentSlide + 1));
  document.querySelector('.carrossel-prev').addEventListener('click', () => showSlide(currentSlide - 1));
  setInterval(() => showSlide(currentSlide + 1), 5000);
  
  // Formulário de Cadastro
  document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
  
    if (!nome || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    alert('Cadastro realizado com sucesso!');
    this.reset();
  });
  
  document.addEventListener('DOMContentLoaded', inicializarPagina);// Array de produtos por categoria
const produtos = {
    frutas_e_verduras: [
      { id: 1, nome: "Maçã", descricao: "Maçã fresca, 1kg.", valor: 5.99, imagem: "./images/maça.webp" },
      { id: 2, nome: "Banana", descricao: "Banana nanica, 1kg.", valor: 3.50, imagem: "./images/banana.webp" },
      { id: 3, nome: "Cenoura", descricao: "Cenoura orgânica, 1kg.", valor: 4.20, imagem: "./images/cenoura.webp" },
      { id: 4, nome: "Tomate", descricao: "Tomate italiano, 1kg.", valor: 6.75, imagem: "./images/tomate.webp" }
    ],
    nao_pereciveis: [
      { id: 13, nome: "Arroz Agulhinha", descricao: "Arroz branco, 1kg.", valor: 4.99, imagem: "./images/arroz.webp" },
      { id: 14, nome: "Feijão Carioca", descricao: "Feijão carioca, 1kg.", valor: 5.50, imagem: "./images/feijao.webp" },
      { id: 15, nome: "Macarrão com Ovos Parafuso", descricao: "Macarrão espaguete, 500g.", valor: 3.20, imagem: "./images/macarrao.webp" },
      { id: 16, nome: "Açúcar Refinado", descricao: "Açúcar refinado, 1kg.", valor: 2.99, imagem: "./images/acucar.webp" }
    ],
    limpeza_higiene: [
      { id: 5, nome: "Detergente Líquido", descricao: "Detergente líquido concentrado, 500ml.", valor: 2.99, imagem: "./images/detergente.webp" },
      { id: 6, nome: "Sabão em Pó", descricao: "Sabão em pó com enzimas ativas, 1kg.", valor: 12.90, imagem: "./images/sabaopo.webp" },
      { id: 7, nome: "Desinfetante", descricao: "Desinfetante perfumado, 2L.", valor: 8.50, imagem: "./images/desinfetante.webp" },
      { id: 8, nome: "Água Sanitária", descricao: "Água sanitária, 1L.", valor: 3.75, imagem: "./images/aguasani.webp" },
      { id: 9, nome: "Detergente Neutro", descricao: "Detergente líquido neutro, 500ml.", valor: 2.75, imagem: "./images/deterneutro.webp" }
    ]
  };
  
  // Array de serviços
  const servicos = [
    { id: 1, nome: "Entrega em Domicílio", descricao: "Entregamos seus produtos em até 2 horas.", valor: 5.00, icone: "fas fa-truck" },
    { id: 2, nome: "Montagem de Cestas", descricao: "Montamos cestas personalizadas.", valor: 10.00, icone: "fas fa-gift" }
  ];
  
  // Carrinho de compras
  let carrinho = {
    produtos: [],
    servicos: [],
    total: 0
  };
  
  // Objeto para mapear categorias aos títulos
  const titulosCategorias = {
    todos: "Nossos Produtos",
    frutas_e_verduras: "Frutas e Verduras",
    nao_pereciveis: "Não Perecíveis",
    limpeza_higiene: "Limpeza e Higiene"
  };
  
  // Função para inicializar a página
  function inicializarPagina() {
    carregarProdutos('todos');
    carregarServicos();
    adicionarEventos();
    showSlide(currentSlide);
  }
  
  // Função para carregar produtos por categoria
  function carregarProdutos(categoria) {
    const containerProdutos = document.querySelector('#categorias .produtos');
    containerProdutos.innerHTML = '';
  
    const titulo = document.querySelector('#categorias .section-title');
    titulo.textContent = titulosCategorias[categoria];
  
    if (categoria === 'todos') {
      Object.keys(produtos).forEach(cat => {
        produtos[cat].forEach(produto => {
          containerProdutos.innerHTML += criarCardProduto(produto, cat);
        });
      });
    } else {
      produtos[categoria].forEach(produto => {
        containerProdutos.innerHTML += criarCardProduto(produto, categoria);
      });
    }
  
    adicionarEventosBotoesCarrinho();
  }
  
  // Função para carregar serviços
  function carregarServicos() {
    const containerServicos = document.querySelector('#servicos .servicos');
    containerServicos.innerHTML = '';
  
    servicos.forEach(servico => {
      containerServicos.innerHTML += criarCardServico(servico);
    });
  }
  
  // Função para criar o HTML de um card de produto com alt
  function criarCardProduto(produto, categoria) {
    const categoriaTexto = {
      'frutas_e_verduras': 'Frutas e Verduras',
      'nao_pereciveis': 'Não Perecíveis',
      'limpeza_higiene': 'Limpeza e Higiene'
    };
  
    return `
      <div class="produto" data-id="${produto.id}" data-categoria="${categoria}">
        <div class="produto-img">
          <img src="${produto.imagem}" alt="${produto.nome}, ${produto.descricao}">
        </div>
        <div class="produto-info">
          <h3>${produto.nome}</h3>
          <p class="produto-categoria">${categoriaTexto[categoria]}</p>
          <p class="produto-descricao">${produto.descricao}</p>
          <div class="produto-footer">
            <span class="produto-preco">R$ ${produto.valor.toFixed(2)}</span>
          </div>
          <div class="produto-actions">
            <div class="quantity-selector">
              <button class="quantity-btn decrease" data-id="${produto.id}" data-categoria="${categoria}">-</button>
              <span class="quantity-display" data-id="${produto.id}" data-categoria="${categoria}">1</span>
              <button class="quantity-btn increase" data-id="${produto.id}" data-categoria="${categoria}">+</button>
            </div>
            <button class="btn-comprar" data-id="${produto.id}" data-categoria="${categoria}">Comprar</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Função para criar o HTML de um card de serviço
  function criarCardServico(servico) {
    return `
      <div class="servico" data-id="${servico.id}">
        <div class="servico-icon">
          <i class="${servico.icone}"></i>
        </div>
        <h3>${servico.nome}</h3>
        <p>${servico.descricao}</p>
        <p class="servico-preco">R$ ${servico.valor.toFixed(2)}</p>
        <button class="btn btn-outline btn-adicionar-servico" data-id="${servico.id}">Contratar</button>
      </div>
    `;
  }
  
  // Função para adicionar eventos aos botões de quantidade e comprar
  function adicionarEventosBotoesCarrinho() {
    document.querySelectorAll('.quantity-btn').forEach(botao => {
      botao.addEventListener('click', function() {
        const produtoId = this.getAttribute('data-id');
        const categoria = this.getAttribute('data-categoria');
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${produtoId}"][data-categoria="${categoria}"]`);
        let quantidade = parseInt(quantityDisplay.textContent);
  
        if (this.classList.contains('increase')) {
          quantidade += 1;
        } else if (this.classList.contains('decrease')) {
          quantidade = Math.max(1, quantidade - 1);
        }
  
        quantityDisplay.textContent = quantidade;
      });
    });
  
    document.querySelectorAll('.btn-comprar').forEach(botao => {
      botao.addEventListener('click', function() {
        const produtoId = parseInt(this.getAttribute('data-id'));
        const categoria = this.getAttribute('data-categoria');
        const quantityDisplay = document.querySelector(`.quantity-display[data-id="${produtoId}"][data-categoria="${categoria}"]`);
        const quantidade = parseInt(quantityDisplay.textContent) || 1;
  
        adicionarProdutoAoCarrinho(produtoId, categoria, quantidade);
        mostrarToast(`Adicionado ${quantidade} unidade(s) ao carrinho!`);
      });
    });
  }
  
  // Função para adicionar eventos aos elementos
  function adicionarEventos() {
    document.querySelectorAll('.categoria-tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.categoria-tab').forEach(t => t