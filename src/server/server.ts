import { createServer } from "http";
import { router } from "../router/Router.js";

const servidor = createServer(async (req, res) => {
    await router(req, res);
});
servidor.listen(3000, () => {
    console.clear();

    console.log("================================");
    console.log(" API Clínica iniciada");
    console.log(" http://localhost:3000");
    console.log("================================");
});