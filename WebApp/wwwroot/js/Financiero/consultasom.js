$(document).ready(function () {
    CargaOrdenesInicial();


    $('#CurAcadId').on('change', function () {
        let curso = $('#CurAcadId').val();
        CargarOrdenes(curso);
    });
});

function CargaOrdenesInicial() {
    var vcurso = $("#CurAcadId").val();
    if (vcurso !== '') CargarOrdenes(vcurso);
}

function CargarOrdenes(itemId) {
    let body = $("#tbodyEstudiantes");
    body.html();
    $.ajax({
        data:
        {
            id: itemId,
        },
        url: "/OrdenMatricula/GetDetalleOrdenes",
        success: function (respuesta) {
            if (respuesta !== null) {
                body.html(respuesta);
               
            }
            else {
                MensajeGeneral('warning',
                    'Aviso de sistema',
                    'No se encontraron ordenes',
                    'Aceptar');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL BUSCAR ORDENES", "Se presento un error en la busqueda de las ordenes", "Aceptar");
        }
    });
}

