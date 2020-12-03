"use strict";
//Clase Persona Antigua
function Persona(sNIF, sNombre, sApellidos, sDireccion){
    this.NIF = sNIF;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.direccion = sDireccion;
}
Persona.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF +"</td>";
    sFila += "<td>" + this.nombre +"</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";

    return sFila;
}
//Clase Conductor Antigua
function Conductor(sNIF, sNombre, sApellidos, sDireccion, dCaducidadCarnet){
    Persona.call(this, sNIF, sNombre, sApellidos, sDireccion);
    this.caducidadCarnet = dCaducidadCarnet;
}

//Heredamos propiedades y métodos.
Conductor.prototype = Object.create(Persona.prototype);
Conductor.prototype.constructor = Conductor;

Conductor.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.caducidadCarnet + "</td>";

    return sFila;
}
//Clase Guardía Civil Antigua
function GuardiaCivil(sNIF, sNombre, sApellidos, sDireccion, sPuesto){
    Persona.call(this, sNIF, sNombre, sApellidos, sDireccion);
    this.puesto = sPuesto;

}

//Heredamos propiedades y métodos.
GuardiaCivil.prototype = Object.create(Persona.prototype);
GuardiaCivil.prototype.constructor = GuardiaCivil;

//ToHTMLRow de Guardia civil.
GuardiaCivil.prototype.toHTMLRow = function(){
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.puesto + "</td>";

    return sFila;
}




//Clase DGT Nueva
class DGT {
    constructor(){
        this.multas = [];
        this.personas = [];
    }
    altaConductor(oConductor){
        let oConductorExistente = null;

        oConductorExistente = _buscarConductor(oConductor.NIF);

        //Si el conductor no existe lo inserto
        if(oConductorExistente == null){
            this.personas.push(oConductor);
            return true;
        }else{
            //El DNI existe
            return false;
        }
    }
    
    altaGuardiaCivil(oGuardiaCivil){
        let oGuardiaCivilExistente = null;

        oGuardiaCivilExistente = _buscarGuardia(oGuardiaCivil.NIF);

        //Si el guardia no existe, lo inserto.
        if(oGuardiaCivilExistente == null){
            this.personas.push(oGuardiaCivil);
            return true;
        }else{
            //El DNI existe 
            return false;
        }
    }
    registrarMulta(oMulta){
        let oMultaExistente = null;

        oMultaExistente = _buscarMulta(oMulta.idMulta);

        //Si la multa no existe, lo inserto.
        if(oMultaExistente == null){
            this.multas.push(oMulta);
            return true;
        }else{
            //Tiene el mismo ID 
            return false;
        }
    }
    pagarMulta(idMulta){
        let oMultaExistente = null;

        oMultaExistente = _buscarMulta(idMulta);

        //Si no hay multa con el identificador
        if(oMultaExistente == null){

            //Multa no registrada
            alert("Multa no registrada.");
            //Si la multa existe pero no está pagada
        }else if(oMultaExistente !=null && oMultaExistente.pagada == true){

            //La multa existe pero está ya pagada
            alert("Multa pagada anteriormente.");
        }else{

            oMultaExistente.pagada = true;
            //Paga la multa
            alert("La multa ha sido pagada correctamente.");
            ocultarFormularios();
        }
        
    }
    listadoSaldoConductor(){
        let sTabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Saldo pendiente</th>";
        sTabla += "</tr></thread>";
        //Cuerpo de la tabla
        sTabla += "<tbody>";

        let oConductor = this.personas.filter(oP => oP instanceof Conductor);
        
        
        for(let i = 0; i<oConductor.length; i++){
            

            //Calculamos el saldo pendiente de pago 
            let saldo = 0;
            //Filtro las multas no pagadas.
            let multasPendientes = this.multas.filter(oP => oP.NIFConductor == oConductor[i].NIF && oP.pagada == false);

            //Si no tiene multas pendientes no aparece.
            if(multasPendientes != null){
                sTabla += "<tr><td>"+oConductor[i].NIF;
            
                
            for(let j = 0; j<multasPendientes.length; j++){

                if(multasPendientes instanceof Leve){
                    saldo += multasPendientes[j].importe - (multasPendientes[j].importe*0.25);
                }else{
                    
                    saldo += multasPendientes[j].importe;
                }
                
            }
            sTabla += "</td><td>"+saldo+"</td></tr>";

            }
        }
        sTabla += "</tbody><table>";
        
        return sTabla;
    }
    listadoPuntosConductor(){
        let sTabla = '<table border="1">';

        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Total Puntos</th>";
        sTabla += "</tr></thread>";
        //Cuerpo de la tabla
        sTabla += "<tbody>";

        let oConductor = this.personas.filter(oP => oP instanceof Conductor);
        let multasGraves = this.multas.filter(oP => oP instanceof Grave );

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
    listadoMultasPorGuardia(){
        /** listadoMultasPorGuardia –Genera un listado con los datos básicos de un Guardia (NIF,  nombre,  apellidos  y  puesto)  y  el  numero  e  importe  total  de  multas  que  ha impuesto */
        let sTabla = '<table border="1"';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Puesto</th>";
        sTabla += "<th>Número</th>";
        sTabla += "<th>Importe Total</th>";
        sTabla += "</tr></thread>";

        //Cuerpo de la tabla
        sTabla += "<tbody>";

        let oGuardiaCivil = this.personas.filter(oP => oP instanceof GuardiaCivil);

        for(let i = 0; i< oGuardiaCivil.length; i++){
            importeTotal = 0;
            contador = 0;
            for(let j = 0; j<this.multas.length; j++){
                
                if(this.multas[j].NIFGuardia == oGuardiaCivil[i]){
                    importeTotal += this.multas[j].importe;
                    contador++;
                }
            }
            if(contador >0){
                //Imprimimos dicho guardía.
                sTabla += "<tr><td>"+oGuardiaCivil[i].NIF+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].nombre+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].apellidos+"</td>";
                sTabla += "<td>"+oGuardiaCivil[i].puesto+"</td>";
                sTabla += "<td>"+contador+"</td>";
                sTabla += "<td>"+importeTotal+"</td></tr>";
            }
        }
        sTabla += "</tbody></table>";

