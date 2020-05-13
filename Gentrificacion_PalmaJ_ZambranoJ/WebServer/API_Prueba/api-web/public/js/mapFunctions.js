// ******* MAPA DESPLEGADO AL INICIO **********
var mapa;
var vista;
// Varaibles para Capas
var capaInicial;
var capaBarrios;
var capaBarriosSector;
var capaResultados2010;
//Variables de features
var FeatureLayerRico;
var renderColor;

//PopUps
var popUpNombres;
var popUp2;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Legend",
    "esri/views/ui/DefaultUI"
], function(Map, MapView,FeatureLayer,Legend) {
    FeatureLayerRico = FeatureLayer;
    Leyenda = Legend;
    //Llamada al mapa base
    var map = new Map({
        basemap: "streets"
    });




    //***** POPUP DE NOMBRES DE LA CAPA ********
    popUpNombres={
        "title": "INFORMACIÓN DEL BARRIO",
        "content": function () {
            return "Numero de Barrio: {FID} <br> Nombre: {NOMBRE}";
        }
    };

    capaInicial = new FeatureLayer({

            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            outFields: ["FID","NOMBRE"],
            popupTemplate: popUpNombres,
            opacity: 0.7

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
    vista = view;
});

//******** LLAMADA A NUEVAS CAPAS ***********
function cambioCapa(arreglo) {
    console.log("recibi mi arreglo "+ arreglo);
    if(arreglo=="Barrios - Sector"){

        capaBarrios = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer"
        });

        var legend = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaBarrios,
                    title: "Barrios - Centro Histórico"
                }
            ]
        });

        capaBarriosSector = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/barrios_sector/FeatureServer",
            opacity: 0.1
        });

        mapa.remove(capaInicial);
        mapa.add(capaBarrios);
        mapa.add(capaBarriosSector);
        vista.ui.add(legend,"bottom-right")




    }else if(arreglo == "Resultados Análisis 2010"){

        popUp2={
            "title": "INFORMACIÓN DEL SECTOR",
            "content": function () {
                return "Total Hogares: {T_HO_S}" +
                    "<br> Total Personas: {T_PE_S}" +
                    "<br> Total de Personas Gentrificables: {T_GENT_S}" +
                    "<br> Total Personas >25 años: {T_PE_25_S}" +
                    "<br> Total Personas con Educación Superior: {T_PE_ES_S}" +
                    "<br> Total Personas con Empleo: {T_PE_EM_S}" +
                    "<br> Total Personas sin Empleo: {T_PE_SE_S}" +
                    "<br> Total Personas con Empleo Gerencial: {T_PE_EG_S}" +
                    "<br> Promedio de Personas por Vivienda: {P_PE_V}";
            }
        };

        capaBarrios = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",

        });
        capaResultados2010 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector2010_f/FeatureServer",
            outFields: ["T_HO_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp2,
            opacity: 0.3
        });
        mapa.remove(capaInicial);
        mapa.add(capaBarrios);
        mapa.add(capaResultados2010);

    }
}





