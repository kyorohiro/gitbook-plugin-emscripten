Emscripten app in your book
==============

### Restriction
In a page, Has a emscripten app.
If change module name. your page has some app.

example
```
emcc -s MODULARIZE=1  -s EXPORT_NAME="'MyEmscriptenModule'"
```
ref:

https://github.com/kripken/emscripten/issues/3167


### How to use it?

Add the below to your `book.json` file, then run `gitbook install` :


```json
{
    "plugins": [
        "emscripten@git+https://github.com/kyorohiro/gitbook-plugin-emscripten.git"
    ]
}
```

In your markdowm

```markdown
{% emscripten js="test.js", mem="test.html.js" %}{% endemscripten %}
```

```markdown
{% emscripten js="test.js", mem="test.html.js", mod="Module" %}{% endemscripten %}
```
