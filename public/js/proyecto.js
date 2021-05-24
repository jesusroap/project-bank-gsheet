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
                    // En las demás filas asignamos la propiedad que corresponda según la posición
                    obj[campos[c]] = celda;
                }
            }
        
            // Añadimos el nuevo objeto a la colección de datos (si no es la primera fila)
            if (f > 0) datos.push(obj);
        } 

        // Pintamos en el DOM los detalles de cada proyecto segun su codigo
        let res = document.querySelector('#proyecto-individual');

        // Toma el ultimo valor de la URL
        // let paths = window.location.pathname.split('/');
        // let codigo = paths[paths.length-2];
        
        // Toma el parametro de busqueda 'codigo' de la URL 
        let params = new URLSearchParams(location.search);
        let codigo = params.get('codigo');

        console.log(codigo);
        
        for (let i = 0; i < numFilas; i++) {

            if (codigo === datos[i].codigo) {

                res.innerHTML = "";
    
                return res.innerHTML += `
                    <h3 class='proyecto'>${datos[i].proyecto}</h3>
                    <div class='row'>
                        <div class='col-sm-4'>
                            <div class='id'><strong>Código: </strong>${datos[i].codigo}</div>
                            <div class='autores'><strong>Autores: </strong>${datos[i].autor_1}, ${datos[i].autor_2}, ${datos[i].autor_3}, ${datos[i].autor_4}, ${datos[i].autor_5}, ${datos[i].autor_6}, ${datos[i].autor_7}, ${datos[i].autor_8}, ${datos[i].autor_9}, ${datos[i].autor_10}</div>
                            <div class='area'><strong>Área: </strong><p>${datos[i].area}</p></div>
                            <hr>
                            <div class='estado'><strong>Estado: </strong><p class='color-3'>${datos[i].estado}</p></div>
                            <hr>
                            <ul class='certificado vc_row wpb_row vc_row-fluid row '>
                                <li class='concepto'>                        
                                    <a href='${datos[i].concepto_etico}' title='Concepto Comité de Ética' target='_blank'> Concepto Comité de Ética</a>
                                </li>
                                <li class='informe_final'>                          
                                    <a href='${datos[i].informe_final}' title='Informe Final' target='_blank'> Informe Final</a>
                                </li>
                                <li class='cumplimiento'>                          
                                    <a href='${datos[i].certificado_cumplimiento}' title='Certificado Cumplimiento' target='_blank'> Certificado de Cumplimiento</a>
                                </li>
                            </ul>
                        </div>

                        <div class='col-sm-8'>
                            <hr>
                            <div class='resumen'><strong>Resumen: </strong>${datos[i].resumen}</div>
                        </div>
                    </div>
                `;
                
            }
        }

    }

    getCSVFByDocId('1HsF7qvYq30TyWISZYdtx5Ka-L8XqRjcWddhBIHBTOOI', 'PaginaWeb!A:Z').then(procesaDatosAJSON);

});

setTimeout(function() {
            // Reemplazamos la "," por un espacio vacio
            let tds = document.body.querySelectorAll('.autores');
            tds.forEach(tag => tag.innerHTML = tag.innerHTML.replaceAll(', ,', '').replaceAll(' ,', ''));
    
            // resaltado de color en el estado
            let textP = jQuery(".color-3").text();
    
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
}, 2000);