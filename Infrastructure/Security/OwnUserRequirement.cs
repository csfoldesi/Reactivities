using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.Security;

public class OwnUserRequirement : IAuthorizationRequirement { }

public class OwnUserRequirementHandler : AuthorizationHandler<OwnUserRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        OwnUserRequirement requirement
    )
    {
        throw new NotImplementedException();
    }
}
