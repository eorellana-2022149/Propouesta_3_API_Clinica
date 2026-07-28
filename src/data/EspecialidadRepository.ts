import { readFile, writeFile } from "fs/promises";
import { Especialidad } from "../models/Especialidad.js";

export class EspecialidadRepository {
    private ruta = "./src/data/especialidades.json";

    async obtenerEspecialidades(): Promise<Especialidad[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al leer el archivo de especialidades:", error);
            return [];
        }
    }

    async guardarEspecialidades(especialidades: Especialidad[]): Promise<void> {
        try {
            const data = JSON.stringify(especialidades, null, 4);
            await writeFile(this.ruta, data, "utf-8");
        } catch (error) {
            console.error("Error al guardar el archivo de especialidades:", error);
            throw error;
        }
    }
}