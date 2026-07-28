import { IncomingMessage, ServerResponse } from "http";
import { CitaService } from "../services/CitaService.js";

const citaService = new CitaService();
export async function citaRoute(req: IncomingMessage, res: ServerResponse) {

    const url = req.url ?? "";
    const metodo = req.method ?? "";

    if (metodo === "GET" && url === "/citas") {
        try {
            const citas = await citaService.listarCitas();
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
            const cita = await citaService.buscarCita(id);
            res.writeHead(200);
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
                const datos = JSON.parse(body);
                await citaService.agregarCita(datos);
                res.writeHead(201);
                res.end(JSON.stringify({
                    mensaje: "Cita agregada correctamente."
                }));
            } catch(error){
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje:(error as Error).message
                }));
            }
        });
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/confirmar/")) {
        try {
            const id = Number(url.split("/")[3]);
            await citaService.confirmarCita(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje:"Cita confirmada correctamente."
            }));
        } catch(error){
            res.writeHead(400);
            res.end(JSON.stringify({
                mensaje:(error as Error).message
            }));
        }
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/atender/")) {
        try {
            const id = Number(url.split("/")[3]);
            await citaService.atenderCita(id);
            res.writeHead(200);
            res.end(JSON.stringify({
                mensaje:"Cita atendida correctamente."
            }));
        } catch(error){
            res.writeHead(400);
            res.end(JSON.stringify({
                mensaje:(error as Error).message
            }));
        }
        return;
    }

    if (metodo === "PUT" && url.startsWith("/citas/reprogramar/")) {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on("end", async()=>{
            try{
                const id = Number(url.split("/")[3]);
                const datos = JSON.parse(body);
                await citaService.reprogramarCita(
                    id,
                    datos.fecha,
                    datos.hora
                );
                res.writeHead(200);
                res.end(JSON.stringify({
                    mensaje:"Cita reprogramada correctamente."
                }));
            }catch(error){
                res.writeHead(400);
                res.end(JSON.stringify({
                    mensaje:(error as Error).message
                }));
            }
        });
        return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({
        mensaje:"Ruta de citas no encontrada."
    }));
}