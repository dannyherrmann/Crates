using Crates.Models;

namespace Crates.Repositories
{
    public interface ICountryRepository
    {
        List<Country> GetAllCountries();
        void Add(Country country);
        void Delete(int id);
    }
}