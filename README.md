# camel-ai-workshop

A workshop to learn how to build AI-powered data pipelines with Apache Camel, Forage, and Kaoto.

The workshop demonstrates how Camel's Enterprise Integration Patterns (Content-Based Router, Splitter, Aggregator, Dynamic Router...) combine with LLM capabilities to build intelligent data pipelines that go far beyond simple chatbot interactions.

## Prerequisites

- [Camel CLI](https://camel.apache.org/manual/camel-jbang.html) (via JBang)
- [Ollama](https://ollama.ai/) with a model pulled (e.g. `ollama pull granite4:7b-a1b-h`)
- [VS Code](https://code.visualstudio.com/) with the [Kaoto extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-kaoto)

## Running a step

Each step is a self-contained directory. Navigate to it and run:

```shell
camel run *
```

## Visualizing routes

Open any `.camel.yaml` file in VS Code with the Kaoto extension to see the route visually.
