import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})
var init = require("../index");
init.init();


export default app
