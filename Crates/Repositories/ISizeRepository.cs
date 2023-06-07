using Crates.Models;

namespace Crates.Repositories
{
    public interface ISizeRepository
    {
        List<Size> GetAllSizes();
        void Add(Size size);
        void Delete(int id);
    }
}