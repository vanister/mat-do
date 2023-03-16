using System.Security.Claims;
using Matdo.Web.Exception;
using Matdo.Web.Models;

namespace Matdo.Web.Services;

public interface IApiContext
{
    string? GetUserId();
}

public class Auth0ApiContext : IApiContext
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly Auth0Settings settings;

    public Auth0ApiContext(IHttpContextAccessor httpContextAccessor, Auth0Settings settings)
    {
        this.httpContextAccessor = httpContextAccessor;
        this.settings = settings;
    }

    private HttpContext Context => httpContextAccessor.HttpContext!;

    private string? Subject => Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

    public string? GetUserId()
    {
        // user id is the part of the subject following the provider prefix
        if (Subject == null)
        {
            return null;
        }

        if (settings.Prefix == null)
        {
            // TODO - create an exception for missing settings
            throw new FormatException("Prefix is required");
        }

        var parts = Subject.Split(settings.Delimiter);
        var hasPrefix = !string.IsNullOrEmpty(settings.Prefix);

        if (hasPrefix && parts[0] != settings.Prefix)
        {
            throw new InvalidUserIdException();
        }

        return hasPrefix ? parts[1] : parts[0];
    }
}
