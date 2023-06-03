using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class UserAlbumsController : Controller
{
    private readonly IUserAlbumRepository _userAlbumRepo;

    public UserAlbumsController(IUserAlbumRepository userAlbumRepo)
    {
        _userAlbumRepo = userAlbumRepo;
    }

    [HttpGet("{userId}")]
    public IActionResult GetUserAlbums(int userId, int? pageNumber, int? pageSize, UserAlbumRepository.SortOrder sortOrder, string? genres = null, string? styles = null, string? searchCriterion = null)
    {
        return Ok(_userAlbumRepo.GetUserAlbums(userId, pageNumber, pageSize, sortOrder, genres, styles, searchCriterion));
    }

    [HttpPost]
    public IActionResult AddUserAlbum(UserAlbum userAlbum)
    {
        _userAlbumRepo.Add(userAlbum);
        return Created("/userAlbum/" + userAlbum.Id, userAlbum);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _userAlbumRepo.Delete(id);
        return NoContent();
    }
}