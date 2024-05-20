
$(document).ready(function () {
    
    $("#SeccionJustificacionAsistioDocente").hide();
    $("#SeccionJustificacionSesionEfectiva").hide();

    $("#btnPrevisualizar").click(function () {
        ModalCtrlAsistencia();
    });

    //let isSubmitting = true;

    $('#btnImportar').off('click').on('click', function () {
        ImportarAsistencias();
    });

    /*
    $('#btnImportar').on('click', function (event) {
        event.stopPropagation();
        ImportarAsistencias();
    });
    */

    /*
    $("#btnImportar").click(function (event) {
        event.preventDefault();

        //isSubmitting = true;

        if (!isSubmitting) return;  // Evita múltiples envíos

        ImportarAsistencias();
        isSubmitting = false;
        
    });
    */

    var chkAsistioControlAsistencia = document.getElementById('AsistioControlAsistencia');
    var chkAsistioEfectivaControlAsistencia = document.getElementById('EfectivaControlAsistencia');

    chkAsistioControlAsistencia.addEventListener('change', function () {
        ActivaSeccionJustificacionAsistioDocente(this.checked.toString());
    });

    chkAsistioEfectivaControlAsistencia.addEventListener('change', function () {
        ActivaSeccionJustificacionSesionEfectiva(this.checked.toString());
    });
});

function getSelectBoxInstance(idSelectBox) {
    let element = document.getElementById(idSelectBox);
    return DevExpress.ui.dxSelectBox.getInstance(element);
}

function getDataGridInstance(idGridview) {
    let element = document.getElementById(idGridview);
    return DevExpress.ui.dxDataGrid.getInstance(element);
}

function cmbProgramaValueChanged(data) {
    getSelectBoxInstance("cmbCurso").option('value', null);
    getSelectBoxInstance("cmbCurso").getDataSource().reload();

    getSelectBoxInstance("cmbPeriodo").option('value', null);
    getSelectBoxInstance("cmbPeriodo").getDataSource().reload();
}

function cmbDocenteValueChanged() {

    var idDoc = getSelectBoxInstance("cmbDocente").option('value');

    $.ajax({
        url: "/ControlAsistencia/ObtenerDatosDocente",
        type: 'POST',
        data: {
            id: idDoc,
        },
        success: function (result) {
            $("#CodDocente").val(result.codDocente);
            $("#CedDocente").val(result.cedDocente);
        },
        error: function (xhr, status, error) {
            console.error("Error al consultar: " + error);
        }
    });

}

function getIdPrograma() {
    return getSelectBoxInstance("cmbPrograma").option('value');
}

function cmbCursoValueChanged(data) {

    getSelectBoxInstance("cmbAsignatura").option('value', null);
    getSelectBoxInstance("cmbAsignatura").getDataSource().reload();

    getSelectBoxInstance("cmbSemana").option('value', null);
    getSelectBoxInstance("cmbSemana").getDataSource().reload();

}

function getIdPrograma() {
    return getSelectBoxInstance("cmbPrograma").option('value');
}

function cmbPeriodoValueChanged(data) {
    /*getDataGridInstance("gridSesiones").refresh();
    getSelectBoxInstance("cmbAsignatura").option('value', null);
    getSelectBoxInstance("cmbAsignatura").getDataSource().reload();
    */
}

function cmbSemanaValueChanged(data) {
    getDataGridInstance("gridSesiones").refresh();
}

function getIdCurso() {

    return getSelectBoxInstance("cmbCurso").option('value');
}

function getIdSemana() {
    return getSelectBoxInstance("cmbSemana").option('value');
}

function getIdMateria() {
    return getSelectBoxInstance("cmbAsignatura").option('value');
}

function ActivaSeccionJustificacionAsistioDocente(ActivaJustificacion) {

    if (ActivaJustificacion == 'true') {
        $("#SeccionJustificacionAsistioDocente").hide();
    } else {
        $("#SeccionJustificacionAsistioDocente").show();
    }
}

function ActivaSeccionJustificacionSesionEfectiva(ActivaJustificacion) {

    if (ActivaJustificacion == 'true') {
        $("#SeccionJustificacionSesionEfectiva").hide();
    } else {
        $("#SeccionJustificacionSesionEfectiva").show();
    }
}

