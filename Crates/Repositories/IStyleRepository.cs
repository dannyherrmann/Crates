using Crates.Models;

namespace Crates.Repositories
{
    public interface IStyleRepository
    {
        List<Style> GetAllStyles();
        void Add(Style style);
        void Update(Style style);
        void Delete(int id);
    }
}