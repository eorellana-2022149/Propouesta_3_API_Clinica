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

    if (metodo === "GET" && url === "/especialidades/buscar/") {
        try {
            const id = Number(url.split("/")[3]);
            const especialidad = await especialidadService.buscarEspecialidad(id);
            res.writeHead(200);
            res.end(JSON.stringify(especialidad));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Especialidad no encontrada" }));
        }
        return;
    }

    if (metodo === "POST" && url === "/especialidades/agregar") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = JSON.parse(body);
            const nuevaEspecialidad = await especialidadService.agregarEspecialidad(datos);
            res.writeHead(201);
            res.end(JSON.stringify(nuevaEspecialidad));
        });
    }

    if (metodo === "PUT" && url === "/especialidades/actualizar") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = JSON.parse(body);
            const especialidadActualizada = await especialidadService.actualizarEspecialidad(datos);
            res.writeHead(200);
            res.end(JSON.stringify(especialidadActualizada));
        });
    }

    if (metodo === "DELETE" && url === "/especialidades/eliminar/") {
        try {
            const id = Number(url.split("/")[3]);
            await especialidadService.eliminarEspecialidad(id);
            res.writeHead(200);
            res.end(JSON.stringify({ message: "Especialidad eliminada correctamente" }));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Especialidad no encontrada" }));
        }
    }
}