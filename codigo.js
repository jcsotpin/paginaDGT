"use strict";

 // Programa principal
 var oDGT = new DGT();

 //Bloque de Añadir Datos de Ejemplo
 var conductor1 = new Conductor("11111111A", "Lola", "Mento", "Medusa 12", Date.parse("2022-08-16"));
 var conductor2 = new Conductor("22222222B", "Susana", "Torio", "Piruleta 3", Date.parse("2022-10-16"));
 var conductor3 = new Conductor("33333333C", "Esteban", "Dido", "Piruleta 3", Date.parse("2022-02-01"));

 oDGT.altaConductor(conductor1);
 oDGT.altaConductor(conductor2);
 oDGT.altaConductor(conductor3);

 var guardia1 = new GuardiaCivil("44444444D", "Armando", "Jaleo", "Micrófono 28", "Cabo");
 var guardia2 = new GuardiaCivil("55555555E", "Ana", "Tomía", "Aceituna 16", "Sargento");
 var guardia3 = new GuardiaCivil("66666666F", "Elsa", "Capunta", "Micrófono 28", "Cabo");

 oDGT.altaGuardiaCivil(guardia1);
 oDGT.altaGuardiaCivil(guardia2);
 oDGT.altaGuardiaCivil(guardia3);

 var conductor4 = new Conductor("77777777G", "Rosa", "Melano", "Cadomuso 31", Date.parse("2022-02-01"));
 var guardia4 =new GuardiaCivil("77777777G", "Rosa", "Melano", "Cadomuso 31", "Sargento");
 oDGT.altaConductor(conductor4);
 oDGT.altaGuardiaCivil(guardia4);

 var multa1 = new Leve("1", "11111111A", "44444444D", 100.00, false, "Exceso de velocidad", Date.parse("2020-12-01"), false);
 var multa2 = new Leve("2", "22222222B", "55555555E", 100.00, false, "Exceso de velocidad", Date.parse("2020-12-01"), true);
 oDGT.registrarMulta(multa1);
 oDGT.registrarMulta(multa2);

 var multa3 = new Grave("3", "11111111A", "44444444D", 450.50, false, "Temeridad en ciudad", Date.parse("2020-12-01"), 3);
 var multa4 = new Grave("4", "22222222B", "55555555E", 450.50, false, "Atropello Grave", Date.parse("2020-12-01"), 10);
 oDGT.registrarMulta(multa3);
 oDGT.registrarMulta(multa4);
//Fin del Bloque de Añadir Datos de Ejemplo

//Llamada a la Función de Ocultar Formularios
  ocultarFormularios();

//Función para Ocultar los Formularios y el Área de Listado
function ocultarFormularios() {
    formAltaConductor.style.display = "none";
    formRegistroMulta.style.display = "none";
    formPagarMulta.style.display = "none";
    formImprimirMulta.style.display = "none";
    formListarMultasFecha.style.display = "none";
    
    document.getElementById("titulo").innerHTML = "";
    document.getElementById("areaListado").innerHTML = "";
}

//Bloque de Funciones para Mostrar los Formularios
//Mostrar Formulario de Alta Persona
function mostrarAltaPersona() {
    ocultarFormularios();
    formAltaConductor.style.display = "block";
}

//Mostrar Formulario de Registro Multa
function mostrarRegistroMulta() {
    ocultarFormularios();
    formRegistroMulta.style.display = "block";
}

//Mostrar Formulario de Pagar Multa
function mostrarPagarMulta() {
    ocultarFormularios();
    formPagarMulta.style.display = "block";
}
//Mostrar Formulario de Imprimir Multa
function mostrarImprimirMulta() {
  ocultarFormularios();
  formImprimirMulta.style.display = "block";
}
//Mostrar Formulario de Listado de Multas por Fechas
function mostrarListadoMultasPorFecha(){
    ocultarFormularios();
    formListarMultasFecha.style.display = "block";
}
//Fin del Bloque de Funciones para Motrar Formularios

//Bloque de Funciones Buscar Elementos y Función de Formateo de Fechas
function _buscarConductor(nifBuscado) {
  let oConductorExistente = null;

  oConductorExistente = oDGT.personas.find(oConductor => oConductor.NIF == nifBuscado && oConductor instanceof Conductor);

  return oConductorExistente;
}
function _buscarGuardia(nifBuscado) {
  let oGuardiaExistente = null;

  oGuardiaExistente = oDGT.personas.find(oGuardia => oGuardia.NIF == nifBuscado && oGuardia instanceof GuardiaCivil);

  return oGuardiaExistente;
}
function _buscarMulta(idMultaBuscada) {
  let oMultaExistente = null;

  oMultaExistente = oDGT.multas.find(oMulta => oMulta.idMulta == idMultaBuscada);

  return oMultaExistente;
}
function _formatearFecha(fecha){

    let fechaFormateada = "";
    var fechaNueva = new Date(fecha);
    
    var dia = fechaNueva.getDate();
    var mes = fechaNueva.getMonth();
    var anyo = fechaNueva.getFullYear();
    fechaFormateada += dia +"/"+mes+"/"+anyo;
   
    return fechaFormateada;

}
//Fin del Bloque de Funciones Buscar Elementos y Función de Formateo de Fechas

