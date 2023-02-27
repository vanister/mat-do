using Matdo.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Matdo.Web.Controllers;

[ApiController]
[Route("qr")]
public class QrCodeController : ControllerBase
{
    private readonly MongoDBSettings dbSettings;

    public QrCodeController(MongoDBSettings settings)
    {
        dbSettings = settings;
    }

    [HttpGet]
    public IActionResult Get()
    {
        Console.WriteLine(dbSettings);

        return Ok("hello world");
    }

    [HttpPost]
    public IActionResult Create([FromBody] QrData data)
    {
        throw new NotImplementedException();
    }
}
