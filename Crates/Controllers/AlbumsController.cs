using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]
public class AlbumsController : Controller
{
    private readonly IAlbumRepository _albumRepo;

    public AlbumsController(IAlbumRepository albumRepo)
    {
        _albumRepo = albumRepo;
    }

    [HttpGet]
    public IActionResult GetAllAlbums(int? pageNumber, int? pageSize, int? decade, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null, string? country = null)
    {
        return Ok(_albumRepo.GetAllAlbums(pageNumber, pageSize, decade, sortOrder, genres, styles, searchCriterion, country));
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var album = _albumRepo.GetById(id);
        if (album == null)
        {
            return NotFound();
        }
        return Ok(album);
    }

    [HttpGet("decades")]
    public IActionResult GetAlbumDecades()
    {
        return Ok(_albumRepo.GetAlbumDecades());
    }

    [HttpPost]
    public IActionResult Post(Album album)
    {
        _albumRepo.Add(album);
        return Created("/album/" + album.Id, album);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Album album)
    {
        if (id != album.Id)
        {
            return BadRequest();
        }

        _albumRepo.Update(album);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _albumRepo.Delete(id);
        return NoContent();
    }
}
