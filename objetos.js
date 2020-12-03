"use strict";

//Bloque de Clases con la Versión Antigua
//Clase Persona
function Persona(sNIF, sNombre, sApellidos, sDireccion){
    this.NIF = sNIF;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.direccion = sDireccion;
}
//Función ToHTMLRow de Persona
Persona.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF +"</td>";
    sFila += "<td>" + this.nombre +"</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";

    return sFila;
}
//Clase Conductor 
function Conductor(sNIF, sNombre, sApellidos, sDireccion, dCaducidadCarnet){
    Persona.call(this, sNIF, sNombre, sApellidos, sDireccion);
    this.caducidadCarnet = dCaducidadCarnet;
}
//Herencia de Métodos y Propiedades
Conductor.prototype = Object.create(Persona.prototype);
Conductor.prototype.constructor = Conductor;

//Función ToHTMLRow de Conductor
Conductor.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    var fecha = _formatearFecha(this.caducidadCarnet);
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + fecha + "</td>";

    return sFila;
}
//Clase Guardía Civil
function GuardiaCivil(sNIF, sNombre, sApellidos, sDireccion, sPuesto){
    Persona.call(this, sNIF, sNombre, sApellidos, sDireccion);
    this.puesto = sPuesto;

}
//Herencia de Métodos y Propiedades
GuardiaCivil.prototype = Object.create(Persona.prototype);
GuardiaCivil.prototype.constructor = GuardiaCivil;

//Función ToHTMLRow de Guardia civil.
GuardiaCivil.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.puesto + "</td>";

    return sFila;
}
//Fin del Bloque de Clases con la Versión Antigua


//Bloque de Clases con la Versión Nueva
//Clase Multa
class Multa {
    constructor(sIdMulta, sNIFConductor, sNIFGuardia, iImporte, bPagada, sDescripcion, dFecha){
        this.idMulta = sIdMulta;
        this.NIFConductor = sNIFConductor;
        this.NIFGuardia = sNIFGuardia;
        this.importe = iImporte;
        this.pagada = bPagada;
        this.descripcion = sDescripcion;
        this.fecha = dFecha;
    }
}
//Función ToHTMLRow de Multa
Multa.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idMulta + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";

    return sFila;
}

