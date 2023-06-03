using Crates.Models;

namespace Crates.Repositories
{
    public interface IArtistRepository
    {
        List<Artist> GetAllArtists();
        Artist GetById(int id);
        void Add(Artist artist);
        void Update(Artist artist);
        void Delete(int id);
    }
}