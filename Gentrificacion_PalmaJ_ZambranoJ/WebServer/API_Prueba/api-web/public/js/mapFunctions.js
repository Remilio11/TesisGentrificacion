// ******* MAPA DESPLEGADO AL INICIO **********
var mapa;
var vista;
var arreglo;
var legend, legend2, legend3, legend4, legend5, legend6, legend7, legend8, legend9;
var swipe1;
// Varaibles para Capas
var capaInicial;
var data;
var  capaResultados2010, capaResultados2001, capaResultados1990, capaGentri1, capaGentri2,capaGentri7,capaGentri8,
    capaGentri3, capaGentri4, capaGentri5, capaGentri6;
//Variables de features
var FeatureLayerRico;
//PopUps
var popUp1;
var popUp2;
var evento;
var json1,json2;
var myBarChart,myPieChartEmp,myDonutChartEmpEmpG, myPieChartEduSup, myDonutChartEdad, myDoubleBarChartBarrios,myDoubleBarChartSectores,medEsMayores,medidorEmpEg,medidorGentCV;
//variables que cambian de acuerdo a la seleccion

require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/tasks/support/Query",
        "esri/widgets/Legend",
        "esri/widgets/Swipe",
        "esri/views/ui/DefaultUI",
        "esri/tasks/QueryTask",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js",
        "dojo/domReady!"

    ],
    function(Map, MapView,FeatureLayer,Query,Legend,Swipe,QueryTask ,Chart) {
        FeatureLayerRico = FeatureLayer;
        SwipeRico = Swipe;
        Leyenda = Legend;
        QueryR=Query;
        //Llamada al mapa base
        const map = new Map({
            basemap: "streets"
        });


        capaInicial = new FeatureLayer({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            opacity: 1.0

        });

        map.basemap = "gray";
        map.layers.add(capaInicial);

        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-78.5155452, -0.2220584], // longitude, latitude
            zoom: 15,
            popup: {

                visible: false,
                dockOptions: {
                    buttonEnabled: true,
                    breakpoint: false

                }
            }
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
    if(evento){
        evento.remove();
    }
    vista.ui.remove(swipe1);

    vista.ui.remove(legend);
    vista.ui.remove(legend2);
    vista.ui.remove(legend3);
    vista.ui.remove(legend4);
    vista.ui.remove(legend5);
    vista.ui.remove(legend6);
    vista.ui.remove(legend7);
    vista.ui.remove(legend8);
    vista.ui.remove(legend9);
    vista.popup.close();
    mapa.removeAll();
    destruirGraficos();
    console.log("recibi mi arreglo "+ arreglo);
    if(arreglo == "1"){
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
        }
        capaResultados2010 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector_2010_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp1,
            opacity: 0.1
        });


        mapa.add(capaInicial);


        mapa.add(capaResultados2010);

        vista.ui.add(legend,"bottom-right");

        alistar(capaResultados2010);



    }
    else if(arreglo=="2"){
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
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector_2001_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp2,
            opacity: 0.1
        });

        mapa.add(capaInicial);

        mapa.add(capaResultados2001);
        vista.ui.add(legend,"bottom-right");
        alistar(capaResultados2001);


    }
    else if (arreglo == "3"){
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
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/datos_sector_1990_f/FeatureServer",
            outFields: ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","P_PE_V"],
            popupTemplate:popUp2,
            opacity: 0.1
        });

        mapa.add(capaInicial);

        mapa.add(capaResultados1990);
        vista.ui.add(legend,"bottom-right");

        alistar(capaResultados1990);

    }
    else if (arreglo == "4"){
        capaGentri1 = new FeatureLayerRico({

            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_sectores_1990_f/FeatureServer",
            outFields : ["T_PE_25_S","T_PE_ES_S","T_PE_EG_S","PROM_POBR"],
            opacity: 0.9
        });
        capaGentri2 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_sectores_2001_f/FeatureServer",
            outFields : ["T_PE_25_S","T_PE_ES_S","T_PE_EG_S","PROM_POBR"],
            opacity: 0.9
        });

        swipe1 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri1],
            trailingLayers: [capaGentri2],
            position: 50,
            state: "ready"

        });

        legend2 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri1,
                    title: "Gentrificación Sectores 1990"
                }
            ]
        });
        legend3 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri2,
                    title: "Gentrificación Sectores 2001"
                }
            ]
        });

        mapa.add(capaGentri1);
        mapa.add(capaGentri2);




        vista.ui.remove(legend);
        vista.ui.add(legend3,"bottom-right");
        vista.ui.add(legend2,"bottom-left");

        vista.ui.add(swipe1);
        alistarGentrificacionSectores(capaGentri1,capaGentri2,"1990","2001");






    }
    else if (arreglo == "5"){
        capaGentri3 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_sectores_2001_f/FeatureServer",
            outFields : ["T_PE_25_S","T_PE_ES_S","T_PE_EG_S","PROM_POBR"],
            opacity: 0.9
        });
        capaGentri4 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_sectores_2010_f/FeatureServer",
            outFields : ["T_PE_25_S","T_PE_ES_S","T_PE_EG_S","PROM_POBR"],
            opacity: 0.9
        });

        swipe1 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri3],
            trailingLayers: [capaGentri4],
            position: 50,
            state: "ready"

        });

        legend4 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri3,
                    title: "Gentrificación Sectores 2001"
                }
            ]
        });
        legend5 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri4,
                    title: "Gentrificación Sectores 2010"
                }
            ]
        });

        mapa.add(capaGentri3);
        mapa.add(capaGentri4);

        vista.ui.remove(legend);
        vista.ui.add(legend4,"bottom-left");
        vista.ui.add(legend5,"bottom-right");
        vista.ui.add(swipe1);
        alistarGentrificacionSectores(capaGentri3,capaGentri4,"2001","2010");
    }
    else if(arreglo == "6"){
        capaGentri5 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_1990_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri6 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });

        swipe1 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri5],
            trailingLayers: [capaGentri6],
            position: 50,
            state: "ready"

        });

        legend6 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri5,
                    title: "Gentrificación Barrios 1990"
                }
            ]
        });
        legend7 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri6,
                    title: "Gentrificación Barrios 2001"
                }
            ]
        });

        mapa.add(capaGentri5);
        mapa.add(capaGentri6);
        vista.ui.remove(legend);
        vista.ui.add(legend6,"bottom-left");
        vista.ui.add(legend7,"bottom-right");
        vista.ui.add(swipe1);
        alistarGentrificacionBarrios(capaGentri5,capaGentri6,"1990","2001");
    }
    else if(arreglo == "7"){
        capaGentri7 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri8 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2010_f/FeatureServer",
            opacity: 0.9
        });

        swipe1 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri7],
            trailingLayers: [capaGentri8],
            position: 50,
            state: "ready"

        });

        legend8 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri7,
                    title: "Gentrificación Barrios 2001"
                }
            ]
        });
        legend9 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri8,
                    title: "Gentrificación Barrios 2010"
                }
            ]
        });

        mapa.add(capaGentri7);
        mapa.add(capaGentri8);
        vista.ui.remove(legend);
        vista.ui.add(legend8,"bottom-left");
        vista.ui.add(legend9,"bottom-right");
        vista.ui.add(swipe1);
        alistarGentrificacionBarrios(capaGentri7,capaGentri8,"2001","2010");

    }



    else if(arreglo == "8"){
        console.log("entre arreglo 8")
        capaGentri7 = new FeatureLayerRico({
            url : "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2010_f/FeatureServer",
            opacity: 0.9
        });

        capaGentri8 = new FeatureLayerRico({
            url :"https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2020_f/FeatureServer",
            opacity: 0.9
        });

        swipe1 = new SwipeRico({
            view: vista,
            leadingLayers: [capaGentri7],
            trailingLayers: [capaGentri8],
            position: 50,
            state: "ready"

        });
        legend8 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri7,
                    title: "Gentrificación Barrios 2010"
                }
            ]
        });

        legend9 = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaGentri8,
                    title: "Gentrificación Barrios 2020"
                }
            ]
        });


        mapa.add(capaGentri7);
        mapa.add(capaGentri8);
        vista.ui.remove(legend);
        vista.ui.add(legend8,"bottom-left");
        vista.ui.add(legend9,"bottom-right");
        vista.ui.add(swipe1);


    }




}
function crearGraficoBarras(resultados){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico1');


    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets:[{
            label:'Total',
            data: [resultados.T_VI_S, resultados.T_PE_S, resultados.T_GENT_S, resultados.T_PE_25_S,resultados.T_PE_ES_S,
                resultados.T_PE_EM_S,resultados.T_PE_EG_S,resultados.PROM_POBR],
            backgroundColor: ["#066F6C","#0AB87E","#C5DA0B","#F54245","#AA97A6","#6E3091","#BF7140","#14183D"],
            borderColor: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            borderWidth: [1,1,1,1,1,1,1,1]
        }],

        labels:[
            "Viviendas","Personas","Personas Gentrificables","Personas > 25 años","Personas con Educación Superior","Personas con empleo","Personas con empleo gerencial","Cambios de Vivienda"

        ], fontColor:"#fff", borderWidth:2
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if(myBarChart){

        myBarChart.destroy();

    }

    myBarChart = new Chart(canvas,{
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Información Censal por Sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: true,
            scales: {
                yAxes: [{
                    gridLines: {color:"white"},
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",

                    }
                }],
                xAxes: [{

                    display:true,
                    fontSize:8,
                    gridLines: {color:"white"},
                    ticks: {
                        autoSkip: false,
                        fontColor: "white",

                    }
                }]
            }
        }

    });

    return canvas;
}
function crearGraficoPieEmp(results){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');

    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets:[{
            label:'Total',
            data: [((results.T_PE_EM_S/results.T_PE_S)*100).toFixed(2),(((results.T_PE_S-results.T_PE_EM_S)/results.T_PE_S)*100).toFixed(2)],
            backgroundColor: ["#145251","#0b182d"]
        }],

        labels:[
            "% Personas con empleo ","% Personas sin empleo"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if(myPieChartEmp){
        myPieChartEmp.destroy();
    }

    myPieChartEmp = new Chart(canvas,{
        type: 'pie',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }},

            responsive:true,
            maintainAspectRatio:true,
            title: {display:true,text:'Condición laboral del sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoDonaEmpEmpG(results){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico3');

    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets:[{
            label:'Total',
            data: [((results.T_PE_EG_S/results.T_PE_EM_S)*100).toFixed(2),(((results.T_PE_EM_S-results.T_PE_EG_S)/results.T_PE_EM_S)*100).toFixed(2)],
            backgroundColor: ["#0c6a6a","#d0d317"]
        }],

        labels:[
            "% Personas con empleo T/G/ADM","% Personas con otro tipo de empleo"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if(myDonutChartEmpEmpG){
        myDonutChartEmpEmpG.destroy();
    }

    myDonutChartEmpEmpG = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }},

            responsive:true,
            maintainAspectRatio:true,
            title: {display:true,text:'Condición de tipos de empleo del sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoPieEduSup(results){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico4');
    canvas.style.visibility='visible';
    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets:[{
            label:'Total',
            data: [((results.T_PE_ES_S/results.T_PE_S)*100).toFixed(2),(((results.T_PE_S-results.T_PE_ES_S)/results.T_PE_S)*100).toFixed(2)],
            backgroundColor: ["#f49b2f","#5c0548"]
        }],

        labels:[
            "% Personas con Educación Superior","% Personas sin Educación Superior"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if(myPieChartEduSup){
        myPieChartEduSup.destroy();
    }

    myPieChartEduSup = new Chart(canvas,{
        type: 'pie',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }},

            responsive:true,
            maintainAspectRatio:true,
            title: {display:true,text:'Escolaridad por sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}

function crearGraficoDonaEdad(results){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico5');
    canvas.style.visibility='visible';
    // Create a data object, this will include the data from the feature layer and other information like color or labels.
    var data = {
        datasets:[{
            label:'Total',
            data: [((results.T_PE_25_S/results.T_PE_S)*100).toFixed(2),(((results.T_PE_S-results.T_PE_25_S)/results.T_PE_S)*100).toFixed(2)],
            backgroundColor: ["#077683","#f69e51"]
        }],

        labels:[
            "% Personas mayores a 25 años","% Personas menores a 25 años"

        ]
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.
    if(myDonutChartEdad){
        myDonutChartEdad.destroy();
    }

    myDonutChartEdad = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16

                }},

            responsive:true,
            maintainAspectRatio:true,
            title: {display:true,text:'Condición de edad por sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}
function mostrarDivs(){
    document.getElementById("content3").style.display = "flex";
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}
function mostrarDivs1(){
    document.getElementById("content3").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}
function mostrarDivs2(){
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function alistar(capa){
    if(evento){
        evento.remove();
    }
    //vista.refresh()
    var query = new QueryR();
    query.outFields = ["T_VI_S","T_PE_S","T_GENT_S","T_PE_25_S","T_PE_ES_S","T_PE_EM_S","T_PE_SE_S","T_PE_EG_S","PROM_POBR"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento=vista.on("click", (e) => {
        query.geometry = e.mapPoint;

        capa.queryFeatures(query).then((results) =>{
                mostrarDivs();
                crearGraficoBarras(results.features[0].attributes);
                crearGraficoPieEmp(results.features[0].attributes);
                crearGraficoDonaEmpEmpG(results.features[0].attributes);
                crearGraficoPieEduSup(results.features[0].attributes);
                crearGraficoDonaEdad(results.features[0].attributes);
            }
        );

    });


}


// On view click, query the feature layer and pass the results to crearGraficoBarras function.





function alistarGentrificacionBarrios(capa,capa1,anio1,anio2){
    if(evento){
        evento.remove();
    }
    var query = new QueryR();
    query.outFields = ["T_PE_25_B","P_POBR_B","T_PE_EG_B","T_PE_ES_B","T_PE_GE_B","T_PE_EM_B","TOTAL_PER_B"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento=vista.on("click", (e) => {
        query.geometry = e.mapPoint;
        capa.queryFeatures(query).then((results) =>{


                capa1.queryFeatures(query).then((results1) =>{
                        mostrarDivs2();
                        crearGraficoDobleBarraBarrios(results.features[0].attributes,results1.features[0].attributes,anio1,anio2);
                        crearGraficoMedEsMay(results.features[0].attributes,results1.features[0].attributes,anio1,anio2);
                        crearGraficoMedEmpEg(results.features[0].attributes,results1.features[0].attributes,anio1,anio2);

                        crearGraficoMedPobrPGent(results.features[0].attributes,results1.features[0].attributes,anio1,anio2);

                    }
                );

            }
        );








    });



    // On view click, query the feature layer and pass the results to crearGraficoBarras function.




}






function crearGraficoDobleBarraBarrios(resultados, resultados1, anio1, anio2){
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');

    var data = {
        datasets:[{
            label:'Total '+anio1,
            data:[resultados.TOTAL_PER_B,resultados.T_PE_25_B,resultados.P_POBR_B,resultados.T_PE_GE_B,resultados.T_PE_EM_B,resultados.T_PE_EG_B,resultados.T_PE_ES_B],
            backgroundColor: ["#066F6C","#066F6C","#066F6C","#066F6C","#066F6C","#066F6C","#066F6C"],
            borderColor: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            borderWidth: [1,1,1,1,1,1,1]
        },{
            label:'Total '+anio2,
            data:[resultados1.TOTAL_PER_B,resultados1.T_PE_25_B,resultados1.P_POBR_B,resultados1.T_PE_GE_B,resultados1.T_PE_EM_B,resultados1.T_PE_EG_B,resultados1.T_PE_ES_B],
            backgroundColor: ["#f3b309","#f3b309","#f3b309","#f3b309","#f3b309","#f3b309","#f3b309"],
            borderColor: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            borderWidth: [1,1,1,1,1,1,1]
        }],

        labels:[
            "Total Personas","Personas > 25 años","Cambio de Viviendas","Personas Gentrificables","Personas con Empleo","Personas con Empleo G-T-ADM","Personas con Educación Superior"

        ], fontColor:"#fff", borderWidth:2
    };

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if(myDoubleBarChartBarrios){

        myDoubleBarChartBarrios.destroy();

    }
    myDoubleBarChartBarrios = new Chart(canvas,{
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Información Censal por Barrio',fontSize:18,fontColor:"#fff"},
            scaleShowValues: true,
            scales: {
                yAxes: [{

                    gridLines: {color:"white"},
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",

                    }
                }],
                xAxes: [{

                    display:true,
                    fontSize:8,
                    gridLines: {color:"white"},
                    ticks: {
                        autoSkip: false,
                        fontColor: "white",

                    }
                }]
            }
        }

    });

    return canvas;
}

function alistarGentrificacionSectores(capa,capa1,anio1,anio2) {
    console.log("entre alistar")
    if (evento) {
        evento.remove();
    }

    var query = new QueryR();
    query.outFields = ["T_PE_25_S", "T_PE_ES_S","T_PE_GE_S","T_PE_EM_S", "T_PE_EG_S", "PROM_POBR"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento = vista.on("click", (e) => {
        query.geometry = e.mapPoint;
        capa.queryFeatures(query).then((results) => {
                console.log("entre query 1")
                json1=results.features[0].attributes;

                capa1.queryFeatures(query).then((results1) => {

                        json2=results1.features[0].attributes;
                        console.log("entre query 2");
                        mostrarDivs1();

                        crearGraficoDobleBarraSectores(json1,json2,anio1,anio2);


                    }
                );

            }
        );



    });

}

function crearGraficoDobleBarraSectores(resultados,resultados1,anio1,anio2){
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico1');

    var data = {
        datasets:[ {
            label:'Total '+anio1,
            data:[resultados.T_PE_25_S,resultados.T_PE_ES_S,resultados.T_PE_GE_S,resultados.T_PE_EM_S,resultados.T_PE_EG_S,resultados.PROM_POBR],
            backgroundColor: ["#066F6C","#066F6C","#066F6C","#066F6C","#066F6C","#066F6C"],
            borderColor: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            borderWidth: [1,1,1,1,1,1]
        },{
            label:'Total '+anio2,
            data:[resultados1.T_PE_25_S,resultados1.T_PE_ES_S,resultados1.T_PE_GE_S,resultados1.T_PE_EM_S,resultados1.T_PE_EG_S,resultados1.PROM_POBR],
            backgroundColor: ["#f3b309","#f3b309","#f3b309","#f3b309","#f3b309","#f3b309"],
            borderColor: ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"],
            borderWidth: [1,1,1,1,1,1]
        }],

        labels:[
            "Personas > 25 años","Personas con Educación Superior","Personas Gentrificables","Personas con Empleo","Personas con G-T-ADM","Cambio Viviendas"

        ], fontColor:"#fff", borderWidth:2
    }
    console.log("HICE GRAFICO");
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if(myDoubleBarChartSectores){

        myDoubleBarChartSectores.destroy();

    }
    myDoubleBarChartSectores = new Chart(canvas,{
        type: 'bar',
        data: data,
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Información Censal por Sector',fontSize:18,fontColor:"#fff"},
            scaleShowValues: true,
            scales: {
                yAxes: [{

                    gridLines: {color:"white"},
                    ticks: {
                        beginAtZero: true,
                        fontColor: "white",

                    }
                }],
                xAxes: [{

                    display:true,
                    fontSize:8,
                    gridLines: {color:"white"},
                    ticks: {
                        autoSkip: false,
                        fontColor: "white",

                    }
                }]
            }
        }

    });
    console.log("HICE GRAFICO");

    return canvas;
}
//cambiar
function crearGraficoMedEmpEg(resultados, resultados1, anio1, anio2){
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico4');
    var data = {
        datasets:[ {
            label:'Total ',
            data:[(((resultados1.T_PE_EM_B-resultados.T_PE_EM_B))/resultados.T_PE_EM_B*100).toFixed(2),(((resultados1.T_PE_EG_B-resultados.T_PE_EG_B))/resultados.T_PE_EG_B*100).toFixed(2)],
            backgroundColor: ["#d1ffa3","#005194"],
            borderColor: ["#ffffff","#ffffff"],
            borderWidth: [1,1]
        }],

        labels:[
            "Personas con Empleo","Personas con Empleo Gerencial"

        ], fontColor:"#fff", borderWidth:2
    }



    // Create a new Chart and hook it to the canvas and then return the canvas.

    if(medidorEmpEg){

        medidorEmpEg.destroy();

    }
    medidorEmpEg = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: {
            rotation:1*Math.PI,
            circumference:1*Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Cambio del % de Empleo/Empleo G-T-ADM',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false


        }

    });

    return canvas;
}

function crearGraficoMedPobrPGent(resultados, resultados1, anio1, anio2){
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico5');
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);


    var data = {
        datasets:[ {
            label:'Total '+anio1,
            data:[(((resultados1.P_POBR_B-resultados.P_POBR_B))/resultados.P_POBR_B*100).toFixed(2),(((resultados1.T_PE_GE_B-resultados.T_PE_GE_B))/resultados.T_PE_GE_B*100).toFixed(2)],
            backgroundColor: ["#af7aff","#acdf9f"],
            borderColor: ["#ffffff","#ffffff"],
            borderWidth: [1,1]
        }],

        labels:[
            "Cambio de vivienda","Personas Gentrificables"

        ], fontColor:"#fff", borderWidth:2
    }


    // Create a new Chart and hook it to the canvas and then return the canvas.

    if(medidorGentCV){

        medidorGentCV.destroy();

    }
    medidorGentCV = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: {
            rotation:1*Math.PI,
            circumference:1*Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Cambio del % Personas Gentrificables/Cambios de Vivienda',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false
        }

    });

    return canvas;
}


