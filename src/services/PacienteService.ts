import { Paciente } from "../models/Paciente.js";
import { PacienteRepository } from "../data/PacienteRepository.js";
import { validarPaciente, validarIdPaciente } from "../validations/PacienteValidation.js";

export class PacienteService {
    private repository = new PacienteRepository();

    async listarPacientes(): Promise<Paciente[]> {
        return await this.repository.obtenerPacientes();
    }

    async agregarPaciente(paciente: Paciente): Promise<void> {
        const pacientes = await this.repository.obtenerPacientes();
        const existe = pacientes.some(p => p.id === paciente.id);
        if (existe) {
            throw new Error(`El paciente con id ${paciente.id} ya existe.`);
        }
        validarPaciente(
            paciente.id,
            paciente.nombre,
            paciente.apellido,
            paciente.edad,
            paciente.telefono,
            paciente.correo
        );
        pacientes.push(paciente);
        await this.repository.guardarPacientes(pacientes);
    }

    async buscarPaciente(id: number): Promise<Paciente> {
        validarIdPaciente(id);
        const pacientes = await this.repository.obtenerPacientes();
        const paciente = pacientes.find(p => p.id === id);
        if (!paciente) {
            throw new Error(`El paciente con id ${id} no existe.`);
        }
        return paciente;
    }

    async actualizarPaciente(paciente: Paciente): Promise<void> {
        const pacientes = await this.repository.obtenerPacientes();
        const indice = pacientes.findIndex(p => p.id === paciente.id);
        if (indice === -1) {
            throw new Error(`El paciente con id ${paciente.id} no existe.`);
        }
        validarPaciente(
            paciente.id,
            paciente.nombre,
            paciente.apellido,
            paciente.edad,
            paciente.telefono,
            paciente.correo
        );
        pacientes[indice] = paciente;
        await this.repository.guardarPacientes(pacientes);
    }

    async eliminarPaciente(id: number): Promise<void> {
        validarIdPaciente(id);
        const pacientes = await this.repository.obtenerPacientes();
        const nuevosPacientes = pacientes.filter(p => p.id !== id);
        if (nuevosPacientes.length === pacientes.length) {
            throw new Error(`El paciente con id ${id} no existe.`);
        }
        await this.repository.guardarPacientes(nuevosPacientes);
    }
}