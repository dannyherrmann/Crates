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

    [HttpGet]
    public IActionResult GetAllTracks()
    {
        return Ok(_trackRepo.GetAllTracks());
    }

    [HttpGet("user/{userId}")]
    public IActionResult GetUserTracks(int userId)
    {
        return Ok(_trackRepo.GetUserTracks(userId));
    }

    [HttpGet("album/{albumId}")]
    public IActionResult GetAlbumTracks(int albumId)
    {
        return Ok(_trackRepo.GetAlbumTracks(albumId));
    }

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var track = _trackRepo.GetById(id);
        if (track == null)
        {
            return NotFound();
        }
        return Ok(track);
    }

    [HttpPost]
    public IActionResult Post(Track track)
    {
        _trackRepo.Add(track);
        return Created("/track/" + track.Id, track);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Track track)
    {
        if (id != track.Id)
        {
            return BadRequest();
        }

        _trackRepo.Update(track);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _trackRepo.Delete(id);
        return NoContent();
    }
}