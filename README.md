# JSX-DOM

This module is part of [BPL (Balmanth's Personal Library)](https://github.com/topics/nodejs-bpl) and provides a set of functions and classes to build interfaces using a custom JSX over TypeScript, in addition to rendering them by manipulating the browser DOM.

## Install

Using npm:

```sh
npm i @balmanth/jsx-dom
```

## Reference

After installing the module, you need to import it as in the following example:

```ts
import * as JSX from '@balmanth/jsx-dom';
```

And configure your `tsconfig.json` as in the example below:

```json
{
  "jsxFactory": "JSX.create",
  "jsx": "react"
}
```

> This part isn't needed if you want just to extend the module.

...Then you can follow all the quick reference examples.

- Class [Component](./reference/component.md)
- Class [Element](./reference/element.md)
- Class [Text](./reference/text.md)
- Class [Node](./reference/node.md)
- Function [create](./reference/create.md)
- Function [render](./reference/render.md)
- Function [json](./reference/json.md)

## License

[MIT](https://balmante.eti.br)
