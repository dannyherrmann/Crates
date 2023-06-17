using Crates.Models;

namespace Crates.Repositories
{
    public interface IUserCrateRepository
    {
        List<UserCrate> GetAllUserCrates(int userId);
        UserCrate GetById(int id);
        void Add(UserCrate userCrate);
        void Update(UserCrate userCrate);
        void Delete(int id);
    }
}