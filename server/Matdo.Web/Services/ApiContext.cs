using System.Security.Claims;
using Matdo.Web.Exception;
using Matdo.Web.Settings;

namespace Matdo.Web.Services;

public interface IApiContext
{
    string GetUserId();
}

public class Auth0ApiContext : IApiContext
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly Auth0Settings settings;

    private string userId = string.Empty;

    public Auth0ApiContext(IHttpContextAccessor httpContextAccessor, Auth0Settings settings)
    {
        this.httpContextAccessor = httpContextAccessor;
        this.settings = settings;
    }

    private HttpContext Context => httpContextAccessor.HttpContext!;

    private string? Subject => Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

    public string GetUserId()
    {
        // don't parse multiple times if we don't have to
        if (!string.IsNullOrEmpty(userId))
        {
            return userId;
        }

        if (Subject == null)
        {
            throw new InvalidStateException("Subject claim is missing");
        }

        if (settings.Prefix == null)
        {
            throw new MissingSettingException("Prefix");
        }

        // user id is the part of the subject following the provider prefix
        var parts = Subject.Split(settings.Delimiter);
        var hasPrefix = !string.IsNullOrEmpty(settings.Prefix);

        if (hasPrefix && parts[0] != settings.Prefix)
        {
            throw new InvalidUserIdException();
        }

        // store the parsed user id 
        userId = hasPrefix ? parts[1] : parts[0];

        return userId;
    }
}
