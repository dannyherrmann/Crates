using Crates.Models;

namespace Crates.Repositories
{
    public interface ISpeedRepository
    {
        List<Speed> GetAllSpeeds();
        void Add(Speed speed);
        void Delete(int id);
    }
}