'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Atom, Braces, Check, ChevronDown, Code2, Command, Cpu, Layers3, Menu, Moon, Palette, Search, Sparkles, Sun, WandSparkles, X } from 'lucide-react'

type Theme = 'light' | 'dark' | 'system'

const categories = [
  { name: 'Developer Lab', detail: 'Linguagens, frameworks e ferramentas para quem constrói.', icon: Code2, count: '08 ferramentas', tone: 'blue' },
  { name: 'AI Universe', detail: 'Inteligência artificial aplicada à criação e produtividade.', icon: Sparkles, count: '07 ferramentas', tone: 'violet' },
  { name: 'Creative Studio', detail: 'Design, vídeo e novas formas de expressão digital.', icon: Palette, count: '06 ferramentas', tone: 'pink' },
  { name: 'Web & Infrastructure', detail: 'A infraestrutura que mantém a web em movimento.', icon: Layers3, count: '04 ferramentas', tone: 'cyan' },
  { name: 'WordPress Hub', detail: 'O universo de criação e publicação com WordPress.', icon: Command, count: '01 ferramenta', tone: 'blue' },
  { name: 'Learn & Play', detail: 'Aprender tecnologia também pode ser divertido.', icon: Atom, count: '01 ferramenta', tone: 'amber' },
]

const tools = [
  { name: 'IntelliJ IDEA', type: 'IDE', category: 'Developer Lab', color: 'intellij', mark: 'IJ', status: 'Em uso', description: 'Ambiente de desenvolvimento integrado para Java e outras linguagens.' },
  { name: 'Spring Boot', type: 'Framework', category: 'Developer Lab', color: 'spring', mark: 'S', status: 'Em uso', description: 'Framework para criar aplicações Java prontas para produção.' },
  { name: 'Bolt.new', type: 'AI builder', category: 'AI Universe', color: 'bolt', mark: 'ϟ', status: 'Testado', description: 'Crie e execute aplicações web a partir de instruções em linguagem natural.' },
  { name: 'Lovable', type: 'AI builder', category: 'AI Universe', color: 'lovable', mark: 'L', status: 'Testado', description: 'Transforma ideias em aplicações web com ajuda de IA.' },
  { name: 'Midjourney', type: 'Imagem', category: 'Creative Studio', color: 'midjourney', mark: 'M', status: 'Testado', description: 'Ferramenta de geração de imagens por inteligência artificial.' },
  { name: 'Vercel', type: 'Plataforma', category: 'Web & Infrastructure', color: 'vercel', mark: '▲', status: 'Em uso', description: 'Plataforma para criar, publicar e escalar aplicações web.' },
  { name: 'Supabase', type: 'Backend', category: 'Web & Infrastructure', color: 'supabase', mark: 'S', status: 'Testado', description: 'Plataforma de desenvolvimento com banco de dados Postgres.' },
  { name: 'Canva', type: 'Design', category: 'Creative Studio', color: 'canva', mark: 'C', status: 'Testado', description: 'Plataforma de design para criar conteúdos visuais.' },
  { name: 'WordPress', type: 'Publicação web', category: 'WordPress Hub', color: 'wordpress', mark: 'W', status: 'Em pesquisa', description: 'Plataforma de publicação para sites e experiências digitais.' },
  { name: 'Flexbox Froggy', type: 'Aprendizado', category: 'Learn & Play', color: 'froggy', mark: 'F', status: 'Testado', description: 'Jogo interativo para aprender CSS Flexbox.' },
  { name: 'Runway', type: 'Vídeo', category: 'Creative Studio', color: 'runway', mark: 'R', status: 'Testado', description: 'Ferramentas criativas para geração e edição de vídeo.' },
  { name: 'Netlify', type: 'Plataforma', category: 'Web & Infrastructure', color: 'netlify', mark: 'N', status: 'Em pesquisa', description: 'Plataforma para construir e publicar experiências web.' },
]

function ThemeControl({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Cpu
  return (
    <label className="theme-control" aria-label="Selecionar tema">
      <Icon size={15} aria-hidden="true" />
      <select value={theme} onChange={(event) => setTheme(event.target.value as Theme)} aria-label="Tema da aparência">
        <option value="system">Sistema</option><option value="light">Claro</option><option value="dark">Escuro</option>
      </select>
      <ChevronDown size={13} aria-hidden="true" />
    </label>
  )
}

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <article className="tool-card">
      <div className="tool-card-top"><div className={`tool-mark ${tool.color}`}>{tool.mark}</div><span className="tool-type">{tool.type}</span></div>
      <h3>{tool.name}</h3><p>{tool.description}</p>
      <div className="tool-card-bottom"><span className="tool-category">{tool.category}</span><span className={`status status-${tool.status === 'Em uso' ? 'active' : tool.status === 'Testado' ? 'tested' : 'research'}`}><span />{tool.status}</span></div>
    </article>
  )
}

