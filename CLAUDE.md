# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A hands-on workshop teaching how to build AI-powered data pipelines using Apache Camel CLI and Kaoto. The workshop demonstrates how Camel's Enterprise Integration Patterns (Content-Based Router, Splitter, Aggregator, Dynamic Router) combine with LLM capabilities. Two LLM integration approaches are shown side-by-side: the **OpenAI component** (`openai:chat-completion`) for simple/direct calls, and **LangChain4j-agent** (via Forage) for advanced features like memory, tools, and guardrails.

## Running Steps

Each step is a self-contained directory. Steps with LLM integration have two variant subdirectories (`openai/` and `langchain4j/`). No Maven or Java compilation required.

```bash
# Run any step (step-01 has no variants)
cd step-01
camel run *

# For steps with variants, choose one
cd step-02/openai      # simple, direct OpenAI calls
camel run *

cd step-02/langchain4j  # Forage-backed agent with memory
camel run *
```

## Documentation (Quarkus Roq)

```bash
cd docs
roq start             # http://localhost:8080 with hot reload
```

## Project Structure

- **`step-01`**: No LLM, single `route.camel.yaml` at step root
- **`step-02` through `step-10`**: Each step has `openai/` and `langchain4j/` subdirectories
  - `openai/`: `route.camel.yaml` + `application.properties` (config via `camel.component.openai.*`)
  - `langchain4j/`: `route.camel.yaml` + `forage-agent-factory.properties` (config via Forage beans)
  - Shared `data/` directory at step root when both variants need the same input files
- **`docs/`**: Quarkus Roq static site (same stack as zbendhiba.github.io)
- Steps 06, 07, 09 are **LangChain4j-only** (tools, RAG, multi-agent memory not available in the OpenAI component)

## Key Technologies

- **Camel CLI** (JBang): runtime for executing routes
- **Kaoto**: VS Code extension for visual route editing
- **OpenAI component** (`openai:chat-completion`): direct LLM calls, config via `camel.component.openai.*`, compatible with Ollama via `baseUrl`
- **LangChain4j-agent** (`langchain4j-agent:<bean>`): Forage-backed agents with memory, tools, guardrails
- **Forage**: opinionated bean factory — configures agents, embeddings, vector DBs via properties files
- **Ollama**: local LLM provider via OpenAI-compatible API (`http://localhost:11434/v1`)

## Documentation Conventions

### Content Structure

- Pages are in `docs/content/` as `<section>/index.md` files with YAML frontmatter
- Navigation is defined in `docs/data/menu.yml`
- Layout: `:theme/page` for all workshop pages
- Code snippets are copied directly into the Markdown (no include mechanism)

### Qute Escaping

Quarkus Roq uses the Qute templating engine, which interprets `${...}` as template expressions. Camel's Simple language uses the same `${...}` syntax (e.g., `${body}`, `${headers.CamelFileName}`). In documentation Markdown files, **all Camel `${...}` expressions inside code blocks must be escaped** as `$\{...}` to prevent Qute from evaluating them. Example: write `$\{body}` not `${body}`.

### Writing Style

Write documentation as natural, flowing prose. Avoid bullet-point-heavy formats. Use descriptive section titles, not "Part 1" / "Part 2". Prefer paragraph form when explaining concepts.

### Flow Diagrams

Use CSS flexbox diagrams with colored pill-shaped boxes and arrow connectors. LLM-powered nodes use yellow (`#f9e2af`), simple handlers use purple (`#cba6f7`), input sources use red/pink (`#f38ba8`), EIP nodes use green (`#a6e3a1`), arrows use blue (`#89b4fa`). When a node fans out to multiple destinations, stack them vertically in a flex column. Example:

```html
<div class="roq-flow-diagram" style="display: flex; align-items: center; gap: 0; margin: 1.5rem 0; overflow-x: auto; padding: 1rem 0;">
  <div style="background: #f38ba8; color: #1e1e2e; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.85rem; white-space: nowrap;">Source</div>
  <div style="color: #89b4fa; font-size: 1.2rem; padding: 0 0.4rem;">&#x2192;</div>
  <div style="background: #f9e2af; color: #1e1e2e; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 600; font-size: 0.85rem; white-space: nowrap;">LLM Agent</div>
  <div style="color: #89b4fa; font-size: 1.2rem; padding: 0 0.4rem;">&#x2192;</div>
  <div style="display: flex; flex-direction: column; gap: 0.4rem;">
    <div style="background: #cba6f7; color: #1e1e2e; padding: 0.4rem 0.8rem; border-radius: 0.4rem; font-size: 0.8rem; font-weight: 600; white-space: nowrap;">Handler A</div>
    <div style="background: #cba6f7; color: #1e1e2e; padding: 0.4rem 0.8rem; border-radius: 0.4rem; font-size: 0.8rem; font-weight: 600; white-space: nowrap;">Handler B</div>
  </div>
</div>
```

## Forage Configuration Pattern

Agents are configured via `forage-agent-factory.properties`:

```properties
forage.<beanName>.agent.model.kind=ollama
forage.<beanName>.agent.model.name=granite4:7b-a1b-h
forage.<beanName>.agent.base.url=http://localhost:11434
```

Referenced in routes as `langchain4j-agent:<beanName>`.

## Important Notes

- Each step directory is self-contained — no dependencies between steps
- Code snippets in docs are copied, not included — update both the step files and the doc page when making changes
