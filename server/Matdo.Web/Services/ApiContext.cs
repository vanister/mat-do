using System.Security.Claims;

namespace Matdo.Web.Services;

public interface IApiContext
{

}

public class ApiContext : IApiContext
{
    private readonly IHttpContextAccessor httpContextAccessor;

    public ApiContext(IHttpContextAccessor httpContextAccessor)
    {
        this.httpContextAccessor = httpContextAccessor;
    }

    private HttpContext Context => httpContextAccessor.HttpContext!;
}
