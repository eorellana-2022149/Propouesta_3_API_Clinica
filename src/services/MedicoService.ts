import { Medico } from "../models/Medico.js";
import { MedicoRepository } from "../data/MedicoRepository.js";
import { EspecialidadRepository } from "../data/EspecialidadRepository.js";
import { validarMedico, validarIdMedico } from "../validations/MedicoValidation.js";

export class MedicoService {
    private repository = new MedicoRepository();
    private especialidadRepository = new EspecialidadRepository();

    async listarMedicos(): Promise<Medico[]> {
        return await this.repository.obtenerMedicos();
    }

    async agregarMedico(medico: Medico): Promise<void> {
        const medicos = await this.repository.obtenerMedicos();
        const existe = medicos.some(m => m.id === medico.id);
        if (existe) {
            throw new Error(`El medico con id ${medico.id} ya existe.`);
        }
        validarMedico(
            medico.id,
            medico.nombre,
            medico.apellido,
            medico.telefono,
            medico.correo,
            medico.idEspecialidad
        );
        const especialidades = await this.especialidadRepository.obtenerEspecialidades();
        const existeEspecialidad = especialidades.some(
            e => e.id === medico.idEspecialidad
        );
        if (!existeEspecialidad) {
            throw new Error(`La especialidad con id ${medico.idEspecialidad} no existe.`);
        }
        medicos.push(medico);
        await this.repository.guardarMedicos(medicos);
    }

    async buscarMedico(id: number): Promise<Medico> {
        validarIdMedico(id);
        const medicos = await this.repository.obtenerMedicos();
        const medico = medicos.find(m => m.id === id);
        if (!medico) {
            throw new Error(`El medico con id ${id} no existe.`);
        }
        return medico;
    }

    async actualizarMedico(medico: Medico): Promise<void> {
        const medicos = await this.repository.obtenerMedicos();
        const indice = medicos.findIndex(m => m.id === medico.id);
        if (indice === -1) {
            throw new Error(`El medico con id ${medico.id} no existe.`);
        }
        validarMedico(
            medico.id,
            medico.nombre,
            medico.apellido,
            medico.telefono,
            medico.correo,
            medico.idEspecialidad
        );
        const especialidades = await this.especialidadRepository.obtenerEspecialidades();
        const existeEspecialidad = especialidades.some(
            e => e.id === medico.idEspecialidad
        );
        if (!existeEspecialidad) {
            throw new Error(`La especialidad con id ${medico.idEspecialidad} no existe.`);
        }
        medicos[indice] = medico;
        await this.repository.guardarMedicos(medicos);
    }

    async eliminarMedico(id: number): Promise<void> {
        validarIdMedico(id);
        const medicos = await this.repository.obtenerMedicos();
        const nuevosMedicos = medicos.filter(m => m.id !== id);
        if (nuevosMedicos.length === medicos.length) {
            throw new Error(`El medico con id ${id} no existe.`);
        }
        await this.repository.guardarMedicos(nuevosMedicos);
    }
}