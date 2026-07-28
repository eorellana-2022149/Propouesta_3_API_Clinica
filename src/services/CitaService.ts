import { Cita } from "../models/Cita.js";
import { CitaRepository } from "../data/CitaRepository.js";
import { PacienteRepository } from "../data/PacienteRepository.js";
import { MedicoRepository } from "../data/MedicoRepository.js";
import { HorarioRepository } from "../data/HorarioRepository.js";
import { validarCita, validarIdCita } from "../validations/CitaValidation.js";

export class CitaService {
    private repository = new CitaRepository();
    private pacienteRepository = new PacienteRepository();
    private medicoRepository = new MedicoRepository();
    private horarioRepository = new HorarioRepository();

    async listarCitas(): Promise<Cita[]> {
        return await this.repository.obtenerCitas();
    }

    async buscarCita(id: number): Promise<Cita> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error(`La cita con id ${id} no existe.`);
        }
        return cita;
    }

    async agregarCita(cita: Cita): Promise<void> {
        const citas = await this.repository.obtenerCitas();
        const existeId = citas.some(c => c.id === cita.id);
        if (existeId) {
            throw new Error(`La cita con id ${cita.id} ya existe.`);
        }
        validarCita(
            cita.id,
            cita.idPaciente,
            cita.idMedico,
            cita.fecha,
            cita.hora,
            "Pendiente"
        );
        const pacientes = await this.pacienteRepository.obtenerPacientes();
        const existePaciente = pacientes.some(
            p => p.id === cita.idPaciente
        );
        if (!existePaciente) {
            throw new Error(`El paciente con id ${cita.idPaciente} no existe.`);
        }
        const medicos = await this.medicoRepository.obtenerMedicos();
        const existeMedico = medicos.some(
            m => m.id === cita.idMedico
        );
        if (!existeMedico) {
            throw new Error(`El medico con id ${cita.idMedico} no existe.`);
        }
        const horarios = await this.horarioRepository.obtenerHorarios();
        const dia = this.obtenerDia(cita.fecha);
        const horarioDisponible = horarios.some(h =>
            h.idMedico === cita.idMedico &&
            h.dia === dia &&
            cita.hora >= h.horaInicio &&
            cita.hora <= h.horaFin
        );
        if (!horarioDisponible) {
            throw new Error(
                "El medico no tiene disponibilidad en ese horario."
            )
        }
        const citaDuplicada = citas.some(c =>
            c.idMedico === cita.idMedico &&
            c.fecha === cita.fecha &&
            c.hora === cita.hora &&
            c.estado !== "Cancelada"
        );
        if (citaDuplicada) {
            throw new Error(
                "El medico ya tiene una cita en ese horario."
            );
        }
        cita.estado = "Pendiente";
        citas.push(cita);
        await this.repository.guardarCitas(citas);
    }

    private obtenerDia(fecha: string): string {
        const dias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado"
        ];
        const fechaObjeto = new Date(fecha);
        return dias[fechaObjeto.getDay()];
    }

    async confirmarCita(id: number): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error(`La cita con id ${id} no existe.`);
        }
        if (cita.estado !== "Pendiente") {
            throw new Error(
                "Solo se pueden confirmar citas pendientes."
            );
        }
        cita.estado = "Confirmada";
        await this.repository.guardarCitas(citas);
    }
    async atenderCita(id: number): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error(`La cita con id ${id} no existe.`);
        }
        if (cita.estado !== "Confirmada") {
            throw new Error(
                "Solo se pueden atender citas confirmadas."
            );
        }
        cita.estado = "Atendida";
        await this.repository.guardarCitas(citas);
    }

    async reprogramarCita(
        id: number,
        nuevaFecha: string,
        nuevaHora: string
    ): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error(
                `La cita con id ${id} no existe.`
            );
        }
        if (cita.estado === "Atendida") {
            throw new Error(
                "No se puede reprogramar una cita atendida."
            );
        }
        const horarios = await this.horarioRepository.obtenerHorarios();
        const dia = this.obtenerDia(nuevaFecha);
        const disponible = horarios.some(h =>
            h.idMedico === cita.idMedico &&
            h.dia === dia &&
            nuevaHora >= h.horaInicio &&
            nuevaHora < h.horaFin
        );
        if (!disponible) {
            throw new Error(
                "El medico no tiene disponibilidad en ese horario."
            );
        }
        const existeOtraCita = citas.some(c =>
            c.id !== id &&
            c.idMedico === cita.idMedico &&
            c.fecha === nuevaFecha &&
            c.hora === nuevaHora &&
            c.estado !== "Cancelada"
        );
        if (existeOtraCita) {
            throw new Error(
                "Ya existe una cita en ese horario."
            );
        }
        cita.fecha = nuevaFecha;
        cita.hora = nuevaHora;
        cita.estado = "Pendiente";
        await this.repository.guardarCitas(citas);
    }
}