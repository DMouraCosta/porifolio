document.addEventListener("DOMContentLoaded", () => {
  // --- 1. SETUP INICIAL ---

  // Define o ano atual no footer (Acessibilidade e Usabilidade)
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // --- 2. FUNCIONALIDADE DO MENU HAMBURGER (Responsividade) ---

  const hamburgerBtn = document.querySelector(".hamburger-menu");
  const mainNav = document.getElementById("main-nav");
  const navLinks = mainNav.querySelectorAll("a");

  const toggleMenu = () => {
    const isExpanded =
      hamburgerBtn.getAttribute("aria-expanded") === "true" || false;
    hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
    mainNav.classList.toggle("is-open");
    // Adiciona/remove 'tabindex' para controle de foco (acessibilidade)
    navLinks.forEach((link) =>
      link.setAttribute("tabindex", isExpanded ? "-1" : "0")
    );
  };

  hamburgerBtn.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em um link (apenas no mobile, se estiver aberto)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("is-open")) {
        toggleMenu();
      }
    });
  });

  // --- 3. DADOS E FUNCIONALIDADE DO MODAL DE PROJETOS (Expansão/Colapso) ---

  const projectDetails = {
    "proj-1": {
      title: "Essentia Catálogo",
      image: "https://i.postimg.cc/4xXWfQVz/essentia.png",
      description:
        "Um catálogo online moderno e responsivo para a marca de sabonetes artesanais Essentia. O catálogo apresenta as linhas de produtos, combos, opções de presentes especiais e um poderoso configurador para criar sabonetes personalizados com orçamento instantâneo.",
      technologies: ["Html5", "CSS3", "JavaScript"],
      demoLink: "https://essentia-catalogo.vercel.app/",
      codeLink: "https://github.com/DMouraCosta/essentia_catalogo",
    },
    "proj-2": {
      title: "Monitor de Qualidade de APIs",
      image: "https://i.postimg.cc/rm7hq6NK/monitor.png",
      description:
        "Plataforma de comércio eletrônico completa. Frontend desenvolvido em React (ou JS Puro no seu caso) com gerenciamento de estado minimalista e rotas otimizadas. Backend RESTful com Node.js e MongoDB, incluindo autenticação via JWT e integração com gateway de pagamento. Implementação de testes unitários e de integração.",
      technologies: ["React + Vite", "Node.js", "Express"],
      demoLink: "https://monitor-de-qualidade-apis.vercel.app/",
      codeLink: "https://github.com/DMouraCosta/monitor-de-qualidade-apis",
    },
    "proj-3": {
      title: "Richard Colchoaria – Proposta de Site",
      image: "https://i.postimg.cc/P5dSXQYv/richards.png",
      description:
        "Este projeto foi desenvolvido por mim como uma proposta não solicitada, com o objetivo de modernizar o site institucional da Richard Colchoaria, destacando seus produtos, valores e oferecendo uma experiência mais amigável e informativa para os clientes.",
      technologies: ["Html5", "CSS3", "JavaScript"],
      demoLink: "https://dmouracosta.github.io/colchoaria-site/",
      codeLink:
        "https://github.com/DMouraCosta/colchoaria-site?tab=readme-ov-file",
    },
    "proj-4": {
      title: "Benchmark comparativo de IA generativa",
      image: "https://i.postimg.cc/9MD83XZW/bench.png",
      description:
        "Projeto para gerar, responder e avaliar perguntas médicas em planilhas usando IA generativa, comparando respostas novas e antigas, registrando notas, comentários e tempos de resposta automaticamente. Pode ser facilmente adptado para qualquer agente de IA",
      technologies: ["AppScript"],
      demoLink:
        "https://docs.google.com/spreadsheets/d/1txXmcViuaVdKwLNXC2uF7ToX66NwnWser9fOkz_aVss/edit?usp=sharing",
      codeLink: "https://github.com/DMouraCosta/benchmark-ia",
    },
  };

  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("project-modal");
  const modalBody = modal.querySelector(".modal-body");
  const closeModalBtn = modal.querySelector(".close-modal");
  let focusedElementBeforeModal;

  /**
   * Monta o HTML do modal com base nos dados do projeto.
   * @param {string} projectId ID do projeto (ex: 'proj-1').
   */
  const loadProjectContent = (projectId) => {
    const data = projectDetails[projectId];
    if (!data) return;

    // Cria a lista de tecnologias (tech tags)
    const techTagsHtml = data.technologies
      .map((tech) => `<span class="tech-tag">${tech}</span>`)
      .join("");

    // Monta o conteúdo principal do modal
    modalBody.innerHTML = `
            <h3 id="modal-title">${data.title}</h3>
            <img src="${data.image}" alt="Screenshot do projeto: ${data.title}" class="project-detail-image" loading="eager">
            <p class="detail-description">${data.description}</p>
            
            <div class="detail-tech-tags">
                <h4>Tecnologias Utilizadas:</h4>
                <div class="tech-tags">${techTagsHtml}</div>
            </div>

            <div class="detail-actions">
                <a href="${data.demoLink}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-desktop"></i> Ver Demo
                </a>
                <a href="${data.codeLink}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github"></i> Ver Código
                </a>
            </div>
        `;
    // Garante que o botão fechar está acessível
    closeModalBtn.setAttribute("tabindex", "0");
    // Define o título principal do modal para acessibilidade
    modal.setAttribute("aria-labelledby", "modal-title");
  };

  /**
   * Abre o modal, gerencia o foco e acessibilidade.
   * @param {string} projectId ID do projeto.
   */
  const openModal = (projectId, triggeringElement) => {
    // Salva o elemento que disparou a abertura para retornar o foco
    focusedElementBeforeModal = triggeringElement;

    loadProjectContent(projectId);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // Coloca o foco no botão de fechar para usabilidade e acessibilidade
    closeModalBtn.focus();
  };

  /**
   * Fecha o modal, gerencia o foco e acessibilidade.
   */
  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    // Retorna o foco para o elemento que abriu o modal
    if (focusedElementBeforeModal) {
      focusedElementBeforeModal.focus();
    }
  };

  // Event Listeners para Abrir o Modal (Clique e Teclado - Enter)
  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Se o clique não foi diretamente em um link interno do card
      if (!e.target.closest("a")) {
        openModal(card.dataset.projectId, card);
      }
    });

    // Habilita a abertura por tecla Enter (importante para role="button" e tabindex="0")
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        openModal(card.dataset.projectId, card);
      }
    });
  });

  // Event Listeners para Fechar o Modal
  closeModalBtn.addEventListener("click", closeModal);

  // Fechar ao clicar fora do conteúdo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Fechar com a tecla ESC (Teclado)
  document.addEventListener("keydown", (e) => {
    // Verifica se o modal está aberto e a tecla é ESC
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // --- 4. VALIDAÇÃO DE FORMULÁRIO DE CONTATO (Client-side) ---

  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");

  /**
   * Exibe a mensagem de erro sob o campo.
   * @param {Element} input Elemento input/textarea.
   * @param {string} message Mensagem de erro.
   */
  const displayError = (input, message) => {
    const formGroup = input.closest(".form-group");
    formGroup.classList.add("error");
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.textContent = message;
    }
  };

  /**
   * Limpa a mensagem de erro do campo.
   * @param {Element} input Elemento input/textarea.
   */
  const clearError = (input) => {
    const formGroup = input.closest(".form-group");
    formGroup.classList.remove("error");
    const errorMessage = formGroup.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.textContent = "";
    }
  };

  /**
   * Valida um campo específico.
   * @param {Element} input Elemento input/textarea.
   * @returns {boolean} True se válido, False se inválido.
   */
  const validateField = (input) => {
    clearError(input);

    // Validação de campo obrigatório (simples)
    if (input.hasAttribute("required") && input.value.trim() === "") {
      displayError(input, "Este campo é obrigatório.");
      return false;
    }

    // Validação de email (regex simples)
    if (input.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        displayError(input, "Por favor, insira um e-mail válido.");
        return false;
      }
    }

    return true;
  };

  // Adiciona evento de validação em tempo real (blur/input)
  contactForm.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      // Limpa o erro ao digitar (melhor UX)
      if (input.closest(".form-group").classList.contains("error")) {
        clearError(input);
      }
    });
  });

  // Evento de Submissão do Formulário
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede a submissão padrão (POST para o action)

    let isFormValid = true;

    // Roda a validação em todos os campos
    contactForm.querySelectorAll("input, textarea").forEach((input) => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // 1. Tenta usar mailto com os dados do formulário
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent(`Contato de Portfólio de: ${name}`);
      const body = encodeURIComponent(
        `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
      );

      // Link mailto
      const mailtoLink = `mailto:SEU_EMAIL@exemplo.com?subject=${subject}&body=${body}`; // Altere o e-mail

      // 2. Abre o link mailto (Comportamento esperado de fallback/envio)
      window.location.href = mailtoLink;

      // 3. Fornece feedback visual (Simulando envio bem-sucedido)
      formFeedback.textContent =
        "Aguarde. Seu aplicativo de e-mail deve abrir para enviar a mensagem.";
      formFeedback.classList.remove("error");
      formFeedback.classList.add("success");
      formFeedback.setAttribute("aria-hidden", "false");
      formFeedback.style.display = "block";

      // Limpa o formulário após um pequeno delay (se o usuário não fechar a página)
      setTimeout(() => {
        contactForm.reset();
        formFeedback.style.display = "none";
        formFeedback.setAttribute("aria-hidden", "true");
      }, 3000);
    } else {
      // Feedback de erro
      formFeedback.textContent =
        "Por favor, corrija os erros no formulário antes de enviar.";
      formFeedback.classList.remove("success");
      formFeedback.classList.add("error");
      formFeedback.setAttribute("aria-hidden", "false");
      formFeedback.style.display = "block";

      // Foca no primeiro campo com erro
      const firstError = document.querySelector(
        ".form-group.error input, .form-group.error textarea"
      );
      if (firstError) {
        firstError.focus();
      }
    }
  });
});
