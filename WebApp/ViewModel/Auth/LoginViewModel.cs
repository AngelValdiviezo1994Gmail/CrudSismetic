using System.ComponentModel.DataAnnotations;

namespace WebAppCrudAngelValdiviezo.ViewModel.Auth
{
    public class LoginViewModel
    {
        [Display(Name = "Usuario")]
        [EmailAddress(ErrorMessage = "Diligencia un email válido")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        public string? Identificacion { get; set; }

        [Display(Name = "Contraseña")]
        [Required(ErrorMessage = "El campo es obligatorio")]
        [DataType(DataType.Password)]
        public string? password { get; set; }

    }
}
