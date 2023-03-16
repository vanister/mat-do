using System.Security.Claims;
using Matdo.Web.Exception;

namespace Matdo.Web.Services;

public interface IApiContext
{
    string? GetUserId();
}

public class ApiContext : IApiContext
{
    private const string auth0Prefix = "auth0";
    private const string idDelimiter = "|";

    private readonly IHttpContextAccessor httpContextAccessor;

    public ApiContext(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
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

        var parts = Subject.Split('|');

        // if there are two pieces, and the piece on the left is the prefix, then take the right piece
        if (parts.Length < 2 || parts[0] != auth0Prefix)
        {
            throw new InvalidUserIdException();
        }

        return parts[1];

    }
}
