using AngelValdiviezoWebApi.Application.Common.Exceptions;
using AngelValdiviezoWebApi.Application.Common.Wrappers;
using AngelValdiviezoWebApi.Application.Features.Token.Dto;
using AngelValdiviezoWebApi.Application.Features.Token.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AngelValdiviezoWebApi.Persistence.Repository.Token
{

    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly string _secretKey = "";
        private readonly int _expireTime = 0;
        public TokenService(IConfiguration config)
        {
            _config = config;
            _expireTime = _config.GetSection("Jwt:JWT_EXPIRE_HOURS").Get<int>();
            _secretKey = _config.GetSection("Jwt:JWT_SECRET_KEY").Get<string>();
        }

        #region Generar Token

        public Task<ResponseType<string>> CreateToken(TokenType request)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.Default.GetBytes(_secretKey));
                var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
                var expire = DateTime.UtcNow.AddHours(Convert.ToInt32(_expireTime));


                // create a claimsIdentity
                ClaimsIdentity claimsIdentity = new(new[]
                {
                new Claim("Identificacion", request.Identificacion),
                /*
                new Claim("OrganizacionId", request.OrganizacionId),
                new Claim("TokenEcommerce", request.TokenEcommerce),
                new Claim("IpDispositivo", request.IpDevice),
                new Claim("IdDispositivo", request.IdDevice)
                */
                
            });

                // create token to the user
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = tokenHandler.CreateJwtSecurityToken(
                    subject: claimsIdentity,
                    expires: expire,
                    signingCredentials: signingCredentials);

                var jwtTokenString = tokenHandler.WriteToken(jwtSecurityToken);


                return Task.FromResult(new ResponseType<string>() { Succeeded = true, Message = "Token generado exitosamente", StatusCode = "100", Data = jwtTokenString });
            }
            catch (Exception e)
            {
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
        }

        #endregion


        #region Validar Token 

        public Task<ResponseType<string>> ValidateToken(TokenType request)
        {

            try
            {

                string access_token = request.Token;
                JwtSecurityTokenHandler hand = new();
                var tokenS = hand.ReadJwtToken(access_token);

                TokenValidationParameters tokenValidator = new()
                {
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateActor = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_secretKey))
                };


                var expire = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_expireTime));
                var respuesta = hand.ValidateToken(access_token, tokenValidator, out SecurityToken securityToken);
                var cl = respuesta.Claims.ToList();

                var tokenEcommerce = cl[2].Value;

                if (string.IsNullOrEmpty(tokenEcommerce))
                {
                    return Task.FromResult(new ResponseType<string>() { Succeeded = true, Message = "Ocurrió un error: No se encuentra el token de Ecommerce", StatusCode = "101" });
                }

                return Task.FromResult(new ResponseType<string>() { Succeeded = true, Message = "Token validado exitosamente", StatusCode = "100", Data = tokenEcommerce });
            }

            catch (SecurityTokenInvalidLifetimeException e)
            {
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
            catch (SecurityTokenExpiredException e)
            {
                //return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = "Ocurrió un error: " + e.Message, StatusCode = e.HResult.ToString() });
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
            catch (SecurityTokenEncryptionKeyNotFoundException e)
            {
                //return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = "Ocurrió un error: " + e.Message, StatusCode = e.HResult.ToString() });
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
            catch (SecurityTokenException e)
            {
                //return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = "Ocurrió un error: " + e.Message, StatusCode = e.HResult.ToString() });
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
            catch (Exception e)
            {
                //return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = "Ocurrió un error: " + e.Message, StatusCode = e.HResult.ToString() });
                return Task.FromResult(new ResponseType<string>() { Succeeded = false, Message = CodeMessageResponse.GetMessageByCode("102"), StatusCode = "102" });
            }
        }

        #endregion


    }

}
