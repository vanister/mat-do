using Matdo.Web.Repositories;
using Matdo.Web.Services;

namespace Matdo.Web;

public static class Dependencies
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddHttpContextAccessor();

        services
            .AddTransient<IItemService, ItemService>()
            .AddTransient<IApiContext, ApiContext>();
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IItemRepository, ItemRepository>();
    }
}
