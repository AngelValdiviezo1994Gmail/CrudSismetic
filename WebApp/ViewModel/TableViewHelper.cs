using Newtonsoft.Json;

namespace WebApp.ViewModel
{
    public class TableViewHelper
    {
        public static OpcionesTablaViewModel GetParametros(string op)
        {
            OpcionesTablaViewModel opciones = null;
            if (!string.IsNullOrWhiteSpace(op))
            {
                var base64EncodedBytes = System.Convert.FromBase64String(op);
                var opcionesStr = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                opciones = JsonConvert.DeserializeObject<OpcionesTablaViewModel>(opcionesStr);
            }
            else
            {
                opciones = new OpcionesTablaViewModel();
            }
            return opciones;
        }
    }
}
