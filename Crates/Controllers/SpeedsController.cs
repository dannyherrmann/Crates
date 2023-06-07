using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class SpeedsController : Controller
{
    private readonly ISpeedRepository _speedRepo;

    public SpeedsController(ISpeedRepository speedRepository)
    {
        _speedRepo = speedRepository;
    }

    [HttpGet]
    public IActionResult GetAllSpeeds()
    {
        return Ok(_speedRepo.GetAllSpeeds());
    }

    [HttpPost]
    public IActionResult Post(Speed speed)
    {
        _speedRepo.Add(speed);
        return Created("/speed/" + speed.Id, speed);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _speedRepo.Delete(id);
        return NoContent();
    }
}