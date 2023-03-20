
namespace Matdo.Web.Services;

public abstract class ServiceBase
{
    protected readonly IApiContext apiContext;

    public ServiceBase(IApiContext apiContext)
    {
        this.apiContext = apiContext;
    }

    protected string UserId => apiContext.GetUserId();
}
