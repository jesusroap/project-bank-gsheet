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
        let res = document.querySelector('#results');
        
        res.innerHTML = "";

        for (let item of datos) {
            res.innerHTML += `
                <tr>
                    <td>${item.codigo}</td>
                    <td class='proyecto'>
                        <div class='nombre-proyecto'><a href='proyecto?codigo=${item.codigo}' target='_blank'>${item.proyecto}</a></div>
                        <div class='autores'><strong>Autores: </strong>${item.autor_1}, ${item.autor_2}, ${item.autor_3}, ${item.autor_4}, ${item.autor_5}, ${item.autor_6}, ${item.autor_7}, ${item.autor_8}, ${item.autor_9}, ${item.autor_10}</div>
                        <div class='estado-responsive'><span class='color-3'>${item.estado}</span></div>
                        <div class='ver_mas'><a href='proyecto/codigo/${item.codigo}/' target='_blank'>Ver más</a></div>
                    </td>
                    <td class='modalidad-oculto'>${item.modalidad}</td>
                    <td class='area-oculto'>${item.area}</td>
                    <td class='estado-oculto'>${item.estado}</td>
                    <td class='estado'><div class='color-3'>${item.estado}</div></td>
                </tr>
            `
        }

        // Reemplazamos la "," por un espacio vacio
        let tds = document.body.querySelectorAll('td');
        tds.forEach(tag => tag.innerHTML = tag.innerHTML.replaceAll(', ,', '').replaceAll(' ,', ''));

        // Asignacion de las variables de estado del proyecto
        var finalizado =  jQuery(".color-3:contains('FINALIZADO')");
        var cancelado =  jQuery(".color-3:contains('CANCELADO')");
        var noAprobado =  jQuery(".color-3:contains('NO APROBADO')");
        var enEjecucion =  jQuery(".color-3:contains('EN EJECUCIÓN')");

        if (finalizado) {
            finalizado.css({'background-color': '#D5F5E3'});
            finalizado.closest('.proyecto').find('.estado-responsive').css({'border-color': '#acf5cc'});
        } 
        if (cancelado) {
            cancelado.css({'background-color': '#EFEBE9'});
            cancelado.closest('.proyecto').find('.estado-responsive').css({'border-color': '#dad7d6'});
        }
        if (noAprobado) {
            noAprobado.css({'background-color': '#FADBD8'});
            noAprobado.closest('.proyecto').find('.estado-responsive').css({'border-color': '#f7bbb5'});
        }
        if (enEjecucion) {
            enEjecucion.css({'background-color': '#FCF3CF'});
            enEjecucion.closest('.proyecto').find('.estado-responsive').css({'border-color': '#f9eaac'});
        }

        // Configuraciones DataTables
        jQuery('#tabla_dt').DataTable({
            searchPanes:{
                layout: 'columns-1',
                dataLength: 20,
                cascadePanes: true,
                viewTotal: true, // Problema: ralentiza la busqueda en tiempo real
                controls: false,
                columns:[2,3,4],
            },
            dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"frtip>>',
            pageLength: 20,
            language: {
                searchPanes: {
                    title: 'Filtros Activos: %d',
                    clearMessage: 'autorenew',
                }   
            },
            columnDefs:[
                {
                    searchPanes: {
                        header: 'Modalidad'
                    },
                    targets: [2]
                },
                {
                    searchPanes: {
                        header: 'Área'
                    },
                    targets: [3]
                },
                {
                    searchPanes: {
                        header: 'Estado'
                    },
                    targets: [4]
                },
                {
                    targets: [2],
                    visible: false,
                    searchable: false
                },
                {
                    targets: [3],
                    visible: false,
                    searchable: false
                },
                {
                    targets: [4],
                    visible: false,
                    searchable: false
                },
                {
                    targets: [5],
                    searchable: false
                }
            ]
        });   
    
        // Agrega el boton filtros en modo responsivo
        jQuery("#tabla_dt_wrapper").prepend('<button id="filtrar" type="button">Filtros <span class="material-icons">filter_alt</span></button><div class="oscuro_filtros"></div>');
        // Agrega el fondo oscuro de los filtros en modo responsivo    
        jQuery('#filtrar').click(function() {
            jQuery('body').addClass('filtros_active');
        })  
        jQuery('.oscuro_filtros').click(function() {
            jQuery('body').removeClass('filtros_active');
        })
    
        // Cuenta el numero de proyectos y lo coloca arriba de la seccion de filtros
        var table = jQuery('#tabla_dt').DataTable();
        var totalProyectos = "Total de Proyectos: "+table.data().length;
        jQuery('.dtsp-verticalPanes').prepend('<div id="total-proyectos" style="text-align: center"></div>');
        jQuery('#total-proyectos').html(totalProyectos);
    
        jQuery('.dtsp-clearAll').addClass('material-icons');

        var oTable = jQuery('#tabla_dt').dataTable();
        jQuery('div.dataTables_filter input').unbind();
        jQuery('div.dataTables_filter input').bind('keyup', function(e) {
            if(this.value.length >= 3 || e.keyCode == 13) {
                oTable.fnFilter(this.value);
            }

            if(this.value == "") { 
                oTable.fnFilter("").draw(); 
            } 
        });
    }
    
    getCSVFByDocId('1HsF7qvYq30TyWISZYdtx5Ka-L8XqRjcWddhBIHBTOOI', 'PaginaWeb!A:Z').then(procesaDatosAJSON);

});

// Animación de carga de la página Banco de Proyectos
jQuery(window).load(function() {
    jQuery("#contenedor_carga").fadeOut(2000);

    setTimeout(function() { jQuery('body').removeClass('over-hidden'); }, 2000);
});
