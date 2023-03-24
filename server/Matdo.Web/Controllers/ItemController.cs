using Matdo.Web.Models;
using Matdo.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Matdo.Web.Controllers;

[ApiController]
[Authorize]
[Route("items")]
public class ItemController : ControllerBase
{
    private readonly IItemService itemService;

    public ItemController(IItemService itemService)
    {
        this.itemService = itemService;
    }

    [HttpGet]
    [Route("list")]
    public async Task<IActionResult> ListByUserId()
    {
        var items = await itemService.ListAsync();

        return Ok(items);
    }

    [HttpGet]
    [Route("{id}")]
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
    public async Task<IActionResult> Create([FromBody] ItemDto item)
    {
        if (item == null)
        {
            return BadRequest("Item cannot be null");
        }

        if (!string.IsNullOrEmpty(item.Id))
        {
            return BadRequest("Id cannot be set");
        }

        try
        {
            var newItem = await itemService.CreateAsync(item);
            var id = newItem.Id;

            return Created($"/items/{id}", id);
        }
        catch (InvalidStateException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] ItemDto item)
    {
        if (string.IsNullOrEmpty(item.Id))
        {
            return BadRequest("Id is missing");
        }

        try
        {
            var updated = await itemService.UpdateAsync(item);

            if (!updated)
            {
                return BadRequest("Unable to update the item");
            }

            return NoContent();
        }
        catch (InvalidStateException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
