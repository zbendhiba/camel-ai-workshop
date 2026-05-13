---
title: "Step 02 — First LLM Agent"
layout: :theme/page
---

Now that you have a working Camel route, it's time to connect it to a Large Language Model. In this step, you will invoke an LLM from a Camel route using two different approaches: the **OpenAI component** for a simple, direct call, or **LangChain4j-agent with Forage** for a richer setup with memory and extensibility.

## Choosing your approach

The OpenAI component (`openai:chat-completion`) is the simplest way to call an LLM from Camel. It works with OpenAI directly or any OpenAI-compatible API like Ollama. No additional framework is needed.

The LangChain4j-agent component (`langchain4j-agent`) is backed by Forage, which configures AI beans through a properties file. It adds memory, tool support, and guardrails on top of the basic LLM call. Choose this approach when you need conversational context or plan to add tools later.

## OpenAI component

The route sends a prompt to the LLM and logs the response:

```yaml
- route:
    id: first-llm
    from:
      uri: timer:ask
      parameters:
        repeatCount: 1
      steps:
        - setBody:
            constant: >-
              What are the main Enterprise Integration Patterns used
              in messaging systems? Answer in 3 bullet points.
        - to:
            description: Call the LLM
            uri: openai:chat-completion
        - log:
            message: "LLM response:\n$\{body}"
```

Configuration lives in `application.properties`:

```properties
# OpenAI
camel.component.openai.model=gpt-4o
camel.component.openai.apiKey=$\{OPENAI_API_KEY}

# Or use Ollama (OpenAI-compatible API):
# camel.component.openai.model=granite4:7b-a1b-h
# camel.component.openai.baseUrl=http://localhost:11434/v1
# camel.component.openai.apiKey=ollama
```

To use Ollama instead of OpenAI, uncomment the Ollama lines and comment out the OpenAI ones. Ollama exposes an OpenAI-compatible API at `http://localhost:11434/v1`.

## LangChain4j-agent (Forage)

The same route, but using the LangChain4j-agent component:

```yaml
- route:
    id: first-agent
    from:
      uri: timer:ask
      parameters:
        repeatCount: 1
      steps:
        - setBody:
            constant: "What are the main Enterprise Integration Patterns used in messaging systems? Answer in 3 bullet points."
        - to:
            uri: langchain4j-agent:myAgent
        - log:
            message: "Agent response:\n$\{body}"
```

The `langchain4j-agent:myAgent` URI references a bean configured by Forage in a properties file:

```properties
forage.myAgent.agent.model.kind=ollama
forage.myAgent.agent.model.name=granite4:7b-a1b-h
forage.myAgent.agent.base.url=http://localhost:11434
forage.myAgent.agent.features=memory
forage.myAgent.agent.memory.kind=message-window
forage.myAgent.agent.memory.max.messages=10
```

The agent has memory enabled (`message-window`), meaning it can maintain context across multiple interactions within the same session. This will become important in later steps.

## Running the step

Navigate to the variant you chose and run:

```shell
cd section-1/step-02/openai    # or langchain4j
camel run *
```

The `*` wildcard tells Camel CLI to load all files in the directory — routes, properties, and Forage configuration.