        return sTabla;
    }
    listadoMultasPorFecha(fechaIni, fechaFin){
        /** listadoMultasPorFecha –Realiza  un  listado  resumen  con  los  idMulta,  fecha  e importe de todas las multas entre las fechas dadas. Debe aparecer el importe total de todas las multas entre ambas fechas. */
        let sTabla = '<table border="1"';
        sTabla += "<thread><tr>";
        sTabla += "<th>ID Multa</th>";
        sTabla += "<th>Fecha</th>";
        sTabla += "<th>Importe</th>";
        sTabla += "<th>Importe Total</th>";
        sTabla += "</tr></thread>";

        //Cuerpo de la tabla
        sTabla += "<tbody>";

        let oMultas = this.personas.filter(oP => oP.fecha);
    }
    listadoConductores(){
        // listadoConductores –Realiza un listado con todos los datos de los conductores.
        let sTabla = '<table border="1">';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Direccion</th>";
        sTabla += "<th>Caducidad Carnet</th></tr></thread>";

        let oConductor = this.personas.filter(oP => oP instanceof Conductor);
        
        sTabla += "<tbody>";

        for (let oP of oConductor){
            sTabla += oP.toHTMLRow();
        }
        sTabla += "</tr></tbody></table>";

        return sTabla;
    }
    listadoGuardiaCiviles(){
        let sTabla = '<table border="1"';

        sTabla += "<thread><tr>";
        sTabla += "<th>NIF</th>";
        sTabla += "<th>Nombre</th>";
        sTabla += "<th>Apellidos</th>";
        sTabla += "<th>Direccion</th>";
        sTabla += "<th>Puesto</th></tr>";

        let oGuardiaCivil = this.personas.filter(oP => oP instanceof GuardiaCivil);
        sTabla += "<tbody>";
        
        for(let oP of oGuardiaCivil){
            sTabla += oP.toHTMLRow()+"</tr>";
        }
        sTabla +="</tbody></table>";

        return sTabla;
    }
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
}





//Clase Multa Nueva
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

//Clase Leve Nueva
class Leve extends Multa{
    constructor(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha, bBonificada){
        super(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha);
        this.bonificada = bBonificada;
    }
}

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
//Clase Grave Nueva
class Grave extends Multa{
    constructor(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha, iPuntos){
        super(idMulta, NIFConductor, NIFGuardia, importe, pagada, descripcion, fecha);
        this.puntos = iPuntos;
    }
}
