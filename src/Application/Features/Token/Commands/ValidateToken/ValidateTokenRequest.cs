using System.Text.Json.Serialization;

namespace AngelValdiviezoWebApi.Application.Features.Token.Commands.ValidateTokenCommand
{
    public class ValidateTokenRequest 
    {
        public ValidateTokenRequest() { }

        [JsonPropertyName("token")]
        public string Token { get; set; }

    }
}
