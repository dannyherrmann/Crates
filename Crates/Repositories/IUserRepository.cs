using Crates.Models;

namespace Crates.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
    }
}