using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class CrateTracksController : Controller 
{
    private readonly ICrateTrackRepository _crateTrackRepo;

    public CrateTracksController(ICrateTrackRepository crateTrackRepository)
    {
        _crateTrackRepo = crateTrackRepository;
    }

    [HttpGet("{crateId}")]
    public IActionResult GetAllCrateTracks(int crateId)
    {
        return Ok(_crateTrackRepo.GetAllCrateTracks(crateId));
    }

    [HttpPost]
    public IActionResult Post(CrateTrack crateTrack)
    {
        _crateTrackRepo.Add(crateTrack);
        return Created("/crateTrack" + crateTrack.Id, crateTrack);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _crateTrackRepo.Delete(id);
        return NoContent();
    }
}