function crearGraficoMedEsMay(resultados, resultados1, anio1, anio2){
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico3');

    var data = {
        datasets:[ {
            label:'Total '+anio1,
            data:[(((resultados1.T_PE_25_B-resultados.T_PE_25_B))/resultados.T_PE_25_B*100).toFixed(2),(((resultados1.T_PE_ES_B-resultados.T_PE_ES_B))/resultados.T_PE_ES_B*100).toFixed(2)],
            backgroundColor: ["#378e2f","#f3b309"],
            borderColor: ["#ffffff","#ffffff"],
            borderWidth: [1,1]
        }],

        labels:[
            "Personas > 25 Años","Personas con Educación Superior"

        ], fontColor:"#fff", borderWidth:2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if(medEsMayores){

        medEsMayores.destroy();

    }
    medEsMayores = new Chart(canvas,{
        type: 'doughnut',
        data: data,
        options: {
            maintainAspectRatio:true,
            rotation:1*Math.PI,
            circumference:1*Math.PI,
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 16,
                    borderColor: "white",
                    borderWidth: 6
                }},
            responsive:true,
            maintainAspectRatio:false,
            title: {display:true,text:'Cambio del % Personas > a 25 años/Educación Superior',fontSize:18,fontColor:"#fff"},
            scaleShowValues: false

        }

    });

    return canvas;
}

function destruirGraficos(){
    if(myDoubleBarChartSectores){

        myDoubleBarChartSectores.destroy();

    }
    if(myDoubleBarChartBarrios){

        myDoubleBarChartBarrios.destroy();

    }
    if(medEsMayores){

        medEsMayores.destroy();

    }
    if(medidorEmpEg){

        medidorEmpEg.destroy();

    }
    if(medidorGentCV){

        medidorGentCV.destroy();

    }

    if(myBarChart) {
        myBarChart.destroy();
    }
    if(myDonutChartEdad){
        myDonutChartEdad.destroy();
    }
    if(myPieChartEduSup){
        myPieChartEduSup.destroy();
    }
    if(myDonutChartEmpEmpG){
        myDonutChartEmpEmpG.destroy();
    }
    if(myPieChartEmp){
        myPieChartEmp.destroy();
    }


}



