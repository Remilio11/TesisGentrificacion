function obtenerValor(){
    var rdb = document.getElementsByName("radio");
    for(var x=0;x<rdb.length;x++){
        if(rdb[x].checked){
            cambioCapa(rdb[x].value)
        }
    }
}
