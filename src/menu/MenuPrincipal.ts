import { rl } from "../utils/Readline.js";

export async function menuPrincipal() {
    let opcion = 0;
    do{
        console.clear();
        console.log("========== CLINICA ==========");
        console.log("1. Especialidades");
        console.log("2. Pacientes");
        console.log("3. Medicos");
        console.log("4. Horarios");
        console.log("5. Citas");
        console.log("6. Consultas");
        console.log("7. Reportes");
        console.log("8. Salir");
        opcion = Number(await rl.question("\nSeleccione una opcion: "));
        switch(opcion){

            case 1:
                console.log("\nEspecialidades");
                break;

            case 2:
                console.log("\nPacientes");
                break;

            case 3:
                console.log("\nMedicos");
                break;

            case 4:
                console.log("\nHorarios");
                break;

            case 5:
                console.log("\nCitas");
                break;

            case 6:
                console.log("\nConsultas");
                break;

            case 7:
                console.log("\nReportes");
                break;

            case 8:
                console.log("\nChao");
                break;

            default:
                console.log("\nOpción invalida.");
        }
        if(opcion !== 8){
            await rl.question("\nPresione Enter para continuar...");
        }
    }while(opcion !== 8);
    rl.close();
}