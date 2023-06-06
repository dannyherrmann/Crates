using Crates.Models;

namespace Crates.Repositories
{
    public interface IAlbumGenreRepository
    {
        List<AlbumGenre> GetAllAlbumGenres();
        void Add(AlbumGenre albumGenre);
        void Delete(int id);
    }
}