using Matdo.Web.Models;
using Matdo.Web.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Matdo.Web.Controllers;

[ApiController]
[Route("items")]
public class ItemController : ControllerBase
{
    private readonly IItemRepository itemRepository;

    public ItemController(IItemRepository itemRepository)
    {
        this.itemRepository = itemRepository;
    }

    [HttpGet]
    public async Task<IActionResult> ListByUserId(string userId)
    {
        var items = await itemRepository.ListByUserId(userId);

        if (!items.Any())
        {
            return NotFound();
        }

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        throw new NotImplementedException();
    }
}
