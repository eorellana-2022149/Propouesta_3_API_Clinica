import { IncomingMessage, ServerResponse } from "http";
import { MedicoService } from "../services/MedicoService.js";

const medicoService = new MedicoService();

export async function medicoRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/medicos") {
        const medicos = await medicoService.listarMedicos();
        res.writeHead(200);
        res.end(JSON.stringify(medicos));
        return;
    }

    if (metodo === "GET" && url.startsWith("/medicos/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const medico = await medicoService.buscarMedico(id);
            res.writeHead(200);
            res.end(JSON.stringify(medico));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "POST" && url === "/medicos/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await medicoService.agregarMedico(datos);
                res.writeHead(201);
                res.end(JSON.stringify({
                    mensaje: "Medico agregado correctamente."
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

    if (metodo === "PUT" && url === "/medicos/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await medicoService.actualizarMedico(datos);
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Medico actualizado correctamente."
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

    if (metodo === "DELETE" && url.startsWith("/medicos/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await medicoService.eliminarMedico(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Medico eliminado correctamente."
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