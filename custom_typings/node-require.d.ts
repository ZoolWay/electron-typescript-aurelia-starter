// index.html wraps the node-require into window.nodeRequire before starting SystemJS
declare interface Window {
  nodeRequire(moduleName: string): any;
}