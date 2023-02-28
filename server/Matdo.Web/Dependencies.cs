using Matdo.Web.Repositories;
using Matdo.Web.Services;

namespace Matdo.Web;

public static class Dependencies
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddTransient<IItemService, ItemService>();
    }

    public static void AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IItemRepository, ItemRepository>();
    }
}
