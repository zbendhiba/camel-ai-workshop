# Contributing

Thank you for your interest in contributing to the Camel AI Workshop!

## How to contribute

1. **Open an issue first.** Before submitting a pull request, please open an issue describing the bug, improvement, or new content you'd like to propose. This helps us discuss the approach before any code is written.
2. **Fork the repository** and create a branch for your changes.
3. **Submit a pull request** referencing the issue.

## Documentation

The documentation site is built with [Quarkus Roq](https://docs.quarkiverse.io/quarkus-roq/dev/index.html) and lives in the `docs/` directory.

### Running locally

First, install [JBang](https://www.jbang.dev/documentation/jbang/latest/installation.html#installation-methods).

Then install the Roq CLI:

```shell
jbang trust add https://repo1.maven.org/maven2/io/quarkiverse/roq/
jbang app install --fresh --force roq@quarkiverse/quarkus-roq
```

Start the dev server:

```shell
cd docs
roq start
```

The site will be available at http://localhost:8080 with hot reload.

### Content structure

- Content pages are Markdown files in `docs/content/`, each as `<slug>/index.md` with YAML frontmatter
- Navigation is defined in `docs/data/menu.yml`
- Custom styles are in `docs/src/main/resources/web/app/styles.css`

### Qute escaping

Quarkus Roq uses the Qute templating engine, which interprets `${...}` as template expressions. If your Markdown contains `${...}` syntax (e.g., Camel Simple expressions like `${body}` or `${headers.CamelFileName}`), you must escape the brace: write `$\{...}` instead. Otherwise the site build will fail with a "key not found" error.

### Deploying

The site is automatically deployed to GitHub Pages on every push to `main`. Pull requests trigger a build check without deploying.

## Workshop steps

Each step is a self-contained directory at the project root (`step-01/`, `step-02/`, etc.). Steps with LLM integration have two variant subdirectories:

- `openai/`: uses the `openai:chat-completion` Camel component
- `langchain4j/`: uses `langchain4j-agent` backed by Forage

When modifying a step's source files, make sure to update the corresponding documentation page in `docs/content/` if code snippets are referenced there.
