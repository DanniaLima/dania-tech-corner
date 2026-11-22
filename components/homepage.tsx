"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Braces,
  Check,
  Code2,
  Command,
  Cpu,
  Layers3,
  Leaf,
  Menu,
  Moon,
  Palette,
  Search,
  Sparkles,
  Sun,
  WandSparkles,
  X,
} from "lucide-react";
import { MatrixBackground } from "./MatrixBackground"; // Importando o efeito

type Theme = "light" | "dark" | "system";

const categories = [
  {
    name: "Developer Lab",
    detail: "Linguagens, frameworks e ferramentas para quem constrói.",
    icon: Code2,
    count: "08 ferramentas",
    tone: "blue",
  },
  {
    name: "AI Universe",
    detail: "Inteligência artificial aplicada à criação e produtividade.",
    icon: Sparkles,
    count: "07 ferramentas",
    tone: "violet",
  },
  {
    name: "Creative Studio",
    detail: "Design, vídeo e novas formas de expressão digital.",
    icon: Palette,
    count: "06 ferramentas",
    tone: "pink",
  },
  {
    name: "Web & Infrastructure",
    detail: "A infraestrutura que mantém a web em movimento.",
    icon: Layers3,
    count: "04 ferramentas",
    tone: "cyan",
  },
  {
    name: "WordPress Hub",
    detail: "O universo de criação e publicação com WordPress.",
    icon: Command,
    count: "01 ferramenta",
    tone: "blue",
  },
  {
    name: "Learn & Play",
    detail: "Aprender tecnologia também pode ser divertido.",
    icon: Atom,
    count: "01 ferramenta",
    tone: "amber",
  },
];

const tools = [
  {
    name: "IntelliJ IDEA",
    type: "IDE",
    category: "Developer Lab",
    color: "intellij",
    mark: "IJ",
    status: "Em uso",
    description:
      "Ambiente de desenvolvimento integrado para Java e outras linguagens.",
  },
  {
    name: "Spring Boot",
    type: "Framework",
    category: "Developer Lab",
    color: "spring",
    mark: "S",
    status: "Em uso",
    description: "Framework para criar aplicações Java prontas para produção.",
  },
  {
    name: "Bolt.new",
    type: "AI builder",
    category: "AI Universe",
    color: "bolt",
    mark: "ϟ",
    status: "Testado",
    description:
      "Crie e execute aplicações web a partir de instruções em linguagem natural.",
  },
  {
    name: "Lovable",
    type: "AI builder",
    category: "AI Universe",
    color: "lovable",
    mark: "L",
    status: "Testado",
    description: "Transforma ideias em aplicações web com ajuda de IA.",
  },
  {
    name: "Midjourney",
    type: "Imagem",
    category: "Creative Studio",
    color: "midjourney",
    mark: "M",
    status: "Testado",
    description:
      "Ferramenta de geração de imagens por inteligência artificial.",
  },
  {
    name: "Vercel",
    type: "Plataforma",
    category: "Web & Infrastructure",
    color: "vercel",
    mark: "▲",
    status: "Em uso",
    description: "Plataforma para criar, publicar e escalar aplicações web.",
  },
  {
    name: "Supabase",
    type: "Backend",
    category: "Web & Infrastructure",
    color: "supabase",
    mark: "S",
    status: "Testado",
    description: "Plataforma de desenvolvimento com banco de dados Postgres.",
  },
  {
    name: "Canva",
    type: "Design",
    category: "Creative Studio",
    color: "canva",
    mark: "C",
    status: "Testado",
    description: "Plataforma de design para criar conteúdos visuais.",
  },
  {
    name: "WordPress",
    type: "Publicação web",
    category: "WordPress Hub",
    color: "wordpress",
    mark: "W",
    status: "Em pesquisa",
    description: "Plataforma de publicação para sites e experiências digitais.",
  },
  {
    name: "Flexbox Froggy",
    type: "Aprendizado",
    category: "Learn & Play",
    color: "froggy",
    mark: "F",
    status: "Testado",
    description: "Jogo interativo para aprender CSS Flexbox.",
  },
  {
    name: "Runway",
    type: "Vídeo",
    category: "Creative Studio",
    color: "runway",
    mark: "R",
    status: "Testado",
    description: "Ferramentas criativas para geração e edição de vídeo.",
  },
  {
    name: "Netlify",
    type: "Plataforma",
    category: "Web & Infrastructure",
    color: "netlify",
    mark: "N",
    status: "Em pesquisa",
    description: "Plataforma para construir e publicar experiências web.",
  },
];

