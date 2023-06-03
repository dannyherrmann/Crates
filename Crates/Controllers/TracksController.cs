using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class TracksController : Controller
{
    private readonly ITrackRepository _trackRepo;

    public TracksController(ITrackRepository trackRepository)
    {
        _trackRepo = trackRepository;
    }

    [HttpGet("{userId}")]
    public IActionResult GetUserTracks(int userId)
    {
        return Ok(_trackRepo.GetUserTracks(userId));
    }
}