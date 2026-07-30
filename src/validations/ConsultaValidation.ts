export const validarConsulta = (
    id: number,
    idCita: number,
    diagnostico: string,
    tratamiento: string,
    observaciones: string
): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
    if (isNaN(idCita) || !Number.isInteger(idCita) || idCita <= 0) {
        throw new Error("La cita es invalida.");
    }
    if (diagnostico.trim() === "") {
        throw new Error("El diagnostico es obligatorio.");
    }
    if (tratamiento.trim() === "") {
        throw new Error("El tratamiento es obligatorio.");
    }
    if (observaciones.trim() === "") {
        throw new Error("Las observaciones son obligatorias.");
    }
}

export const validarIdConsulta = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
}