using Common.Domain.Entities;

namespace Common.Domain.Interfaces
{
    public interface ISesionHelper
    {
        void SetDatos(DatosSession datos);
        bool IsSesionValid();
        DatosSession GetAll();

        void KillSession();
        int GetUsuarioId();
        string GetIdentificador();
        string GetNombreCompleto();
        string GetNombreCorto();
        string GetUsuario();
        string GetCorreoInstitucional();
        int GetEscuela();

        string GetEscuelaLogo();
        string GetEscuelaNombre();

        string GetEscuelaNombreCorto();

       string GetRolesUsuario();
       string GetPermisosRolesUsuario();
        bool IsRolUserSuperAdmin();
    }
}
