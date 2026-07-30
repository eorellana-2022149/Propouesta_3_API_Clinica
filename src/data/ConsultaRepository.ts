import { readFile, writeFile } from "fs/promises";
import { Consulta } from "../models/Consulta.js";

export class ConsultaRepository {
    private ruta = "./src/data/consultas.json";
    async obtenerConsultas(): Promise<Consulta[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async guardarConsultas(consultas: Consulta[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(consultas, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar las consultas.");
            throw error;
        }
    }
}