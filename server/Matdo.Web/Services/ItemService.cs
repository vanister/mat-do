using Matdo.Web.Exception;
using Matdo.Web.Models;
using Matdo.Web.Repositories;

namespace Matdo.Web.Services;

public interface IItemService
{
    Task<IEnumerable<Item>> ListAsync(string userId);
    Task<Item> CreateAsync(Item item);
    Task<Item> GetAsync(string id);
    Task UpdateAsync(Item item);
}

public class ItemService : IItemService
{
    private readonly IItemRepository itemRepository;

    public ItemService(IItemRepository itemRepository)
    {
        this.itemRepository = itemRepository;
    }

    public async Task<IEnumerable<Item>> ListAsync(string userId)
    {
        var items = await itemRepository.ListByUserIdAsync(userId);

        return items;
    }

    public async Task<Item> GetAsync(string id)
    {
        var item = await itemRepository.GetByIdAsync(id);

        if (item == null)
        {
            throw new NotFoundException();
        }

        return item;
    }

    public async Task<Item> CreateAsync(Item item)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateAsync(Item item)
    {
        throw new NotImplementedException();
    }
}

