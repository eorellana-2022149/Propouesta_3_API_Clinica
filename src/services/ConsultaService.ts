import { Consulta } from "../models/Consulta.js";
import { ConsultaRepository } from "../data/ConsultaRepository.js";
import { CitaRepository } from "../data/CitaRepository.js";
import { validarConsulta, validarIdConsulta } from "../validations/ConsultaValidation.js";

export class ConsultaService {
    private repository = new ConsultaRepository();
    private citaRepository = new CitaRepository();

    async listar(): Promise<Consulta[]> {
        return await this.repository.obtenerConsultas();
    }

    async agregar(consulta: Consulta): Promise<void> {
        const consultas = await this.repository.obtenerConsultas();
        const existeId = consultas.some(c => c.id === consulta.id);
        if (existeId) {
            throw new Error("La consulta ya existe.");
        }
        validarConsulta(
            consulta.id,
            consulta.idCita,
            consulta.diagnostico,
            consulta.tratamiento,
            consulta.observaciones
        );
        const citas = await this.citaRepository.obtenerCitas();
        const cita = citas.find(c => c.id === consulta.idCita);
        if (!cita) {
            throw new Error("La cita no existe.");
        }
        if (cita.estado !== "Atendida") {
            throw new Error("Solo se pueden registrar consultas de citas atendidas.");
        }
        const yaExiste = consultas.some(
            c => c.idCita === consulta.idCita
        );
        if (yaExiste) {
            throw new Error("La cita ya tiene una consulta registrada.");
        }
        consultas.push(consulta);
        await this.repository.guardarConsultas(consultas);
    }

    async buscar(id: number): Promise<Consulta> {
        validarIdConsulta(id);
        const consultas = await this.repository.obtenerConsultas();
        const consulta = consultas.find(c => c.id === id);
        if (!consulta) {
            throw new Error("La consulta no existe.");
        }
        return consulta;
    }

    async actualizar(consulta: Consulta): Promise<void> {
        const consultas = await this.repository.obtenerConsultas();
        const indice = consultas.findIndex(c => c.id === consulta.id);
        if (indice === -1) {
            throw new Error("La consulta no existe.");
        }
        validarConsulta(
            consulta.id,
            consulta.idCita,
            consulta.diagnostico,
            consulta.tratamiento,
            consulta.observaciones
        );
        consultas[indice] = consulta;
        await this.repository.guardarConsultas(consultas);
    }

    async eliminar(id: number): Promise<void> {
        validarIdConsulta(id);
        const consultas = await this.repository.obtenerConsultas();
        const nuevas = consultas.filter(c => c.id !== id);
        if (consultas.length === nuevas.length) {
            throw new Error("La consulta no existe.");
        }
        await this.repository.guardarConsultas(nuevas);
    }
}