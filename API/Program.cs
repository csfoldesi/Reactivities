using Persistence;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Middleware;
using Microsoft.AspNetCore.Identity;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.SignalR;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    try
    {
        var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
        await dataContext.Database.MigrateAsync();
        await Seed.SeedData(dataContext, userManager);
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occured durign migration");
    }
}

app.UseXContentTypeOptions();
app.UseReferrerPolicy(opt => opt.NoReferrer());
app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
app.UseXfo(opt => opt.Deny());
app.UseCsp(
    opt =>
        opt.BlockAllMixedContent()
            .StyleSources(
                s => s.Self().CustomSources("https://fonts.googleapis.com").UnsafeInline()
            )
            .FontSources(s => s.Self().CustomSources("https://fonts.gstatic.com", "data:"))
            .FormActions(opt => opt.Self())
            .FrameAncestors(opt => opt.Self())
            .ImageSources(s => s.Self().CustomSources("https://res.cloudinary.com"))
            .ScriptSources(s => s.Self().UnsafeInline())
);
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.Use(
        async (context, next) =>
        {
            context.Response.Headers.Append("Strict-Transport-Security", "max-age=31536000");
            await next.Invoke();
        }
    );
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

app.Run();
