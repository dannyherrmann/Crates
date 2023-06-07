using Crates.Models;

namespace Crates.Repositories
{
    public interface ICrateTrackRepository
    {
        List<CrateTrack> GetAllCrateTracks(); 
        void Add(CrateTrack crateTrack);
        void Delete(int id);
    }
}