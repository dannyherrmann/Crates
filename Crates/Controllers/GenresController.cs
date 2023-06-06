using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class GenresController : Controller
{
    private readonly IGenreRepository _genreRepo;

    public GenresController(IGenreRepository genreRepository)
    {
        _genreRepo = genreRepository;
    }

    [HttpGet]
    public IActionResult GetAllGenres()
    {
        return Ok(_genreRepo.GetAllGenres());
    }

    [HttpPost]
    public IActionResult Post(Genre genre)
    {
        _genreRepo.Add(genre);
        return Created("/genre/" + genre.Id, genre);
    }

    [HttpPut("{id}")]
    public IActionResult Put(int id, Genre genre)
    {
        if (id != genre.Id)
        {
            return BadRequest();
        }

        _genreRepo.Update(genre);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _genreRepo.Delete(id);
        return NoContent();
    }
}