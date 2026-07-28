import { readFile, writeFile } from "fs/promises";
import { Medico } from "../models/Medico.js";

export class MedicoRepository {
    private ruta = "./src/data/medicos.json";
    
    async obtenerMedicos(): Promise<Medico[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async guardarMedicos(medicos: Medico[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(medicos, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar los medicos.");
            throw error;
        }
    }
}