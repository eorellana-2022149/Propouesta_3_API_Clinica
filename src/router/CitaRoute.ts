import { IncomingMessage, ServerResponse } from "http";
import { CitaService } from "../services/CitaService.js";

const service = new CitaService();
export async function citaRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/citas") {
        try {
            const citas = await service.listar();
            res.writeHead(200);
            res.end(JSON.stringify(citas));
        } catch (error) {
            res.writeHead(500);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "GET" && url.startsWith("/citas/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const cita = await service.buscar(id);
            res.writeHead(200)
            res.end(JSON.stringify(cita));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "POST" && url === "/citas/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const cita = JSON.parse(body);
                await service.agregar(cita);
                res.writeHead(201);
                res.end(JSON.stringify({
                    mensaje: "Cita agregada correctamente."
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

    if (metodo === "PUT" && url === "/citas/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const cita = JSON.parse(body);
                await service.actualizar(cita);
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Cita actualizada correctamente."
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

    if (metodo === "DELETE" && url.startsWith("/citas/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await service.eliminar(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Cita eliminada correctamente."
            }));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/confirmar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await service.confirmar(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Cita confirmada correctamente."
            }));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/atender/")) {
        try {
            const id = Number(url.split("/")[3]);
            await service.atender(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Cita atendida correctamente."
            }));
        } catch (error) {
            res.writeHead(400);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/reprogramar/")) {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const id = Number(url.split("/")[3]);
                const datos = JSON.parse(body);
                await service.reprogramar(
                    id,
                    datos.fecha,
                    datos.hora
                );
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Cita reprogramada correctamente."
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
}