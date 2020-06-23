function obtenerValor1(){


    document.getElementById('pdf').style.display = 'none';


    var rdb = document.getElementsByName("periodo");
    for(var x=0;x<rdb.length;x++){


        if(rdb[x].checked){
            cambioCapa(rdb[x].value)
            console.log('entre obtener')
        }
    }
}
