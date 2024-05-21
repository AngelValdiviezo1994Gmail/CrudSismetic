namespace WebApp.Utils
{
    public class EstadoBoolViewModel
    {
        public bool Valor { get; set; }
        public int ValInt { get; set; }
        public string Texto { get; set; }

        public string SiNo { get; set; }

        public static List<EstadoBoolViewModel> ListarEstadosBool()
        {
            return new List<EstadoBoolViewModel>
            {
                new EstadoBoolViewModel { Valor = true, Texto = "ACTIVO",SiNo= "Si"},
                new EstadoBoolViewModel {Valor = false, Texto = "INACTIVO", SiNo="No"}
            };
        }

        public static List<EstadoBoolViewModel> ListarEstadosIntSINO()
        {
            return new List<EstadoBoolViewModel>
            {
                new EstadoBoolViewModel { ValInt = 1, Texto = "ACTIVO",SiNo= "Si"},
                new EstadoBoolViewModel {ValInt = 0, Texto = "INACTIVO", SiNo="No"}
            };
        }
        public static List<EstadoBoolViewModel> ListarEstadosInt()
        {
            return new List<EstadoBoolViewModel>
            {
                new EstadoBoolViewModel { ValInt = 1, Texto = "ACTIVO"},
                new EstadoBoolViewModel { ValInt = 0, Texto = "INACTIVO"},
                new EstadoBoolViewModel { ValInt = -1, Texto = "EN PROCESO"},
            };
        }

        public EstadoBoolViewModel()
        {
            this.Texto = string.Empty;
            this.SiNo = string.Empty;
        }

    }
}
