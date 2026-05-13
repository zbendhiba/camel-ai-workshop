---
title: "Requirements"
layout: :theme/page
---

You will need the following tools installed on your machine to follow this workshop.

## JBang

JBang lets you run Java scripts and install CLI tools without setting up a full project. It is the foundation for the Camel CLI used throughout this workshop.

Follow the official installation guide for your platform: [JBang Installation Methods](https://www.jbang.dev/documentation/jbang/latest/installation.html#installation-methods).

Once installed, verify that the `jbang` command is available:

```shell
jbang version
```

## Camel CLI

The Camel CLI provides the `camel` command used to run routes in every step of this workshop. Install it through JBang:

```shell
jbang app install camel@apache/camel
```

Verify the installation:

```shell
camel version
```

You can find more details about Camel CLI capabilities in the [official documentation](https://camel.apache.org/manual/camel-jbang.html).

## Ollama

Install Ollama from [ollama.ai](https://ollama.ai/) and pull the model used in this workshop:

```shell
ollama pull granite4:7b-a1b-h
```

> **Tip:** You can also use one of these alternative models that we tested successfully:
>
> ```shell
> ollama pull gemma4:e4b
> ollama pull ministral-3:8b
> ```

Make sure Ollama is running before starting the workshop (`ollama serve` if it's not started automatically).

## VS Code + Kaoto

Install [VS Code](https://code.visualstudio.com/) and the [Kaoto extension](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-kaoto) from the marketplace. This gives you a visual editor for `.camel.yaml` route files.

## Alternative: OpenAI

If you prefer to use OpenAI instead of Ollama, you will need an API key. Set it as an environment variable:

```shell
export OPENAI_API_KEY=your-key-here
```

The OpenAI variant of each step uses `application.properties` where you can configure the model and API key. Ollama is also supported via its OpenAI-compatible API by setting `camel.component.openai.baseUrl=http://localhost:11434/v1`.
