using Matdo.Web.Models;
using Matdo.Web.Repositories;
using Matdo.Web.Utilties;

namespace Matdo.Web.Services;

public interface IItemService
{
    Task<IEnumerable<ItemDto>> ListAsync();
    Task<ItemDto> CreateAsync(ItemDto item);
    Task<ItemDto?> GetAsync(string id);
    Task<bool> UpdateAsync(ItemDto item);
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

    public async Task<IEnumerable<ItemDto>> ListAsync()
    {
        var items = await itemRepository.ListByUserIdAsync(UserId);

        return items.Select(i => i.ToItemDto()) ?? new ItemDto[0];
    }

    public async Task<ItemDto?> GetAsync(string id)
    {
        var item = await itemRepository.GetByIdAsync(UserId, id);

        return item?.ToItemDto();
    }

    public async Task<ItemDto> CreateAsync(ItemDto itemDto)
    {
        // todo - move userid verification into action filter 
        if (itemDto.UserId != UserId)
        {
            throw new InvalidStateException("UserId does not match");
        }

        var item = itemDto.ToItem();
        item.CreatedAt = DateTime.Now;

        var id = await itemRepository.CreateAsync(item);
        var newItem = item.ToItemDto();

        return newItem;
    }

    public async Task<bool> UpdateAsync(ItemDto item)
    {
        // todo - move userid verification into action filter 
        if (item.UserId != UserId)
        {
            throw new InvalidStateException("UserId does not match");
        }

        var itemExists = await itemRepository.ItemExists(UserId, item.Id!);

        if (!itemExists)
        {
            return false;
        }

        // replace with whatever was sent in
        await itemRepository.UpdateAsync(item.ToItem());

        return true;
    }
}