//Clase Leve
class Leve extends Multa{
    constructor(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha, bBonificada){
        super(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha);
        this.bonificada = bBonificada;
    }
}
//Función ToHTMLRow de Leve
Leve.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idMulta + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";
    sFila += "<td>" + this.bonificada + "</td>";

    return sFila;
}
//Clase Grave
class Grave extends Multa{
    constructor(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha, iPuntos){
        super(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha);
        this.puntos = iPuntos;
    }
}
//Función ToHTMLRow de Grave
Grave.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.idMulta + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";
    sFila += "<td>" + this.puntos + "</td>";

    return sFila;
}
//Clase DGT
class DGT {
    constructor(){
        this.multas = [];
        this.personas = [];
    }
//Bloque de Funciones de la Clase DGT
    //Función Alta Conductor
    altaConductor(oConductor){
        let oConductorExistente = null;

        oConductorExistente = _buscarConductor(oConductor.NIF);

        if(oConductorExistente == null){
            this.personas.push(oConductor);
            return true;
        }
        else{
            return false;
        }
    }
    //Función Alta Guardia Civil
    altaGuardiaCivil(oGuardiaCivil){
        let oGuardiaCivilExistente = null;

        oGuardiaCivilExistente = _buscarGuardia(oGuardiaCivil.NIF);

        if(oGuardiaCivilExistente == null){
            this.personas.push(oGuardiaCivil);
            return true;
        }
        else{
            return false;
        }
    }
    //Función Registrar Multa
    registrarMulta(oMulta){
        let oMultaExistente = null;

        oMultaExistente = _buscarMulta(oMulta.idMulta);

        if(oMultaExistente == null){
            this.multas.push(oMulta);
            return true;
        }
        else{ 
            return false;
        }
    }
    //Función Pagar Multa
    pagarMulta(idMulta){
        let oMultaExistente = null;

        oMultaExistente = _buscarMulta(idMulta);

        if(oMultaExistente == null){
            alert("Multa no registrada.");
        }
        else if(oMultaExistente !=null && oMultaExistente.pagada == true){
            alert("Multa pagada anteriormente.");
        }
        else{

            oMultaExistente.pagada = true;
            alert("La multa ha sido pagada correctamente.");
            ocultarFormularios();
        }
        
    }
    //Función Imprimir Multa
    imprimirMulta(idMulta){
        let oMultaExistente = null;
       oMultaExistente = _buscarMulta(idMulta);

       if(oMultaExistente==null)
       {
           return false;
       }
       else
       {
           return oMultaExistente;
       }
        
    }
    //Función Listar Conductores
    listadoConductores(){
        let sTabla = '<table border="1">';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Direccion</th>";
        sTabla += "<th>Caducidad Carnet</th></tr></thread>";

        let oConductor = this.personas.filter(oPersona => oPersona instanceof Conductor);
        
        sTabla += "<tbody>";

        for (let oPersona of oConductor){
            sTabla += oPersona.toHTMLRow()+"</tr>";
        }
        sTabla += "</tr></tbody></table>";

        return sTabla;
    }
    //Función Listar Guardias Civiles
    listadoGuardiaCiviles(){
        let sTabla = '<table border="1"';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Direccion</th>";
        sTabla += "<th>Puesto</th></tr>";

        let oGuardiaCivil = this.personas.filter(oPersona => oPersona instanceof GuardiaCivil);
        sTabla += "<tbody>";
        
        for(let oPersona of oGuardiaCivil){
            sTabla += oPersona.toHTMLRow()+"</tr>";
        }
        sTabla +="</tbody></table>";

        return sTabla;
    }
    //Función Listar Saldo Pendiente de Conductores
    listadoSaldoConductor(){
        let sTabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Saldo pendiente</th>";
        sTabla += "</tr></thread>";

        sTabla += "<tbody>";

        let oConductor = this.personas.filter(oP => oP instanceof Conductor);
        
        
        for(let i = 0; i<oConductor.length; i++){
            let saldo = 0;

            let multasPendientes = this.multas.filter(oPersona => oPersona.NIFConductor == oConductor[i].NIF && oPersona.pagada == false);

            if(multasPendientes.length != 0){
                sTabla += "<tr><td>"+oConductor[i].NIF;
                
            for(let j = 0; j<multasPendientes.length; j++){

                if(multasPendientes[j] instanceof Leve && multasPendientes[j].bonificada ==true){
                    saldo += multasPendientes[j].importe - (multasPendientes[j].importe*0.25);
                }
                else{
                    
                    saldo += multasPendientes[j].importe;
                }  
            }
            sTabla += "</td><td>"+saldo+" €</td></tr>"
            }
        }
        sTabla += "</tbody><table>";
        
        return sTabla;
    }
    //Función Listar Puntos de Conductores
    listadoPuntosConductor(){
        let sTabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Total Puntos</th>";
        sTabla += "</tr></thread>";
        
        sTabla += "<tbody>";

        let oConductor = this.personas.filter(oPersona => oPersona instanceof Conductor);
        let multasGraves = this.multas.filter(oPersona => oPersona instanceof Grave );

        for(let k = 0; k<oConductor.length; k++){
            let sumPuntos = 0;

            for(let x = 0; x<multasGraves.length; x++){
                
                if(oConductor[k].NIF == multasGraves[x].NIFConductor){
                    sumPuntos = sumPuntos + multasGraves[x].puntos;
                }
            }
            if(sumPuntos>0){
                sTabla += "<tr><td>"+oConductor[k].NIF+"</td>";
                sTabla += "<td>"+sumPuntos+"</td></tr>";
            }
            
        }
        sTabla += "</tbody></table>";

        return sTabla;
    }
    //Función Listar Multas por Guardias
    listadoMultasPorGuardia(){
        let sTabla = '<table border="1"';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Puesto</th>";
        sTabla += "<th>Número</th>";
        sTabla += "<th>Importe Total</th>";
        sTabla += "</tr></thread>";

        sTabla += "<tbody>";

        let oGuardiaCivil = this.personas.filter(oPersona => oPersona instanceof GuardiaCivil);

        for(let i = 0; i< oGuardiaCivil.length; i++){
            let importeTotal = 0;
            let contador = 0;
            for(let j = 0; j<this.multas.length; j++){
                
                if(this.multas[j].NIFGuardia == oGuardiaCivil[i].NIF){
                    if(this.multas[j] instanceof Leve && this.multas[j].bonificada == true){
                        importeTotal += this.multas[j].importe - (this.multas[j].importe*0.25);
                    }
                    else{
                        importeTotal += this.multas[j].importe;
                    }
                    
                    contador++;
                }
            }
            if(contador >0){
                sTabla += "<tr><td>"+oGuardiaCivil[i].NIF+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].nombre+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].apellidos+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].puesto+"</td>";
                sTabla += "<td>"+contador+"</td>";
                sTabla += "<td>"+importeTotal+" €</td></tr>";
            }
        }
        sTabla += "</tbody></table>";

        return sTabla;
    }
    //Función Listar Multas por Fecha
    listadoMultasPorFecha(fechaIni, fechaFin){
            let sTabla = '<table border="1">';
            sTabla += "<thread><tr>";
            sTabla += "<th>ID Multa</th>";
            sTabla += "<th>Fecha</th>";
            sTabla += "<th>Importe</th>";
            sTabla += "<th>Importe Total</th>";
            sTabla += "</tr></thread>";

            sTabla += "<tbody>";

        let importeTotal=0;

        for(let i = 0; i <this.multas.length; i++){
            if(this.multas[i].fecha >= Date.parse(fechaIni) && this.multas[i].fecha<= Date.parse(fechaFin)){

                var fecha = _formatearFecha(this.multas[i].fecha);

                sTabla+="<tr><td>"+this.multas[i].idMulta+"</td>";
                sTabla+="<td>"+fecha+"</td>";
                sTabla+="<td>"+this.multas[i].importe+" €</td>";
                sTabla+="<td>"+"-"+"</td></tr>";
            
                importeTotal+=this.multas[i].importe; 
            }
        }
            sTabla+="<tr><td>"+"-"+"</td>";
            sTabla+="<td>"+"-"+"</td>";
            sTabla+="<td>"+"-"+"</td>";
            sTabla+="<td>"+importeTotal+" €</td></tr>"
            sTabla+="</tbody></table>"
            
            return sTabla;
        }
}
//Fin del Bloque de Funciones de la Clase DGT
//Fin del Bloque de Clases con la Versión Nueva