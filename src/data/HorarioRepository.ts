import { readFile, writeFile } from "fs/promises";
import { Horario } from "../models/Horario.js";

export class HorarioRepository {
    private ruta = "./src/data/horarios.json";
    async obtenerHorarios(): Promise<Horario[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async guardarHorarios(horarios: Horario[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(horarios, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar los horarios.");
            throw error;
        }
    }
}