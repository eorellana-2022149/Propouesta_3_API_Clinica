import { readFile, writeFile } from "fs/promises";
import { Cita } from "../models/Cita.js";

export class CitaRepository {
    private ruta = "./src/data/citas.json";
    
    async obtenerCitas(): Promise<Cita[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async guardarCitas(citas: Cita[]): Promise<void> {
        try {
            await writeFile(
                this.ruta,
                JSON.stringify(citas, null, 4),
                "utf-8"
            );
        } catch (error) {
            console.error("Error al guardar las citas.");
            throw error;
        }
    }
}