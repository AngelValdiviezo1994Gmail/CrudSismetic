using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngelValdiviezoWebApi.Application.Features.Acontecimientos.Dto
{
    public class AcontecimientosType
    {
        public int idAcontecimiento { get; set; }
        public int idEvento { get; set; }
        public string nombreEvento { get; set; }
        public DateTime Fecha { get; set; }
        public string Lugar { get; set; }
        public int NumeroEntrada { get; set; }
        public string Descripcion { get; set; }
        public int Precio { get; set; }
        public bool Estado { get; set; }
    }
}
