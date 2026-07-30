export const validarCita = (
    id: number,
    idPaciente: number,
    idMedico: number,
    fecha: string,
    hora: string
): void => {

    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
    if (isNaN(idPaciente) || !Number.isInteger(idPaciente) || idPaciente <= 0) {
        throw new Error("El paciente es invalido.");
    }
    if (isNaN(idMedico) || !Number.isInteger(idMedico) || idMedico <= 0) {
        throw new Error("El medico es invalido.");
    }
    if (fecha.trim() === "") {
        throw new Error("La fecha es obligatoria.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        throw new Error("La fecha debe tener formato YYYY-MM-DD.");
    }
    if (hora.trim() === "") {
        throw new Error("La hora es obligatoria.");
    }
    if (!/^\d{2}:\d{2}$/.test(hora)) {
        throw new Error("La hora debe tener formato HH:MM.");
    }
}

export const validarIdCita = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
}