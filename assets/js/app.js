(() => {
  "use strict";

  const readStorage = key => {
    try { return window.localStorage.getItem(key); }
    catch { return null; }
  };
  const writeStorage = (key, value) => {
    try { window.localStorage.setItem(key, value); }
    catch { /* Storage can be unavailable in private or embedded contexts. */ }
  };

  const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const languageMenu = document.getElementById("languageMenu");
    const languageTrigger = document.getElementById("languageTrigger");
    const languageOptions = document.getElementById("languageOptions");
    const languageCurrent = document.getElementById("languageCurrent");
    const languageOptionButtons = [...document.querySelectorAll(".language-option")];
    const languageNames = {en:"English", es:"Español", pt:"Português"};
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const topBar = document.querySelector(".top-app-bar");
    const detailPanel = document.getElementById("engagementDetail");
    const tabButtons = [...document.querySelectorAll(".tab-button")];

    const staticTranslations = {
      es: {"Product & Engineering Studio": "Estudio de Producto e Ingeniería", "What we solve": "Qué resolvemos", "Services": "Servicios", "How we work": "Cómo trabajamos", "Profiles": "Perfiles", "Discuss a project": "Hablar de un proyecto", "Senior product & engineering duo · Madrid / Europe": "Dúo sénior de producto e ingeniería · Madrid / Europa", "Product clarity.": "Claridad de producto.", "Engineering depth.": "Profundidad de ingeniería.", "We help teams turn": "Ayudamos a los equipos a convertir", "complex workflows and technical constraints": "flujos complejos y restricciones técnicas", "into clear, scalable software—from product direction and UX to architecture, implementation and cloud foundations.": "en software claro y escalable: desde la dirección de producto y la UX hasta la arquitectura, la implementación y las bases cloud.", "Discuss your product": "Hablemos de tu producto", "See how we can help": "Ver cómo podemos ayudar", "Product direction": "Dirección de producto", "Discovery, scope and priorities": "Discovery, alcance y prioridades", "Experience design": "Diseño de experiencia", "Flows, UI and systems": "Flujos, interfaz y sistemas", "Software engineering": "Ingeniería de software", "Frontend, backend and APIs": "Frontend, backend y APIs", "Platform foundations": "Bases de plataforma", "Cloud, IaC and automation": "Cloud, IaC y automatización", "Product & Experience Lead": "Responsable de Producto y Experiencia", "Shapes the right product, simplifies complex workflows and carries decisions from discovery into implementation-ready UX and frontend delivery.": "Da forma al producto adecuado, simplifica flujos complejos y lleva las decisiones desde el discovery hasta una UX lista para implementar y su entrega frontend.", "Product strategy": "Estrategia de producto", "Engineering & Platform Lead": "Responsable de Ingeniería y Plataforma", "Designs reliable systems and technical foundations across software architecture, backend services, cloud platforms, infrastructure and automation.": "Diseña sistemas fiables y bases técnicas mediante arquitectura de software, servicios backend, plataformas cloud, infraestructura y automatización.", "Architecture": "Arquitectura", "Cloud": "Cloud", "Platform engineering": "Ingeniería de plataforma", "Two senior specialists. One accountable product team.": "Dos especialistas sénior. Un único equipo responsable del producto.", "Less context loss between strategy, design and engineering.": "Menos pérdida de contexto entre estrategia, diseño e ingeniería.", "Best suited to products where complexity is real.": "Especialmente indicados para productos donde la complejidad es real.", "We focus on software with meaningful workflows, data, integrations, operational rules or legacy constraints—not generic marketing websites.": "Nos centramos en software con flujos relevantes, datos, integraciones, reglas operativas o restricciones legacy; no en webs de marketing genéricas.", "Complex B2B products that need product and technical thinking together.": "Productos B2B complejos que necesitan pensamiento de producto y técnico conectado.", "The strongest fit is where user experience, business logic, architecture and delivery cannot be treated as separate workstreams.": "Nuestro mejor encaje aparece cuando la experiencia de usuario, la lógica de negocio, la arquitectura y la entrega no pueden tratarse como líneas de trabajo separadas.", "Fewer handoffs and clearer product–engineering trade-offs": "Menos traspasos y decisiones producto–ingeniería más claras", "Buildable UX with states, edge cases and constraints considered": "UX construible que contempla estados, casos límite y restricciones", "Technical foundations designed to support future evolution": "Bases técnicas preparadas para evolucionar", "Data products & SaaS": "Productos de datos y SaaS", "Dashboards, datasets, analytics, maps, marketplaces, permissions and self-service workflows.": "Dashboards, datasets, analítica, mapas, marketplaces, permisos y flujos de autoservicio.", "Operational platforms": "Plataformas operativas", "Internal products that replace fragmented processes, unclear interfaces and manual decisions.": "Productos internos que sustituyen procesos fragmentados, interfaces poco claras y decisiones manuales.", "Legacy modernisation": "Modernización de sistemas legacy", "Existing products that need better usability and stronger technical foundations without ignoring reality.": "Productos existentes que necesitan mejor usabilidad y bases técnicas más sólidas sin ignorar sus restricciones reales.", "Validated products moving forward": "Productos validados que necesitan avanzar", "From a proven concept or fragile MVP to a maintainable product foundation and clearer delivery path.": "De un concepto probado o un MVP frágil a una base de producto mantenible y una ruta de entrega más clara.", "Ways to work together": "Formas de trabajar juntos", "Four focused engagement models.": "Cuatro modelos de colaboración concretos.", "Select a service to see the purpose, typical outputs and the situation where it creates the most value.": "Selecciona un servicio para ver su objetivo, entregables habituales y cuándo genera más valor.", "Definition Sprint": "Sprint de definición", "Clarify before building": "Aclarar antes de construir", "Product Foundation": "Base de producto", "Design and build": "Diseñar y construir", "Rescue & Modernisation": "Rescate y modernización", "Untangle and improve": "Desbloquear y mejorar", "Fractional Leadership": "Liderazgo fraccional", "Ongoing senior direction": "Dirección sénior continua", "01 · Product Definition Sprint": "01 · Sprint de definición de producto", "Turn ambiguity into a product direction the team can act on.": "Convierte la ambigüedad en una dirección de producto sobre la que el equipo pueda actuar.", "We connect the business problem, user workflows and technical constraints before the build creates avoidable product or architecture debt.": "Conectamos el problema de negocio, los flujos de usuario y las restricciones técnicas antes de que la construcción genere deuda evitable de producto o arquitectura.", "Problem framing": "Definición del problema", "Priority users": "Usuarios prioritarios", "Core workflows": "Flujos principales", "Prototype": "Prototipo", "Scope": "Alcance", "Architecture outline": "Esquema de arquitectura", "Best when the problem is real, but the product direction is still unclear.": "Ideal cuando el problema es real, pero la dirección de producto todavía no está clara.", "Suitable before an MVP, redesign, major feature or technical commitment.": "Adecuado antes de un MVP, rediseño, funcionalidad importante o compromiso técnico.", "Connected decisions from problem to operation.": "Decisiones conectadas desde el problema hasta la operación.", "The process adapts to the project, but product and technical decisions remain connected throughout delivery.": "El proceso se adapta al proyecto, pero las decisiones de producto y tecnología permanecen conectadas durante toda la entrega.", "Delivery path": "Ruta de entrega", "One shared context": "Un contexto compartido", "Frame": "Enmarcar", "Problem, users, constraints and outcomes.": "Problema, usuarios, restricciones y resultados.", "Shape": "Dar forma", "Scope, flows and technical options.": "Alcance, flujos y opciones técnicas.", "Validate": "Validar", "Prototype, feedback and feasibility.": "Prototipo, feedback y viabilidad.", "Build": "Construir", "Experience, software and infrastructure.": "Experiencia, software e infraestructura.", "Evolve": "Evolucionar", "Learning, priorities and platform support.": "Aprendizaje, prioridades y soporte de plataforma.", "Clear ownership": "Responsabilidades claras", "Joint decisions, explicit leads": "Decisiones conjuntas, responsables explícitos", "UX/UI & frontend": "UX/UI y frontend", "Backend & architecture": "Backend y arquitectura", "Cloud & platform": "Cloud y plataforma", "Trade-offs & delivery": "Trade-offs y entrega", "Joint": "Conjunto", "Detailed profiles": "Perfiles detallados", "More context, already open.": "Más contexto, visible desde el inicio.", "Both profiles are visible by default, with the most relevant capabilities grouped into clearer, more useful widgets. You can still collapse either card when comparing the two.": "Ambos perfiles se muestran abiertos por defecto, con las capacidades más relevantes agrupadas en widgets más claros y útiles. Aun así, puedes plegar cada tarjeta para compararlos.", "Carolina · Product & Experience": "Carolina · Producto y Experiencia", "Turns complex needs into clear product decisions and buildable experiences": "Convierte necesidades complejas en decisiones claras y experiencias construibles", "Product lead": "Liderazgo de producto", "Product-minded UX/UI and technical profile connecting discovery, product direction, complex interaction design and frontend delivery.": "Perfil técnico y de UX/UI con mentalidad de producto que conecta discovery, dirección de producto, diseño de interacciones complejas y entrega frontend.", "Shape the product": "Dar forma al producto", "Discovery, roadmap structure, backlog quality and prioritisation.": "Discovery, estructura de roadmap, calidad del backlog y priorización.", "Simplify complexity": "Simplificar la complejidad", "B2B SaaS, operational tools, data-heavy workflows and information architecture.": "SaaS B2B, herramientas operativas, flujos intensivos en datos y arquitectura de información.", "Design for delivery": "Diseñar para construir", "Design systems, implementation-ready Figma, frontend fluency and acceptance criteria.": "Sistemas de diseño, Figma listo para implementar, fluidez frontend y criterios de aceptación.", "Core capabilities": "Capacidades principales", "Product discovery": "Discovery de producto", "UX/UI leadership": "Liderazgo UX/UI", "Design systems": "Sistemas de diseño", "Frontend delivery": "Entrega frontend", "Stakeholder alignment": "Alineación de stakeholders", "Release preparation": "Preparación de releases", "Email Carolina": "Escribir a Carolina", "Carmelo · Engineering & Platform": "Carmelo · Ingeniería y Plataforma", "Turns product requirements into reliable systems and technical foundations": "Convierte requisitos de producto en sistemas fiables y bases técnicas", "Engineering lead": "Liderazgo de ingeniería", "Software and platform engineer combining architecture, backend development, cloud operations, infrastructure automation and analytical depth.": "Ingeniero de software y plataforma que combina arquitectura, desarrollo backend, operaciones cloud, automatización de infraestructura y profundidad analítica.", "Architect the system": "Diseñar la arquitectura", "Software architecture, system design, distributed foundations, APIs and data.": "Arquitectura de software, diseño de sistemas, bases distribuidas, APIs y datos.", "Build the platform": "Construir la plataforma", "AWS, Azure, Docker, cloud administration and platform engineering.": "AWS, Azure, Docker, administración cloud e ingeniería de plataforma.", "Automate delivery": "Automatizar la entrega", "Terraform, Ansible, Infrastructure as Code and internal engineering solutions.": "Terraform, Ansible, infraestructura como código y soluciones internas de ingeniería.", "Software architecture": "Arquitectura de software", "Backend engineering": "Ingeniería backend", "Cloud platforms": "Plataformas cloud", "Infrastructure as Code": "Infraestructura como código", "Automation": "Automatización", "Mathematical modelling": "Modelización matemática", "Email Carmelo": "Escribir a Carmelo", "What is difficult about your product today?": "¿Qué es difícil en tu producto ahora mismo?", "Share the current situation, the decision you need to make and where the team is blocked. We will start with the questions that matter most.": "Cuéntanos la situación actual, la decisión que necesitas tomar y dónde está bloqueado el equipo. Empezaremos por las preguntas que más importan.", "Email the studio": "Escribir al estudio", "Product & Engineering Studio · Madrid, Spain": "Estudio de Producto e Ingeniería · Madrid, España", "Contact": "Contacto", "Three focused product engagements.": "Tres propuestas para tres momentos del producto.", "Each engagement answers a different product moment: decide what is worth building, turn a validated direction into a dependable product, or improve a product that has become difficult to use and evolve.": "Cada una responde a una necesidad distinta: decidir qué merece la pena construir, convertir una dirección validada en un producto sólido o recuperar un producto que se ha vuelto difícil de usar y evolucionar.", "Clarify what is worth building": "Decidir qué merece la pena construir", "Turn direction into a real product": "Convertir una dirección en producto", "Make an existing product move again": "Volver a hacer avanzar el producto", "Collaboration format": "Formato de colaboración", "These are the problems we solve. The way we join can adapt.": "Estas son las necesidades que resolvemos. La forma de incorporarnos puede adaptarse.", "We can deliver a focused project or work temporarily inside an existing team when a critical initiative needs extra senior product and engineering capacity. Advisory can support the work, but our default is hands-on contribution.": "Podemos asumir un proyecto acotado o integrarnos temporalmente en un equipo cuando una iniciativa crítica necesita capacidad sénior adicional de producto e ingeniería. El asesoramiento puede formar parte del trabajo, pero nuestra aportación habitual es práctica y orientada a la entrega.", "Focused project": "Proyecto acotado", "Temporary team extension": "Refuerzo temporal del equipo", "Hands-on by default": "Implicación directa en la entrega"},
      pt: {"Product & Engineering Studio": "Estúdio de Produto e Engenharia", "What we solve": "O que resolvemos", "Services": "Serviços", "How we work": "Como trabalhamos", "Profiles": "Perfis", "Discuss a project": "Falar sobre um projeto", "Senior product & engineering duo · Madrid / Europe": "Dupla sénior de produto e engenharia · Madrid / Europa", "Product clarity.": "Clareza de produto.", "Engineering depth.": "Profundidade de engenharia.", "We help teams turn": "Ajudamos equipas a transformar", "complex workflows and technical constraints": "fluxos complexos e restrições técnicas", "into clear, scalable software—from product direction and UX to architecture, implementation and cloud foundations.": "em software claro e escalável — desde a direção de produto e UX até à arquitetura, implementação e bases cloud.", "Discuss your product": "Falar sobre o seu produto", "See how we can help": "Ver como podemos ajudar", "Product direction": "Direção de produto", "Discovery, scope and priorities": "Discovery, âmbito e prioridades", "Experience design": "Design de experiência", "Flows, UI and systems": "Fluxos, interface e sistemas", "Software engineering": "Engenharia de software", "Frontend, backend and APIs": "Frontend, backend e APIs", "Platform foundations": "Bases de plataforma", "Cloud, IaC and automation": "Cloud, IaC e automação", "Product & Experience Lead": "Responsável de Produto e Experiência", "Shapes the right product, simplifies complex workflows and carries decisions from discovery into implementation-ready UX and frontend delivery.": "Dá forma ao produto certo, simplifica fluxos complexos e leva as decisões desde o discovery até uma UX pronta para implementação e entrega frontend.", "Product strategy": "Estratégia de produto", "Engineering & Platform Lead": "Responsável de Engenharia e Plataforma", "Designs reliable systems and technical foundations across software architecture, backend services, cloud platforms, infrastructure and automation.": "Desenha sistemas fiáveis e bases técnicas através de arquitetura de software, serviços backend, plataformas cloud, infraestrutura e automação.", "Architecture": "Arquitetura", "Cloud": "Cloud", "Platform engineering": "Engenharia de plataforma", "Two senior specialists. One accountable product team.": "Dois especialistas sénior. Uma única equipa responsável pelo produto.", "Less context loss between strategy, design and engineering.": "Menos perda de contexto entre estratégia, design e engenharia.", "Best suited to products where complexity is real.": "Especialmente indicados para produtos onde a complexidade é real.", "We focus on software with meaningful workflows, data, integrations, operational rules or legacy constraints—not generic marketing websites.": "Focamo-nos em software com fluxos relevantes, dados, integrações, regras operacionais ou restrições legacy — não em sites de marketing genéricos.", "Complex B2B products that need product and technical thinking together.": "Produtos B2B complexos que precisam de pensamento de produto e técnico em conjunto.", "The strongest fit is where user experience, business logic, architecture and delivery cannot be treated as separate workstreams.": "O melhor encaixe surge quando a experiência do utilizador, a lógica de negócio, a arquitetura e a entrega não podem ser tratadas como frentes separadas.", "Fewer handoffs and clearer product–engineering trade-offs": "Menos passagens de contexto e trade-offs produto–engenharia mais claros", "Buildable UX with states, edge cases and constraints considered": "UX implementável que considera estados, casos limite e restrições", "Technical foundations designed to support future evolution": "Bases técnicas preparadas para evoluir", "Data products & SaaS": "Produtos de dados e SaaS", "Dashboards, datasets, analytics, maps, marketplaces, permissions and self-service workflows.": "Dashboards, datasets, analytics, mapas, marketplaces, permissões e fluxos self-service.", "Operational platforms": "Plataformas operacionais", "Internal products that replace fragmented processes, unclear interfaces and manual decisions.": "Produtos internos que substituem processos fragmentados, interfaces pouco claras e decisões manuais.", "Legacy modernisation": "Modernização de sistemas legacy", "Existing products that need better usability and stronger technical foundations without ignoring reality.": "Produtos existentes que precisam de melhor usabilidade e bases técnicas mais fortes sem ignorar as restrições reais.", "Validated products moving forward": "Produtos validados que precisam de avançar", "From a proven concept or fragile MVP to a maintainable product foundation and clearer delivery path.": "De um conceito comprovado ou MVP frágil para uma base de produto sustentável e um caminho de entrega mais claro.", "Ways to work together": "Formas de trabalhar em conjunto", "Four focused engagement models.": "Quatro modelos de colaboração focados.", "Select a service to see the purpose, typical outputs and the situation where it creates the most value.": "Selecione um serviço para ver o objetivo, entregáveis típicos e a situação em que gera mais valor.", "Definition Sprint": "Sprint de definição", "Clarify before building": "Clarificar antes de construir", "Product Foundation": "Base de produto", "Design and build": "Desenhar e construir", "Rescue & Modernisation": "Resgate e modernização", "Untangle and improve": "Desbloquear e melhorar", "Fractional Leadership": "Liderança fracionada", "Ongoing senior direction": "Direção sénior contínua", "01 · Product Definition Sprint": "01 · Sprint de definição de produto", "Turn ambiguity into a product direction the team can act on.": "Transforme a ambiguidade numa direção de produto sobre a qual a equipa pode agir.", "We connect the business problem, user workflows and technical constraints before the build creates avoidable product or architecture debt.": "Ligamos o problema de negócio, os fluxos dos utilizadores e as restrições técnicas antes que a construção crie dívida evitável de produto ou arquitetura.", "Problem framing": "Definição do problema", "Priority users": "Utilizadores prioritários", "Core workflows": "Fluxos principais", "Prototype": "Protótipo", "Scope": "Âmbito", "Architecture outline": "Esboço de arquitetura", "Best when the problem is real, but the product direction is still unclear.": "Ideal quando o problema é real, mas a direção de produto ainda não está clara.", "Suitable before an MVP, redesign, major feature or technical commitment.": "Adequado antes de um MVP, redesign, funcionalidade importante ou compromisso técnico.", "Connected decisions from problem to operation.": "Decisões ligadas desde o problema até à operação.", "The process adapts to the project, but product and technical decisions remain connected throughout delivery.": "O processo adapta-se ao projeto, mas as decisões de produto e tecnologia mantêm-se ligadas durante toda a entrega.", "Delivery path": "Caminho de entrega", "One shared context": "Um contexto partilhado", "Frame": "Enquadrar", "Problem, users, constraints and outcomes.": "Problema, utilizadores, restrições e resultados.", "Shape": "Dar forma", "Scope, flows and technical options.": "Âmbito, fluxos e opções técnicas.", "Validate": "Validar", "Prototype, feedback and feasibility.": "Protótipo, feedback e viabilidade.", "Build": "Construir", "Experience, software and infrastructure.": "Experiência, software e infraestrutura.", "Evolve": "Evoluir", "Learning, priorities and platform support.": "Aprendizagem, prioridades e suporte de plataforma.", "Clear ownership": "Responsabilidades claras", "Joint decisions, explicit leads": "Decisões conjuntas, responsáveis explícitos", "UX/UI & frontend": "UX/UI e frontend", "Backend & architecture": "Backend e arquitetura", "Cloud & platform": "Cloud e plataforma", "Trade-offs & delivery": "Trade-offs e entrega", "Joint": "Conjunto", "Detailed profiles": "Perfis detalhados", "More context, already open.": "Mais contexto, visível desde o início.", "Both profiles are visible by default, with the most relevant capabilities grouped into clearer, more useful widgets. You can still collapse either card when comparing the two.": "Ambos os perfis aparecem abertos por defeito, com as capacidades mais relevantes agrupadas em widgets mais claros e úteis. Ainda assim, pode fechar cada cartão ao comparar os dois.", "Carolina · Product & Experience": "Carolina · Produto e Experiência", "Turns complex needs into clear product decisions and buildable experiences": "Transforma necessidades complexas em decisões claras e experiências implementáveis", "Product lead": "Liderança de produto", "Product-minded UX/UI and technical profile connecting discovery, product direction, complex interaction design and frontend delivery.": "Perfil técnico e de UX/UI com mentalidade de produto que liga discovery, direção de produto, design de interações complexas e entrega frontend.", "Shape the product": "Dar forma ao produto", "Discovery, roadmap structure, backlog quality and prioritisation.": "Discovery, estrutura de roadmap, qualidade do backlog e priorização.", "Simplify complexity": "Simplificar a complexidade", "B2B SaaS, operational tools, data-heavy workflows and information architecture.": "SaaS B2B, ferramentas operacionais, fluxos intensivos em dados e arquitetura de informação.", "Design for delivery": "Desenhar para implementar", "Design systems, implementation-ready Figma, frontend fluency and acceptance criteria.": "Design systems, Figma pronto para implementação, fluência frontend e critérios de aceitação.", "Core capabilities": "Capacidades principais", "Product discovery": "Discovery de produto", "UX/UI leadership": "Liderança UX/UI", "Design systems": "Design systems", "Frontend delivery": "Entrega frontend", "Stakeholder alignment": "Alinhamento de stakeholders", "Release preparation": "Preparação de releases", "Email Carolina": "Enviar email à Carolina", "Carmelo · Engineering & Platform": "Carmelo · Engenharia e Plataforma", "Turns product requirements into reliable systems and technical foundations": "Transforma requisitos de produto em sistemas fiáveis e bases técnicas", "Engineering lead": "Liderança de engenharia", "Software and platform engineer combining architecture, backend development, cloud operations, infrastructure automation and analytical depth.": "Engenheiro de software e plataforma que combina arquitetura, desenvolvimento backend, operações cloud, automação de infraestrutura e profundidade analítica.", "Architect the system": "Desenhar a arquitetura", "Software architecture, system design, distributed foundations, APIs and data.": "Arquitetura de software, desenho de sistemas, bases distribuídas, APIs e dados.", "Build the platform": "Construir a plataforma", "AWS, Azure, Docker, cloud administration and platform engineering.": "AWS, Azure, Docker, administração cloud e engenharia de plataforma.", "Automate delivery": "Automatizar a entrega", "Terraform, Ansible, Infrastructure as Code and internal engineering solutions.": "Terraform, Ansible, infraestrutura como código e soluções internas de engenharia.", "Software architecture": "Arquitetura de software", "Backend engineering": "Engenharia backend", "Cloud platforms": "Plataformas cloud", "Infrastructure as Code": "Infraestrutura como código", "Automation": "Automação", "Mathematical modelling": "Modelação matemática", "Email Carmelo": "Enviar email ao Carmelo", "What is difficult about your product today?": "O que é difícil no seu produto neste momento?", "Share the current situation, the decision you need to make and where the team is blocked. We will start with the questions that matter most.": "Partilhe a situação atual, a decisão que precisa de tomar e onde a equipa está bloqueada. Começaremos pelas perguntas mais importantes.", "Email the studio": "Enviar email ao estúdio", "Product & Engineering Studio · Madrid, Spain": "Estúdio de Produto e Engenharia · Madrid, Espanha", "Contact": "Contacto", "Three focused product engagements.": "Três propostas para três momentos do produto.", "Each engagement answers a different product moment: decide what is worth building, turn a validated direction into a dependable product, or improve a product that has become difficult to use and evolve.": "Cada uma responde a uma necessidade diferente: decidir o que vale a pena construir, transformar uma direção validada num produto sólido ou recuperar um produto que se tornou difícil de utilizar e evoluir.", "Clarify what is worth building": "Decidir o que vale a pena construir", "Turn direction into a real product": "Transformar uma direção em produto", "Make an existing product move again": "Voltar a fazer o produto avançar", "Collaboration format": "Formato de colaboração", "These are the problems we solve. The way we join can adapt.": "Estas são as necessidades que resolvemos. A forma de nos integrarmos pode adaptar-se.", "We can deliver a focused project or work temporarily inside an existing team when a critical initiative needs extra senior product and engineering capacity. Advisory can support the work, but our default is hands-on contribution.": "Podemos assumir um projeto bem delimitado ou integrar temporariamente uma equipa quando uma iniciativa crítica precisa de capacidade sénior adicional em produto e engenharia. O aconselhamento pode fazer parte do trabalho, mas a nossa contribuição é, por defeito, prática e orientada para a entrega.", "Focused project": "Projeto bem delimitado", "Temporary team extension": "Reforço temporário da equipa", "Hands-on by default": "Envolvimento direto na entrega"}
    };

    
    staticTranslations.es["One connected product team"] = "Un único equipo de producto conectado";
    staticTranslations.pt["One connected product team"] = "Uma única equipa de produto ligada";

    const serviceContent = {"en": {"definition": {"kicker": "01 · Product Definition Sprint", "title": "Turn an ambiguous opportunity into a product direction your team can commit to.", "description": "We connect the business problem, priority users, workflows and technical constraints before design and engineering effort becomes expensive.", "deliverables": ["Problem framing", "Priority users", "Core workflows", "Prototype", "MVP scope", "Architecture outline"], "icon": "travel_explore", "best": "Best when the opportunity is real, but the team is not yet aligned on what to build.", "note": "Useful before an MVP, major feature, redesign or technical commitment."}, "foundation": {"kicker": "02 · Product Foundation", "title": "Turn a validated direction into a product foundation ready for real use.", "description": "We shape the experience and establish the frontend, backend, data and cloud foundations needed to launch, learn and continue building without starting over.", "deliverables": ["UX/UI", "Design system", "Frontend", "Backend services", "APIs & data", "Cloud setup"], "icon": "foundation", "best": "Best when the problem and initial scope are understood, but the product still needs to be designed and built as one coherent system.", "note": "Suitable for new B2B products, internal platforms and validated MVPs that need to mature."}, "rescue": {"kicker": "03 · Product Rescue & Modernisation", "title": "Make an existing product easier to use, change and operate.", "description": "We identify where product complexity, UX debt and technical constraints are blocking progress, then define and deliver a realistic modernisation path.", "deliverables": ["Product & UX audit", "Technical assessment", "Priority map", "Workflow redesign", "Modernisation plan", "Target foundations"], "icon": "sync_alt", "best": "Best when the product works, but users struggle and every change takes the team longer than it should.", "note": "Suitable for legacy systems, growing SaaS products and operational tools."}}, "es": {"definition": {"kicker": "01 · Sprint de definición de producto", "title": "Convertimos una oportunidad todavía difusa en una dirección de producto que el equipo puede defender y ejecutar.", "description": "Alineamos el problema de negocio, los usuarios prioritarios, los flujos y las restricciones técnicas antes de invertir de verdad en diseño y desarrollo.", "deliverables": ["Definición del problema", "Usuarios prioritarios", "Flujos principales", "Prototipo", "Alcance del MVP", "Esquema de arquitectura"], "icon": "travel_explore", "best": "Encaja cuando la oportunidad existe, pero todavía no hay suficiente acuerdo sobre qué construir.", "note": "Útil antes de un MVP, una funcionalidad estratégica, un rediseño o una decisión técnica difícil de revertir."}, "foundation": {"kicker": "02 · Base de producto", "title": "Convertimos una dirección validada en una base de producto preparada para uso real.", "description": "Diseñamos la experiencia y dejamos asentadas las bases de frontend, backend, datos y cloud para lanzar, aprender y seguir evolucionando sin empezar de nuevo.", "deliverables": ["UX/UI", "Sistema de diseño", "Frontend", "Servicios backend", "APIs y datos", "Infraestructura cloud"], "icon": "foundation", "best": "Encaja cuando el problema y el alcance inicial ya se entienden, pero todavía falta construir el producto como un sistema coherente.", "note": "Pensado para nuevos productos B2B, plataformas internas y MVPs validados que necesitan madurar."}, "rescue": {"kicker": "03 · Rescate y modernización de producto", "title": "Hacemos que un producto existente vuelva a ser fácil de usar, cambiar y operar.", "description": "Detectamos dónde la complejidad de producto, la deuda UX y las restricciones técnicas están frenando al equipo, y trazamos una modernización realista.", "deliverables": ["Auditoría de producto y UX", "Evaluación técnica", "Mapa de prioridades", "Rediseño de flujos", "Plan de modernización", "Arquitectura objetivo"], "icon": "sync_alt", "best": "Encaja cuando el producto funciona, pero los usuarios sufren y cada cambio cuesta más de lo razonable.", "note": "Especialmente útil en sistemas legacy, SaaS en crecimiento y herramientas operativas."}}, "pt": {"definition": {"kicker": "01 · Sprint de definição de produto", "title": "Transformamos uma oportunidade ainda pouco definida numa direção de produto que a equipa consegue defender e executar.", "description": "Alinhamos o problema de negócio, os utilizadores prioritários, os fluxos e as restrições técnicas antes de investir a sério em design e desenvolvimento.", "deliverables": ["Definição do problema", "Utilizadores prioritários", "Fluxos principais", "Protótipo", "Âmbito do MVP", "Esboço de arquitetura"], "icon": "travel_explore", "best": "Faz sentido quando a oportunidade existe, mas ainda não há alinhamento suficiente sobre o que construir.", "note": "Útil antes de um MVP, de uma funcionalidade estratégica, de um redesign ou de uma decisão técnica difícil de reverter."}, "foundation": {"kicker": "02 · Base de produto", "title": "Transformamos uma direção validada numa base de produto preparada para utilização real.", "description": "Desenhamos a experiência e estabelecemos as bases de frontend, backend, dados e cloud para lançar, aprender e continuar a evoluir sem recomeçar.", "deliverables": ["UX/UI", "Design system", "Frontend", "Serviços backend", "APIs e dados", "Infraestrutura cloud"], "icon": "foundation", "best": "Faz sentido quando o problema e o âmbito inicial já são claros, mas ainda falta construir o produto como um sistema coerente.", "note": "Adequado para novos produtos B2B, plataformas internas e MVPs validados que precisam de amadurecer."}, "rescue": {"kicker": "03 · Recuperação e modernização de produto", "title": "Fazemos com que um produto existente volte a ser fácil de utilizar, alterar e operar.", "description": "Identificamos onde a complexidade do produto, a dívida de UX e as restrições técnicas estão a bloquear a equipa e definimos um caminho de modernização realista.", "deliverables": ["Auditoria de produto e UX", "Avaliação técnica", "Mapa de prioridades", "Redesign dos fluxos", "Plano de modernização", "Arquitetura-alvo"], "icon": "sync_alt", "best": "Faz sentido quando o produto funciona, mas os utilizadores sentem fricção e cada alteração demora mais do que deveria.", "note": "Especialmente útil em sistemas legacy, SaaS em crescimento e ferramentas operacionais."}}};
    const metaContent = {"en": {"title": "Carolina & Carmelo — Product & Engineering Studio", "description": "Carolina Vasconcelos and Carmelo Alcaraz — a senior product and engineering duo for complex B2B software, data products and operational platforms.", "og": "Product clarity. Engineering depth. One senior build team.", "subject": "Product and engineering project"}, "es": {"title": "Carolina & Carmelo — Estudio de Producto e Ingeniería", "description": "Carolina Vasconcelos y Carmelo Alcaraz: un dúo sénior de producto e ingeniería para software B2B complejo, productos de datos y plataformas operativas.", "og": "Claridad de producto. Profundidad de ingeniería. Un único equipo sénior.", "subject": "Proyecto de producto e ingeniería"}, "pt": {"title": "Carolina & Carmelo — Estúdio de Produto e Engenharia", "description": "Carolina Vasconcelos e Carmelo Alcaraz: uma dupla sénior de produto e engenharia para software B2B complexo, produtos de dados e plataformas operacionais.", "og": "Clareza de produto. Profundidade de engenharia. Uma única equipa sénior.", "subject": "Projeto de produto e engenharia"}};
    const attributeTranslations = {"es": {"Main navigation": "Navegación principal", "Carolina and Carmelo home": "Inicio de Carolina y Carmelo", "Select language": "Seleccionar idioma", "Switch colour theme": "Cambiar tema de color", "Open navigation": "Abrir navegación", "Close navigation": "Cerrar navegación", "The studio team": "El equipo del estudio", "Combined capabilities": "Capacidades combinadas", "Carolina on LinkedIn": "Carolina en LinkedIn", "Carolina portfolio": "Portfolio de Carolina", "Carmelo on LinkedIn": "Carmelo en LinkedIn", "Carmelo portfolio": "Portfolio de Carmelo", "Service options": "Opciones de servicio", "Collaboration formats": "Formatos de colaboración"}, "pt": {"Main navigation": "Navegação principal", "Carolina and Carmelo home": "Início de Carolina e Carmelo", "Select language": "Selecionar idioma", "Switch colour theme": "Alterar tema de cor", "Open navigation": "Abrir navegação", "Close navigation": "Fechar navegação", "The studio team": "A equipa do estúdio", "Combined capabilities": "Capacidades combinadas", "Carolina on LinkedIn": "Carolina no LinkedIn", "Carolina portfolio": "Portfólio da Carolina", "Carmelo on LinkedIn": "Carmelo no LinkedIn", "Carmelo portfolio": "Portfólio do Carmelo", "Service options": "Opções de serviço", "Collaboration formats": "Formatos de colaboração"}};

    
    const profileContent = {"en": {"carolina": {"name": "Carolina Vasconcelos", "role": "Product & Experience Lead", "location": "Madrid · Product, UX and frontend", "headline": "Bridges product direction, complex UX and engineering execution.", "intro": "Carolina is a product-minded UX/UI and technical profile with experience across product ownership, complex B2B SaaS, operational products and frontend delivery.", "paragraphs": ["Her strongest contribution is turning ambiguous business priorities and user needs into focused scope, understandable journeys and buildable product increments. She can move from discovery and roadmap structure into information architecture, interaction models, user stories, acceptance criteria and release preparation without losing the reason the product is being built.", "Because she has led UX/UI and frontend modernisation in constraint-heavy environments, she designs with system states, edge cases, component logic, accessibility and implementation realities in view. This makes her especially valuable in products where dashboards, datasets, maps, filters, alerts and operational workflows must become clear without oversimplifying the system."], "value_title": "Where Carolina creates value", "values": [{"icon": "explore", "title": "Product direction", "copy": "Clarifies the problem, defines focused scope and connects roadmap priorities with user and business value."}, {"icon": "account_tree", "title": "Complex experience design", "copy": "Structures data-heavy and operational workflows into coherent journeys, states and reusable interaction patterns."}, {"icon": "design_services", "title": "Design-to-delivery bridge", "copy": "Carries decisions into Figma, component logic, acceptance criteria, frontend plans, QA and release preparation."}], "evidence_title": "Relevant experience", "evidence": [{"title": "Product Manager / Product Design Owner · Nommon", "copy": "Owns discovery, roadmap structure, backlog quality and UX direction for a multi-product SaaS platform in mobility and data intelligence."}, {"title": "Senior Frontend Developer & UX/UI Lead · Siemens Mobility", "copy": "Led the UX/UI and frontend modernisation of a legacy operational product, balancing usability with architecture, integrations and delivery risk."}, {"title": "UX Advisor · PsyPilot", "copy": "Supports early product decisions, service flows and information architecture for psychologists, clinic teams and patients."}], "capabilities_title": "Core capabilities", "capabilities": ["Product discovery", "Roadmaps & backlog", "UX/UI leadership", "Information architecture", "Design systems", "Complex SaaS workflows", "Frontend delivery", "Acceptance criteria", "Stakeholder alignment"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfolio", "email": "Email Carolina"}, "close": "Close profile"}, "carmelo": {"name": "Carmelo Alcaraz Coy", "role": "Engineering & Platform Lead", "location": "Madrid · Software, cloud and platform", "headline": "Turns product requirements into reliable systems and technical foundations.", "intro": "Carmelo is a software and platform engineer with a dual academic background in Computer Engineering and Mathematics, and a career spanning development, architecture, cloud and infrastructure.", "paragraphs": ["His progression from software engineer to senior software engineer and platform engineer gives him a broad view of how applications are designed, operated and evolved. He can connect backend services, APIs, databases and web applications with the cloud and automation capabilities that development teams need to deliver consistently.", "His mathematical foundation adds structured analytical thinking to architecture and engineering decisions. He is particularly useful where a product needs more than implementation: explicit technical trade-offs, maintainable system design, infrastructure as code, platform capabilities and a foundation that can support long-term change."], "value_title": "Where Carmelo creates value", "values": [{"icon": "schema", "title": "System architecture", "copy": "Designs software structures, services, APIs and data foundations around product needs and technical constraints."}, {"icon": "cloud_sync", "title": "Cloud & platform engineering", "copy": "Connects AWS, Azure, Docker and cloud operations with the capabilities teams need to build and run software."}, {"icon": "automation", "title": "Automation & reliability", "copy": "Uses Terraform, Ansible and Infrastructure as Code to reduce manual work and create repeatable technical foundations."}], "evidence_title": "Relevant experience", "evidence": [{"title": "Platform Engineer · Nommon", "copy": "Designs and operates cloud-based platforms, infrastructure automation and internal engineering solutions that support software teams."}, {"title": "Senior Software Engineer · Nommon", "copy": "Worked across software architecture, system design, web applications, data visualisation and technical leadership within project teams."}, {"title": "Software Engineer · Capgemini", "copy": "Built and maintained enterprise software using established engineering methodologies, with experience in Java and C/C++."}, {"title": "Computer Engineering + Mathematics", "copy": "Combines software engineering with optimisation, statistics, numerical methods, modelling and analytical problem solving."}], "capabilities_title": "Core capabilities", "capabilities": ["Software architecture", "Python", "Java", "C/C++", "REST & GraphQL", "SQL & NoSQL", "AWS & Azure", "Terraform", "Ansible", "Docker", "Platform engineering"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfolio", "email": "Email Carmelo"}, "close": "Close profile"}}, "es": {"carolina": {"name": "Carolina Vasconcelos", "role": "Responsable de Producto y Experiencia", "location": "Madrid · Producto, UX y frontend", "headline": "Conecta la dirección de producto, la UX compleja y la ejecución técnica.", "intro": "Carolina es un perfil técnico y de UX/UI con mentalidad de producto y experiencia en product ownership, SaaS B2B complejo, productos operativos y entrega frontend.", "paragraphs": ["Su principal aportación es convertir prioridades de negocio y necesidades de usuario ambiguas en un alcance enfocado, recorridos comprensibles e incrementos de producto construibles. Puede avanzar desde el discovery y la estructura del roadmap hasta la arquitectura de información, los modelos de interacción, las historias de usuario, los criterios de aceptación y la preparación de releases sin perder de vista por qué se está construyendo el producto.", "Al haber liderado la modernización UX/UI y frontend de productos con muchas restricciones, diseña considerando estados del sistema, casos límite, lógica de componentes, accesibilidad y realidad de implementación. Es especialmente valiosa en productos donde dashboards, datasets, mapas, filtros, alertas y flujos operativos deben volverse claros sin simplificar en exceso el sistema."], "value_title": "Dónde aporta valor Carolina", "values": [{"icon": "explore", "title": "Dirección de producto", "copy": "Aclara el problema, define un alcance enfocado y conecta las prioridades del roadmap con el valor para usuarios y negocio."}, {"icon": "account_tree", "title": "Diseño de experiencias complejas", "copy": "Estructura flujos operativos e intensivos en datos como recorridos, estados y patrones de interacción coherentes."}, {"icon": "design_services", "title": "Puente entre diseño y entrega", "copy": "Lleva las decisiones a Figma, lógica de componentes, criterios de aceptación, planes frontend, QA y preparación de releases."}], "evidence_title": "Experiencia relevante", "evidence": [{"title": "Product Manager / Product Design Owner · Nommon", "copy": "Lidera discovery, estructura de roadmap, calidad del backlog y dirección UX para una plataforma SaaS multiproducto de movilidad e inteligencia de datos."}, {"title": "Senior Frontend Developer & UX/UI Lead · Siemens Mobility", "copy": "Lideró la modernización UX/UI y frontend de un producto operativo legacy, equilibrando usabilidad, arquitectura, integraciones y riesgo de entrega."}, {"title": "UX Advisor · PsyPilot", "copy": "Apoya decisiones iniciales de producto, flujos de servicio y arquitectura de información para psicólogos, clínicas y pacientes."}], "capabilities_title": "Capacidades principales", "capabilities": ["Discovery de producto", "Roadmaps y backlog", "Liderazgo UX/UI", "Arquitectura de información", "Sistemas de diseño", "Flujos SaaS complejos", "Entrega frontend", "Criterios de aceptación", "Alineación de stakeholders"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfolio", "email": "Escribir a Carolina"}, "close": "Cerrar perfil"}, "carmelo": {"name": "Carmelo Alcaraz Coy", "role": "Responsable de Ingeniería y Plataforma", "location": "Madrid · Software, cloud y plataforma", "headline": "Convierte requisitos de producto en sistemas fiables y bases técnicas.", "intro": "Carmelo es ingeniero de software y plataforma con una doble formación en Ingeniería Informática y Matemáticas y una trayectoria que abarca desarrollo, arquitectura, cloud e infraestructura.", "paragraphs": ["Su evolución desde ingeniero de software hasta senior software engineer y platform engineer le aporta una visión amplia de cómo se diseñan, operan y evolucionan las aplicaciones. Puede conectar servicios backend, APIs, bases de datos y aplicaciones web con las capacidades cloud y de automatización que los equipos necesitan para entregar de forma consistente.", "Su base matemática añade pensamiento analítico estructurado a las decisiones de arquitectura e ingeniería. Resulta especialmente útil cuando un producto necesita más que implementación: trade-offs técnicos explícitos, diseño mantenible, infraestructura como código, capacidades de plataforma y una base preparada para el cambio a largo plazo."], "value_title": "Dónde aporta valor Carmelo", "values": [{"icon": "schema", "title": "Arquitectura de sistemas", "copy": "Diseña estructuras de software, servicios, APIs y bases de datos a partir de las necesidades de producto y las restricciones técnicas."}, {"icon": "cloud_sync", "title": "Cloud e ingeniería de plataforma", "copy": "Conecta AWS, Azure, Docker y operaciones cloud con las capacidades que los equipos necesitan para construir y operar software."}, {"icon": "automation", "title": "Automatización y fiabilidad", "copy": "Utiliza Terraform, Ansible e infraestructura como código para reducir trabajo manual y crear bases técnicas repetibles."}], "evidence_title": "Experiencia relevante", "evidence": [{"title": "Platform Engineer · Nommon", "copy": "Diseña y opera plataformas cloud, automatización de infraestructura y soluciones internas que apoyan a los equipos de software."}, {"title": "Senior Software Engineer · Nommon", "copy": "Trabajó en arquitectura de software, diseño de sistemas, aplicaciones web, visualización de datos y liderazgo técnico dentro de equipos de proyecto."}, {"title": "Software Engineer · Capgemini", "copy": "Desarrolló y mantuvo software empresarial con metodologías establecidas y experiencia en Java y C/C++."}, {"title": "Ingeniería Informática + Matemáticas", "copy": "Combina ingeniería de software con optimización, estadística, métodos numéricos, modelización y resolución analítica de problemas."}], "capabilities_title": "Capacidades principales", "capabilities": ["Arquitectura de software", "Python", "Java", "C/C++", "REST y GraphQL", "SQL y NoSQL", "AWS y Azure", "Terraform", "Ansible", "Docker", "Ingeniería de plataforma"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfolio", "email": "Escribir a Carmelo"}, "close": "Cerrar perfil"}}, "pt": {"carolina": {"name": "Carolina Vasconcelos", "role": "Responsável de Produto e Experiência", "location": "Madrid · Produto, UX e frontend", "headline": "Liga direção de produto, UX complexa e execução técnica.", "intro": "Carolina é um perfil técnico e de UX/UI com mentalidade de produto e experiência em product ownership, SaaS B2B complexo, produtos operacionais e entrega frontend.", "paragraphs": ["A sua principal contribuição é transformar prioridades de negócio e necessidades ambíguas dos utilizadores num âmbito focado, percursos compreensíveis e incrementos de produto implementáveis. Consegue avançar desde o discovery e a estrutura do roadmap até à arquitetura de informação, modelos de interação, user stories, critérios de aceitação e preparação de releases sem perder a razão pela qual o produto está a ser construído.", "Por ter liderado modernização UX/UI e frontend em produtos com fortes restrições, desenha considerando estados do sistema, casos limite, lógica de componentes, acessibilidade e realidade de implementação. É especialmente valiosa em produtos onde dashboards, datasets, mapas, filtros, alertas e fluxos operacionais precisam de se tornar claros sem simplificar demasiado o sistema."], "value_title": "Onde Carolina cria valor", "values": [{"icon": "explore", "title": "Direção de produto", "copy": "Clarifica o problema, define um âmbito focado e liga prioridades do roadmap ao valor para utilizadores e negócio."}, {"icon": "account_tree", "title": "Design de experiências complexas", "copy": "Estrutura fluxos operacionais e intensivos em dados em percursos, estados e padrões de interação coerentes."}, {"icon": "design_services", "title": "Ponte entre design e entrega", "copy": "Leva decisões para Figma, lógica de componentes, critérios de aceitação, planos frontend, QA e preparação de releases."}], "evidence_title": "Experiência relevante", "evidence": [{"title": "Product Manager / Product Design Owner · Nommon", "copy": "Lidera discovery, estrutura de roadmap, qualidade do backlog e direção UX para uma plataforma SaaS multiproduto de mobilidade e inteligência de dados."}, {"title": "Senior Frontend Developer & UX/UI Lead · Siemens Mobility", "copy": "Liderou a modernização UX/UI e frontend de um produto operacional legacy, equilibrando usabilidade, arquitetura, integrações e risco de entrega."}, {"title": "UX Advisor · PsyPilot", "copy": "Apoia decisões iniciais de produto, fluxos de serviço e arquitetura de informação para psicólogos, equipas de clínica e pacientes."}], "capabilities_title": "Capacidades principais", "capabilities": ["Discovery de produto", "Roadmaps e backlog", "Liderança UX/UI", "Arquitetura de informação", "Design systems", "Fluxos SaaS complexos", "Entrega frontend", "Critérios de aceitação", "Alinhamento de stakeholders"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfólio", "email": "Enviar email à Carolina"}, "close": "Fechar perfil"}, "carmelo": {"name": "Carmelo Alcaraz Coy", "role": "Responsável de Engenharia e Plataforma", "location": "Madrid · Software, cloud e plataforma", "headline": "Transforma requisitos de produto em sistemas fiáveis e bases técnicas.", "intro": "Carmelo é engenheiro de software e plataforma com uma dupla formação em Engenharia Informática e Matemática e uma carreira que abrange desenvolvimento, arquitetura, cloud e infraestrutura.", "paragraphs": ["A sua progressão de software engineer para senior software engineer e platform engineer dá-lhe uma visão ampla de como as aplicações são desenhadas, operadas e evoluídas. Consegue ligar serviços backend, APIs, bases de dados e aplicações web às capacidades cloud e de automação que as equipas precisam para entregar de forma consistente.", "A base matemática acrescenta pensamento analítico estruturado às decisões de arquitetura e engenharia. É particularmente útil quando um produto precisa de mais do que implementação: trade-offs técnicos explícitos, design sustentável, infraestrutura como código, capacidades de plataforma e uma base preparada para mudança a longo prazo."], "value_title": "Onde Carmelo cria valor", "values": [{"icon": "schema", "title": "Arquitetura de sistemas", "copy": "Desenha estruturas de software, serviços, APIs e bases de dados a partir das necessidades de produto e restrições técnicas."}, {"icon": "cloud_sync", "title": "Cloud e engenharia de plataforma", "copy": "Liga AWS, Azure, Docker e operações cloud às capacidades que as equipas precisam para construir e operar software."}, {"icon": "automation", "title": "Automação e fiabilidade", "copy": "Utiliza Terraform, Ansible e infraestrutura como código para reduzir trabalho manual e criar bases técnicas repetíveis."}], "evidence_title": "Experiência relevante", "evidence": [{"title": "Platform Engineer · Nommon", "copy": "Desenha e opera plataformas cloud, automação de infraestrutura e soluções internas que apoiam as equipas de software."}, {"title": "Senior Software Engineer · Nommon", "copy": "Trabalhou em arquitetura de software, desenho de sistemas, aplicações web, visualização de dados e liderança técnica em equipas de projeto."}, {"title": "Software Engineer · Capgemini", "copy": "Desenvolveu e manteve software empresarial com metodologias estabelecidas e experiência em Java e C/C++."}, {"title": "Engenharia Informática + Matemática", "copy": "Combina engenharia de software com otimização, estatística, métodos numéricos, modelação e resolução analítica de problemas."}], "capabilities_title": "Capacidades principais", "capabilities": ["Arquitetura de software", "Python", "Java", "C/C++", "REST e GraphQL", "SQL e NoSQL", "AWS e Azure", "Terraform", "Ansible", "Docker", "Engenharia de plataforma"], "links": {"linkedin": "LinkedIn", "portfolio": "Portfólio", "email": "Enviar email ao Carmelo"}, "close": "Fechar perfil"}}};
    const profileUi = {"en": {"open": "View full profile", "carolina_aria": "Open Carolina Vasconcelos full profile", "carmelo_aria": "Open Carmelo Alcaraz Coy full profile"}, "es": {"open": "Ver perfil completo", "carolina_aria": "Abrir el perfil completo de Carolina Vasconcelos", "carmelo_aria": "Abrir el perfil completo de Carmelo Alcaraz Coy"}, "pt": {"open": "Ver perfil completo", "carolina_aria": "Abrir o perfil completo da Carolina Vasconcelos", "carmelo_aria": "Abrir o perfil completo do Carmelo Alcaraz Coy"}};
    const profileLinks = {"carolina": {"linkedin": "https://www.linkedin.com/in/carolinavasconceloscastro/", "portfolio": "https://carolinavasconceloscastro.github.io/", "email": "mailto:cavacaaz@gmail.com", "photo": "assets/images/carolina-vasconcelos.jpg", "position": "50% 42%"}, "carmelo": {"linkedin": "https://linkedin.com/in/carmeloalccoy", "portfolio": "https://carmelocoy.github.io/", "email": "mailto:carmeloalcarazcoy@gmail.com", "photo": "assets/images/carmelo-alcaraz.jpg", "position": "50% 50%"}};
    const profileDialog = document.getElementById("profileDialog");
    const profileDialogContent = document.getElementById("profileDialogContent");
    const profileDialogClose = document.getElementById("profileDialogClose");
    const profileCards = [...document.querySelectorAll(".person-card[data-profile]")];
    let activeProfile = null;
    let profileReturnFocus = null;

    let currentLanguage = readStorage("studio-language") || "en";
    let currentService = "definition";

    const themeColourMeta = document.querySelector('meta[name="theme-color"]');
    function syncThemeColour() {
      if (!themeColourMeta) return;
      themeColourMeta.setAttribute("content", root.dataset.theme === "dark" ? "#11131a" : "#ffffff");
    }

    const storedTheme = readStorage("studio-theme");
    if (storedTheme) root.dataset.theme = storedTheme;
    syncThemeColour();

    themeToggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = nextTheme;
      writeStorage("studio-theme", nextTheme);
      syncThemeColour();
    });

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.querySelector("use").setAttribute("href", isOpen ? "#icon-close" : "#icon-menu");
      const key = isOpen ? "Close navigation" : "Open navigation";
      menuToggle.setAttribute(
        "aria-label",
        currentLanguage === "en"
          ? key
          : (attributeTranslations[currentLanguage]?.[key] || key)
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector("use").setAttribute("href", "#icon-menu");
      });
    });

    window.addEventListener("scroll", () => {
      topBar.classList.toggle("scrolled", window.scrollY > 10);
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1050 && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.querySelector("use").setAttribute("href", "#icon-menu");
      }
    }, { passive: true });

    /*
      Capture the original English text once. This keeps icons and HTML structure
      intact while allowing all static copy to switch language.
    */
    const translatableTextNodes = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          if (["SCRIPT", "STYLE", "OPTION"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.classList.contains("material-symbols-rounded")) return NodeFilter.FILTER_REJECT;

          const value = node.nodeValue.trim().replace(/\s+/g, " ");
          return value ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const raw = node.nodeValue;
      const leading = raw.match(/^\s*/)?.[0] || "";
      const trailing = raw.match(/\s*$/)?.[0] || "";
      const english = raw.trim().replace(/\s+/g, " ");
      translatableTextNodes.push({node, english, leading, trailing});
    }

    const attributeTargets = [];
    document.querySelectorAll("[aria-label]").forEach(element => {
      attributeTargets.push({
        element,
        attribute: "aria-label",
        english: element.getAttribute("aria-label")
      });
    });

    function translateStaticCopy(language) {
      translatableTextNodes.forEach(item => {
        const translated = language === "en"
          ? item.english
          : (staticTranslations[language]?.[item.english] || item.english);
        item.node.nodeValue = item.leading + translated + item.trailing;
      });

      attributeTargets.forEach(item => {
        const translated = language === "en"
          ? item.english
          : (attributeTranslations[language]?.[item.english] || item.english);
        item.element.setAttribute(item.attribute, translated);
      });
    }

    function renderService(key) {
      const item = serviceContent[currentLanguage][key];
      detailPanel.innerHTML = `
        <div class="detail-copy">
          <p class="detail-kicker">${item.kicker}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="deliverables">
            ${item.deliverables.map(value => `<span class="deliverable">${value}</span>`).join("")}
          </div>
        </div>
        <aside class="detail-aside">
          <svg class="ui-icon" aria-hidden="true"><use href="#icon-${item.icon}"></use></svg>
          <div>
            <strong>${item.best}</strong>
            <p>${item.note}</p>
          </div>
        </aside>
      `;
    }

    function updateMetadata(language) {
      const meta = metaContent[language];
      document.title = meta.title;
      document.querySelector('meta[name="description"]').setAttribute("content", meta.description);
      document.querySelector('meta[property="og:title"]').setAttribute("content", meta.title);
      document.querySelector('meta[property="og:description"]').setAttribute("content", meta.og);

      const subject = encodeURIComponent(meta.subject);
      document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        const href = link.getAttribute("href");
        const base = href.split("&subject=")[0].split("?subject=")[0];
        const separator = base.includes("?") ? "&" : "?";
        link.setAttribute("href", `${base}${separator}subject=${subject}`);
      });
    }


    function updateProfileCardLabels() {
      const labels = profileUi[currentLanguage];
      document.querySelectorAll(".profile-open-label").forEach(label => {
        label.textContent = labels.open;
      });
      const carolinaCard = document.querySelector('[data-profile="carolina"]');
      const carmeloCard = document.querySelector('[data-profile="carmelo"]');
      if (carolinaCard) carolinaCard.setAttribute("aria-label", labels.carolina_aria);
      if (carmeloCard) carmeloCard.setAttribute("aria-label", labels.carmelo_aria);
    }

    function profileIcon(name) {
      return `<svg class="ui-icon" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
    }

    function renderProfileModal(key) {
      const item = profileContent[currentLanguage][key];
      const links = profileLinks[key];
      const isEngineering = key === "carmelo";

      profileDialogContent.innerHTML = `
        <article class="profile-modal-layout">
          <header class="profile-modal-hero ${isEngineering ? "engineering" : ""}">
            <div class="profile-modal-hero-copy">
              <span class="profile-modal-location">${item.location}</span>
              <h2 id="profileDialogTitle">${item.name}</h2>
              <p class="profile-modal-role">${item.role}</p>
              <h3 class="profile-modal-headline">${item.headline}</h3>
              <p class="profile-modal-intro">${item.intro}</p>
            </div>

            <figure class="profile-modal-photo-card">
              <img
                class="profile-modal-photo"
                src="${links.photo}"
                alt="${item.name}"
                style="object-position:${links.position}">
            </figure>
          </header>

          <div class="profile-modal-content ${isEngineering ? "engineering" : ""}">
            <div class="profile-modal-narrative">
              ${item.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
            </div>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.value_title}</h4>
              <div class="profile-value-grid">
                ${item.values.map(value => `
                  <article class="profile-value-card">
                    <span class="profile-value-icon">${profileIcon(value.icon)}</span>
                    <div>
                      <h4>${value.title}</h4>
                      <p>${value.copy}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.evidence_title}</h4>
              <div class="profile-evidence-list">
                ${item.evidence.map(evidence => `
                  <article class="profile-evidence-item">
                    <span class="profile-evidence-dot" aria-hidden="true"></span>
                    <div>
                      <strong>${evidence.title}</strong>
                      <p>${evidence.copy}</p>
                    </div>
                  </article>
                `).join("")}
              </div>
            </section>

            <section class="profile-modal-section">
              <h4 class="profile-modal-section-title">${item.capabilities_title}</h4>
              <div class="profile-capability-list">
                ${item.capabilities.map(capability => `<span class="profile-capability">${capability}</span>`).join("")}
              </div>
            </section>

            <div class="profile-modal-actions">
              <a class="button outlined small" href="${links.linkedin}" target="_blank" rel="noreferrer">
                ${item.links.linkedin}
              </a>
              <a class="button outlined small" href="${links.portfolio}" target="_blank" rel="noreferrer">
                ${item.links.portfolio}
              </a>
              <a class="button tonal small" href="${links.email}">
                ${item.links.email}
              </a>
            </div>
          </div>
        </article>
      `;

      profileDialogClose.setAttribute("aria-label", item.close);
    }

    function openProfileDialog(key, sourceElement) {
      activeProfile = key;
      profileReturnFocus = sourceElement || document.activeElement;
      renderProfileModal(key);
      profileDialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => profileDialogClose.focus());
    }

    function closeProfileDialog() {
      if (profileDialog.open) profileDialog.close();
    }

    profileCards.forEach(card => {
      card.addEventListener("click", event => {
        if (event.target.closest("a,button")) return;
        openProfileDialog(card.dataset.profile, card);
      });

      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          if (event.target.closest("a,button")) return;
          event.preventDefault();
          openProfileDialog(card.dataset.profile, card);
        }
      });
    });

    profileDialogClose.addEventListener("click", closeProfileDialog);

    profileDialog.addEventListener("click", event => {
      if (event.target === profileDialog) closeProfileDialog();
    });

    profileDialog.addEventListener("close", () => {
      document.body.style.overflow = "";
      activeProfile = null;
      profileReturnFocus?.focus();
    });

    function applyLanguage(language) {
      currentLanguage = ["en", "es", "pt"].includes(language) ? language : "en";
      root.lang = currentLanguage;
      languageCurrent.textContent = languageNames[currentLanguage];
      languageOptionButtons.forEach(option => {
        const selected = option.dataset.lang === currentLanguage;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-selected", String(selected));
      });

      translateStaticCopy(currentLanguage);
      renderService(currentService);
      updateMetadata(currentLanguage);
      updateProfileCardLabels();
      if (activeProfile && profileDialog.open) renderProfileModal(activeProfile);

      writeStorage("studio-language", currentLanguage);
    }

    function setLanguageMenu(open) {
      languageMenu.classList.toggle("open", open);
      languageOptions.hidden = !open;
      languageTrigger.setAttribute("aria-expanded", String(open));
      languageTrigger.querySelector(".language-chevron").classList.toggle("rotated", open);
    }

    function focusLanguageOption(direction = 1) {
      const currentIndex = languageOptionButtons.findIndex(option => option === document.activeElement);
      const selectedIndex = languageOptionButtons.findIndex(option => option.classList.contains("selected"));
      const baseIndex = currentIndex >= 0 ? currentIndex : selectedIndex;
      const nextIndex = (baseIndex + direction + languageOptionButtons.length) % languageOptionButtons.length;
      languageOptionButtons[nextIndex].focus();
    }

    languageTrigger.addEventListener("click", () => {
      const willOpen = !languageMenu.classList.contains("open");
      setLanguageMenu(willOpen);
      if (willOpen) {
        const selected = languageOptionButtons.find(option => option.classList.contains("selected"));
        selected?.focus();
      }
    });

    languageTrigger.addEventListener("keydown", event => {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setLanguageMenu(true);
        const selected = languageOptionButtons.find(option => option.classList.contains("selected"));
        selected?.focus();
      }
    });

    languageOptionButtons.forEach(option => {
      option.addEventListener("click", () => {
        applyLanguage(option.dataset.lang);
        setLanguageMenu(false);
        languageTrigger.focus();
      });

      option.addEventListener("keydown", event => {
        if (event.key === "ArrowDown") {
          event.preventDefault();
          focusLanguageOption(1);
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          focusLanguageOption(-1);
        } else if (event.key === "Escape") {
          event.preventDefault();
          setLanguageMenu(false);
          languageTrigger.focus();
        } else if (event.key === "Home") {
          event.preventDefault();
          languageOptionButtons[0].focus();
        } else if (event.key === "End") {
          event.preventDefault();
          languageOptionButtons[languageOptionButtons.length - 1].focus();
        }
      });
    });

    document.addEventListener("click", event => {
      if (!languageMenu.contains(event.target)) setLanguageMenu(false);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && languageMenu.classList.contains("open")) {
        setLanguageMenu(false);
        languageTrigger.focus();
      }
    });

    function activateServiceTab(button, moveFocus = false) {
      tabButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-selected", String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      currentService = button.dataset.service;
      detailPanel.setAttribute("aria-labelledby", button.id);
      renderService(currentService);
      if (moveFocus) button.focus();
    }

    tabButtons.forEach((button, index) => {
      button.addEventListener("click", () => activateServiceTab(button));
      button.addEventListener("keydown", event => {
        let nextIndex = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabButtons.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabButtons.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          activateServiceTab(tabButtons[nextIndex], true);
        }
      });
    });

    const revealElements = [...document.querySelectorAll(".reveal")];
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: .1 });
      revealElements.forEach(element => revealObserver.observe(element));
    } else {
      revealElements.forEach(element => element.classList.add("visible"));
    }
    document.getElementById("year").textContent = new Date().getFullYear();

    /*
      English is the clean default on a new visit. Once a visitor selects another
      language, that preference is retained for later navigation.
    */
    applyLanguage(currentLanguage);
})();
