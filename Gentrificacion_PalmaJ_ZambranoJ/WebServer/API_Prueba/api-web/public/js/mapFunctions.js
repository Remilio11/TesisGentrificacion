
// ******* MAPA DESPLEGADO AL INICIO **********
var mapa;
var capaInicial;
var FeatureLayerRico;
var renderColor;
var popUpNombres;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
], function(Map, MapView,FeatureLayer) {
    FeatureLayerRico = FeatureLayer
    //Llamada al mapa base
    var map = new Map({
        basemap: "streets"
    });

    // ***** AÑADE COLOR A LA CAPA INICIAL *********
    renderColor= {
        type: "unique-value",
        field: "FID",
        defaultSymbol: { type: "simple-fill"},
        uniqueValueInfos: [{
            value: "1",
            symbol: {
                type: "simple-fill",
                color: "#A3BCCC"
            }//symbol
        }, {
            value: "2",
            symbol: {
                type: "simple-fill",
                color: "#A3BDB3"
            }
        },{
            value: "3",
            symbol: {
                type: "simple-fill",
                color: "#A4BD99"
            }//symbol
        },{
            value: "4",
            symbol: {
                type: "simple-fill",
                color: "#A4BE7F"
            }//symbol
        },{
            value: "5",
            symbol: {
                type: "simple-fill",
                color: "#A4BE66"
            }//symbol
        },{
            value: "6",
            symbol: {
                type: "simple-fill",
                color: "#A4BE4D"
            }//symbol
        },{
            value: "7",
            symbol: {
                type: "simple-fill",
                color: "#A4BF33"
            }//symbol
        },{
            value: "8",
            symbol: {
                type: "simple-fill",
                color: "#A4BE1A"
            }//symbol
        },{
            value: "9",
            symbol: {
                type: "simple-fill",
                color: "#A4BF00"
            }//symbol
        },{
            value: "10",
            symbol: {
                type: "simple-fill",
                color: "#B9CF00"
            }//symbol
        },{
            value: "11",
            symbol: {
                type: "simple-fill",
                color: "#CEDF00"
            }//symbol
        },{
            value: "12",
            symbol: {
                type: "simple-fill",
                color: "#E2EF00"
            }//symbol
        },{
            value: "13",
            symbol: {
                type: "simple-fill",
                color: "#F7FF00"
            }//symbol
        },]
    };

    popUpNombres={
        "title": "INFORMACIÓN DEL BARRIO",
        "content": function () {
            return "Numero de Barrio: {FID} <br> Nombre: {NOMBRE}";
        }
    };

    capaInicial = new FeatureLayer({

            url : "https://services6.arcgis.com/a7URR860GLlM8vfi/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            renderer: renderColor,
            outFields: ["FID","NOMBRE"],
            popupTemplate: popUpNombres

    });

    map.basemap = "gray";
    map.add(capaInicial,0);


    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-78.5197643, -0.2174367], // longitude, latitude
        zoom: 15
    });
    mapa = map;
});




//******** LLAMADA A NUEVAS CAPAS ***********
var capaBarrios;
var capaBarriosManzanas;
function ocultar() {
    mapa.remove(capaBarrios)
}

function mostrar() {
    capaBarrios = new FeatureLayerRico({

        url : "https://services6.arcgis.com/a7URR860GLlM8vfi/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer"
    });
    mapa.add(capaBarrios)

    capaBarriosManzanas = new FeatureLayerRico({

        url : "https://services6.arcgis.com/a7URR860GLlM8vfi/arcgis/rest/services/Barrios_Manzanas_F/FeatureServer"
    });
    mapa.add(capaBarriosManzanas)
}

function cambioValor(evento){
    console.log('evento', evento);
    const ocultarSeleccionado = evento.target.value === "2";
    if(ocultarSeleccionado){
        ocultar()
    }else{
        mostrar()
    }
}
