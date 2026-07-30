import { IncomingMessage, ServerResponse } from "http";
import { ConsultaService } from "../services/ConsultaService.js";

const service = new ConsultaService();

export async function consultaRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/consultas") {
        try {
            const consultas = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify(consultas));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "GET" && url.startsWith("/consultas/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const consulta = await service.buscar(id);
            res.writeHead(200);
            res.end(JSON.stringify(consulta));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "POST" && url === "/consultas/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const consulta = JSON.parse(body);
                await service.agregar(consulta);
                res.writeHead(201);
                res.end(JSON.stringify({
                    mensaje: "Consulta agregada correctamente."
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje: (error as Error).message
                }));
            }
        });
        return;
    }

    if (metodo === "PUT" && url === "/consultas/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const consulta = JSON.parse(body);
                await service.actualizar(consulta);
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Consulta actualizada correctamente."
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje: (error as Error).message
                }));
            }
        });
        return;
    }

    if (metodo === "DELETE" && url.startsWith("/consultas/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await service.eliminar(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Consulta eliminada correctamente."
            }));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }
}