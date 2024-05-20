using System.ComponentModel.DataAnnotations;

namespace WebAppCrudAngelValdiviezo.ViewModel.Auth
{
    public class LoginViewModel
    {
        [Display(Name = "Usuario")]
        [EmailAddress(ErrorMessage = "Diligencia un email válido")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public string? usuario { get; set; }

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        [DataType(DataType.Password)]
        public string? clave { get; set; }

        [Display(Name = "Token de Acceso")]
        // [Required(ErrorMessage = "El campo es obligatorio")]
        [MinLength(6, ErrorMessage = "Token Invalido")]
        [DataType(DataType.Password)]
        public string? token { get; set; }

        [Display(Name = "Escuela")]
        [Range(1, 99, ErrorMessage = "Seleccione una Escuela de la lista")]
        public int? EscId { get; set; }

        public bool requestToken { get; set; }
    }
}
