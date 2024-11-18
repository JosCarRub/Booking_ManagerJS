class Cliente {
  #dniCliente;
  #nombre;
  #apellidos;
  #usuario;

  constructor(dniCliente, nombre, apellidos,usuario) {
    this.#dniCliente = dniCliente;
    this.#nombre = nombre;
    this.#apellidos = apellidos;
    this.#usuario = usuario;
  }


  get dniCliente() {
    return this.#dniCliente;
  }

  set dniCliente(dniCliente) {
    this.#dniCliente = dniCliente;
  }
  get nombre() {
    return this.#nombre;
  }

  set nombre(nombre) {
    this.#nombre = nombre;
  }
  get apellidos() {
    return this.#apellidos;
  }

  set apellidos(apellidos) {
    this.#apellidos = apellidos;
  }

  get usuario() {
    return this.#usuario;
  }

  set usuario(usuario) {
    this.#usuario = usuario;
  }

  toHTMLRow() {
    let fila = "<tr>";
    fila += "<td>" + this.dniCliente + "</td>";
    fila += "<td>" + this.nombre + "</td>";
    fila += "<td>" + this.apellidos + "</td>";
    fila += "<td>" + this.usuario + "</td>";

    return fila + "</tr>";
    
  }
}

class Alojamiento {
  #idAlojamiento;
  #numPersonas;

  constructor(idAlojamiento,numPersonas){
    this.#idAlojamiento = idAlojamiento;
    this.#numPersonas = numPersonas;
  }

  
get idAlojamiento() {
    return this.#idAlojamiento;
}

set idAlojamiento(value) {
    this.#idAlojamiento = value;
}


get numPersonas() {
    return this.#numPersonas;
}

set numPersonas(value) {
    this.#numPersonas = value;
}

toHTMLRow() {
    let fila = "<tr>";
    fila += "<td>" + this.idAlojamiento + "</td>";
    fila += "<td>" + this.numPersonas + "</td>";
    return fila;
  }

}


class Habitacion extends Alojamiento {
  #desayuno;
  constructor(idAlojamiento,numPersonas,desayuno) {
    super(idAlojamiento,numPersonas);
    this.#desayuno = desayuno;
  }

    //super

    get idAlojamiento() {
      return super.idAlojamiento; 
  }
    
  set idAlojamiento(idAlojamiento) {
      super.idAlojamiento = idAlojamiento; 
  }

  get numPersonas() {
      return super.numPersonas; 
  }
    
  set numPersonas(numPersonas) {
      super.numPersonas = numPersonas; 
  }

  // this

  get desayuno() {
    return this.#desayuno;
  }

  set desayuno(desayuno) {
    this.#desayuno = desayuno;
  }

  toHTMLRow() {
    let fila = super.toHTMLRow();
    fila += "<td>" + (this.desayuno ? "SI" : "NO") + "</td>";
    return fila + "</tr>"; 
  }
}

class Apartamento extends Alojamiento {
  #parking;
  #dormitorios;

  constructor(idAlojamiento,numPersonas,parking,dormitorios) {
    super(idAlojamiento,numPersonas);
    this.#parking = parking;
    this.#dormitorios = dormitorios;
  }

  //SUPER

get idAlojamiento() {
  return super.idAlojamiento; 
}
  
set idAlojamiento(idAlojamiento) {
    super.idAlojamiento = idAlojamiento; 
}

get numPersonas() {
    return super.numPersonas; 
}
  
set numPersonas(numPersonas) {
    super.numPersonas = numPersonas; 
}

//THIS

  get parking() {
    return this.#parking;
  }

  set parking(parking) {
    this.#parking = parking;
  }

  get dormitorios() {
    return this.#dormitorios;
  }

  set dormitorios(dormitorios) {
    this.#dormitorios = dormitorios;
  }

  toHTMLRow() {
    let fila = super.toHTMLRow();
    fila += "<td>" + (this.parking ? "SI" : "NO") + "</td>"; 
    fila += "<td>" + this.dormitorios + "</td>";               
    return fila + "</tr>";
  }
}

class Reserva {
  #idReserva;
  #cliente;
  #alojamientos = []
  #fechaInicio;
  #fechaFin;

