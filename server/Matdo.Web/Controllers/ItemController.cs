using Matdo.Web.Models;
using Matdo.Web.Services;
using Microsoft.AspNetCore.Mvc;

namespace Matdo.Web.Controllers;

// TODO - this controller should be protected
[ApiController]
[Route("items")]
public class ItemController : ControllerBase
{
    private readonly IItemService itemService;

    public ItemController(IItemService itemService)
    {
        this.itemService = itemService;
    }

    [HttpGet]
    [Route("/list")]
    public async Task<IActionResult> ListByUserId(string userId)
    {
        var items = await itemService.List(userId);

        return Ok(items);
    }

    [HttpGet]
    [Route("/{id}")]
    public async Task<IActionResult> Get([FromRoute] string id)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        throw new NotImplementedException();
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Item item)
    {
        // todo - verify userId and item existence

        throw new NotImplementedException();
    }
}
