import { IncomingMessage, ServerResponse } from "http";
import { HorarioService } from "../services/HorarioService.js";

const horarioService = new HorarioService();
export async function horarioRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/horarios") {
        const horarios = await horarioService.listarHorarios();
        res.writeHead(200);
        res.end(JSON.stringify(horarios));
        return;
    }

    if (metodo === "GET" && url.startsWith("/horarios/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const horario = await horarioService.buscarHorario(id);
            res.writeHead(200);
            res.end(JSON.stringify(horario));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({
                mensaje: (error as Error).message
            }));
        }
        return;
    }

    if (metodo === "POST" && url === "/horarios/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await horarioService.agregarHorario(datos);
                res.writeHead(201);
                res.end(JSON.stringify({
                    mensaje: "Horario agregado correctamente."
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

    if (metodo === "PUT" && url === "/horarios/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await horarioService.actualizarHorario(datos);
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje: "Horario actualizado correctamente."
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

    if (metodo === "DELETE" && url.startsWith("/horarios/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await horarioService.eliminarHorario(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje: "Horario eliminado correctamente."
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