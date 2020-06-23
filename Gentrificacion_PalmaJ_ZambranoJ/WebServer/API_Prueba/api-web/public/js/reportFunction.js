// ******* MAPA DESPLEGADO AL INICIO **********


var mapa;
var vista;

var legend;

// Varaibles para Capas
var capaInicial;

var data;
var capaGentri5R, capaGentri6R,capaGentri7R,capaGentri8R;
//Variables de features
var FeatureLayerRico;
//PopUps
var popUp1;

var evento;

var  myDoubleBarChartReportes,
    medAnios, medEmpleo, medEmpleoGeren,medEducaSup,medGentrif,medCambiViv,canvasMapa,nombreBarrio,nombreBarrio1;
var datagrafico1=[];
var datagrafico2=[];
var backGroundColor1=[];
var backGroundColor2=[];
var bordercolorgrafico=[];
var borderwidthgraifoc=[];
var labelsgrafico=[];
//variables que cambian de acuerdo a la seleccion
var canvasGraficoDobleBarra,canvas2,canvas3,canvas4,estadoGent1,estadoGent2,canvasgraficoCVReporte,canvasgraficoAniosReporte,canvasgraficoEmpReporte,canvasgraficoEmpGReporte,canvasgraficoESReporte,canvasgraficoGEReporte;
var resultadosquery1,resultadosquery2;
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
    function (Map, MapView, FeatureLayer, Query, Legend, Swipe, QueryTask, Chart) {
        FeatureLayerRico = FeatureLayer;
        SwipeRico = Swipe;
        Leyenda = Legend;
        QueryR = Query;
        //Llamada al mapa base
        const map = new Map({
            basemap: "streets"
        });
        popUp1={
            "title": "BARRIO",
            "content": function () {
                return "Nombre: {NOMBRE}";
            }
        }

        capaInicial = new FeatureLayer({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/Barrios_CentroHistorico_F/FeatureServer",
            opacity: 1.0,
            outFields:['NOMBRE'],
            popupTemplate:popUp1

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

        view.ui.add(legend, "bottom-right");
        if (evento) {
            evento.remove();
        }
        var query = new QueryR();
        query.outFields = ["BARRIO_ID"];
        query.where = "1=1";
        query.num = 50;



        evento = vista.on("click", (e) => {
            query.geometry = e.mapPoint;


            capaInicial.queryFeatures(query).then((results1) => {



                }
            );




        });



    });



//******** LLAMADA A NUEVAS CAPAS ***********
function cambioCapa(arreglo) {

    if(evento){
        evento.remove();
    }
    vista.ui.remove(legend);

    vista.popup.close();
    mapa.removeAll();
    destruirGraficosReportes();
    console.log("recibi mi arreglo " + arreglo);
    if (arreglo == "6") {
        capaGentri5R = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_1990_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri6R = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });





        legend = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaInicial,
                    title: "Barrios - Centro Histórico"
                }
            ]
        });
        mapa.add(capaInicial);
        vista.ui.add(legend, "bottom-right");
        alistarGentrificacionBarrios(capaGentri5R, capaGentri6R, "1990", "2001");
    } else if (arreglo == "7") {
        capaGentri7R = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2001_f/FeatureServer",
            opacity: 0.9
        });
        capaGentri8R = new FeatureLayerRico({
            url: "https://services9.arcgis.com/1dyQOpYtlvpIzdDa/arcgis/rest/services/gent_barrios_2010_f/FeatureServer",
            opacity: 0.9
        });





        legend = new Leyenda({
            view: vista,
            layerInfos: [
                {
                    layer: capaInicial,
                    title: "Barrios - Centro Histórico"
                }
            ]
        });

        mapa.add(capaInicial);
        vista.ui.add(legend, "bottom-right");
        alistarGentrificacionBarrios(capaGentri7R, capaGentri8R, "2001", "2010");

    }


}

