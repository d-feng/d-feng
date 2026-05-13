import { useState, useEffect } from 'react'
import './App.css'

// Project data from GitHub profile
const projects = {
  pinned: [
    { name: 'Agent-connector', desc: 'Lightweight framework for chaining bio-agents with execution tracking', lang: 'Jupyter Notebook', color: 'from-orange-500 to-yellow-500' },
    { name: 'Bio-llm-agent-evals', desc: 'Curated eval benchmarks for testing LLM agents in biomedical discovery', lang: 'Python', color: 'from-blue-500 to-cyan-500' },
    { name: 'BioNetwork', desc: 'R pipelines for CRISPRi screen integration and T cell pathway visualisation', lang: 'R', color: 'from-indigo-500 to-purple-500' },
    { name: 'ImageAI', desc: 'Image analysis with AI', lang: 'Jupyter Notebook', color: 'from-pink-500 to-rose-500' },
    { name: 'IMvigor210_TGFb', desc: 'Immunotherapy computational analysis dataset', lang: 'R', color: 'from-green-500 to-emerald-500' },
    { name: 'skill-creator', desc: 'Claude Code skill creation and optimization toolkit', lang: 'Python', color: 'from-violet-500 to-purple-500' }
  ],
  categories: [
    {
      title: '🤖 Agentic AI & Automation',
      items: ['openfang', 'agent-browser', 'Agent-connector', 'LangGraph-cookbook', 'skill-creator']
    },
    {
      title: '🔍 RAG & Search',
      items: ['LLM_RAG', 'AskDocs', 'hybrid_search_tool', 'search_tool_words_expander']
    },
    {
      title: '🧬 Biomedical AI & Evals',
      items: ['Bio-llm-agent-evals', 'disease2drug', 'IMvigor210_TGFb']
    },
    {
      title: '🔬 Bioinformatics & Computational Biology',
      items: ['BioNetwork', 'SingleCellExplorer', 'LR_AI']
    }
  ]
}

const tools = [
  { name: 'TensorFlow', cat: 'ML Frameworks' },
  { name: 'PyTorch', cat: 'ML Frameworks' },
  { name: 'scikit-learn', cat: 'ML Frameworks' },
  { name: 'LangChain', cat: 'AI/LLM' },
  { name: 'Claude', cat: 'AI/LLM' },
  { name: 'Hugging Face', cat: 'AI/LLM' },
  { name: 'OpenCV', cat: 'Computer Vision' },
  { name: 'Django', cat: 'Web' },
  { name: 'Pinecone', cat: 'Vector DB' },
  { name: 'Chroma', cat: 'Vector DB' },
  { name: 'AWS', cat: 'Cloud' },
  { name: 'Azure', cat: 'Cloud' },
  { name: 'PostgreSQL', cat: 'Databases' },
  { name: 'Giskard', cat: 'AI Testing' },
  { name: 'Cursor IDE', cat: 'Dev Tools' },
  { name: 'ClaudeMCP', cat: 'Dev Tools' },
  { name: 'Awesome-AI-Meets-Biology', cat: 'AI Biology' },
  { name: 'scientific-agent-skills', cat: 'AI Biology' }
]

