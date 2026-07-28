import "./server/server.js";
import { menuPrincipal } from "./menu/MenuPrincipal.js";

setTimeout(async () => {
    await menuPrincipal();
}, 1000);