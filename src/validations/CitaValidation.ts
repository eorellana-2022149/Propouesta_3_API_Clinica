export const estadosValidos = [
    "Pendiente",
    "Confirmada",
    "Atendida",
    "Cancelada"
];

export const validarCita = (
    id: number,
    idPaciente: number,
    idMedico: number,
    fecha: string,
    hora: string,
    estado: string
): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id de la cita es invalido.");
    }
    if (isNaN(idPaciente) || !Number.isInteger(idPaciente) || idPaciente <= 0) {
        throw new Error("El paciente es invalido.");
    }
    if (isNaN(idMedico) || !Number.isInteger(idMedico) || idMedico <= 0) {
        throw new Error("El medico es invalido.");
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        throw new Error("La fecha tiene un formato invalido.");
    }
    const fechaValidar = new Date(fecha);
    if (isNaN(fechaValidar.getTime())) {
        throw new Error("La fecha no es valida.");
    }
    if (!/^\d{2}:\d{2}$/.test(hora)) {
        throw new Error("La hora tiene un formato invalido.");
    }
    if (!estadosValidos.includes(estado)) {
        throw new Error("El estado de la cita es invalido.");
    }
};

export const validarIdCita = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id de la cita es invalido.");
    }
};