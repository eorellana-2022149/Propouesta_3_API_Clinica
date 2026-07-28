const diasValidos = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
];

export const validarHorario = (
    id: number,
    idMedico: number,
    dia: string,
    horaInicio: string,
    horaFin: string
): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
    if (isNaN(idMedico) || !Number.isInteger(idMedico) || idMedico <= 0) {
        throw new Error("El medico es invalido.");
    }
    if (!diasValidos.includes(dia)) {
        throw new Error("El dia es invalido.");
    }
    if (!/^\d{2}:\d{2}$/.test(horaInicio)) {
        throw new Error("La hora de inicio es invalida.");
    }
    if (!/^\d{2}:\d{2}$/.test(horaFin)) {
        throw new Error("La hora final es invalida.");
    }
    if (horaInicio >= horaFin) {
        throw new Error("La hora final debe ser mayor que la hora inicial.");
    }
}

export const validarIdHorario = (id: number): void => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new Error("El id es invalido.");
    }
}