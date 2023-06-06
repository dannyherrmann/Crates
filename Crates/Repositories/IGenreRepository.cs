using Crates.Models;

namespace Crates.Repositories
{
    public interface IGenreRepository
    {
        List<Genre> GetAllGenres();
        void Add(Genre genre);
        void Update(Genre genre);
        void Delete(int id);
    }
}