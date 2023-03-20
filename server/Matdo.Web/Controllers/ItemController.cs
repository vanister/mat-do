using Matdo.Web.Models;
using Matdo.Web.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace Matdo.Web.Controllers;

// TODO - this controller should be protected
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
    public async Task<IActionResult> Create([FromBody] Item item)
    {
        if (item == null)
        {
            return BadRequest("Item cannot be null");
        }

        if (item.Id != ObjectId.Empty)
        {
            return BadRequest("Id cannot be set");
        }

        try
        {
            await itemService.CreateAsync(item);
            // the Id field should now be populated
            var id = item.Id;

            return Created($"/items/{id}", id);
        }
        catch (InvalidStateException ex)
        {
            return BadRequest(ex.Message);
        }

    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Item item)
    {
        if (item.Id == ObjectId.Empty)
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
