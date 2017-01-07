# electron-typescript-aurelia-starter

## Requirements

### Development

Globally installed NPM packages:

* jspm
* typings
* gulp

### Packaging

Glboally installed NPM packages:

* wine (when packing win on linux)
* electron-packager

## Prepare

```shell
npm install
jspm install -y
typings install
```

## Run

```shell
gulp build
electron dist/main.js
```

## Working

* Electron main-process code can be written in typescript.

* Aurelia code running in renderer-processes can be written in typescript.

* UX solution uses Aurelia, SystemJS, JSPM.

* Aurelia code can utilizes render process Electron API via **nodeRequire**, `welcome.ts` features IPC between main and render process as an example: `var ipc: Electron.IpcRenderer = window.nodeRequire('electron').ipcRenderer;`

## Adoptions made

* Layout changed:

  * All UX components like the Aurelia SPA (multiple would be possible too) are located in `/src/ux`.

  * Electron main process code is located in `/src`, `main.ts` is the electron starting point.

  * Styles are inside `/src/ux`.

* Aurelia launcher `/src/ux/index.html`:

  * Script tag in header does save the node-inject `require` implementation into `window.nodeRequire` before deleting those. This way jQuery will detect a normal browser environment and the **node-integration** does not have to be deactivated.

    * Because of this the ambient declaration `custom_typings/node-require.d.ts` was added.

  * FontAwesome is imported through SystemJS - recommended for all Aurelia projects as you no longer need to hardcode its version.

* SystemJS configuration `/config.js`:

  * Paths relative to import point of SystemJS, which is `[src|dist]/ux/index.html` so we go a bit up.

## Todo

[ ] Is there a way to use TypeScript **import**-syntax to load electron modules instead of `window.nodeRequire`?

[ ] Enable SASS/SCSS for CSS

[ ] Adopt `gulp watch` task to automatically reload electron after rebuilding

[ ] Electron packaging

[ ] Re-integrate testing

[ ] VS Code launch/debug integration

[ ] Replace old `typings` with the new typescript npm `@types` completly?

[ ] Better possibility for using electron API than `nodeRequire`?
