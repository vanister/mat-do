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

public class ItemService : ServiceBase, IItemService
{
    private readonly IItemRepository itemRepository;

    public ItemService(
        IItemRepository itemRepository,
        IApiContext apiContext) : base(apiContext)
    {
        this.itemRepository = itemRepository;
    }

    public async Task<IEnumerable<Item>> ListAsync()
    {
        var items = await itemRepository.ListByUserIdAsync(UserId);

        return items ?? new Item[0];
    }

    public async Task<Item?> GetAsync(string id)
    {
        var item = await itemRepository.GetByIdAsync(id);

        return item;
    }

    public async Task<Item> CreateAsync(Item item)
    {
        if (item.UserId != UserId)
        {
            throw new InvalidStateException("UserId does not match");
        }

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

