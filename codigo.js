"use strict";

var oDGT = new DGT();
 
ocultarFormularios();

// Oculta los Formularios y Vaciar Área de Listado
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

//Fommulario de Alta Persona
function mostrarAltaPersona() {
    ocultarFormularios();
    formAltaConductor.style.display = "block";
}

//Formulario de Registro Multa 
function mostrarRegistroMulta() {
    ocultarFormularios();
    formRegistroMulta.style.display = "block";
}

//Formulario de Pagar Multa
function mostrarPagarMulta() {
    ocultarFormularios();
    formPagarMulta.style.display = "block";
}
//Formulario de Imprimir Multa
function mostrarImprimirMulta() {
  ocultarFormularios();
  formImprimirMulta.style.display = "block";
}
//Formulario de Listado de Multas por Fechas
function mostrarListadoMultasPorFecha(){
    ocultarFormularios();
    formListarMultasFecha.style.display = "block";
}
//Fin de Bloque de Funciones para Mostrar los Formularios

//Función Alta de Persona
  function aceptarAltaPersona() {
    let sNIF = formAltaConductor.txtNIF.value.trim();
    let sNombre = formAltaConductor.txtNombre.value.trim();
    let sApellidos = formAltaConductor.txtApellidos.value.trim();
    let sDireccion = formAltaConductor.txtDireccion.value.trim();
    let sCaducidad = formAltaConductor.txtCaducidadCarnet.value.trim()+"";
    let sPuesto = formAltaConductor.txtPuestoGuardia.value.trim()+"";

    if(sPuesto != "" && sCaducidad != ""){
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
    else if(sPuesto == ""){
      let oC = new Conductor(sNIF, sNombre, sApellidos, sDireccion,sCaducidad);
      if(oDGT.altaConductor(oC)){
        alert("Persona dada de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Persona ya registrada");
      }
    }
    else{
      let oP = new GuardiaCivil(sNIF, sNombre, sApellidos, sDireccion, sPuesto);
      if(oDGT.altaGuardiaCivil(oP)){
        alert("Persona dada de alta correctamente");
        ocultarFormularios();
      }
      else{
        alert("Persona ya registrada");
      }
    }
  }

//Finción de Alta de Multa 
function aceptarAltaMulta() {
  let sIdMulta = formRegistroMulta.txtIdMulta.value.trim();
  let sNIFConductor = formRegistroMulta.txtNIFConductor.value.trim();
  let sNIFGuardia = formRegistroMulta.txtNIFGuardia.value.trim();
  let sImporte = parseFloat(formRegistroMulta.txtImporteMulta.value.trim());
  let sPagada = false;
  let sDescripcion = formRegistroMulta.txtDescripcion.value;
  let sFecha = formRegistroMulta.txtFechaMulta.value;

  let sConductor = null;
  sConductor = _buscarConductor(sNIFConductor);
  let sGuardia = null;
  sGuardia = _buscarGuardia(sNIFGuardia);

  if(sConductor == null){
    alert("Conductor no registrado");
  }
  else if(sGuardia == null){
    alert("Guardia no registrado");
  }
  else{
    let oMulta;
    if(formRegistroMulta.rbTipoMulta.value == "leve"){
      let sBonificada;
      if(formRegistroMulta.ckMultaBonif.checked){
        sBonificada = true;
      }
      else{
        sBonificada = false;
      }
      oMulta = new Leve(sIdMulta,sNIFConductor,sNIFGuardia,sImporte,sPagada,sDescripcion,sFecha,sBonificada);
    }
    else{
      let sPuntos = formRegistroMulta.txtPtosSustraidos.value.trim();
      oMulta = new Leve(sIdMulta,sNIFConductor,sNIFGuardia,sImporte,sPagada,sDescripcion,sFecha,sPuntos);
    }

    if(oDGT.registrarMulta(oMulta)){
      alert("Multa registrada correctamente");
      ocultarFormularios();
    }
    else{
      alert("Multa ya registrada");
    }
  }
}

//Función de Pago de Multa
function aceptarPagarMulta(){
  let idMultaBuscada = formPagarMulta.txtIdMulta.value.trim();

  if(formPagarMulta.ckMultaPagada.checked){
    oDGT.pagarMulta(idMultaBuscada);
  }
  else{
    alert("Marque la casilla 'Pagada' para establecer que la multa ha sido pagada.")
  }
}

//Fuinción Imprimir Multa
function botonImprimirMulta(){
  let oMultaBuscada = null;
  let multa1= new Multa(formImprimirMulta.txtIdMulta.value, "", "",0 , false, "",null)
  oMultaBuscada = oDGT.imprimirMulta(multa1);

  if(oMultaBuscada==false)
  {
      alert("La multa que desea imprimir no existe");
  }
  else
  {
      multa = open("Multa.html");
      multa.document.getElementById("idMulta").innerHTML= oMultaBuscada.idMulta;
      multa.document.getElementById("nifConductor").innerHTML= oMultaBuscada.nifConductor;
      multa.document.getElementById("nifGuardia").innerHTML= oMultaBuscada.nifGuardia;
      multa.document.getElementById("importe").innerHTML= oMultaBuscada.importe;
      multa.document.getElementById("pagada").innerHTML= oMultaBuscada.pagada;
      multa.document.getElementById("descripcion").innerHTML= oMultaBuscada.descripcion;
      multa.document.getElementById("fecha").innerHTML= oMultaBuscada.fecha;
      //multa.document.getElementById("tipo").innerHTML= oMultaBuscada.tipo;
  }
}

//Bloque de Funciones de Búsqueda de Elementos
function _buscarConductor(NIFBuscado) {
  let oConductorExistente = null;

  oConductorExistente = oDGT.personas.find(oConductor => oConductor.NIF == NIFBuscado && oConductor instanceof Conductor);

  return oConductorExistente;
}
function _buscarGuardia(NIFBuscado) {
  let oGuardiaExistente = null;

  oGuardiaExistente = oDGT.personas.find(oGuardia => oGuardia.NIF == NIFBuscado && oGuardia instanceof GuardiaCivil);

  return oGuardiaExistente;
}
function _buscarMulta(idMultaBuscada) {
  let oMultaExistente = null;

  oMultaExistente = oDGT.multas.find(oMulta => oMulta.idMulta == idMultaBuscada);

  return oMultaExistente;
}
//Fin del Bloque de Búsqueda de Elementos

//Bloque de Funciones Mostrar Listados
function mostrarListadoSaldoConductor(){
  ocultarFormularios();
  
  let sListado = oDGT.listadoSaldoConductor();
  
  document.getElementById("areaListado").innerHTML= sListado;
  document.getElementById("titulo").innerHTML= "Listado de Conducoters con Saldo Pendiente";
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
  let sListado = oDGT.listadoMultasPorFecha(fechaInicial,fechaFinal);
  
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

// Fuinción Imprimir Multa---------------------------------------------------------------------------------------
function botonImprimirMulta(){
  let oMultaBuscada = null;
  let multa1= new Multa(formImprimirMulta.txtIdMulta.value, "", "",0 , false, "",null)
  oMultaBuscada = oDGT.imprimirMulta(multa1);

  if(oMultaBuscada==false)
  {
      alert("La multa que desea imprimir no existe");
  }
  else
  {
      multa = open("Multa.html");
      multa.document.getElementById("idMulta").innerHTML= oMultaBuscada.idMulta;
      multa.document.getElementById("nifConductor").innerHTML= oMultaBuscada.nifConductor;
      multa.document.getElementById("nifGuardia").innerHTML= oMultaBuscada.nifGuardia;
      multa.document.getElementById("importe").innerHTML= oMultaBuscada.importe;
      multa.document.getElementById("pagada").innerHTML= oMultaBuscada.pagada;
      multa.document.getElementById("descripcion").innerHTML= oMultaBuscada.descripcion;
      multa.document.getElementById("fecha").innerHTML= oMultaBuscada.fecha;
      //multa.document.getElementById("tipo").innerHTML= oMultaBuscada.tipo;
  }
}