using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class AlbumGenresController : Controller
{
    private readonly IAlbumGenreRepository _albumGenreRepo;

    public AlbumGenresController(IAlbumGenreRepository albumGenreRepository)
    {
        _albumGenreRepo = albumGenreRepository;
    }

    [HttpGet]
    public IActionResult GetAllAlbumGenres()
    {
        return Ok(_albumGenreRepo.GetAllAlbumGenres());
    }

    [HttpPost]
    public IActionResult Post(AlbumGenre albumGenre)
    {
        _albumGenreRepo.Add(albumGenre);
        return Created("/albumGenre/" + albumGenre.Id, albumGenre);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _albumGenreRepo.Delete(id);
        return NoContent();
    }
}