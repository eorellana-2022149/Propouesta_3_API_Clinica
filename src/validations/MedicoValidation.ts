export const validarMedico = (
    id: number,
    nombre: string,
    apellido: string,
    telefono: string,
    correo: string,
    idEspecialidad: number
): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
    if (nombre.trim().length < 3) {
        throw new Error("Nombre invalido.");
    }
    if (apellido.trim().length < 3) {
        throw new Error("Apellido invalido.");
    }
    if (!/^\d{8}$/.test(telefono)) {
        throw new Error("Telefono invalido.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        throw new Error("Correo invalido.");
    }
    if (isNaN(idEspecialidad) || !Number.isInteger(idEspecialidad) || idEspecialidad <= 0) {
        throw new Error("La especialidad es invalida.");
    }
}

export const validarIdMedico = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
}