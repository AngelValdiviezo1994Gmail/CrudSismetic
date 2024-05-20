


function verficarUsuario() {
    $("#modalcredenciales").modal("show");
}

function AutenticaUsuario() {

    var usuario = $("#usuario").val();
    var password = $("#password").val();

    $.ajax({
        data:
        {
            usuario: usuario,
            clave: password
        },
        url: "/RegistroNotas/AutenticaUsuario",
        success: function (respuesta) {
            if (respuesta == true) {
               // $("#form").submit();
                $("#modalcredenciales").modal("hide");
                GuardarDatos();
            }
            else {
                MensajeGeneral('error',
                    'Aviso de sistema',
                    respuesta,
                    'Aceptar');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL AUTENTICAR USUARIO", "Se presento un error en la busqueda de credenciales del usuario", "Aceptar");
        }
    });


}

function GuardarDatos() {
    obtenerDatosTable()
        .then((response) => {
                model.listaNotas = response;
                EnviarData();
        })
        .catch((err) => {
            MensajeGeneral("error", "ERROR FALTAN NOTAS POR AGREGAR", "Se presento un error al momento de guardar las notas de habilitación", "Aceptar");
        });
}


function obtenerDatosTable() {
    return new Promise(function (resolve, reject) {
        var listaEstudiante = [];
        var element = document.getElementById("tbRegistros");
        var dataGridInstance = DevExpress.ui.dxDataGrid.getInstance(element);

        if (dataGridInstance) {
            var dataSource = dataGridInstance.getDataSource();
            dataSource.load().done(function (data) {
                listaEstudiante = data;
                resolve(listaEstudiante);
            }).fail(function (error) {
                console.error("Error al cargar los datos de la tabla:", error);
                MensajeGeneral("error", "ERROR AL GUARDAR DATOS", "Se presento un error al momento de guardar las notas de habilitación", "Aceptar");
            });
        } else {
            console.error("No se encontró una instancia válida del DataGrid.");
            MensajeGeneral("error", "ERROR AL GUARDAR DATOS", "Se presento un error al momento de guardar las notas de habilitación", "Aceptar");
        }
    });
}
function EnviarData() {
    $.ajax({
        data: model,
        method: 'POST',
        url: "/RegistroNotas/CargarNotas",
        success: function (respuesta) {
            MensajeGeneral(respuesta.tipoMensaje, respuesta.titulo, respuesta.mensaje, respuesta.botonAceptar, GetURL() + "RegistroNotas/CargarNotas/" + model.curMatId);
        },
        error: function (xhr, ajaxOptions, thrownError) {

            MensajeGeneral("error", "ERROR AL GUARDAR DATOS", "Se presento un error al momento de guardar las notas de habilitación", "Aceptar");
        }
    });
}
function quitarTildes(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}








