

using System.Diagnostics.CodeAnalysis;

namespace AngelValdiviezoWebApi.Domain.Exceptions;
public abstract class BadRequestException : ApplicationException
{
    [ExcludeFromCodeCoverage]
    protected BadRequestException(string message)
        : base("Bad Request", message)
    {
    }
}