//Bloque de Funciones Principales
//Función Alta de Persona
  function aceptarAltaPersona() {
    let sNIF = formAltaConductor.txtNIF.value.trim();
    let sNombre = formAltaConductor.txtNombre.value.trim();
    let sApellidos = formAltaConductor.txtApellidos.value.trim();
    let sDireccion = formAltaConductor.txtDireccion.value.trim();
    let sCaducidad = Date.parse(formAltaConductor.txtCaducidadCarnet.value.trim());
    let sPuesto = formAltaConductor.txtPuestoGuardia.value.trim()+"";
    console.log(formAltaConductor.txtCaducidadCarnet.value.trim());
    if(sPuesto != "" && isNaN(sCaducidad) == false){
      let oCG = new Conductor(sNIF, sNombre, sApellidos, sDireccion,sCaducidad);
      if(oDGT.altaConductor(oCG)){
        alert("Conductor dado de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Conductor ya registrado");
      }

      let oGC = new GuardiaCivil(sNIF, sNombre, sApellidos, sDireccion, sPuesto);
      if(oDGT.altaGuardiaCivil(oGC)){
        alert("Guardia dado de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Guardia ya registrado");
      }
    }
    else if(sPuesto == "" && isNaN(sCaducidad) == false){
      let oC = new Conductor(sNIF, sNombre, sApellidos, sDireccion,sCaducidad);
      if(oDGT.altaConductor(oC)){
        alert("Conductor dada de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Conductor ya registrado");
      }
    }else if(sPuesto !="" && isNaN(sCaducidad) == true){
      let oP = new GuardiaCivil(sNIF, sNombre, sApellidos, sDireccion, sPuesto);
      if(oDGT.altaGuardiaCivil(oP)){
        alert("Guardia dado de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Guardia ya registrado");
      }
    }else{
      alert("Los datos del formulario no estan rellenos.");
    }
  }

//Función Alta de Multa
  function aceptarAltaMulta() {
    let sIdMulta = formRegistroMulta.txtIdMulta.value.trim();
    let sNifConductor = formRegistroMulta.txtNIFConductor.value.trim();
    let sNifGuardia = formRegistroMulta.txtNIFGuardia.value.trim();
    let sImporte = parseFloat(formRegistroMulta.txtImporteMulta.value.trim());
    let sPagada = false;
    let sDescripcion = formRegistroMulta.txtDescripcion.value;
    let sFecha = formRegistroMulta.txtFechaMulta.value;

    let sConductor = null;
    sConductor = _buscarConductor(sNifConductor);
    
    let sGuardia = null;
    sGuardia = _buscarGuardia(sNifGuardia);

  if(sConductor == null){
    alert("Conductor no registrado");
  }
  else if(sGuardia == null){
    alert("Guardia no registrado");
  }
  else{
    let oMulta;
    if(formRegistroMulta.rbTipoMulta.value == "leve"){
      let sBonificada = false;
      if(formRegistroMulta.ckMultaBonif.checked){
        sBonificada = true;
      }
      oMulta = new Leve(sIdMulta,sNifConductor,sNifGuardia,sImporte,sPagada,sDescripcion,sFecha,sBonificada);
    }else{
      let sPuntos = formRegistroMulta.txtPtosSustraidos.value.trim();
      oMulta = new Grave(sIdMulta,sNifConductor,sNifGuardia,sImporte,sPagada,sDescripcion,sFecha,sPuntos);
    }

    if(oDGT.registrarMulta(oMulta)){
      alert("Multa registrada correctamente");
      ocultarFormularios();
    }else{
      alert("Multa ya registrada");
    }
  }
}

//Función Pagar Multa
function aceptarPagarMulta(){
  let idMultaBuscada = formPagarMulta.txtIdMulta.value.trim();

  if(formPagarMulta.ckMultaPagada.checked){
    oDGT.pagarMulta(idMultaBuscada);
  }
  else{
    alert("Marque la casilla 'Pagada' para establecer que la multa ha sido pagada.")
  }
}

