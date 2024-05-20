#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["/src/AngelValdiviezoWebApi/AngelValdiviezoWebApi.csproj", "src/AngelValdiviezoWebApi/"]
COPY ["/src/Application/Application.csproj", "src/Application/"]
COPY ["/src/Domain/Domain.csproj", "src/Domain/"]
COPY ["/src/Persistence/Persistence.csproj", "src/Persistence/"]
RUN dotnet restore "/src/src/AngelValdiviezoWebApi/AngelValdiviezoWebApi.csproj"
COPY . .
WORKDIR "/src/src/AngelValdiviezoWebApi"
RUN dotnet build "AngelValdiviezoWebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AngelValdiviezoWebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AngelValdiviezoWebApi.dll"]