let agencia = new Agencia();



function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  switch (sFormularioVisible) {
    case "frmAltas":
      frmAltas.style.display = "block";
      break;

    case "frmBajaReserva":
      frmBajaReserva.style.display = "block";
      break;

    case "frmListas":
      frmListas.style.display = "block";
      break;

    case "frmListaSegunCliente":
      frmListaSegunCliente.style.display = "block";
      break;
    
    case "frmListaHabitacionesConDesayuno":
      frmListaHabitacionesConDesayuno.style.display = "block";
      break;

    case "frmListaReservaEntreDosFechas":
      frmListaReservaEntreDosFechas.style.display = "block";
      break;   
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

function mostrarHabitacionApartamento() {
  const tipoAlojamiento = document.querySelector('input[name="tipoAlojamiento"]:checked').value;
  
  
  document.getElementById('habitacion').style.display = 'none';
  document.getElementById('apartamento').style.display = 'none';
  

  if (tipoAlojamiento === 'Habitacion') {
      document.getElementById('habitacion').style.display = 'block';
  } else if (tipoAlojamiento === 'Apartamento') {
      document.getElementById('apartamento').style.display = 'block';
  }
}

function mostrarListaSeleccionada() {
  const listaSeleccionada = document.querySelector('input[name="listaSeleccionada"]:checked').value;


  switch (listaSeleccionada) {
      case "listaAlojamientos":

          let salidaHtmlAlojamientos = agencia.listadoAlojamientos();
          document.getElementById("tipoTabla").innerHTML = "<b>TABLA DE ALOJAMIENTOS</b>";
          document.getElementById("tabla").innerHTML = salidaHtmlAlojamientos;

          break;
      case "listaClientes":
          let salidaHtmlClientes = agencia.listadoClientes();
          document.getElementById("tipoTabla").innerHTML = "<b>TABLA DE CLIENTES</b>";
          document.getElementById("tabla").innerHTML = salidaHtmlClientes;
          

          break;
      case "listaReservas":

          let salidaHtmlFechas = agencia.listadoReservas();
          document.getElementById("tipoTabla").innerHTML = "<b>TABLA DE RESERVAS</b>";
          document.getElementById("tabla").innerHTML = salidaHtmlFechas;
          
          break;
      
  }

}

function construirUsuario(dniCliente, nombre, apellidos) {
  usuario = `${nombre.slice(0,1).toLowerCase()}${apellidos.slice(0,3).toLowerCase()}${apellidos.split(" ")[1]?.slice(0, 3).toLowerCase() || ""}${dniCliente.slice(dniCliente.length - 3)}`;
  return usuario;
}



function aceptarAltaCliente() {
  let iDni = frmAltas.txtDni.value.trim();
  let sNombre = frmAltas.txtNombre.value.trim();
  let sApellidos = frmAltas.txtApellidos.value.trim();
  let oCliente;

  if (isNaN(iDni) || iDni.length == 0) {

    alert("El campo DNI debe ser completado SOLO con números");

  } else if (sNombre.length == 0) {

    alert("El campo Nombre debe estar completo")

  } else if(sApellidos.length == 0) {

    alert("El campo Apellidos debe estar completo")

  } else if(sNombre.length == 0 & sApellidos.length == 0) {

    alert("Los campos Nombre y Apellidos deben estar completo")
  
  } else {

    let usuario = construirUsuario(iDni,sNombre,sApellidos);

    iDni = parseInt(iDni);

    console.log(iDni,sNombre,sApellidos,usuario);

    oCliente = new Cliente(iDni,sNombre,sApellidos,usuario);

    if (agencia.altaCliente(oCliente)) {

      alert(`El Cliente ${oCliente.nombre} con usuario ${oCliente.usuario} ha sido registrado`);
      frmAltas.reset();
      
    } else {

      alert("Este cliente ya ha sido registrado previamente");

    }
  }
}



function altaAlojamiento() {
  let iIdAlojamiento = parseInt(frmAltas.txtIdAlojamiento.value.trim());
  let iNumPersonas = parseInt(frmAltas.txtNumPersonas.value.trim());
  const tipoAlojamiento = document.querySelector('input[name="tipoAlojamiento"]:checked').value;

  let boolDesayuno = frmAltas.boolDesayuno.value.trim();

  let iDormitorios = parseInt(frmAltas.numDormitorios.value.trim());
  let boolParking = frmAltas.boolParking.value.trim();
  
  let oAlojamiento;


  if (
    isNaN(iIdAlojamiento) ||
    isNaN(iNumPersonas)  
  ) {
    alert("Tienes que introducir números");
  } else {
    if(tipoAlojamiento == "Habitacion") {
      if(boolDesayuno == "si")
        boolDesayuno == true;
      else {
        boolDesayuno == false;
      }

      oAlojamiento = new Habitacion(iIdAlojamiento,iNumPersonas,boolDesayuno);
      if(agencia.altaAlojamiento(oAlojamiento)){
        alert("OK Habitacion Registrada");
      }
    } else if(tipoAlojamiento == "Apartamento") {
      if(boolParking == "si")
        boolParking = true;
      else {
        boolParking = false;
      }
      oAlojamiento = new Apartamento(iIdAlojamiento,iNumPersonas,boolParking,iDormitorios)
      if(agencia.altaAlojamiento(oAlojamiento)){
        alert("OK Apartamento Registrado");
      }

    }
  } 
}

function altaReserva() {

  let iIdReserva = parseInt(document.getElementById("txtIdReserva").value.trim());
  let iIdCliente = parseInt(document.getElementById("txtDniCliente").value.trim());
  let iIdAlojamientoReserva = parseInt(document.getElementById("txtIdAlojamientoEnReserva").value.trim());

  let dateFechaInicio = new Date(frmAltas.fechaInicio.value);
  let dateFechaFin = new Date(frmAltas.fechaFin.value);

  console.log(iIdReserva,iIdCliente,iIdAlojamientoReserva,dateFechaInicio,dateFechaFin);

  let oCliente = agencia.clientes.find((elem) => elem.dniCliente == iIdCliente);

  let oAlojamiento = agencia.alojamientos.find((elem) => elem.iIdAlojamientoReserva == agencia.alojamientos.idAlojamiento);
  
  let diaActual = new Date();


  console.log(oAlojamiento);

  console.log(oCliente);


  if (isNaN(iIdReserva) || isNaN(iIdCliente) || isNaN(iIdAlojamientoReserva)) {

    alert("Los campos ID deben ser números");

  } else if (
    iIdReserva.length == 0 ||
    iIdCliente.length == 0 ||
    iIdAlojamientoReserva.length == 0)
    {

    alert("Tienes que completar todos los campos");

  } else if (!oCliente){
    alert("El cliente con el DNI proporcionado no está previamente registrado");

  } else if (!oAlojamiento) {

    alert("El alojamiento con el ID proporcionado no está previamente registrado");

  } else if (dateFechaInicio < diaActual || dateFechaFin < diaActual) {

    alert("Las fechas del inicio de la Reserva no pueden ser anteriores al día actual");
    
  } else if (dateFechaInicio > dateFechaFin) {

    alert("La fecha de inicio de la Reserva no puede ser posterior a la fecha de fin de la propia Reserva");

  } else if(!agencia.comprobarDisponibilidad(iIdAlojamientoReserva,dateFechaInicio,dateFechaFin)) {

    alert(`Alojamiento no disponible en la fecha seleccionada`);

  } else {

    let oReserva = new Reserva(iIdReserva,oCliente,oAlojamiento,dateFechaInicio,dateFechaFin);

    if(agencia.altaReserva(oReserva)) {

      alert(`Reserva registrada por ${oCliente.nombre}`)
    }
  }

}


function cancelarReserva() {

let iIdReserva = parseInt(document.getElementById("txtIDParaCancelacionReserva").value.trim());

if(isNaN(iIdReserva) || iIdReserva.length == 0) {

  alert("El ID de la RESERVA debe estar completo y debe ser un número")

} else if (agencia.bajaReserva(iIdReserva)){

  alert("Reserva cancelada")

} else {

  alert("NO SE ENCUENTRA NINGUNA RESERVA POR ESE ID")

}

}


function mostrarListaReservaPorClientes() {

  let iDniCliente = parseInt(document.getElementById("txtDniParaReservaPorCliente").value.trim());

  if(isNaN(iDniCliente) || iDniCliente.length == 0) {

    alert("El campo DNI debe ser un número y debe estar completo")

  } else {

    let salidaHtmlReservasClientes = agencia.listadoReservasClientes(iDniCliente);
    document.getElementById("tipoTablaReservaPorCliente").innerHTML = "<b>TABLA DE RESERVAS POR CLIENTE</b>";
    document.getElementById("tablaReservaPorCliente").innerHTML = salidaHtmlReservasClientes;

  }
}


function MostrarListaHabitacionesConDesayuno() {
  let salidaHtmlHabitacionesConDesayuno = agencia.listadoHabitacionesConDesayuno();
    document.getElementById("tipoTablaHabitacionesConDesayuno").innerHTML = "<b>TABLA DE HABITACIONES CON DESAYUNO</b>";
    document.getElementById("tablaHabitacionesConDesayuno").innerHTML = salidaHtmlHabitacionesConDesayuno;
}


function reservaEntreDosFechas() {
  let fechaInicio = document.getElementById("fechaInicioReserva").value;
  let fechaFin = document.getElementById("fechaFinReserva").value;
  
  if (!fechaInicio || !fechaFin) {
      alert("Por favor, ingrese ambas fechas.");
      return;
  }

  let inicio = new Date(fechaInicio);
  let fin = new Date(fechaFin);
  let salidaHtmlreservas = agencia.listadoReservasEntreFechas(inicio, fin);

  document.getElementById("tipoTablaReservaEntreFechas").innerHTML = "<b>TABLA DE HABITACIONES CON DESAYUNO</b>";
  document.getElementById("tablaReservaEntreFechas").innerHTML = salidaHtmlreservas;
}




