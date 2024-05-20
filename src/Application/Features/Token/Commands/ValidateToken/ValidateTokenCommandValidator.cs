
using FluentValidation;

namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateToken;

public class ValidateTokenCommandValidator : AbstractValidator<ValidateTokenCommand>
{
    public ValidateTokenCommandValidator()
    {

        RuleFor(v => v.TokenRequest.Token)
            .NotNull().WithMessage("{PropertyName} no puede ser nulo.")
            .NotEmpty().WithMessage("{PropertyName} no puede ser vacio.");

    }
}