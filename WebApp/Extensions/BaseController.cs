using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace WebAppCrudAngelValdiviezo.Extensions
{
    public class BaseController : Controller
    {
        public class ConfiguracionMensaje
        {
            public string Titulo { get; set; }
            public string Mensaje { get; set; }
            public string BotonAceptar { get; set; } = "Aceptar";
            public string BotonCancelar { get; set; } = "Cancelar";
            public string TipoMensaje { get; set; }
            public string TipoPregunta { get; set; } = "success";
            public string FuncionDestino { get; set; }
        }

        public void MensajeNotificaciones(ConfiguracionMensaje ConfMensaje)
        {
            TempData["Message"] = JsonConvert.SerializeObject(ConfMensaje);
        }

        public enum TipoMensaje
        {
            success = 1,
            error = 2,
            warning = 3,
            info = 4,
            question = 5
        }

        public string RemoveController(string value)
        {
            string result = value.Replace("Controller", "");

            return result;
        }
    }
}
