import { IncomingMessage, ServerResponse } from "http";

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";
    try {
        res.writeHead(404);
        res.end(JSON.stringify({
            mensaje: "Ruta no encontrada."
        }));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({
            mensaje: (error as Error).message
        }));
    }
}