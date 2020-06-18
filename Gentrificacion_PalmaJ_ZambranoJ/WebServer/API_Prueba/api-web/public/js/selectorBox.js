function obtenerValor(){
    esconderDivs();
    var rdb = document.getElementsByName("radio");
    for(var x=0;x<rdb.length;x++){
        if(rdb[x].checked){
            cambioCapa(rdb[x].value)

        }
    }
}
function esconderDivs(){
    document.getElementById("content3").style.display = "none";
    document.getElementById("content4").style.display = "none";
    document.getElementById("content5").style.display = "none";
    document.getElementById("footer1").style.display = "none";
}

