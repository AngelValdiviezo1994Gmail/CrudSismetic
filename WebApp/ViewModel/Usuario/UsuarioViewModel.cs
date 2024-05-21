using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApp.ViewModel.Usuario
{
    public class UsuarioViewModel
    {
        public int EditMode { get; set; }

        public int UsuarioId { get; set; }

        [DisplayName("Perfil")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public int PerfilId { get; set; }

        [DisplayName("Cargo")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public int CargoId { get; set; }

        [DisplayName("Nombres")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public string UsuarioNombre { get; set; }

        [DisplayName("Apellidos")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public string UsuarioApellido { get; set; }

        [DisplayName("Edad")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public int UsuarioEdad { get; set; }

        [DisplayName("Fecha de nacimiento")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [DataType(DataType.Date)]
        public DateTime? UsuarioFechaNacimiento { get; set; }

        [DisplayName("Dirección")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public string UsuarioDireccion { get; set; }

        [DisplayName("Estado")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public bool UsuarioEstado { get; set; }

        public string? UsuarioCreacion { get; set; }

        public DateTime? FechaCreacion { get; set; }

        public string? UsuarioModificacion { get; set; }

        public DateTime? FechaModificacion { get; set; }
    }
}