  constructor(idReserva,cliente,alojamientos,fechaInicio,fechaFin) {
  this.#idReserva = idReserva;

  this.#cliente = Array.isArray(cliente) ? cliente : [cliente];

  this.#alojamientos = Array.isArray(alojamientos) ? alojamientos : [alojamientos];
  
  this.#fechaInicio = new Date(fechaInicio);
  this.#fechaFin = new Date(fechaFin);
  }

  get idReserva() {
    return this.#idReserva;
  }

  set idReserva(idReserva) {
      this.#idReserva = idReserva;
  }

  get clienteDni() {
    return this.#cliente.map(cliente => cliente.dniCliente);
  }


  
 get alojamientos(){
  return this.#alojamientos;
 }

 set alojamientos(alojamientos) {
  this.#alojamientos = alojamientos;
}
 

    
  get FechaInicio() {
      return this.#fechaInicio;
  }

  set FechaInicio(fechaInicio) {
      this.#fechaInicio = new Date(fechaInicio);
  }
  
  get FechaFin() {
      return this.#fechaFin;
  }
  
  
  set FechaFin(fechaFin) {
      this.#fechaFin = new Date(fechaFin);
  }

  toHTMLRow() {
    let fila = "<tr>";
    fila += "<td>" + this.idReserva + "</td>";  
    fila += "<td>" + this.clienteDni + "</td>";   
    fila += "<td>" + this.fechaFormateada(this.FechaInicio) + "</td>";
    fila += "<td>" + this.fechaFormateada(this.FechaFin) + "</td>";
    return fila + "</tr>";

  }

  fechaFormateada(fecha) {
    let dia = fecha.getDate().toString().padStart(2,"0");
    let mes = (fecha.getMonth()+ 1).toString().padStart(2,"0");
    let año = fecha.getFullYear();
  
    return `${dia}/${mes}/${año}`; 
  }
}

class Agencia {
  #clientes;
  #reservas;
  #alojamientos;

  constructor() {
    this.#clientes = [];
    this.#reservas = [];
    this.#alojamientos = [];
  }

  get clientes() {
    return this.#clientes;
  }

  set clientes(clientes) {
    this.#clientes = clientes;
  }

  get reservas() {
    return this.#reservas;
  }

  set reservas(reservas) {
    this.#reservas.push(reservas);
  }

  get alojamientos() {
    return this.#alojamientos;
  }

  set alojamientos(alojamientos) {
    this.#alojamientos = alojamientos;
  }


  altaCliente(oCliente) {

    let encontrado = this.#clientes.find((elem) => elem.dniCliente == oCliente.dniCliente); // FIND POR FILTER

    if (!encontrado) {
      this.#clientes.push(oCliente);
      return true;
    } else {
      return false;
    }
  }

  altaAlojamiento(oAlojamiento) {

    let encontrado = this.#alojamientos.find((elem) => elem.idAlojamiento == oAlojamiento.idAlojamiento); // FIND POR FILTER

    if (!encontrado) {
      this.#alojamientos.push(oAlojamiento);
      return true;
    } else {
      return false;
    }
  }

  altaReserva(oReserva) {
    let encontrado = this.#reservas.find((elem) => elem.idReserva == oReserva.idReserva); // FIND POR FILTER

    if (!encontrado) {

      this.#reservas.push(oReserva);
      return true;

    } else {

      return false;
    }
  }

  comprobarDisponibilidad(alojamientoId, dInicio, dFin) {

    for (let reserva of this.#reservas) {
        for (let alojamiento of reserva.alojamientos) {
            if (
                alojamiento.idAlojamiento === alojamientoId && 
                (
                    (dInicio >= reserva.FechaInicio && dInicio <= reserva.FechaFin) ||
                    (dFin >= reserva.FechaInicio && dFin <= reserva.FechaFin) ||       
                    (dInicio <= reserva.FechaInicio && dFin >= reserva.FechaFin)       
                )
            ) {
                return false; 
            }
        }
    }
    return true; 
}

  bajaReserva(idReserva) {
    //BUSCO INDICE
    let indice = this.#reservas.findIndex((elem) => elem.idReserva == idReserva); 

    if (indice !== -1) {

      this.#reservas.splice(indice,1);

      return true;

    } else {

      return false;
    }
  }
  

