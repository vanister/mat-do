using Matdo.Web.Exception;
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
        var items = await itemService.ListAsync(userId);

        return Ok(items);
    }

    [HttpGet]
    [Route("/{id}")]
    public async Task<IActionResult> Get([FromRoute] string id)
    {
        var item = await itemService.GetAsync(id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        if (item == null)
        {
            return BadRequest("Item cannot be null");
        }

        if (item.Id != null)
        {
            return BadRequest("Id cannot be set");
        }

        await itemService.CreateAsync(item);
        // the Id field should now be populated
        var id = item.Id;

        return Created($"/items/{id}", id);

    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Item item)
    {
        if (item.Id == null)
        {
            return BadRequest("Id is missing");
        }

        var updated = await itemService.UpdateAsync(item);

        if (!updated)
        {
            return BadRequest("Unable to update the item");
        }

        return Ok();
    }
}
