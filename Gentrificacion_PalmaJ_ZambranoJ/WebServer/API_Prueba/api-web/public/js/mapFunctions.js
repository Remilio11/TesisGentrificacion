// ******* MAPA DESPLEGADO AL INICIO **********
var mapa;
var vista;
var legend;
// Varaibles para Capas
var capaInicial;
var capaBarriosSector, capaResultados2010, capaResultados2001, capaResultados1990 ;
//Variables de features
var FeatureLayerRico;
//PopUps
var popUp1;
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


    capaInicial = new FeatureLayer({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            opacity: 1.0

    });

    map.basemap = "gray";
    map.add(capaInicial);

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-78.5197643, -0.2174367], // longitude, latitude
        zoom: 15
    });

    mapa = map;
    vista = view;

    legend = new Leyenda({
        view: vista,
        layerInfos: [
            {
                layer: capaInicial,
                title: "Barrios - Centro Histórico"
            }
        ]
    });

    view.ui.add(legend,"bottom-right");

});

//******** LLAMADA A NUEVAS CAPAS ***********
function cambioCapa(arreglo) {
    mapa.removeAll()
    console.log("recibi mi arreglo "+ arreglo);
    if(arreglo=="Barrios - Sector"){
        capaBarriosSector = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/barrios_sector/FeatureServer",
            opacity: 0.1
        });

        mapa.add(capaInicial);
        mapa.add(capaBarriosSector);
    }
    else if(arreglo == "Resultados Análisis 2010"){
        popUp1={
            "title": "INFORMACIÓN DEL SECTOR",
            "content": function () {
                return "Total Viviendas: {T_VI_S}" +
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
        capaResultados2010 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector2010_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp1,
            opacity: 0.1
        });

        mapa.add(capaInicial);
        mapa.add(capaResultados2010);


    }
    else if(arreglo=="Resultados Análisis 2001"){
        popUp2={
            "title": "INFORMACIÓN DEL SECTOR",
            "content": function () {
                return "Total Viviendas: {T_VI_S}" +
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
        capaResultados2001 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector2001_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp2,
            opacity: 0.1
        });

        mapa.add(capaInicial);
        mapa.add(capaResultados2001);

    }
    else if (arreglo == "Resultados Análisis 1990"){
        popUp2={
            "title": "INFORMACIÓN DEL SECTOR",
            "content": function () {
                return "Total Viviendas: {T_VI_S}" +
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
        capaResultados1990 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector1990_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp2,
            opacity: 0.1
        });

        mapa.add(capaInicial);
        mapa.add(capaResultados1990);
    }
}





