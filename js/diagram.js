/* ============================================
   EVOLVING DIAGRAM — SVG-based layered reveal
   ============================================ */

const EvolvingDiagram = {
  // Layer visibility state
  state: {
    layers: {
      runtime: false,
      tools: false,
      context: false,
      guardrails: false,
      evaluation: false,
      // Agent anatomy
      llm: false,
      reasoning: false,
      memory: false,
      agentTools: false,
      policies: false,
      agentContext: false,
      // Roles
      orchestrator: false,
      superAgent: false,
      utilityAgent: false,
      // Patterns
      sequential: false,
      conditional: false,
      loop: false,
      parallel: false,
      // ReAct
      think: false,
      act: false,
      observe: false
    }
  },

  render(containerId, visibleLayers) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Update state
    visibleLayers.forEach(l => { this.state.layers[l] = true; });

    const layerOpacity = (key) => this.state.layers[key] ? 1 : 0.08;
    const layerStroke = (key) => this.state.layers[key] ? 'var(--stroke-primary)' : 'var(--stroke-dim)';
    const layerFill = (key) => this.state.layers[key] ? 'rgba(74,158,255,0.08)' : 'transparent';
    const glowFilter = (key) => this.state.layers[key] ? 'drop-shadow(0 0 6px rgba(74,158,255,0.4))' : 'none';

    const svg = `
    <svg viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:700px;">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Title -->
      <text x="350" y="25" text-anchor="middle" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="0.15em">
        ACMECORP DATA AGENT — ARCHITECTURE
      </text>

      <!-- Layer 5: Evaluation (outermost) -->
      <g style="opacity:${layerOpacity('evaluation')};transition:opacity 0.8s ease;filter:${glowFilter('evaluation')}">
        <rect x="20" y="40" width="660" height="340" rx="6" fill="${layerFill('evaluation')}" stroke="${layerStroke('evaluation')}" stroke-width="1.5" stroke-dasharray="8,4"/>
        <text x="40" y="60" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L5: EVALUATION</text>
      </g>

      <!-- Layer 4: Guardrails -->
      <g style="opacity:${layerOpacity('guardrails')};transition:opacity 0.8s ease;filter:${glowFilter('guardrails')}">
        <rect x="50" y="72" width="600" height="290" rx="5" fill="${layerFill('guardrails')}" stroke="${this.state.layers.guardrails ? '#f59e0b' : 'var(--stroke-dim)'}" stroke-width="1.5" stroke-dasharray="6,3"/>
        <text x="70" y="92" fill="#f59e0b" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L4: GUARDRAILS</text>
      </g>

      <!-- Layer 3: Data & Context -->
      <g style="opacity:${layerOpacity('context')};transition:opacity 0.8s ease;filter:${glowFilter('context')}">
        <rect x="80" y="104" width="540" height="240" rx="4" fill="${layerFill('context')}" stroke="${this.state.layers.context ? '#2dd4bf' : 'var(--stroke-dim)'}" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="100" y="124" fill="#2dd4bf" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L3: DATA &amp; CONTEXT (RAG)</text>
      </g>

      <!-- Layer 2: Tool Layer -->
      <g style="opacity:${layerOpacity('tools')};transition:opacity 0.8s ease;filter:${glowFilter('tools')}">
        <rect x="110" y="136" width="480" height="190" rx="4" fill="${layerFill('tools')}" stroke="${layerStroke('tools')}" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="130" y="156" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" letter-spacing="0.1em">L2: TOOL LAYER</text>

        <!-- Tool boxes -->
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.2s">
          <rect x="130" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="175" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">data_access</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.3s">
          <rect x="230" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="275" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">transform</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.4s">
          <rect x="330" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="375" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">external_api</text>
        </g>
        <g style="opacity:${layerOpacity('tools')};transition:opacity 0.6s ease 0.5s">
          <rect x="430" y="165" width="90" height="32" rx="3" fill="rgba(74,158,255,0.06)" stroke="var(--stroke-dim)" stroke-width="1"/>
          <text x="475" y="185" text-anchor="middle" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="8">compute</text>
        </g>
      </g>

      <!-- Layer 1: Agent Runtime (innermost) -->
      <g style="opacity:${layerOpacity('runtime')};transition:opacity 0.8s ease;filter:${glowFilter('runtime')}">
        <rect x="160" y="210" width="380" height="100" rx="4" fill="rgba(74,158,255,0.1)" stroke="${layerStroke('runtime')}" stroke-width="2"/>
        <text x="180" y="232" fill="#4a9eff" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" letter-spacing="0.1em">L1: AGENT RUNTIME</text>

        <!-- Internal components -->
        <rect x="180" y="245" width="70" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="215" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">LLM</text>

        <rect x="260" y="245" width="85" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="302" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">State Mgr</text>

        <rect x="355" y="245" width="75" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="392" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">Memory</text>

        <rect x="440" y="245" width="80" height="28" rx="3" fill="rgba(74,158,255,0.08)" stroke="var(--stroke-dim)" stroke-width="1"/>
        <text x="480" y="263" text-anchor="middle" fill="#e2e8f0" font-family="JetBrains Mono, monospace" font-size="8">Orchestrator</text>

        <!-- Connection lines -->
        <line x1="250" y1="259" x2="260" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="345" y1="259" x2="355" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
        <line x1="430" y1="259" x2="440" y2="259" stroke="var(--stroke-dim)" stroke-width="1" stroke-dasharray="3,2"/>
      </g>

      <!-- Dimension markers -->
      <g stroke="var(--stroke-dim)" stroke-width="0.5" opacity="0.4">
        <line x1="15" y1="40" x2="15" y2="380"/>
        <line x1="12" y1="40" x2="18" y2="40"/>
        <line x1="12" y1="380" x2="18" y2="380"/>
        <text x="10" y="215" fill="#94a3b8" font-family="JetBrains Mono, monospace" font-size="7" text-anchor="middle" transform="rotate(-90,10,215)">FULL STACK</text>
      </g>
    </svg>
    `;

    container.innerHTML = `
      <div class="evolving-diagram__label">AcmeCorp Agent Blueprint</div>
      ${svg}
    `;
  },

  // Convenience: render with just the layers for a specific page
  renderForPage(containerId, pageId) {
    const layerMap = {
      'five-layer-arch': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'tool-definitions': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'error-handling': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'tool-calling': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'agent-anatomy': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'role-taxonomy': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'langgraph-patterns': ['runtime', 'tools', 'context', 'guardrails', 'evaluation'],
      'react-loop': ['runtime', 'tools', 'context', 'guardrails', 'evaluation']
    };

    // Reset state for fresh render per page
    Object.keys(this.state.layers).forEach(k => { this.state.layers[k] = false; });
    this.render(containerId, layerMap[pageId] || []);
  }
};
