namespace Common.Domain.Extensiones
{
    public static class ParseBoolExtension
    {
        public static bool ParseBool(this bool? pValor)
        {
            return pValor.HasValue ? pValor.Value : false;
        }
    }
}
