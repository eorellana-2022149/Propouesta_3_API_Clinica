import { Especialidad } from '../models/Especialidad.js';
import { EspecialidadRepository } from '../data/EspecialidadRepository.js';
import { validarEspecialidad, validarIdEspecialidad } from '../validations/EspecialidadValidation.js';

export class EspecialidadService {
    private repository = new EspecialidadRepository();

    async listarEspecialidades(): Promise<Especialidad[]> {
        return await this.repository.obtenerEspecialidades();
    }

    async agregarEspecialidad(especialidad: Especialidad): Promise<void> {
        const especialidades = await this.repository.obtenerEspecialidades();
        const existe = especialidades.some(e => e.id === especialidad.id);
        if (existe) {
            throw new Error(`La especialidad con id ${especialidad.id} ya existe.`);
        }
        validarEspecialidad(especialidad.id, especialidad.nombre);
        especialidades.push(especialidad);
        await this.repository.guardarEspecialidades(especialidades);
        console.log(`Especialidad con id ${especialidad.id} agregada correctamente.`);
    }

    async buscarEspecialidad(id: number): Promise<Especialidad> {
        validarIdEspecialidad(id);
        const especialidades = await this.repository.obtenerEspecialidades();
        const especialidad = especialidades.find(e => e.id === id);
        if (!especialidad) {
            throw new Error(`La especialidad con id ${id} no existe.`);
        }
        return especialidad;
    }

    async actualizarEspecialidad(especialidad: Especialidad): Promise<void> {
        const especialidades = await this.repository.obtenerEspecialidades();
        const index = especialidades.findIndex(e => e.id === especialidad.id);
        if (index === -1) {
            throw new Error(`La especialidad con id ${especialidad.id} no existe.`);
        }
        validarEspecialidad(especialidad.id, especialidad.nombre);
        especialidades[index] = especialidad;
        await this.repository.guardarEspecialidades(especialidades);
        console.log(`Especialidad con id ${especialidad.id} actualizada correctamente.`);
    }

    async eliminarEspecialidad(id: number): Promise<void> {
        validarIdEspecialidad(id);
        const especialidades = await this.repository.obtenerEspecialidades();
        const nuevasEspecialidades = especialidades.filter(e => e.id !== id);
        if (nuevasEspecialidades.length === especialidades.length) {
            throw new Error(`La especialidad con id ${id} no existe.`);
        }
        await this.repository.guardarEspecialidades(nuevasEspecialidades);
        console.log(`Especialidad con id ${id} eliminada correctamente.`);
    }
}