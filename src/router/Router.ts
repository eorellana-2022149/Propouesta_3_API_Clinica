import { IncomingMessage, ServerResponse } from "http";
import { especialidadRoute } from "./EspecialidadRoute.js";
import { pacienteRoute } from "./PacienteRoute.js";
import { medicoRoute } from "./MedicoRoute.js";
import { horarioRoute } from "./HorarioRoute.js";
import { citaRoute } from "./CitaRoute.js";

export async function router(req: IncomingMessage, res: ServerResponse) {
    res.setHeader("Content-Type", "application/json");
    const url = req.url ?? "";
    const metodo = req.method ?? "";
    try {

        if (url.startsWith("/especialidades")) {
            await especialidadRoute(req, res);
            return;
        }

        if (url.startsWith("/pacientes")) {
            await pacienteRoute(req, res);
            return;
        }

        if (url.startsWith("/medicos")) {
            await medicoRoute(req, res);
            return;
        }

        if (url.startsWith("/horarios")) {
            await horarioRoute(req, res);
            return;
        }

        if (url.startsWith("/citas")) {
            await citaRoute(req, res);
            return;
        }


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