function VerCtrlAsistencia(IdGrd, Prog, Curso, Periodo, Asignatura, Semana) {

    $.ajax({
        url: "/ControlAsistencia/RevisaControl",
        type: 'GET',
        data: {
            id: IdGrd,
        },
        success: function (result) {
            $("#_ModalControlAsistenciaView").modal("show");

            /*
            var CodDocente = 'Código: ' + $("#CodDocente").val();
            $("#lblCodigo").text(CodDocente);

            
            */

            var NombDocente = 'Docente: ' + result.docNombre;
            $("#lblDocente").text(NombDocente);

            var Documento = 'Documento: ' + result.docDocumento;
            $("#lblDocumento").text(Documento);

            var Programa = 'Programa: ' + Prog;
            $("#lblProg").text(Programa);

            var CursoLbl = 'Curso: ' + Curso;
            $("#lblCurso").text(CursoLbl);

            var PeriodoLbl = 'Periodo: ' + Periodo;
            $("#lblPeriodo").text(PeriodoLbl);

            var LblAsignatura = 'Asignatura: ' + Asignatura;
            $("#lblAsignatura").text(LblAsignatura);

            var LblSemana = 'Semana: ' + Semana;
            $("#lblSemana").text(LblSemana);

            getDataGridInstance("grdAsistenciaEstudianteView").refresh();
        },
        error: function (xhr, status, error) {
            console.error("Error al subir el archivo: " + error);
        }
    });

}

function VerCtrlAsistenciaByFiltros(IdGrd, Prog, Curso, Periodo, Asignatura, Semana) {

    $.ajax({
        url: "/ControlAsistencia/RevisaControl",
        type: 'GET',
        data: {
            id: IdGrd,
        },
        success: function (result) {
            $("#_ModalControlAsistenciaByFiltros").modal("show");

            /*
            var CodDocente = 'Código: ' + $("#CodDocente").val();
            $("#lblCodigo").text(CodDocente);

            
            */

            var NombDocente = 'Docente: ' + result.docNombre;
            $("#lblDocente").text(NombDocente);

            var Documento = 'Documento: ' + result.docDocumento;
            $("#lblDocumento").text(Documento);

            var Programa = 'Programa: ' + Prog;
            $("#lblProg").text(Programa);

            var CursoLbl = 'Curso: ' + Curso;
            $("#lblCurso").text(CursoLbl);

            var PeriodoLbl = 'Periodo: ' + Periodo;
            $("#lblPeriodo").text(PeriodoLbl);

            var LblAsignatura = 'Asignatura: ' + Asignatura;
            $("#lblAsignatura").text(LblAsignatura);

            var LblSemana = 'Semana: ' + Semana;
            $("#lblSemana").text(LblSemana);

            getDataGridInstance("grdAsistenciaEstudianteView").refresh();
        },
        error: function (xhr, status, error) {
            console.error("Error al subir el archivo: " + error);
        }
    });

}

function CerrarModalCtrlAsistenciaView() {
    $("#_ModalControlAsistenciaView").modal("hide");
}

function CerrarModalCtrlAsistenciaByFiltros() {
    $("#_ModalControlAsistenciaByFiltros").modal("hide");
}