function mostrarDivs() {
    document.getElementById("content3").style.display = "flex";
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function mostrarDivs1() {
    document.getElementById("content3").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}

function mostrarDivs2() {
    document.getElementById("content4").style.display = "flex";
    document.getElementById("content5").style.display = "flex";
    document.getElementById("content3").style.display = "flex";
    document.getElementById("footer1").style.display = "block";
}




// On view click, query the feature layer and pass the results to crearGraficoBarras function.


function alistarGentrificacionBarrios(capa, capa1, anio1, anio2) {

    if (evento) {
        evento.remove();
    }
    console.log('entre cargar 2')
    var query = new QueryR();
    query.outFields = ["BARRIO_ID","DESC_FEN","NOMBRE","T_PE_EG_B","T_PE_EM_B","T_PE_GE_B","T_PE_ES_B","T_PE_25_B","P_POBR_B","TOTAL_PER_B"];
    query.where = "1=1";
    query.num = 50;

    // On view click, query the feature layer and pass the results to crearGraficoBarras function.

    evento = vista.on("click", (e) => {
        query.geometry = e.mapPoint;
        document.getElementById('pdf').style.display = 'none';




        capa.queryFeatures(query).then((results1) => {

                console.log('entre cargar 3')
                capa1.queryFeatures(query).then((results2) => {
                        console.log('entre cargar 4');

                        canvasMapa=cargarMapa(results1.features[0].attributes)
                        nombreBarrio1=pasarNombre(results1.features[0].attributes);
                        nombreBarrio=capLetters_1(nombreBarrio1);
                        estadoGent1=pasarEstado1(results1.features[0].attributes);
                        estadoGent2=pasarEstado2(results2.features[0].attributes);
                        console.log('estadoGent1');
                        console.log(estadoGent1);
                        resultadosquery1=results1.features[0].attributes;
                        resultadosquery2=results2.features[0].attributes;
                        console.log('resultadosquery1');
                        console.log(resultadosquery1);
                        console.log('RESULTS');
                        console.log(results1.features[0].attributes);
                        console.log('resultadosquery2');
                        console.log(resultadosquery2);
                        console.log('RESULTS2');
                        console.log(results2.features[0].attributes);
                        document.getElementById('pdf').style.display=''
                        document.getElementById('pdf').style.textAlign='center'








                    }
                );

            }
        );




    });


}

function destruirGraficosReportes() {

    if (myDoubleBarChartReportes) {

        myDoubleBarChartReportes.destroy();

    }

    if (medAnios) {

        medAnios.destroy();

    }

    if (medEducaSup) {

        medEducaSup.destroy();

    }

    if (medEmpleo) {

        medEmpleo.destroy();

    }

    if (medEmpleoGeren) {

        medEmpleoGeren.destroy();

    }

    if (medCambiViv) {

        medCambiViv.destroy();

    }

    if (medGentrif) {

        medGentrif.destroy();

    }



}

function cargarMapa(results){
    console.log("entre cargar mapa");
    console.log(results)
    var mapa="../images/mapa/"+results.BARRIO_ID+".PNG";
    console.log(mapa);
    var canvas=document.getElementById('grafico1');
    var chart=document.getElementById('chart1');
    var ctx = canvas.getContext("2d");
    var img = new Image();

    console.log("imagen src");
    console.log(img.src);
    img.onload = function() {
        canvas.height=img.height;
        canvas.width=img.width;
        chart.height=img.height;
        chart.width=img.width;

        ctx.drawImage(img, 0, 0,canvas.width,canvas.height);

        ctx.beginPath();

        ctx.stroke();
    };
    img.src=mapa;
    return canvas;

    //ctx.drawImage(img, 10, 10);





}
function pasarEstado1(resultados){
    return resultados.DESC_FEN;

}
function pasarEstado2(resultados){
    return resultados.DESC_FEN;

}
function pasarNombre(resultados){
    return resultados.NOMBRE;

}

function crearGraficoDobleBarraReporte(resultados, resultados1, anio1, anio2,data1,data2,background1,background2,bordercolor,borderwidth,labels) {
    // Create a new canvas element, this is where the graph will be placed.

    var canvas = document.getElementById('grafico2');
    var ctx = canvas.getContext("2d");
    var data = {
        datasets: [{
            label: 'Total ' + anio1,
            data: data1,
            backgroundColor: background1,
            borderColor: bordercolor,
            borderWidth: borderwidth
        }, {
            label: 'Total ' + anio2,
            data: data2,
            backgroundColor: background2,
            borderColor: bordercolor,
            borderWidth: borderwidth
        }],

        labels: labels, fontColor: "#000000", borderWidth: 2
    };



    if (myDoubleBarChartReportes) {

        myDoubleBarChartReportes.destroy();

    }
    myDoubleBarChartReportes = new Chart(canvas, {
        type: 'bar',
        data: data,

        options: {
            "animation": {
                "duration": 0,
                "onComplete": function() {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(25, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function(dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function(bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        });
                    });
                }
            },
            legend: {
                labels: {
                    fontColor: "#000000",
                    fontSize: 25,
                    borderColor: "#000000",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {display: true, position:'top',text:'Información Censal por Barrio', fontSize: 32, fontColor: "#000000"},
            scaleShowValues: true,
            scales: {

                yAxes: [{
                    scaleLabel:{display:true},

                    ticks: {
                        fontSize: 25,
                        beginAtZero: true,
                        fontColor: "#000000",

                    }
                }],
                xAxes: [{

                    display: true,

                    gridLines: {color: "#000000"},
                    ticks: {
                        fontSize: 25,
                        autoSkip: false,
                        fontColor: "#000000",

                    }
                }]
            }
        }

    });

    return canvas;
}


function llenarGrafico(r1,r2){
    datagrafico1.length=0;
    datagrafico2.length=0;
    backGroundColor1.length=0;
    backGroundColor2.length=0;
    bordercolorgrafico.length=0;
    bordercolorgrafico.length=0;
    labelsgrafico.length=0;
    datagrafico1.push(r1.TOTAL_PER_B);
    datagrafico2.push(r2.TOTAL_PER_B);
    backGroundColor1.push("#066F6C");
    backGroundColor2.push("#f3b309");
    borderwidthgraifoc.push(1);
    bordercolorgrafico.push("#000000");
    labelsgrafico.push("Personas");
    console.log('entreGrafico');
    if (document.getElementById('anios').checked){
        console.log('entre anios');
        datagrafico1.push(r1.T_PE_25_B);
        datagrafico2.push(r2.T_PE_25_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas > a 25 años");



    }
    if (document.getElementById('empleo').checked){
        console.log('entre emp');
        datagrafico1.push(r1.T_PE_EM_B);
        datagrafico2.push(r2.T_PE_EM_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Empleo");


    }
    if (document.getElementById('empleog').checked){
        console.log('entre epmg');
        datagrafico1.push(r1.T_PE_EG_B);
        datagrafico2.push(r2.T_PE_EG_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con empleo G-T-ADM");


    }

    if (document.getElementById('gentrificables').checked){
        console.log('entre gent');
        datagrafico1.push(r1.T_PE_GE_B);
        datagrafico2.push(r2.T_PE_GE_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas gentrificables");


    }

    if (document.getElementById('edusup').checked){
        console.log('entre educ')
        datagrafico1.push(r1.T_PE_ES_B);
        datagrafico2.push(r2.T_PE_ES_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Educación Superior");


    }
    if (document.getElementById('vivienda').checked){
        console.log('entre viv')
        datagrafico1.push(r1.P_POBR_B.toFixed(2));
        datagrafico2.push(r2.P_POBR_B.toFixed(2));
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Cambio Vivienda");


    }
    if (document.getElementById('todas').checked){
        console.log('entre anios');
        datagrafico1.push(r1.T_PE_25_B);
        datagrafico2.push(r2.T_PE_25_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas > a 25 años");
        console.log('entre emp');
        datagrafico1.push(r1.T_PE_EM_B);
        datagrafico2.push(r2.T_PE_EM_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Empleo");
        console.log('entre epmg');
        datagrafico1.push(r1.T_PE_EG_B);
        datagrafico2.push(r2.T_PE_EG_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con empleo G-T-ADM");
        console.log('entre gent');
        datagrafico1.push(r1.T_PE_GE_B);
        datagrafico2.push(r2.T_PE_GE_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas gentrificables");
        console.log('entre educ')
        datagrafico1.push(r1.T_PE_ES_B);
        datagrafico2.push(r2.T_PE_ES_B);
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Personas con Educación Superior");

        console.log('entre viv')
        datagrafico1.push(r1.P_POBR_B.toFixed(2));
        datagrafico2.push(r2.P_POBR_B.toFixed(2));
        backGroundColor1.push("#066F6C");
        backGroundColor2.push("#f3b309");
        borderwidthgraifoc.push(1);
        bordercolorgrafico.push("#000000");
        labelsgrafico.push("Cambio Vivienda");


    }


    console.log('datagrafico1');
    console.log(datagrafico1);

}
function crearGraficoDonaAnios(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre GRAFICO ANISO")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico3');
    var resultado = (resultados1.T_PE_25_B - resultados.T_PE_25_B) /resultados.T_PE_25_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_25_B - resultados.T_PE_25_B) / resultados.T_PE_25_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medAnios) {

        medAnios.destroy();

    }
    medAnios = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                // Change options for ALL labels of THIS CHART
                datalabels: {
                    color: '#000000'
                }
            }
        ,
        animation:false,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
            labels: {
                fontColor: "black",
                fontSize: 25,
                borderColor: "black",
                borderWidth: 6
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Cambio del % Personas > 25  años',
            fontSize: 32,
            fontColor: "#000"
        },
        scaleShowValues: false

    }

});

return canvas;
}


function crearGraficoDonaEmp(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico4');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_EM_B - resultados.T_PE_EM_B) / resultados.T_PE_EM_B*100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_EM_B - resultados.T_PE_EM_B) /resultados.T_PE_EM_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medEmpleo) {

        medEmpleo.destroy();

    }
    medEmpleo = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Empleo',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaEmpG(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico5');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_EG_B - resultados.T_PE_EG_B) / resultados.T_PE_EG_B*100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_EG_B - resultados.T_PE_EG_B) / resultados.T_PE_EG_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medEmpleoGeren) {

        medEmpleoGeren.destroy();

    }
    medEmpleoGeren = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Empleo G-T-ADM',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaES(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico6');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_ES_B - resultados.T_PE_ES_B) / resultados.T_PE_ES_B*100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_ES_B - resultados.T_PE_ES_B) /resultados.T_PE_ES_B* 100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medEducaSup) {

        medEducaSup.destroy();

    }
    medEducaSup = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas con Educación Superior',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}
