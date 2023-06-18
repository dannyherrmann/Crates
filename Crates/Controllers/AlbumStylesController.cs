using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class AlbumStylesController : Controller
{
    private readonly IAlbumStyleRepository _albumStyleRepo;

    public AlbumStylesController(IAlbumStyleRepository albumStyleRepository)
    {
        _albumStyleRepo = albumStyleRepository;
    }

    [HttpGet]
    public IActionResult GetAllAlbumStyles()
    {
        return Ok(_albumStyleRepo.GetAllAlbumStyles());
    }

    [HttpPost]
    public IActionResult Post(AlbumStyle albumStyle)
    {
        _albumStyleRepo.Add(albumStyle);
        return Created("/albumStyle/" + albumStyle.Id, albumStyle);
    }

    [HttpDelete("{albumId}")]
    public IActionResult Delete(int albumId)
    {
        _albumStyleRepo.Delete(albumId);
        return NoContent();
    }
}