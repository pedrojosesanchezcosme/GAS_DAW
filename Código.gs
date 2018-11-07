function onEdit(e){
  //Asignando la celda que se ha cambiado
  var rangoE = e.range;
  
  //Con esto eliminamos el formato de previo, ya que sino podria a darse una confusion con tantos rangos marcados de un mismo color.
  rangoE.getSheet().clearFormats();
  
  //Asignando la fila de la celda donde se ha dado el cambio
  var filaE = rangoE.getRow();
  
  //Asignando la columna de la celda donde se ha dado el cambio
  var columnaE = rangoE.getColumn();
    
  //Asignando la hoja de correos para cojer los correos y notificar los cambios
  var hojaCorreos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Correos');

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
    //Esta funcion la utilizo para poder marcar de un color determinado el rango modificado.
    rangoE.setBackground("red");
    mandarCambios();
  }  
}

//Como los permisos no me permiten realizar la notificación, he incluido un boton que permite al usuario notificar manualmente a todos los usuarios que se encuentren en la lista.
function mandarCambios(){
  //Asignando la hoja a una variable
  var hojaCorreo = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Correos');
  
  //Recojemos todas las listas de correos y las almacenamos en un vector.
  //Soy consciente de que cuando recojer la ultima fila, coje minimo hasta la 4 debido a que toma la ultima fila de todas las columnas.
  var listaCorreos = hojaCorreo.getRange(1, 1, hojaCorreo.getLastRow()).getValues();
    
  //Recorremos el vector  y vamos notificando a todos los usuarios que ha surgido un cambio.
  for(i=0; i<listaCorreos.length; i++){
    try{
      //No nos permite mandar los correos desde un Trigger Simple desde GAS debido a que no tiene permisos, porque podria ser una vulernerabilidad. Referencia: https://developers.google.com/apps-script/guides/triggers/ Se encuentra en el apartado de restricciones
      MailApp.sendEmail(listaCorreos[i], "Cambios Realizados en Google Sheet", "Hola, le notificamos que se ha realizado un cambio, en el sector que esta usted monitorizando");    
    } catch(error){
      Logger.log(error);
    }
  }
}