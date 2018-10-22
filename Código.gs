function notificarCambios() {
  var valor
  
  var hojaCorreos = SpreadsheetApp.getActive().getSheetByName('Correos');
  
  var listaCorreos = hojaCorreos.getRange(2, 1, hojaCorreos.getLastRow()).getRow();
  
  for(var i = 0; i<listaCorreos.length;i++){
    
    email = listaCorreos.valueOf(i)
    
    MailApp.sendEmail(email, "Cambios Realizados en la hoja de cálculo", "Hola, le notificamos que se ha realizado un cambio, en el sector que esta usted monitorizando");
  }    
}

function onEdit(e){
    
  var rangoE = e.range;
  Logger.log("Seteado e");
  
  var filaE = rangoE.getRow();
  Logger.log("Seteado fila e");
  
  var columnaE = rangoE.getColumn();
  Logger.log("Seteado columna e");
  
  var hojaCorreos = SpreadsheetApp.getActive().getSheetByName('Correos');
  Logger.log("Seteado hoja correos");
  
  var filaMonitorizar = hojaCorreos.getRange(2, 2).getValue();
  Logger.log("Seteado fila de la celda a monitorizar");
  
  var columnaMonitorizar = hojaCorreos.getRange(2, 3).getValue();
  Logger.log("Seteado columna de la celda a monitorizar");
  
  if(filaE == filaMonitorizar && columnaE == columnaMonitorizar){
    notificarCambios(); 
    Logger.log("Se ha enviado el correo");
  }
}
