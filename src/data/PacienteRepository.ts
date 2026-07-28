import { readFile, writeFile } from "fs/promises";
import { Paciente } from "../models/Paciente.js";

export class PacienteRepository {
    private ruta = "./src/data/pacientes.json"

    async obtenerPacientes(): Promise<Paciente[]> {
        try {
            const data = await readFile(this.ruta, "utf-8");
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async guardarPacientes(pacientes: Paciente[]): Promise<void> {
        try {
            await writeFile(this.ruta, JSON.stringify(pacientes, null, 4), "utf-8");
        } catch (error) {
            console.error("Error al guardar pacientes.");
            throw error;
        }
    }
}