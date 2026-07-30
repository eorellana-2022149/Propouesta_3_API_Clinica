# Propuesta 3 - API Clinica

## Descripcion

API REST desarrollada en TypeScript para la administracion de una clinica. Permite gestionar especialidades, pacientes, medicos, horarios, citas y consultas mediante peticiones HTTP utilizando JSON.

Los datos son almacenados en archivos JSON y las pruebas fueron realizadas utilizando Postman.

README echo con ayuda de la IA
En el archivo Propuesta 3, Clinica.postman_collection.json solo debe de importarse en postamn para ver todas las prubeas de mejor manera

---

# Tecnologias utilizadas

- TypeScript
- Node.js
- HTTP Module
- JSON
- Postman
- pnpm

---

# Requisitos

- Node.js instalado
- pnpm instalado

---

# Instalacion

1. Clonar el repositorio.

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Entrar a la carpeta del proyecto.

```bash
cd Propouesta_3_API_Clinica
```

3. Instalar las dependencias.

```bash
pnpm install
```

4. Ejecutar el proyecto.

```bash
pnpm start
```

Servidor:

```text
http://localhost:3000
```

---

# Estructura del proyecto

```
src
│
├── data
├── models
├── router
├── server
├── services
├── validations
├── utils
│
├── Index.ts
```

---

# Endpoints

## Especialidades

### Listar

```
GET /especialidades
```

### Buscar

```
GET /especialidades/buscar/:id
```

Ejemplo

```
GET /especialidades/buscar/1
```

### Agregar

```
POST /especialidades/agregar
```

Body

```json
{
    "id": 1,
    "nombre": "Medicina General"
}
```

### Actualizar

```
PUT /especialidades/actualizar
```

Body

```json
{
    "id": 1,
    "nombre": "Pediatria"
}
```

### Eliminar

```
DELETE /especialidades/eliminar/:id
```

---

## Pacientes

### Listar

```
GET /pacientes
```

### Buscar

```
GET /pacientes/buscar/:id
```

### Agregar

```
POST /pacientes/agregar
```

Body

```json
{
    "id": 1,
    "nombre": "Carlos",
    "apellido": "Lopez",
    "telefono": "12345678",
    "correo": "carlos@gmail.com"
}
```

### Actualizar

```
PUT /pacientes/actualizar
```

### Eliminar

```
DELETE /pacientes/eliminar/:id
```

---

## Medicos

### Listar

```
GET /medicos
```

### Buscar

```
GET /medicos/buscar/:id
```

### Agregar

```
POST /medicos/agregar
```

Body

```json
{
    "id": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "telefono": "87654321",
    "correo": "juan@gmail.com",
    "idEspecialidad": 1
}
```

### Actualizar

```
PUT /medicos/actualizar
```

### Eliminar

```
DELETE /medicos/eliminar/:id
```

---

## Horarios

### Listar

```
GET /horarios
```

### Buscar

```
GET /horarios/buscar/:id
```

### Agregar

```
POST /horarios/agregar
```

Body

```json
{
    "id": 1,
    "idMedico": 1,
    "dia": "Lunes",
    "horaInicio": "07:00",
    "horaFin": "11:00"
}
```

### Actualizar

```
PUT /horarios/actualizar
```

### Eliminar

```
DELETE /horarios/eliminar/:id
```

---

## Citas

### Listar

```
GET /citas
```

### Buscar

```
GET /citas/buscar/:id
```

### Agregar

```
POST /citas/agregar
```

Body

```json
{
    "id": 1,
    "idPaciente": 1,
    "idMedico": 1,
    "fecha": "2026-08-25",
    "hora": "09:00"
}
```

### Actualizar

```
PUT /citas/actualizar
```

### Eliminar

```
DELETE /citas/eliminar/:id
```

### Confirmar cita

```
PUT /citas/confirmar/:id
```

Ejemplo

```
PUT /citas/confirmar/1
```

### Atender cita

```
PUT /citas/atender/:id
```

Ejemplo

```
PUT /citas/atender/1
```

### Reprogramar cita

```
PUT /citas/reprogramar/:id
```

Body

```json
{
    "fecha": "2026-08-25",
    "hora": "10:30"
}
```

---

## Consultas

### Listar

```
GET /consultas
```

### Buscar

```
GET /consultas/buscar/:id
```

### Agregar

```
POST /consultas/agregar
```

Body

```json
{
    "id": 1,
    "idCita": 1,
    "diagnostico": "Gripe comun",
    "tratamiento": "Paracetamol cada 8 horas",
    "observaciones": "Reposo por tres dias"
}
```

### Actualizar

```
PUT /consultas/actualizar
```

### Eliminar

```
DELETE /consultas/eliminar/:id
```

---

# Ejemplo de respuesta

```json
{
    "mensaje": "Operacion realizada correctamente."
}
```

---

# Validaciones implementadas

- No se permiten IDs repetidos.
- Todos los IDs deben ser numeros enteros mayores que cero.
- Los campos obligatorios no pueden ir vacios.
- Los nombres deben cumplir con la longitud minima establecida.
- El paciente debe existir para crear una cita.
- El medico debe existir para crear una cita.
- El medico debe tener un horario disponible.
- No se pueden crear citas duplicadas para el mismo medico en la misma fecha y hora.
- Solo se pueden confirmar citas pendientes.
- Solo se pueden atender citas confirmadas.
- Solo se pueden registrar consultas para citas atendidas.
- Una cita solo puede tener una consulta registrada.

---

# Pruebas

Todas las pruebas de la API fueron realizadas mediante Postman utilizando solicitudes HTTP y formato JSON.

Se incluye la coleccion de Postman junto con el proyecto para facilitar la prueba de todos los endpoints.

---
