export const validarPaciente = ( id: number, nombre: string, apellido: string, edad: number, telefono: string, correo: string ): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
    if (nombre.trim().length < 3) {
        throw new Error("Nombre invalido.");
    }
    if (apellido.trim().length < 3) {
        throw new Error("Apellido invalido.");
    }
    if (edad < 0 || edad > 120) {
        throw new Error("Edad invalida.");
    }
    if (!/^\d{8}$/.test(telefono)) {
        throw new Error("Telefono invalido.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        throw new Error("Correo invalido.");
    }
}

export const validarIdPaciente = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
}