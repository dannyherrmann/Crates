using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]
public class ArtistsController : Controller
{
    private readonly IArtistRepository _artistRepo;

    public ArtistsController(IArtistRepository artistRepo)
    {
        _artistRepo = artistRepo;
    }

    [HttpGet]
    public IActionResult GetAllArtists()
    {
        return Ok(_artistRepo.GetAllArtists());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var artist = _artistRepo.GetById(id);
        if (artist == null)
        {
            return NotFound();
        }
        return Ok(artist);
    }

    [HttpPost]
    public IActionResult Post(Artist artist)
    {
        _artistRepo.Add(artist);
        return Created("/artist/" + artist.Id, artist);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Artist artist)
    {
        if (id != artist.Id)
        {
            return BadRequest();
        }

        _artistRepo.Update(artist);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _artistRepo.Delete(id);
        return NoContent();
    }
}