function ModalCtrlAsistencia() {

    var formData = new FormData();
    var archivo = $("#archivoAdjunto")[0].files[0];
    formData.append("archivoAdjunto", archivo);

    $.ajax({
        url: "/ControlAsistencia/SubirArchivo",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (result) {
            $("#_ModalControlAsistencia").modal("show");

            var CodDocente = 'Código: ' + $("#CodDocente").val();
            $("#lblCodigo").text(CodDocente);

            var NombDocente = 'Docente: ' + getSelectBoxInstance("cmbDocente").option('text');
            $("#lblDocente").text(NombDocente);

            var Documento = 'Documento: ' + $("#CedDocente").val();
            $("#lblDocumento").text(Documento);

            var Programa = 'Programa: ' + getSelectBoxInstance("cmbPrograma").option('text');
            $("#lblProg").text(Programa);

            var Curso = 'Curso: ' + getSelectBoxInstance("cmbCurso").option('text');
            $("#lblCurso").text(Curso);

            var Periodo = 'Periodo: ' + getSelectBoxInstance("cmbPeriodo").option('text');
            $("#lblPeriodo").text(Periodo);

            var Asignatura = 'Asignatura: ' + getSelectBoxInstance("cmbAsignatura").option('text');
            $("#lblAsignatura").text(Asignatura);

            var Semana = 'Semana: ' + getSelectBoxInstance("cmbSemana").option('text');
            $("#lblSemana").text(Semana);

            getDataGridInstance("grdAsistenciaEstudiante").refresh();
            /*
            
            getDataGridInstance("grdAsistenciaEstudiante").refresh();
            */
        },
        error: function (xhr, status, error) {
            console.error("Error al subir el archivo: " + error);
        }
    });

}

function CerrarModalControlAsistencia() {
    $("#_ModalControlAsistencia").modal("hide");
}

function onDataErrorOccurred(e) {
    if (e.error.message === "No se encontraron datos") {
        console.log("No hay datos en el DataGrid");
        // Puedes mostrar un mensaje, ocultar el DataGrid, etc.
    }
}

function mostrarValorCol(valor) {
    console.log("Valor de la columna " + valor);
}

function EditaAsistenciaDocente(idDoc, fechaSesion) {

    $.ajax({
        url: "/ControlAsistencia/GuardaIdHorarioDet",
        type: 'POST',
        data: {
            id: idDoc,
        },
        success: function (result) {
            $("#_ModAsistDocente").modal("show");
            $("#FechaHorDetDiaDesc").val(fechaSesion);
            $('#AsistioControlAsistencia').prop('checked', true);
            $('#EfectivaControlAsistencia').prop('checked', true);
        },
        error: function (xhr, status, error) {
            console.error("Error al agregar asistencia del docente: " + error);
        }
    });

}

function CerrarModalAsistenciaDocente() {
    $("#_ModAsistDocente").modal("hide");
}

