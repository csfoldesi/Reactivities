# Simple demo application for sharing activities with friends

## Backend

- Clean Architecture
- .NET Core REST API
- Identity
- Entity Framework
- SignalR
- Cloudinary image upload

## Frontend

- React TypeScript
- Semantic UI
- Formik
- Axios
- MobX
- SignalR

## Configure the application

Add Cloudinary configuration in appsettings.json:

```powershell
  "Cloudinary": {
    "CloudName": <CloudName>,
    "ApiKey": <ApiKey>,
    "ApiSecret": <APISecret>
  }
```
Add ConnectionString in appsettings.json:

```powershell
  "ConnectionStrings": {
    "DefaultConnection": <ConnectionString>
  }
```

## Running the application

From API folder
```powershell
dotnet run
```