// Bio Agent World - curated list of bioinformatics AI agents
const bioAgents = [
  // Core Bioinformatics Agents
  { name: 'BRAD', url: 'https://github.com/jpickard1/brad', desc: 'LLM-powered digital assistant for streamlining bioinformatics workflows', cat: 'Bio Agent', lang: 'Python', stars: 380, org: 'Community', scope: ['RAG', 'Single-Cell', 'Literature Search'] },
  { name: 'ClawBio', url: 'https://github.com/ClawBio/ClawBio', desc: 'First bioinformatics-native AI agent - indexes 8,000+ tools from usegalaxy.org', cat: 'Bio Tool', lang: 'Python', stars: 420, org: 'ClawBio', scope: ['Genomics', 'Drug Discovery', 'Clinical Genetics'] },
  { name: 'CellAtria', url: 'https://github.com/AstraZeneca/cellatria', desc: 'Agentic AI framework for single-cell research full-lifecycle automation', cat: 'Bio Agent', lang: 'Python', stars: 890, org: 'AstraZeneca', scope: ['scRNA-seq', 'Differential Expression', 'Cell Annotation'] },
  { name: 'DEDA', url: 'https://github.com/drug-discovery-ai/deda-drug-evaluation-and-discovery-agent', desc: 'All-in-one drug discovery AI agent tool - ChatGPT for bioinformatics researchers', cat: 'Bio Tool', lang: 'Python', stars: 650, org: 'Drug Discovery AI', scope: ['Protein Analysis', 'Drug Discovery', 'UniProt'] },
  { name: 'Biomni', url: 'https://github.com/snap-stanford/Biomni', desc: 'General-purpose biomedical AI agent with LLM reasoning, RAG planning, and code execution for research automation', cat: 'Bio Agent', lang: 'Python', stars: 520, org: 'Stanford', scope: ['CRISPR Screen', 'scRNA-seq', 'ADMET', 'GWAS', 'Rare Disease'] },
  { name: 'STAgent', url: 'https://github.com/LiuLab-Bioelectronics-Harvard/STAgent', desc: 'Multimodal LLM agent for spatial transcriptomics - interactive .h5ad analysis with voice/image support', cat: 'Bio Agent', lang: 'Python', stars: 380, org: 'Harvard', scope: ['Spatial Transcriptomics', 'h5ad Analysis', 'Gene Imputation', 'Visual Reasoning'] },

  // Biological Research Agents
  { name: 'BioAgents', url: 'https://github.com/bio-xyz/BioAgents', desc: 'Conversational AI with specialized knowledge in biology & life sciences', cat: 'Bio Agent', lang: 'TypeScript', stars: 1200, org: 'Bio.xyz', scope: ['Literature Search', 'Data Analysis', 'Hypothesis Gen'] },
  { name: 'BioDiscoveryAgent', url: 'https://github.com/snap-stanford/BioDiscoveryAgent', desc: 'AI agent for closed-loop design of genetic perturbation experiments', cat: 'Bio Agent', lang: 'Python', stars: 780, org: 'Stanford', scope: ['CRISPR', 'Gene Perturbation', 'Pathway Analysis'] },
  { name: 'BioAgent', url: 'https://github.com/mohnish-7/BioAgent', desc: 'AI orchestrator for RNA-seq data analysis from BAT studies', cat: 'Bio Tool', lang: 'Python', stars: 320, org: 'Community', scope: ['RNA-Seq', 'Differential Expression', 'BAT Studies'] },
  { name: 'SRAgent', url: 'https://github.com/ArcInstitute/SRAgent', desc: 'LLM agents for extracting data from SRA database (NCBI)', cat: 'Bio Tool', lang: 'Python', stars: 540, org: 'ArcInstitute', scope: ['SRA Database', 'Data Mining', 'NCBI'] },
  { name: 'Lobster', url: 'https://github.com/the-omics-os/lobster', desc: 'Self-evolving agentic framework for multi-omics research', cat: 'Bio Agent', lang: 'Python', stars: 1100, org: 'Omics OS', scope: ['Multi-Omics', 'Framework', 'Research'] },

  // Eval Frameworks
  { name: 'Bio-llm-agent-evals', url: 'https://github.com/d-feng/Bio-llm-agent-evals', desc: 'Curated eval benchmarks for testing LLM agents in biomedical discovery', cat: 'Eval', lang: 'Python', stars: 250, org: 'd-feng', scope: ['Benchmark', 'Agent Evaluation', 'Biomedical'] },

  // Awesome Lists & Resources
  { name: 'awesome-bioagent-papers', url: 'https://github.com/aristoteleo/awesome-bioagent-papers', desc: 'Daily-updated collection of LLM agent papers in biology/medicine', cat: 'Paper', lang: 'Python', stars: 950, org: 'Aristoteleo', scope: ['Survey', 'Protein Engineering', 'Drug Discovery'] },
  { name: 'Awesome-AI-Meets-Biology', url: 'https://github.com/Webioinfo01/Awesome-AI-Meets-Biology', desc: 'Organized AI applications in biomedical/bioinformatics research', cat: 'Paper', lang: 'Python', stars: 720, org: 'Webioinfo', scope: ['Survey', 'Biomedical AI', 'Applications'] },
  { name: 'Awesome-AI-for-Healthcare', url: 'https://github.com/AgenticHealthAI/Awesome-AI-Agents-for-Healthcare', desc: 'Curated list including bioinformatics agents for healthcare', cat: 'Paper', lang: 'Python', stars: 1400, org: 'AgenticHealthAI', scope: ['Survey', 'Healthcare', 'Clinical AI'] },

  // Framework & Tools
  { name: 'Holy Bio MCP', url: 'https://github.com/longevity-genie/holy-bio-mcp', desc: 'Unified framework for LLM-powered bio agents', cat: 'Framework', lang: 'Python', stars: 460, org: 'Longevity Genie', scope: ['MCP', 'Drug Discovery', 'Genomics'] },
  { name: 'AWL', url: 'https://github.com/agentic-workflow-library', desc: 'Open-source framework for bioinformatics & AI community', cat: 'Framework', lang: 'Python', stars: 830, org: 'Community', scope: ['Workflow', 'Framework', 'Bioinformatics'] },
]

