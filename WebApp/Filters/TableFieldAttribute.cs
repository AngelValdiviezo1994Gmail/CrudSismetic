namespace WebAPP.Filters
{
    public class TableFieldAttribute : System.Attribute
    {
        public string PropertyOrderBy { get; set; }
        public int DisplayOrden { get; set; }
    }
}
