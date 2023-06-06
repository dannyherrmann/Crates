using Crates.Models;

namespace Crates.Repositories
{
    public interface ICountryRepository
    {
        List<Country> GetAllCountries();
    }
}