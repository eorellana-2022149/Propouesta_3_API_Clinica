import { IncomingMessage, ServerResponse } from "http";
import { EspecialidadService } from "../services/EspecialidadService.js";

const especialidadService = new EspecialidadService();

export async function especialidadRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/especialidades") {
        const datos = await especialidadService.listarEspecialidades();
        res.writeHead(200);
        res.end(JSON.stringify(datos));
        return;
    }

    if (metodo === "GET" && url.startsWith("/especialidades/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const especialidad = await especialidadService.buscarEspecialidad(id);
            res.writeHead(200);
            res.end(JSON.stringify(especialidad));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: (error as Error).message }));
        }
        return;
    }

    if (metodo === "POST" && url === "/especialidades/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await especialidadService.agregarEspecialidad(datos);
                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Especialidad agregada correctamente." }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
        });
        return;
    }

    if (metodo === "PUT" && url === "/especialidades/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await especialidadService.actualizarEspecialidad(datos);
                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Especialidad actualizada correctamente." }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
        });
        return;
    }

    if (metodo === "DELETE" && url.startsWith("/especialidades/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await especialidadService.eliminarEspecialidad(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Especialidad eliminada correctamente." }));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: (error as Error).message }));
        }
        return;
    }
}