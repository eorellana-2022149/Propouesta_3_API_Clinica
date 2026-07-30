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

    async listar(): Promise<Cita[]> {
        return await this.repository.obtenerCitas();
    }

    async agregar(cita: Cita): Promise<void> {
        const citas = await this.repository.obtenerCitas();
        const existeId = citas.some(c => c.id === cita.id);
        if (existeId) {
            throw new Error("La cita ya existe.");
        }
        validarCita(cita.id, cita.idPaciente, cita.idMedico, cita.fecha, cita.hora);
        const pacientes = await this.pacienteRepository.obtenerPacientes();
        const existePaciente = pacientes.some(p => p.id === cita.idPaciente);
        if (!existePaciente) {
            throw new Error("El paciente no existe.");
        }
        const medicos = await this.medicoRepository.obtenerMedicos();
        const existeMedico = medicos.some(
            m => m.id === cita.idMedico
        );
        if (!existeMedico) {
            throw new Error("El medico no existe.");
        }
        const horarios = await this.horarioRepository.obtenerHorarios();
        const dia = this.obtenerDia(cita.fecha);
        const disponible = horarios.some(h => h.idMedico === cita.idMedico &&
            h.dia === dia &&
            cita.hora >= h.horaInicio &&
            cita.hora < h.horaFin
        );
        if (!disponible) {
            throw new Error("El medico no tiene horario disponible.");
        }
        const duplicada = citas.some(c =>
            c.idMedico === cita.idMedico &&
            c.fecha === cita.fecha &&
            c.hora === cita.hora
        );
        if (duplicada) {
            throw new Error("Ya existe una cita para ese medico en esa fecha y hora.");
        }
        cita.estado = "Pendiente";
        citas.push(cita);
        await this.repository.guardarCitas(citas);
    }

    async buscar(id: number): Promise<Cita> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error("La cita no existe.");
        }
        return cita;
    }

    async actualizar(cita: Cita): Promise<void> {
        const citas = await this.repository.obtenerCitas();
        const indice = citas.findIndex(c => c.id === cita.id);
        if (indice === -1) {
            throw new Error("La cita no existe.");
        }
        validarCita(
            cita.id,
            cita.idPaciente,
            cita.idMedico,
            cita.fecha,
            cita.hora
        );
        const pacientes = await this.pacienteRepository.obtenerPacientes();
        const existePaciente = pacientes.some(
            p => p.id === cita.idPaciente
        );
        if (!existePaciente) {
            throw new Error("El paciente no existe.");
        }
        const medicos = await this.medicoRepository.obtenerMedicos();
        const existeMedico = medicos.some(
            m => m.id === cita.idMedico
        );
        if (!existeMedico) {
            throw new Error("El medico no existe.");
        }
        const horarios = await this.horarioRepository.obtenerHorarios();
        const dia = this.obtenerDia(cita.fecha);
        const disponible = horarios.some(h =>
            h.idMedico === cita.idMedico &&
            h.dia === dia &&
            cita.hora >= h.horaInicio &&
            cita.hora < h.horaFin
        );
        if (!disponible) {
            throw new Error("El medico no tiene horario disponible.");
        }
        const duplicada = citas.some(c =>
            c.id !== cita.id &&
            c.idMedico === cita.idMedico &&
            c.fecha === cita.fecha &&
            c.hora === cita.hora
        );
        if (duplicada) {
            throw new Error("Ya existe una cita para ese medico en esa fecha y hora.");
        }
        cita.estado = citas[indice].estado;
        citas[indice] = cita;
        await this.repository.guardarCitas(citas);
    }

    async eliminar(id: number): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const nuevas = citas.filter(c => c.id !== id);
        if (nuevas.length === citas.length) {
            throw new Error("La cita no existe.");
        }
        await this.repository.guardarCitas(nuevas);
    }

    async confirmar(id: number): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error("La cita no existe.");
        }
        if (cita.estado !== "Pendiente") {
            throw new Error("Solo se pueden confirmar citas pendientes.");
        }
        cita.estado = "Confirmada";
        await this.repository.guardarCitas(citas);
    }

    async atender(id: number): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error("La cita no existe.");
        }
        if (cita.estado !== "Confirmada") {
            throw new Error("Solo se pueden atender citas confirmadas.");
        }
        cita.estado = "Atendida";
        await this.repository.guardarCitas(citas);
    }

    async reprogramar(
        id: number,
        fecha: string,
        hora: string
    ): Promise<void> {
        validarIdCita(id);
        const citas = await this.repository.obtenerCitas();
        const cita = citas.find(c => c.id === id);
        if (!cita) {
            throw new Error("La cita no existe.");
        }
        const horarios = await this.horarioRepository.obtenerHorarios();
        const dia = this.obtenerDia(fecha);
        const disponible = horarios.some(h =>
            h.idMedico === cita.idMedico &&
            h.dia === dia &&
            hora >= h.horaInicio &&
            hora < h.horaFin
        );
        if (!disponible) {
            throw new Error("El medico no tiene horario disponible.");
        }
        const duplicada = citas.some(c =>
            c.id !== id &&
            c.idMedico === cita.idMedico &&
            c.fecha === fecha &&
            c.hora === hora
        );
        if (duplicada) {
            throw new Error("Ya existe una cita para ese medico en esa fecha y hora.");
        }
        cita.fecha = fecha;
        cita.hora = hora;
        cita.estado = "Pendiente";
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
        const [anio, mes, dia] = fecha.split("-").map(Number);
        const fechaObjeto = new Date(anio, mes - 1, dia);
        return dias[fechaObjeto.getDay()];
    }

}