function notificarCambios() {
  //Seteamos la hora de google sheet donde queremos cojer los correos
  var hojaCorreos = SpreadsheetApp.getActive().getSheetByName('Correos');
  Logger.log("Seteado las hoja de correo");
  
  //Seteamos la la lista de correos de una columna hasta su ultima celda
  var listaCorreos = hojaCorreos.getRange(2, 1, hojaCorreos.getLastRow()).getRow();
  Logger.log("Seteado la lista de correo");
    
  for(var i = 0; i<listaCorreos.length;i++){
    Logger.log("Vuelta " + i);
    email = listaCorreos.valueOf(i)
    
    MailApp.sendEmail(email, "Cambios Realizados en la hoja de cálculo", "Hola, le notificamos que se ha realizado un cambio, en el sector que esta usted monitorizando");
    Logger.log("Mandando el email");
  }    
}

function onEdit(e){
  
  //Asignando la celda que se ha cambiado
  var rangoE = e.range;
    
  //Asignando la fila de la celda donde se ha dado el cambio
  var filaE = rangoE.getRow();

  //Asignando la columna de la celda donde se ha dado el cambio
  var columnaE = rangoE.getColumn();
    
  //Asignando la hoja de correos para cojer los correos y notificar los cambios
  var hojaCorreos = SpreadsheetApp.getActive().getSheetByName('Correos');

  //Setea la fila desde la que se monitoriza el rango
  var filaDesdeMonitorizar = hojaCorreos.getRange(2, 2).getValue();

  //Setea la fila hasta la que se monitoriza el rango
  var columnaDesdeMonitorizar = hojaCorreos.getRange(2, 3).getValue();
    
  //Setea la columna desde la que se monitoriza el rango
  var filaHastaMonitorizar = hojaCorreos.getRange(5, 2).getValue();
  
  //Setea la columna hasta la que se monitoriza el rango
  var columnaHastaMonitorizar = hojaCorreos.getRange(5, 3).getValue();
    
  //La condicion evalua si la celda se encuentra dentro de el rango y manda los correos
  if(filaE >= filaDesdeMonitorizar && filaE <= filaHastaMonitorizar && columnaE >= columnaDesdeMonitorizar && columnaE <= columnaHastaMonitorizar){
    //notificarCambios(); 
    Logger.log("Se ha enviado el correo");
  }
}
