using Crates.Models;
using Crates.Utils;
using Microsoft.Data.SqlClient;

namespace Crates.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    public UserRepository(IConfiguration configuration) : base(configuration) { }

    public List<User> GetAll()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    id,
	                                    uid,
	                                    name,
	                                    email,
	                                    photo
                                    from Users";

                var reader = cmd.ExecuteReader();
                var users = new List<User>();

                while (reader.Read())
                {
                    var user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "Id"),
                        Uid = DbUtils.GetString(reader, "uid"),
                        Name = DbUtils.GetString(reader, "name"),
                        Email = DbUtils.GetString(reader, "email"),
                        Photo = DbUtils.GetString(reader, "photo")
                    };

                    users.Add(user);
                }

                reader.Close();
                return users;
            }
        }
    }

    public User GetUserByUid(string uid)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT
	                                    id,
	                                    uid,
	                                    name,
	                                    email,
	                                    photo
                                    from Users
                                    WHERE uid = @uid";

                DbUtils.AddParameter(cmd, "@uid", uid);

                var reader = cmd.ExecuteReader();

                User user = null;
                if (reader.Read())
                {
                    user = new User()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Uid = DbUtils.GetString(reader, "uid"),
                        Name = DbUtils.GetString(reader, "name"),
                        Email = DbUtils.GetString(reader, "email"),
                        Photo = DbUtils.GetString(reader, "photo")
                    };
                }
                reader.Close();
                return user;
            }
        }
    }
}
