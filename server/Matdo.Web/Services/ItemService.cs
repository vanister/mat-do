using Matdo.Web.Models;
using Matdo.Web.Repositories;
using Matdo.Web.Utilties;

namespace Matdo.Web.Services;

public interface IItemService
{
    Task<IEnumerable<Item>> ListAsync();
    Task<Item> CreateAsync(Item item);
    Task<Item?> GetAsync(string id);
    Task<bool> UpdateAsync(Item item);
}

public class ItemService : IItemService
{
    private readonly IItemRepository itemRepository;

    public ItemService(IItemRepository itemRepository)
    {
        this.itemRepository = itemRepository;
    }

    public async Task<IEnumerable<Item>> ListAsync()
    {
        // TODO - get user id from token
        var userId = "abc123";
        var items = await itemRepository.ListByUserIdAsync(userId);

        return items ?? new Item[0];
    }

    public async Task<Item?> GetAsync(string id)
    {
        var item = await itemRepository.GetByIdAsync(id);

        return item;
    }

    public async Task<Item> CreateAsync(Item item)
    {
        var newItem = item.Clone();

        newItem.CreatedAt = DateTime.Now;
        newItem = await itemRepository.CreateAsync(item);

        return newItem;
    }

    public async Task<bool> UpdateAsync(Item item)
    {
        var existingItem = await itemRepository.GetByIdAsync(item.Id);

        if (existingItem == null)
        {
            return false;
        }

        // replace with whatever was sent in
        await itemRepository.UpdateAsync(item);

        return true;
    }
}

