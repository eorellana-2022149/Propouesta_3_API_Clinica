export const validarEspecialidad = (id: number, nombre: string): void => {
    if (isNaN(id)) {
        throw new Error("El id debe ser un numero.");
    }
    if (!Number.isInteger(id)) {
        throw new Error("El id debe ser entero.");
    }
    if (id <= 0) {
        throw new Error("El id debe ser mayor que cero.");
    }
    if (nombre.trim() === "") {
        throw new Error("El nombre es obligatorio.");
    }
    if (nombre.trim().length < 3) {
        throw new Error("El nombre debe tener al menos 3 caracteres.");
    }
}

export const validarIdEspecialidad = (id: number): void => {
    if (isNaN(id)) {
        throw new Error("El id debe ser un numero.");
    }
    if (!Number.isInteger(id)) {
        throw new Error("El id debe ser entero.");
    }
    if (id <= 0) {
        throw new Error("El id debe ser mayor que cero.");
    }
}