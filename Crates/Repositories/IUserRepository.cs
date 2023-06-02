using Crates.Models;

namespace Crates.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();

        User GetUserByUid(string uid);

        User GetById(int id);

        void Add(User user);

        void Update(User user);

        void Delete(int id);
    }
}