using System.ComponentModel;
using WebAPP.Filters;

namespace WebApp.ViewModel.Usuario
{
    public class UsuarioListViewModel
    {
        public int UsuarioId { get; set; }

        [DisplayName("Id")]
        [TableField(DisplayOrden = 1)]
        public string? Id => UsuarioId.ToString();

        public int PerfilId { get; set; }

        public int CargoId { get; set; }

        [DisplayName("Nombres")]
        [TableField(DisplayOrden = 2)]
        public string UsuarioNombre { get; set; }

        [DisplayName("Apellidos")]
        [TableField(DisplayOrden = 2)]
        public string UsuarioApellido { get; set; }

        [DisplayName("Edad")]
        [TableField(DisplayOrden = 3)]
        public int UsuarioEdad { get; set; }

        [DisplayName("Fecha de nacimiento")]
        [TableField(DisplayOrden = 4)]
        public DateTime UsuarioFechaNacimiento { get; set; }

        public string UsuarioDireccion { get; set; }

        public bool UsuarioEstado { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
