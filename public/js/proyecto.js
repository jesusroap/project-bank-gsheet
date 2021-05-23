jQuery(document).ready(function() {

    const claveAPI = 'AIzaSyBnk4I7IbLq1GV4wVuIypF6lAXijdVknSw';
    
    async function getCSVFByDocId(id, rango){
        let csvUrl = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${rango}?key=${claveAPI}`;
        const response = await fetch(csvUrl);
        return response.json();
    }

    function procesaDatosAJSON(infoJson){
        let entries = infoJson.values;
        let numFilas = entries.length;  

        //Procesamos los datos
        let campos = [];
        let datos = [];

        for(var f = 0; f < numFilas; f++) {

            let fila = entries[f];

            //Recorremos cada fila y por cada columna creamos un nuevo objeto
            let obj = {};

            for(var c = 0; c < fila.length; c++) {

                celda = fila[c];

                if (f == 0){
                    // Nombres de los campos ubicados en el thead
                    campos.push(celda);
                } else {
                    //En las demás filas asignamos la propiedad que corresponda según la posición
                    obj[campos[c]] = celda;
                }
            }
        
            //Añadimos el nuevo objeto a la colección de datos (si no es la primera fila)
            if (f > 0) datos.push(obj);
        }

        // Pintamos en el DOM las filas de la tabla
        let res = document.querySelector('#proyecto-individual');
        
        res.innerHTML = "";

        let p = "CIU-ME-01";

        for (let i = 0; i < numFilas; i++) {
        if (datos[i].codigo === p) {

            res.innerHTML += `
                <h3 class='proyecto'>${datos[i].codigo}</h3>
                
                
            `
        }
        }

        // Reemplazamos la "," por un espacio vacio
        let tds = document.body.querySelectorAll('*');
        tds.forEach(tag => tag.innerHTML = tag.innerHTML.replaceAll(', ,', '').replaceAll(' ,', ''));

    }

    getCSVFByDocId('1fORnuGVEasduQJ6pMR1_W6Z3zz0Ho4ypvtN0yxdtpg0', 'PaginaWeb!A:Z').then(procesaDatosAJSON);

    var textP = jQuery(".color-3").text();

    if (textP === "FINALIZADO") {
        jQuery(".color-3").css({"background-color": "#D5F5E3"});
    } else if (textP === "EN EJECUCIÓN") {
        jQuery(".color-3").css({"background-color": "#FCF3CF"});
        jQuery(".informe_final").css({"display": "none"});
        jQuery(".cumplimiento").css({"display": "none"});
    } else if (textP === "NO APROBADO") {
        jQuery(".color-3").css({"background-color": "#FADBD8"});
        jQuery(".informe_final").css({"display": "none"});
        jQuery(".cumplimiento").css({"display": "none"});
    } else if (textP === "CANCELADO") {
        jQuery(".color-3").css({"background-color": "#EFEBE9"});
        jQuery(".certificado").css({"display": "none"});
    }    

});

/*
<div class='row'>

<div class='col-sm-4'>
    <div class='id'><strong>Código: </strong>${item.codigo}</div>
    <div class='autores'><strong>Autores: </strong>${item.autor_1}, ${item.autor_2}, ${item.autor_3}, ${item.autor_4}, ${item.autor_5}, ${item.autor_6}, ${item.autor_7}, ${item.autor_8}, ${item.autor_9}, ${item.autor_10}</div>
    <div class='area'><strong>Área: </strong><p>${item.area}</p></div>
    <hr>
    <div class='estado'><strong>Estado: </strong><p class='color-3'>${item.estado}</p></div>
    <hr>
    <ul class='certificado vc_row wpb_row vc_row-fluid row '>
        <li class='concepto'>                        
            <a href='${item.concepto_etico}' title='Concepto Comité de Ética' target='_blank'> Concepto Comité de Ética</a>
        </li>
        <li class='informe_final'>                          
            <a href='${item.informe_final}' title='Informe Final' target='_blank'> Informe Final</a>
        </li>
        <li class='cumplimiento'>                          
            <a href='${item.certificado_cumplimiento}' title='Certificado Cumplimiento' target='_blank'> Certificado de Cumplimiento</a>
        </li>
    </ul>
</div>

<div class='col-sm-8'>
    <hr>
    <div class='resumen'><strong>Resumen: </strong>${item.resumen}</div>
</div>
</div> */