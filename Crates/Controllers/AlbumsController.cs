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
    public IActionResult GetAllAlbums(int? pageNumber, int? pageSize, AlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null)
    {
        return Ok(_albumRepo.GetAllAlbums(pageNumber, pageSize, sortOrder, genres, styles, searchCriterion));
    }
}
