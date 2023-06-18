using Crates.Models;

namespace Crates.Repositories
{
    public interface ITrackRepository
    {
        List<Track> GetAllTracks();
        List<Track> GetUserTracks(int userId);
        List<Track> GetAlbumTracks(int albumId);
        void Add(Track track);
        void Update(Track track);
        void Delete(int albumId);
        Track GetById(int id);
    }
}