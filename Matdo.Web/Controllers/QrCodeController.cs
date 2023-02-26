using Matdo.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Matdo.Web.Controllers;

[ApiController]
[Route("qr")]
public class QrCodeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("hello world");
    }

    [HttpPost]
    public IActionResult Create([FromBody] QrData data)
    {
        throw new NotImplementedException();
    }
}
