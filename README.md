test..
Emscripten app in your book
==============

### How to use it?

Add the below to your `book.json` file, then run `gitbook install` :

```json
{
    "plugins": [
        "emscripten@git+https://github.com/kyorohiro/gitbook-plugin-emscripten.git"
    ]
}
```

```markdown
{% emscripten js="test.js", mem="test.html.js" %}{% endemscripten %}
```
