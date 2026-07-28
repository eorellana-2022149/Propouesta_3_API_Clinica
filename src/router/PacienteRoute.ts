import { IncomingMessage, ServerResponse } from "http";
import { PacienteService } from "../services/PacienteService.js";

const pacienteService = new PacienteService();

export async function pacienteRoute(req: IncomingMessage, res: ServerResponse) {
    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/pacientes") {
        const pacientes = await pacienteService.listarPacientes();
        res.writeHead(200);
        res.end(JSON.stringify(pacientes));
        return;
    }

    if (metodo === "GET" && url.startsWith("/pacientes/buscar/")) {
        try {
            const id = Number(url.split("/")[3]);
            const paciente = await pacienteService.buscarPaciente(id);
            res.writeHead(200);
            res.end(JSON.stringify(paciente));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: (error as Error).message }));
        }
        return;
    }

    if (metodo === "POST" && url === "/pacientes/agregar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await pacienteService.agregarPaciente(datos);
                res.writeHead(201);
                res.end(JSON.stringify({ mensaje: "Paciente agregado correctamente." }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
        });
        return;
    }

    if (metodo === "PUT" && url === "/pacientes/actualizar") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async () => {
            try {
                const datos = JSON.parse(body);
                await pacienteService.actualizarPaciente(datos);
                res.writeHead(200);
                res.end(JSON.stringify({ mensaje: "Paciente actualizado correctamente." }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: (error as Error).message }));
            }
        });
        return;
    }

    if (metodo === "DELETE" && url.startsWith("/pacientes/eliminar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await pacienteService.eliminarPaciente(id);
            res.writeHead(200);
            res.end(JSON.stringify({ mensaje: "Paciente eliminado correctamente." }));
        } catch (error) {
            res.writeHead(404);
            res.end(JSON.stringify({ mensaje: (error as Error).message }));
        }
        return;
    }
}