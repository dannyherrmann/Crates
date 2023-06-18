using Crates.Models;

namespace Crates.Repositories
{
    public interface IAlbumStyleRepository
    {
        List<AlbumStyle> GetAllAlbumStyles();
        void Add(AlbumStyle albumStyle);
        void Delete(int albumId);
    }
}