//Función Imprimir Multa
function botonImprimirMulta(){
  let oMultaBuscada = null;
  let idMultaDada = formImprimirMulta.txtIdMulta.value.trim();
  oMultaBuscada = _buscarMulta(idMultaDada);

  if(oMultaBuscada==null)
  {
      alert("La multa que desea imprimir no existe");
  }
  else
  {
      
      var fecha = _formatearFecha(oMultaBuscada.fecha);
      var multa = window.open("Multa.html");
      multa.document.write('<head><title>Multa</title><meta charset="utf-8"></head>');
      //si es leve
      if(oMultaBuscada instanceof Leve){
        multa.document.write('<h1>Multa</h1>');
        multa.document.write('<table border="1">');
        multa.document.write('<tr>');
        multa.document.write('<td>Id Multa</td><td id="idMulta">'+oMultaBuscada.idMulta+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>NIF Conductor</td><td id="nifConductor">'+oMultaBuscada.NIFConductor+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>NIF Guardia Civil</td><td id="nifGuardia">'+oMultaBuscada.NIFGuardia+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Importe</td><td id="importe">'+oMultaBuscada.importe+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Pagada</td><td id="pagada">');
        if(oMultaBuscada.pagada){
          multa.document.write("SÍ");
        }else{
          multa.document.write("NO");
        };
        multa.document.write('</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Descripción</td><td id="descripcion">'+oMultaBuscada.descripcion+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Fecha</td><td id="fecha">'+fecha+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Bonificada</td><td id="bonificada">');
        if(oMultaBuscada.bonificada){
          multa.document.write("SÍ");
        }else{
          multa.document.write("NO");
        };
        multa.document.write('</td>');
        multa.document.write('</tr>');
        multa.document.write('</table>');
      }else{
        multa.document.write('<h1>Multa</h1>');
        multa.document.write('<table border="1">');
        multa.document.write('<tr>');
        multa.document.write('<td>Id Multa</td><td id="idMulta">'+oMultaBuscada.idMulta+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>NIF Conductor</td><td id="nifConductor">'+oMultaBuscada.NIFConductor+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>NIF Guardia Civil</td><td id="nifGuardia">'+oMultaBuscada.NIFGuardia+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Importe</td><td id="importe">'+oMultaBuscada.importe+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Pagada</td><td id="pagada">');
        if(oMultaBuscada.pagada){
          multa.document.write("SÍ");
        }else{
          multa.document.write("NO");
        };
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Descripción</td><td id="descripcion">'+oMultaBuscada.descripcion+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Fecha</td><td id="fecha">'+fecha+'</td>');
        multa.document.write('</tr>');
        multa.document.write('<tr>');
        multa.document.write('<td>Puntos</td><td id="puntos">'+oMultaBuscada.puntos+'</td>');
        multa.document.write('</tr>');
        multa.document.write('</table>');
      }   
  }
}
//Fin del Bloque de Funciones Principales

//Bloque de Funciones Mostrar Listados
function mostrarListadoSaldoConductor(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoSaldoConductor();
  
  document.getElementById("areaListado").innerHTML= sListado;
  document.getElementById("titulo").innerHTML= "Listado de conductores con saldo pendiente";
}

function mostrarListadoPuntosConductor(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoPuntosConductor();
  
  document.getElementById("titulo").innerHTML= "Listado de los Puntos de Sanción por Conductor";
  document.getElementById("areaListado").innerHTML= sListado;
}

function mostrarListadoMultasPorGuardia(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoMultasPorGuardia();
  
  document.getElementById("titulo").innerHTML= "Listado de Multas por Guardia";
  document.getElementById("areaListado").innerHTML= sListado;
  
}
function botonListarMultasPorFechas(){
  ocultarFormularios();

  let fechaInicial = formListarMultasFecha.txtFechaInicio.value;
  let fechaFinal = formListarMultasFecha.txtFechaFin.value;

  let sListado = oDGT.listadoMultasPorFecha(fechaInicial, fechaFinal);

  document.getElementById("titulo").innerHTML= "Listado de Multas en las Fechas dadas";
  document.getElementById("areaListado").innerHTML= sListado;
}

function mostrarListadoConductores(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoConductores();
  
  document.getElementById("titulo").innerHTML= "Listado de Conductores";
  document.getElementById("areaListado").innerHTML= sListado;
}

function mostrarListadoGuardias(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoGuardiaCiviles();
  
  document.getElementById("titulo").innerHTML= "Listado de Guardias";
  document.getElementById("areaListado").innerHTML= sListado;
}
//Fin del Bloque de Funciones Mostrar Listados