function crearGraficoDonaGE(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico7');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.T_PE_GE_B - resultados.T_PE_GE_B) /resultados.T_PE_GE_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.T_PE_GE_B - resultados.T_PE_GE_B) / resultados.T_PE_GE_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medGentrif) {

        medGentrif.destroy();

    }
    medGentrif = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Cambio del % Personas Gentrificables',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function crearGraficoDonaCV(resultados, resultados1, anio1, anio2) {
    // Create a new canvas element, this is where the graph will be placed.
    // Create a new canvas element, this is where the graph will be placed.
    console.log("entre grafico")
    console.log(resultados);
    console.log(resultados1);
    var canvas = document.getElementById('grafico8');
    var ctx = canvas.getContext("2d");
    var resultado = (resultados1.P_POBR_B - resultados.P_POBR_B) /resultados.P_POBR_B* 100;
    var color;
    if (resultado >= 0) {
        color = "#80aa31";
    } else {
        color = "#f35745";
    }

    var data = {
        datasets: [{
            label: 'Variación en el período '+anio1+'-'+anio2,
            data: [(resultados1.P_POBR_B - resultados.P_POBR_B) / resultados.P_POBR_B*100, (100-Math.abs(resultado))],
            backgroundColor: [color, "#265077"],
            borderColor: ["#000", "#000"],
            borderWidth: [1, 1]
        }],

        labels: [
            resultado.toFixed(2)+'%' , (100-Math.abs(resultado)).toFixed(2)+"%"

        ], fontColor: "#000", borderWidth: 2
    }
    console.log(data);

    // Create a new Chart and hook it to the canvas and then return the canvas.

    if (medCambiViv) {

        medCambiViv.destroy();

    }
    medCambiViv = new Chart(canvas, {
        type: 'doughnut',
        data: data,
        options: {
            animation:false,
            rotation: 1 * Math.PI,
            circumference: 1 * Math.PI,
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 25,
                    borderColor: "black",
                    borderWidth: 6
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: '% de Cambio de Vivienda',
                fontSize: 32,
                fontColor: "#000"
            },
            scaleShowValues: false

        }

    });

    return canvas;
}

function capLetters_1 ( value ) {
    let line = value.toLowerCase().split(' ');
    for ( let i = 0; i < line.length; i += 1 ) {
        line[i] = line[i].slice( 0, 1 ).toUpperCase() + line[i].slice( 1 );
    }
    return line.join(' ');
}