function GuardaAsistenciasDoc() {

    var IdJustAsis = getSelectBoxInstance("cmbJustificacionesSesion").option('value');
    var IdJustAsisDoc = getSelectBoxInstance("cmbJustificacionesDoc").option('value');

    var datos = {
        AsistioControlAsistencia: $('#AsistioControlAsistencia').prop('checked'),//$("#AsistioControlAsistencia").val(),
        EfectivaControlAsistencia: $('#EfectivaControlAsistencia').prop('checked'),//$("#EfectivaControlAsistencia").val(),
        IdJustificacionControlAsistencia: IdJustAsis,
        ObservacionControlAsistencia: $("#ObservacionControlAsistencia").val(),
        IdJustificacionControlAsistenciaDocente: IdJustAsisDoc,
        ObservacionControlAsistenciaDocente: $("#ObservacionControlAsistenciaDocente").val(),
        EscId: 0,
        HorarioDetId: 0,
        HorarioDetCod: 0,
        AsigId: 0,
        HorarioDetDia: 0,
        HorarioDetHoraIni: "",
        HorarioDetHoraFin: "",
        HorarioDetActivo: true,
        UsuIdCreacion: 0,
        UsuIdModificacion: 0,
        HorSemId: 0,
        HorarioDetFechaCreacion: new Date(),
        HorarioDetFechaModificacion: new Date(),
        FechaHorDetDia: new Date()
    };

    $.ajax({
        url: "/ControlAsistencia/GuardaAsistenciaDocente",
        type: "POST",
        data: {
            horario: datos,
        },
        success: function (result) {

            if (result === true) {
                CerrarModalAsistenciaDocente();

                getDataGridInstance("gridSesiones").refresh();                

                MensajeGeneral("success",
                    "CONTROL ASISTENCIA",
                    "La asistencia del docente fue registrada correctamente",
                    "Aceptar");


            }
            else {
                MensajeGeneral("error",
                    "ERROR CONTROL ASISTENCIA",
                    result.error,
                    "Aceptar");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error al agregar asistencia del docente: " + error);
        }
    });
}

function ImportarAsistencias() {
    
    var gridView = document.getElementById("grdAsistenciaEstudiante");
    var filas = gridView.getElementsByTagName("tr");
    var ListaAsistencia = [];
    var datos = {};

    var Prog_Id = getSelectBoxInstance("cmbPrograma").option('value');
    var Asig_Id = getSelectBoxInstance("cmbAsignatura").option('value');
    var Cur_Id = getSelectBoxInstance("cmbCurso").option('value');
    var Doc_Id = getSelectBoxInstance("cmbDocente").option('value');
    var Per_Id = getSelectBoxInstance("cmbPeriodo").option('value');
    var Sem_Id = getSelectBoxInstance("cmbSemana").option('value');

    var DatosOCtrlAsis = {
        ProgId: Prog_Id,
        AsignaturaId: Asig_Id,
        CursoId: Cur_Id,
        DocId: Doc_Id,
        PeriodoId: Per_Id,
        SemanaId: Sem_Id
    };

    for (var i = 1; i < filas.length - 1; i++) {
        var celdas = filas[i].getElementsByTagName("td");
        for (var j = 0; j < celdas.length; j++) {
            var valorCelda = celdas[j].innerText;

            if (j < 3) {
                if (j == 0) {
                    datos.CtrlAsistId = valorCelda;
                }

                if (j == 1) {
                    datos.CtrlAsistNombre = valorCelda;
                }

                if (j == 2) {
                    datos.CtrlAsistDocumento = valorCelda;
                }
            }
            else {
                if (j >= 3 && celdas[j].firstElementChild != undefined) {
                    var check = celdas[j].firstElementChild.firstChild.value;
                    //console.log("Valor Check: " + check);

                    if (j == 3) {
                        datos.AsistioSesion1 = check;
                    }

                    if (j == 4) {
                        datos.AsistioSesion2 = check;
                    }

                    if (j == 5) {
                        datos.AsistioSesion3 = check;
                    }

                    if (j == 6) {
                        datos.AsistioSesion4 = check;
                    }

                    if (j == 7) {
                        datos.AsistioSesion5 = check;
                    }
                    

                }

            }
            
        }
        datos.ControlAsistenciaIdEst = 1;
        ListaAsistencia.push(datos);
        datos = {};
    }

    $.ajax({
        url: "/ControlAsistencia/GuardaAsistenciaAlumno",
        type: "POST",
        data: {
            LstAsistEst: ListaAsistencia,
            OCtrlAsis: DatosOCtrlAsis
        },
        success: function (result) {

            if (result === true) {

                CerrarModalControlAsistencia();

                MensajeGeneral("success",
                    "¡Acción exitosa!",
                    "Se realizó la acción correctamente",
                    "Aceptar",
                    GetURL() + "ControlAsistencia/Index");

            }
            else {
                MensajeGeneral("error",
                    "ERROR CONTROL ASISTENCIA",
                    result.error,
                    "Aceptar");
            }
        },        
        error: function (xhr, status, error) {
            console.error("Error al agregar asistencia del docente: " + error);
        }
    });
    
}


function ConsultarAsistenciasXFlt() {

    let ProgId = getSelectBoxInstance("cmbPrograma").option('value');
    let CurId = getSelectBoxInstance("cmbCurso").option('value');
    let PerId = getSelectBoxInstance("cmbPeriodo").option('value');
    let AsigId = getSelectBoxInstance("cmbAsignatura").option('value');
    let SemId = getSelectBoxInstance("cmbSemana").option('value');

    $.ajax({
        type: "GET",
        data: {
            VarProgId: ProgId,
            VarCurId: CurId,
            VarPerId: PerId,
            VarAsigId: AsigId,
            VarSemId: SemId
        },
        url: "/ControlAsistencia/ConsultaAsistenciasXFiltro",
        success: function (result) {
            getDataGridInstance("GridAsistencia").refresh();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            MensajeGeneral("error", "ERROR AL ENCONTRAR EL LISTADO DE ASISTENCIAS", "Se presento un error al buscar los tramites del alumno.", "Aceptar");
        }
    });

}
