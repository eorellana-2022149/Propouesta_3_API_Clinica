import { Horario } from "../models/Horario.js";
import { HorarioRepository } from "../data/HorarioRepository.js";
import { MedicoRepository } from "../data/MedicoRepository.js";
import { validarHorario, validarIdHorario } from "../validations/HorarioValidation.js";

export class HorarioService {
    private repository = new HorarioRepository();
    private medicoRepository = new MedicoRepository();

    async listarHorarios(): Promise<Horario[]> {
        return await this.repository.obtenerHorarios();
    }

    async agregarHorario(horario: Horario): Promise<void> {
        const horarios = await this.repository.obtenerHorarios();
        const existeId = horarios.some(h => h.id === horario.id);
        if (existeId) {
            throw new Error(`El horario con id ${horario.id} ya existe.`);
        }
        validarHorario(
            horario.id,
            horario.idMedico,
            horario.dia,
            horario.horaInicio,
            horario.horaFin
        );
        const medicos = await this.medicoRepository.obtenerMedicos();
        const existeMedico = medicos.some(
            m => m.id === horario.idMedico
        );
        if (!existeMedico) {
            throw new Error(`El medico con id ${horario.idMedico} no existe.`);
        }
        const traslape = horarios.some(h =>
            h.idMedico === horario.idMedico &&
            h.dia === horario.dia &&
            horario.horaInicio < h.horaFin &&
            horario.horaFin > h.horaInicio
        );
        if (traslape) {
            throw new Error("El horario se traslapa con otro horario del medico.");
        }
        horarios.push(horario);
        await this.repository.guardarHorarios(horarios);
    }

    async buscarHorario(id: number): Promise<Horario> {
        validarIdHorario(id);
        const horarios = await this.repository.obtenerHorarios();
        const horario = horarios.find(h => h.id === id);
        if (!horario) {
            throw new Error(`El horario con id ${id} no existe.`);
        }
        return horario;
    }

    async actualizarHorario(horario: Horario): Promise<void> {
        const horarios = await this.repository.obtenerHorarios();
        const indice = horarios.findIndex(h => h.id === horario.id);
        if (indice === -1) {
            throw new Error(`El horario con id ${horario.id} no existe.`);
        }
        validarHorario(
            horario.id,
            horario.idMedico,
            horario.dia,
            horario.horaInicio,
            horario.horaFin
        );
        const medicos = await this.medicoRepository.obtenerMedicos();
        const existeMedico = medicos.some(
            m => m.id === horario.idMedico
        );
        if (!existeMedico) {
            throw new Error(`El medico con id ${horario.idMedico} no existe.`);
        }
        const traslape = horarios.some(h =>
            h.id !== horario.id &&
            h.idMedico === horario.idMedico &&
            h.dia === horario.dia &&
            horario.horaInicio < h.horaFin &&
            horario.horaFin > h.horaInicio
        );
        if (traslape) {
            throw new Error("El horario se traslapa con otro horario del medico.");
        }
        horarios[indice] = horario;
        await this.repository.guardarHorarios(horarios);
    }

    async eliminarHorario(id: number): Promise<void> {
        validarIdHorario(id);
        const horarios = await this.repository.obtenerHorarios();
        const nuevosHorarios = horarios.filter(h => h.id !== id);
        if (nuevosHorarios.length === horarios.length) {
            throw new Error(`El horario con id ${id} no existe.`);
        }
        await this.repository.guardarHorarios(nuevosHorarios);
    }
}