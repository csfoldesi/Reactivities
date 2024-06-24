# Simple activity sharing application

## Features

- Regsiter, add profile description and images
- Create, browse and join events
- Follow friends
- Realtime chat

## Technology

### Backend

- Clean Architecture
- .NET Core REST API
- Identity
- Entity Framework
- SignalR
- Cloudinary image upload

### Frontend

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

## Run the application

From API folder
```powershell
dotnet run
```
