namespace WebApp.ViewModel
{
    public class OpcionTablaViewModel
    {
        public string Accion { get; set; }
        public string DescItem { get; set; }
        public string PropiedadId { get; set; }
        public string ClassBoton { get; set; }
        public string Icono { get; set; }
        public string jAction { get; set; }
        public ControlTypeEnum controlType { get; set; }
    }

    public enum ControlTypeEnum
    {
        link,
        button
    }
}