function Typewriter() {
  const fullText = "Explore o futuro.\nConstrua o que\nvem.";
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const typingSpeed = 40;
  const deletingSpeed = 20;
  const pause = 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleType = () => {
      if (!isDeleting && currentIndex === fullText.length) {
        timeout = setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        timeout = setTimeout(() => {}, 500);
      } else {
        const nextIndex = isDeleting ? currentIndex - 1 : currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentText(fullText.substring(0, nextIndex));
        timeout = setTimeout(
          handleType,
          isDeleting ? deletingSpeed : typingSpeed,
        );
      }
    };

    timeout = setTimeout(handleType, 100);
    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting]);

  const lines = currentText.split("\n");

  return (
    <span className="relative block">
      <span className="invisible flex flex-col pointer-events-none">
        <span className="text-foreground">Explore o futuro.</span>
        <span className="highlight">Construa o que</span>
        <span className="highlight">vem.</span>
      </span>

      <span className="absolute inset-0 flex flex-col">
        {lines.map((line, index) => {
          const isLastLine = index === lines.length - 1;

          return (
            <span
              key={index}
              className={`${index === 0 ? "text-foreground" : "highlight"} whitespace-pre-wrap`}
            >
              {line}
              {isLastLine && (
                <span className="inline-block w-[4px] h-[1em] bg-[#4f7cff] ml-1 animate-pulse align-middle" />
              )}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ThemeControl({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}) {
  return (
    <div
      className="flex items-center bg-foreground/5 rounded-full p-1 border border-border"
      aria-label="Selecionar tema"
    >
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all duration-300 ${theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Tema Claro"
        title="Claro"
      >
        <Sun size={15} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all duration-300 ${theme === "system" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Tema do Sistema"
        title="Sistema"
      >
        <Cpu size={15} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all duration-300 ${theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
        aria-label="Tema Escuro"
        title="Escuro"
      >
        <Moon size={15} />
      </button>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <article className="tool-card">
      <div className="tool-card-top">
        <div className={`tool-mark ${tool.color}`}>{tool.mark}</div>
        <span className="tool-type">{tool.type}</span>
      </div>
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <div className="tool-card-bottom">
        <span className="tool-category">{tool.category}</span>
        <span
          className={`status status-${tool.status === "Em uso" ? "active" : tool.status === "Testado" ? "tested" : "research"}`}
        >
          <span />
          {tool.status}
        </span>
      </div>
    </article>
  );
}

export function HomePage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("dtc-theme") as Theme | null;
    if (saved === "light" || saved === "dark" || saved === "system")
      setTheme(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dtc-theme", theme);
    const dark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [theme]);

  const results = useMemo(
    () =>
      tools.filter((tool) =>
        `${tool.name} ${tool.type} ${tool.category} ${tool.description}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <main>
      <header className="site-header">
        <div className="nav-shell">
          <Link
            href="#home"
            className="brand group flex items-center gap-3"
            aria-label="Dannia Tech Corner — início"
          >
            <div className="scale-[1.3] origin-left transition-transform group-hover:scale-[1.35] mr-1">
              <span className="brand-symbol">
                <span />
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[18px] font-extrabold text-foreground leading-none tracking-tight">
                Dannia<span className="text-[#38bdf8]">.</span>
              </span>
              <span className="text-[10px] font-bold leading-none uppercase tracking-widest mt-1">
                <span className="text-[#4f7cff]">Tech</span>{" "}
                <span className="text-foreground/60">Corner</span>
              </span>
            </div>
          </Link>

          <button
            className="mobile-menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <nav
            className={menuOpen ? "main-nav open" : "main-nav"}
            aria-label="Navegação principal"
          >
            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="nav-active"
            >
              Início
            </a>
            <a href="#categories" onClick={() => setMenuOpen(false)}>
              Categorias
            </a>
            <a href="#discoveries" onClick={() => setMenuOpen(false)}>
              Descobertas
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Sobre
            </a>
            <a
              href="https://dania-landing-page.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors"
            >
              <Leaf size={14} />
              Benessere
              <ArrowUpRight size={12} className="opacity-70" />
            </a>
          </nav>

          <div className="nav-actions">
            <ThemeControl theme={theme} setTheme={setTheme} />
            <a className="nav-cta" href="#discoveries">
              Explorar ferramentas <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      <section className="hero relative" id="home">
        {/* O EFEITO MATRIX ENTRA AQUI */}
        <MatrixBackground theme={theme} />

        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner relative z-10">
          {" "}
          {/* z-10 garante que o texto fica na frente */}
          <div className="hero-copy">
            <div className="eyebrow animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <span className="eyebrow-dot" /> UM LABORATÓRIO DE DESCOBERTAS
              DIGITAIS
            </div>

            <h1 className="animate-in fade-in duration-700 delay-200">
              <Typewriter />
            </h1>

            <p className="hero-description animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
              Um espaço para explorar tecnologias, conhecer ferramentas e
              encontrar inspiração para o próximo projeto.
            </p>
            <form
              className="hero-search animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400"
              onSubmit={(event) => {
                event.preventDefault();
                document
                  .getElementById("discoveries")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Search size={18} aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque ferramentas, ideias, tecnologias..."
                aria-label="Buscar no catálogo de ferramentas"
              />
              <kbd>↵</kbd>
              <button type="submit" aria-label="Buscar">
                <ArrowRight size={17} />
              </button>
            </form>
            <div className="hero-note animate-in fade-in duration-1000 delay-500">
              <span className="note-avatars">
                <i>D</i>
                <i>T</i>
                <i>C</i>
              </span>
              <span>Curadoria independente, feita com curiosidade.</span>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="Ilustração abstrata de um laboratório digital"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two animate-spin-slow" />
            <div className="orbit orbit-three" />
            <div className="art-center animate-pulse-glow">
              <div className="center-grid" />
              <Braces size={42} strokeWidth={1.4} />
              <span className="center-label">
                DIGITAL
                <br />
                LAB
              </span>
            </div>
            <div className="orbit-node node-one animate-float">
              <Code2 size={17} />
            </div>
            <div className="orbit-node node-two animate-float-delayed">
              <Sparkles size={18} />
            </div>
            <div className="orbit-node node-three animate-float">
              <Layers3 size={17} />
            </div>
            <div className="orbit-node node-four animate-float-delayed">
              <WandSparkles size={17} />
            </div>
            <span className="art-coordinate coordinate-one">
              42° 21&apos; 07.2&quot; N
            </span>
            <span className="art-coordinate coordinate-two">
              DIGITAL FRONTIER / 001
            </span>
            <span className="art-cross cross-one">+</span>
            <span className="art-cross cross-two">+</span>
          </div>
        </div>
        <a
          href="#categories"
          className="scroll-cue animate-in fade-in duration-1000 delay-700"
        >
          <span>DESCUBRA</span>
          <ArrowDown size={13} />
        </a>
      </section>

      <section className="section categories-section" id="categories">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="section-kicker">MAPA DE EXPLORAÇÃO</span>
              <h2>Um universo de possibilidades.</h2>
              <p>Encontre seu próximo ponto de partida.</p>
            </div>
            <a className="text-link" href="#discoveries">
              Ver todas as ferramentas <ArrowRight size={15} />
            </a>
          </div>
        </Reveal>
        <div className="category-grid">
          {categories.map(
            ({ name, detail, icon: Icon, count, tone }, index) => (
              <Reveal key={name} delay={index * 100}>
                <a className="category-card h-full block" href="#discoveries">
                  <div className={`category-icon ${tone}`}>
                    <Icon size={19} strokeWidth={1.7} />
                  </div>
                  <span className="category-index">0{index + 1}</span>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                  <div className="category-footer">
                    <span>{count}</span>
                    <ArrowUpRight size={15} />
                  </div>
                </a>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <section className="section discoveries-section" id="discoveries">
        <Reveal>
          <div className="section-heading">
            <div>
              <span className="section-kicker">CURIOSIDADE EM AÇÃO</span>
              <h2>
                {query ? "Resultados da busca." : "Descobertas recentes."}
              </h2>
              <p>
                {query
                  ? `${results.length} ${results.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"} para “${query}”`
                  : "Ferramentas e tecnologias no nosso radar."}
              </p>
            </div>
            <span className="catalog-count">
              <span className="live-dot" />{" "}
              {tools.length.toString().padStart(2, "0")} FERRAMENTAS NO CATÁLOGO
            </span>
          </div>
        </Reveal>

        {results.length > 0 ? (
          <div className="tool-grid">
            {results.slice(0, 6).map((tool, index) => (
              <Reveal key={tool.name} delay={index * 100}>
                <ToolCard tool={tool} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={22} />
            <p>Nenhuma ferramenta encontrada. Tente outro termo.</p>
          </div>
        )}
        <Reveal>
          <div className="catalog-footnote">
            <span>
              <Check size={14} /> Conteúdo em curadoria contínua
            </span>
            <span>
              As classificações refletem o estágio da nossa exploração.
            </span>
          </div>
        </Reveal>
      </section>

      <section className="manifesto" id="about">
        <Reveal>
          <div className="manifesto-inner">
            <div className="manifesto-symbol">
              <Sparkles size={21} />
            </div>
            <div>
              <span className="section-kicker">A IDEIA POR TRÁS DO LAB</span>
              <h2>
                Tecnologia não é só o que existe.
                <br />
                <span>É o que você pode criar com ela.</span>
              </h2>
              <p>
                Dannia Tech Corner é um espaço independente para descobrir,
                experimentar e aprender sobre as ferramentas que estão moldando
                o mundo digital.
              </p>
            </div>
            <a
              href="#home"
              className="manifesto-link"
              aria-label="Voltar ao início"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer">
        <div className="footer-main">
          <Link
            href="#home"
            className="brand group flex items-center gap-3"
            aria-label="Dannia Tech Corner — início"
          >
            <div className="scale-[1.3] origin-left transition-transform group-hover:scale-[1.35] mr-1">
              <span className="brand-symbol">
                <span />
                <span />
                <span />
                <span />
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[18px] font-extrabold text-foreground leading-none tracking-tight">
                Dannia<span className="text-[#38bdf8]">.</span>
              </span>
              <span className="text-[10px] font-bold leading-none uppercase tracking-widest mt-1">
                <span className="text-[#4f7cff]">Tech</span>{" "}
                <span className="text-foreground/60">Corner</span>
              </span>
            </div>
          </Link>
          <p>Explore. Learn. Build.</p>
          <div className="footer-links">
            <a href="#categories">Categorias</a>
            <a href="#discoveries">Descobertas</a>
            <a href="#about">Sobre o projeto</a>
            <a
              href="https://dania-landing-page.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#38bdf8] hover:text-[#38bdf8]/80"
            >
              Benessere <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Dannia Tech Corner</span>
          <span>
            Desenvolvido por{" "}
            <strong className="text-foreground">Dannia Lima</strong> com
            curiosidade <span className="footer-heart">✳</span>
          </span>
          <a href="#home">Voltar ao topo ↑</a>
        </div>
      </footer>
    </main>
  );
}
