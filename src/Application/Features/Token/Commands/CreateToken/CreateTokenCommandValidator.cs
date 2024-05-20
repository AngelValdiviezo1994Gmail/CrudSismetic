
using FluentValidation;

namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.CreateToken;

public class CreateTokenCommandValidator : AbstractValidator<CreateTokenCommand>
{
    public CreateTokenCommandValidator()
    {
       
        RuleFor(v => v.TokenRequest.Identificacion)
            .NotNull().WithMessage("{PropertyName} no puede ser nulo.")
            .NotEmpty().WithMessage("{PropertyName} no puede ser vacio.")
            .MaximumLength(10).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres");
       /*
        RuleFor(v => v.TokenRequest.TokenEcommerce)
            .NotNull().WithMessage("{PropertyName} no puede ser nulo.")
            .NotEmpty().WithMessage("{PropertyName} no puede ser vacio.")
            .MaximumLength(1000).WithMessage("{PropertyName} no debe exceder de {MaxLength} caracteres");
        */
    }
}