  listadoClientes() {

    let listadoClientes = this.#clientes;


    let salida = "<table border='1'>";
    
    salida += "<thead><tr><th>DNI</th><th>NOMBRE</th><th>APELLIDOS</th><th>USUARIO</th></thead><tbody>";

    for (let x of listadoClientes) {
      
      salida += x.toHTMLRow();
    }

    salida += "</tbody></table>";
    return salida;
  }

  listadoAlojamientos() {
    let listadoAlojamientos = this.#alojamientos;
    console.log(listadoAlojamientos);

    let salidaHabitacion = "<table border='1'><thead><tr><th>ID ALOJAMIENTO</th><th>NUMERO DE PERSONAS</th><th>DESAYUNO</th></thead><tbody>";
    let salidaApartamentos = "<table border='1'><thead><tr><th>ID ALOJAMIENTO</th><th>NUMERO DE PERSONAS</th><th>PARKING</th><th>DORMITORIOS</th></thead><tbody>";

    for (let x of listadoAlojamientos) {

      if (x instanceof Habitacion) {
      
      salidaHabitacion +=  x.toHTMLRow();

      } else if(x instanceof Apartamento) {
  
      salidaApartamentos += x.toHTMLRow();
       
    }    
  }
  salidaHabitacion += "</tbody></table><br><br>";
  salidaApartamentos += "</tbody></table>";
  return salidaHabitacion + salidaApartamentos;
}


listadoReservas() {

  let listadoReservas = this.#reservas;
  // FILTER ME DA TODAS LAS RESERVAS, FIND SOLO LA PRIMERA

  let salida = "<table border='1'>";
  salida += "<thead><tr><th>ID RESERVA</th><th>DNI CLIENTE</th><th>FECHA INICIO</th><th>FECHA FIN</th>";

  for (let x of listadoReservas) {
    console.log(x);
    salida += x.toHTMLRow();
    
  }
  
  salida += "</tbody></table>";
    return salida;

}


listadoReservasClientes(idCliente) {

  let listadoReservasClientes = this.#reservas.filter((elem) => elem.clienteDni == idCliente);
  // FILTER ME DA TODAS LAS RESERVAS, FIND SOLO LA PRIMERA

  let salida = "<table border='1'>";
  salida += "<thead><tr><th>ID RESERVA</th><th>DNI CLIENTE</th><th>FECHA INICIO</th><th>FECHA FIN</th>";

  if (listadoReservasClientes.length == 0) {
    alert("No existe ninguna reserva asociada al DNI introducido");
    return "";  
  }

  for (let x of listadoReservasClientes) {   
    salida += x.toHTMLRow();  
  }
  salida += "</tbody></table>";
  return salida;
}



listadoHabitacionesConDesayuno() {

  let habitacionesConDesayuno = this.#alojamientos.filter((elem) => elem instanceof Habitacion && elem.desayuno);

  habitacionesConDesayuno.sort((a, b) => {
    if (b.numPersonas == a.numPersonas) {
      return a.idAlojamiento - b.idAlojamiento; 
    }
    return b.numPersonas - a.numPersonas; 
  });

  let salida = "<table border='1'>";
  salida += "<thead><tr><th>ID ALOJAMIENTO</th><th>NUMERO DE PERSONAS</th><th>DESAYUNO</th></tr></thead><tbody>";

  
  for (let habitacion of habitacionesConDesayuno) {
    salida += habitacion.toHTMLRow(); 
  }

  salida += "</tbody></table>";
  return salida;

}
listadoReservasEntreFechas(fechaInicio, fechaFin) {

  fechaInicio = new Date(fechaInicio);
  fechaFin = new Date(fechaFin);

  let salida = "<table border='1'>";
  salida += "<thead><tr><th>ID RESERVA</th><th>DNI CLIENTE</th><th>FECHA INICIO</th><th>FECHA FIN</th>";

  let reservasFiltradas = this.#reservas.filter(reserva => {
    return (reserva.FechaInicio >= fechaInicio && reserva.FechaInicio <= fechaFin) ||
           (reserva.FechaFin >= fechaInicio && reserva.FechaFin <= fechaFin) ||
           (reserva.FechaInicio <= fechaInicio && reserva.FechaFin >= fechaFin);
  });

  for(let x of reservasFiltradas) {
    salida += x.toHTMLRow();
  }
  salida += "</tbody></table>";
  return salida;

  }
}