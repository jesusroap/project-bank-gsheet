jQuery(document).ready(function () {
  // Configuraciones DataTables
  var table = jQuery("#tabla_dt").DataTable({
    ajax: {
      url: "https://sheets.googleapis.com/v4/spreadsheets/1HsF7qvYq30TyWISZYdtx5Ka-L8XqRjcWddhBIHBTOOI/values/PaginaWeb!A2:Z?key=AIzaSyBnk4I7IbLq1GV4wVuIypF6lAXijdVknSw",
      dataSrc: "values",
    },
    deferRender: true,
    columns: [
      {
        data: "0",
      },
      {
        render: function (data, type, row) {
          return (
            '<div class="nombre-proyecto"><a href="proyecto/codigo/' +
            row[0] +
            '" target="_blank">' +
            row[1] +
            "</a></div>" +
            '<div class="autores"><strong>Autores: </strong>' +
            row[2] +
            ", " +
            row[3] +
            ", " +
            row[4] +
            ", " +
            row[5] +
            ", " +
            row[6] +
            ", " +
            row[7] +
            ", " +
            row[8] +
            ", " +
            row[9] +
            ", " +
            row[10] +
            ", " +
            row[11] +
            "</div>" +
            '<div class="estado-responsive"><span class="color-3">' +
            row[12] +
            "</span></div>" +
            '<div class="ver_mas"><a href="proyecto/codigo/' +
            row[0] +
            '" target="_blank"">Ver más</a></div>'
          );
        },
      },
      {
        data: "18",
        defaultContent: "<i>undefined</i>",
      },
      {
        data: "17",
        defaultContent: "<i>undefined</i>",
      },
      {
        data: "12",
      },
      {
        render: function (data, type, row) {
          return '<div class="color-3">' + row[12] + "</div>";
        },
      },
    ],
    searchPanes: {
      layout: "columns-1",
      dataLength: 20,
      cascadePanes: true,
      viewTotal: true, // Problema: ralentiza la busqueda en tiempo real
      controls: false,
      columns: [2, 3, 4],
    },
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"frtip>>',
    pageLength: 20,
    language: {
      searchPanes: {
        title: "Filtros Activos: %d",
        clearMessage: "autorenew",
      },
    },
    columnDefs: [
      {
        searchPanes: {
          header: "Modalidad",
        },
        targets: [2],
      },
      {
        searchPanes: {
          header: "Área",
        },
        targets: [3],
      },
      {
        searchPanes: {
          header: "Estado",
        },
        targets: [4],
      },
      {
        targets: [0],
        className: "codigo",
      },
      {
        targets: [1],
        className: "proyecto",
      },
      {
        targets: [2],
        visible: false,
        searchable: false,
        className: "modalidad-oculto",
      },
      {
        targets: [3],
        visible: false,
        searchable: false,
        className: "area-oculto",
      },
      {
        targets: [4],
        visible: false,
        searchable: false,
        className: "estado-oculto",
      },
      {
        targets: [5],
        searchable: false,
        className: "estado",
        render: "",
      },
    ],
  });

  table.on("draw", function() {
    customs();
  });

  function customs() {
    // Reemplazamos la "," por un espacio vacio
    let tds = document.body.querySelectorAll("td");
    tds.forEach(
      (tag) =>
        (tag.innerHTML = tag.innerHTML
          .replaceAll(", ,", "")
          .replaceAll(" ,", ""))
    );

    // Asignacion de las variables de estado del proyecto
    var finalizado = jQuery(".color-3:contains('FINALIZADO')");
    var cancelado = jQuery(".color-3:contains('CANCELADO')");
    var noAprobado = jQuery(".color-3:contains('NO APROBADO')");
    var enEjecucion = jQuery(".color-3:contains('EN EJECUCIÓN')");

    if (finalizado) {
      finalizado.css({ "background-color": "#D5F5E3" });
      finalizado
        .closest(".proyecto")
        .find(".estado-responsive")
        .css({ "border-color": "#acf5cc" });
    }
    if (cancelado) {
      cancelado.css({ "background-color": "#EFEBE9" });
      cancelado
        .closest(".proyecto")
        .find(".estado-responsive")
        .css({ "border-color": "#dad7d6" });
    }
    if (noAprobado) {
      noAprobado.css({ "background-color": "#FADBD8" });
      noAprobado
        .closest(".proyecto")
        .find(".estado-responsive")
        .css({ "border-color": "#f7bbb5" });
    }
    if (enEjecucion) {
      enEjecucion.css({ "background-color": "#FCF3CF" });
      enEjecucion
        .closest(".proyecto")
        .find(".estado-responsive")
        .css({ "border-color": "#f9eaac" });
    }

    // Cuenta el numero de proyectos y lo ubica antes de los filtros
    var totalProyectos = "Total de Proyectos: " + table.data().length;
    jQuery("#total-proyectos").html(totalProyectos);

    // Agrega la clase 'material-icons' al refresh de los filtros
    jQuery(".dtsp-clearAll").addClass("material-icons");
  };

  // Agrega el boton filtros en modo responsivo
  jQuery("#tabla_dt_wrapper").prepend(
    '<button id="filtrar" type="button">Filtros <span class="material-icons">filter_alt</span></button><div class="oscuro_filtros"></div>'
  );

  // Agrega el fondo oscuro de los filtros en modo responsivo
  jQuery("#filtrar").click(function () {
    jQuery("body").addClass("filtros_active");
  });
  jQuery(".oscuro_filtros").click(function () {
    jQuery("body").removeClass("filtros_active");
  });

  // Se crea el contenedor para el total del proyectos
  jQuery(".dtsp-verticalPanes").prepend(
    '<div id="total-proyectos" style="text-align: center"></div>'
  );
});
