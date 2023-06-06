using Crates.Models;
using Crates.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Crates.Controllers;

[Route("[controller]")]
[ApiController]

public class CountriesController : Controller
{
    private readonly ICountryRepository _countryRepo;

    public CountriesController(ICountryRepository countryRepository)
    {
        _countryRepo = countryRepository;
    }

    [HttpGet]
    public IActionResult GetAllCountries()
    {
        return Ok(_countryRepo.GetAllCountries());
    }

    [HttpPost]
    public IActionResult Add(Country country)
    {
        _countryRepo.Add(country);
        return Created("/country/" + country.Id, country);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _countryRepo.Delete(id);
        return NoContent();
    }
}