const categories = ['All', 'Bio Agent', 'Bio Tool', 'Eval', 'Paper', 'Framework']

function App() {
  const [activeTab, setActiveTab] = useState('projects')
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100)
  }, [])

  // Filter agents based on search and category
  const filteredAgents = bioAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.cat.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCat = selectedCat === 'All' || agent.cat === selectedCat
    return matchesSearch && matchesCat
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Header / Hero */}
        <header className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="text-center max-w-4xl">
            {/* Avatar */}
            <div className="relative inline-block mb-8">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-orange-500 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center">
                  <svg className="w-20 h-20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Lobster body */}
                    <ellipse cx="50" cy="55" rx="18" ry="25" fill="url(#lobsterGrad)"/>
                    {/* Tail segments */}
                    <path d="M35 70 Q50 85 65 70" stroke="url(#lobsterGrad)" strokeWidth="3" fill="none"/>
                    <path d="M38 78 Q50 90 62 78" stroke="url(#lobsterGrad)" strokeWidth="2" fill="none"/>
                    <path d="M42 85 Q50 95 58 85" stroke="url(#lobsterGrad)" strokeWidth="2" fill="none"/>
                    {/* Left claw arm */}
                    <path d="M32 50 Q15 40 12 25 Q8 20 15 18 Q22 16 25 22 Q28 28 32 35" fill="url(#lobsterGrad)"/>
                    {/* Left claw */}
                    <path d="M12 25 Q5 15 15 10 Q25 5 28 15 Q22 20 18 25 Z" fill="url(#lobsterGrad)"/>
                    {/* Right claw arm */}
                    <path d="M68 50 Q85 40 88 25 Q92 20 85 18 Q78 16 75 22 Q72 28 68 35" fill="url(#lobsterGrad)"/>
                    {/* Right claw */}
                    <path d="M88 25 Q95 15 85 10 Q75 5 72 15 Q78 20 82 25 Z" fill="url(#lobsterGrad)"/>
                    {/* Eyes */}
                    <circle cx="42" cy="42" r="4" fill="#fff"/>
                    <circle cx="58" cy="42" r="4" fill="#fff"/>
                    <circle cx="43" cy="43" r="2" fill="#1a1a1a"/>
                    <circle cx="59" cy="43" r="2" fill="#1a1a1a"/>
                    {/* Antennae */}
                    <path d="M42 38 Q35 25 28 15" stroke="url(#lobsterGrad)" strokeWidth="1.5" fill="none"/>
                    <path d="M58 38 Q65 25 72 15" stroke="url(#lobsterGrad)" strokeWidth="1.5" fill="none"/>
                    {/* Legs */}
                    <path d="M38 60 L30 75" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <path d="M42 62 L36 78" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <path d="M46 64 L42 80" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <path d="M62 60 L70 75" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <path d="M58 62 L64 78" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <path d="M54 64 L58 80" stroke="url(#lobsterGrad)" strokeWidth="2"/>
                    <defs>
                      <linearGradient id="lobsterGrad" x1="30" y1="10" x2="70" y2="95" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#f87171"/>
                        <stop offset="0.5" stopColor="#ef4444"/>
                        <stop offset="1" stopColor="#dc2626"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 bg-gray-950 rounded-full animate-pulse" />
                Available
              </div>
            </div>

            {/* Name & Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">AI Builder</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-6">@d-feng</p>

            {/* Bio */}
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Scientific researcher and computational biology professional with 10+ years of multidisciplinary expertise in drug discovery and wet lab research.
              Advancing science and business through AI by augmenting human capabilities, driving scientific progress, and improving quality of life.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">28</div>
                <div className="text-gray-500 text-sm">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">10+</div>
                <div className="text-gray-500 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">🏆</div>
                <div className="text-gray-500 text-sm">Arctic Code Vault</div>
              </div>
            </div>

            {/* Arctic Code Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-5 py-2 mb-12">
              <span className="text-xl">🏆</span>
              <span className="text-sm text-green-400">Arctic Code Vault Contributor</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/d-feng" target="_blank" rel="noopener noreferrer"
                 className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-105">
                View GitHub
              </a>
              <button onClick={() => setActiveTab('projects')}
                      className="px-8 py-3 bg-white/10 border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
                Explore Projects
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 animate-bounce">
              <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-center gap-1">
              {['projects', 'agents', 'tools', 'education'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-6 py-4 capitalize font-medium transition-all duration-300 border-b-2 ${
                          activeTab === tab
                            ? 'text-green-400 border-green-400 bg-green-500/10'
                            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                        }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-16">
          {/* Pinned Projects */}
          {activeTab === 'projects' && (
            <section>
              <h2 className="text-3xl font-bold mb-2">Pinned Projects</h2>
              <p className="text-gray-400 mb-8">Featured repositories showcasing my best work</p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.pinned.map((project, i) => (
                  <div key={project.name}
                       className="group relative bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10">
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                    <div className="relative">
                      {/* Language badge */}
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} mb-4`}>
                        {project.lang}
                      </span>

                      {/* Project name */}
                      <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">{project.name}</h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.desc}</p>

                      {/* GitHub link */}
                      <a href={`https://github.com/d-feng/${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                         target="_blank" rel="noopener noreferrer"
                         className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-400 transition-colors">
                        View on GitHub
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* All Projects by Category */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8">All Projects</h2>
                <div className="space-y-8">
                  {projects.categories.map((category) => (
                    <div key={category.title} className="bg-gray-900/30 border border-white/5 rounded-2xl p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">{category.title}</h3>
                      <div className="flex flex-wrap gap-3">
                        {category.items.map((item) => (
                          <a key={item} href={`https://github.com/d-feng/${item}`}
                             target="_blank" rel="noopener noreferrer"
                             className="px-4 py-2 bg-gray-800/50 border border-white/10 rounded-lg text-sm hover:bg-gray-800 hover:border-green-500/50 transition-all duration-300">
                            {item}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Agent World - Table View */}
          {activeTab === 'agents' && (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Agent World</h2>
                <p className="text-gray-400">Your reference index for bioinformatics AI agents, tools, and evaluations</p>
              </div>

              {/* Search & Filter Bar */}
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search agents, tools, evals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl focus:outline-none focus:border-green-500/50 transition-colors"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCat === cat
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : 'bg-gray-800/50 text-gray-400 border border-white/10 hover:border-green-500/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="mb-4 text-sm text-gray-500">
                Showing {filteredAgents.length} of {bioAgents.length} agents
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Agent / Tool</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Description</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Use Cases</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 hidden lg:table-cell">Org</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400 hidden sm:table-cell">Lang</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">⭐</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-400">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr key={agent.name} className="border-b border-white/5 hover:bg-gray-900/30 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-semibold text-green-400">{agent.name}</div>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <div className="text-sm text-gray-400 max-w-md">{agent.desc}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {agent.scope.map((tag) => (
                              <span key={tag} className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-500">{agent.org}</span>
                        </td>
                        <td className="py-4 px-4 hidden sm:table-cell">
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                            {agent.lang}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <span className="text-yellow-400">{agent.stars.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <a href={agent.url} target="_blank" rel="noopener noreferrer"
                             className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-green-400 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredAgents.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-gray-400">No agents found matching your search.</p>
                  <button
                    onClick={() => { setSearchQuery(''); setSelectedCat('All'); }}
                    className="mt-4 text-green-400 hover:text-green-300"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          )}

          {/* Tools & Technologies */}
          {activeTab === 'tools' && (
            <section>
              <h2 className="text-3xl font-bold mb-2">Tools & Technologies</h2>
              <p className="text-gray-400 mb-8">Technologies I work with daily</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {tools.map((tool) => (
                  <div key={tool.name}
                       className="group p-4 bg-gray-900/50 border border-white/10 rounded-xl hover:border-green-500/50 transition-all duration-300 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-2xl">
                        {tool.cat === 'ML Frameworks' && '🧠'}
                        {tool.cat === 'AI/LLM' && '🤖'}
                        {tool.cat === 'Computer Vision' && '👁️'}
                        {tool.cat === 'Web' && '🌐'}
                        {tool.cat === 'Vector DB' && '🔍'}
                        {tool.cat === 'Cloud' && '☁️'}
                        {tool.cat === 'Databases' && '💾'}
                        {tool.cat === 'AI Testing' && '✓'}
                        {tool.cat === 'Dev Tools' && '⚙️'}
                        {tool.cat === 'AI Biology' && '🧬'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm group-hover:text-green-400 transition-colors">{tool.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{tool.cat}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Teaching Curriculum */}
          {activeTab === 'education' && (
            <section>
              <h2 className="text-3xl font-bold mb-2">Teaching Curriculum</h2>
              <p className="text-gray-400 mb-8">6-module curriculum for AI in biomedical science</p>

              <div className="space-y-4">
                {[
                  { num: '01', title: 'LLM Foundations & RAG', desc: 'Understanding large language models and retrieval-augmented generation' },
                  { num: '02', title: 'Domain-Specific Search & NLP', desc: 'Biomedical text mining and specialized search systems' },
                  { num: '03', title: 'Agentic AI with LangGraph', desc: 'Building autonomous AI agents for scientific discovery' },
                  { num: '04', title: 'Evaluating LLM Agents', desc: 'Benchmark frameworks like LAB-Bench, PubMedQA, BixBench' },
                  { num: '05', title: 'Computational Biology with AI', desc: 'Applying AI to drug discovery and bioinformatics' },
                  { num: '06', title: 'Interpretability & Advanced Topics', desc: 'Model interpretability and cutting-edge research directions' }
                ].map((module) => (
                  <div key={module.num}
                       className="group flex items-start gap-6 p-6 bg-gray-900/50 border border-white/10 rounded-2xl hover:border-green-500/50 transition-all duration-300">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-xl">
                      {module.num}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-green-400 transition-colors">{module.title}</h3>
                      <p className="text-gray-400">{module.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-gray-500 mb-4">© 2024 d-feng · AI Builder · Scientific Researcher</p>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/d-feng" target="_blank" rel="noopener noreferrer"
                 className="p-3 bg-gray-800 rounded-full hover:bg-green-500/20 hover:text-green-400 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App