export function HomePage() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('dtc-theme') as Theme | null
    if (saved === 'light' || saved === 'dark' || saved === 'system') setTheme(saved)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('dtc-theme', theme)
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [theme])

  const results = useMemo(() => tools.filter((tool) => `${tool.name} ${tool.type} ${tool.category} ${tool.description}`.toLowerCase().includes(query.toLowerCase())), [query])

  return (
    <main>
      <header className="site-header">
        <div className="nav-shell">
          <Link href="#home" className="brand" aria-label="Dania Tech Corner — início"><span className="brand-symbol"><span /><span /><span /><span /></span><span className="brand-name">dania<span>tech</span><b>corner</b></span></Link>
          <button className="mobile-menu-button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Navegação principal">
            <a href="#home" onClick={() => setMenuOpen(false)} className="nav-active">Início</a><a href="#categories" onClick={() => setMenuOpen(false)}>Categorias</a><a href="#discoveries" onClick={() => setMenuOpen(false)}>Descobertas</a><a href="#about" onClick={() => setMenuOpen(false)}>Sobre</a>
          </nav>
          <div className="nav-actions"><ThemeControl theme={theme} setTheme={setTheme} /><a className="nav-cta" href="#discoveries">Explorar ferramentas <ArrowUpRight size={14} /></a></div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> UM LABORATÓRIO DE DESCOBERTAS DIGITAIS</div><h1>Explore o futuro.<br /><span>Construa o que vem.</span></h1><p className="hero-description">Um espaço para explorar tecnologias, conhecer ferramentas e encontrar inspiração para o próximo projeto.</p>
            <form className="hero-search" onSubmit={(event) => { event.preventDefault(); document.getElementById('discoveries')?.scrollIntoView({ behavior: 'smooth' }) }}><Search size={18} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque ferramentas, ideias, tecnologias..." aria-label="Buscar no catálogo de ferramentas" /><kbd>↵</kbd><button type="submit" aria-label="Buscar"><ArrowRight size={17} /></button></form>
            <div className="hero-note"><span className="note-avatars"><i>D</i><i>T</i><i>C</i></span><span>Curadoria independente, feita com curiosidade.</span></div>
          </div>
          <div className="hero-art" aria-label="Ilustração abstrata de um laboratório digital"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="art-center"><div className="center-grid"/><Braces size={42} strokeWidth={1.4}/><span className="center-label">DIGITAL<br/>LAB</span></div><div className="orbit-node node-one"><Code2 size={17}/></div><div className="orbit-node node-two"><Sparkles size={18}/></div><div className="orbit-node node-three"><Layers3 size={17}/></div><div className="orbit-node node-four"><WandSparkles size={17}/></div><span className="art-coordinate coordinate-one">42° 21&apos; 07.2&quot; N</span><span className="art-coordinate coordinate-two">DIGITAL FRONTIER / 001</span><span className="art-cross cross-one">+</span><span className="art-cross cross-two">+</span></div>
        </div>
        <a href="#categories" className="scroll-cue"><span>DESCUBRA</span><ArrowDown size={13}/></a>
      </section>

      <section className="section categories-section" id="categories"><div className="section-heading"><div><span className="section-kicker">MAPA DE EXPLORAÇÃO</span><h2>Um universo de possibilidades.</h2><p>Encontre seu próximo ponto de partida.</p></div><a className="text-link" href="#discoveries">Ver todas as ferramentas <ArrowRight size={15}/></a></div>
        <div className="category-grid">{categories.map(({ name, detail, icon: Icon, count, tone }, index) => <a className="category-card" href="#discoveries" key={name}><div className={`category-icon ${tone}`}><Icon size={19} strokeWidth={1.7}/></div><span className="category-index">0{index + 1}</span><h3>{name}</h3><p>{detail}</p><div className="category-footer"><span>{count}</span><ArrowUpRight size={15}/></div></a>)}</div>
      </section>

      <section className="section discoveries-section" id="discoveries"><div className="section-heading"><div><span className="section-kicker">CURIOSIDADE EM AÇÃO</span><h2>{query ? 'Resultados da busca.' : 'Descobertas recentes.'}</h2><p>{query ? `${results.length} ${results.length === 1 ? 'ferramenta encontrada' : 'ferramentas encontradas'} para “${query}”` : 'Ferramentas e tecnologias no nosso radar.'}</p></div><span className="catalog-count"><span className="live-dot"/> {tools.length.toString().padStart(2, '0')} FERRAMENTAS NO CATÁLOGO</span></div>
        {results.length > 0 ? <div className="tool-grid">{results.slice(0, 6).map((tool) => <ToolCard key={tool.name} tool={tool}/>)}</div> : <div className="empty-state"><Search size={22}/><p>Nenhuma ferramenta encontrada. Tente outro termo.</p></div>}
        <div className="catalog-footnote"><span><Check size={14}/> Conteúdo em curadoria contínua</span><span>As classificações refletem o estágio da nossa exploração.</span></div>
      </section>

      <section className="manifesto" id="about"><div className="manifesto-inner"><div className="manifesto-symbol"><Sparkles size={21}/></div><div><span className="section-kicker">A IDEIA POR TRÁS DO LAB</span><h2>Tecnologia não é só o que existe.<br/><span>É o que você pode criar com ela.</span></h2><p>Dania Tech Corner é um espaço independente para descobrir, experimentar e aprender sobre as ferramentas que estão moldando o mundo digital.</p></div><a href="#home" className="manifesto-link" aria-label="Voltar ao início"><ArrowUpRight size={20}/></a></div></section>

      <footer className="site-footer"><div className="footer-main"><Link href="#home" className="brand"><span className="brand-symbol"><span/><span/><span/><span/></span><span className="brand-name">dania<span>tech</span><b>corner</b></span></Link><p>Explore. Learn. Build.</p><div className="footer-links"><a href="#categories">Categorias</a><a href="#discoveries">Descobertas</a><a href="#about">Sobre o projeto</a></div></div><div className="footer-bottom"><span>© 2026 Dania Tech Corner</span><span>Feito com curiosidade <span className="footer-heart">✳</span></span><a href="#home">Voltar ao topo ↑</a></div></footer>
    </main>
  )
}
