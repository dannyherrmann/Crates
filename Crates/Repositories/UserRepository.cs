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

    public User GetById(int id)
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
                                    WHERE id = @id";
                
                DbUtils.AddParameter(cmd, "@id", id);

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

    public void Add(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Users]
                                      (uid, 
                                      name,
                                      email,
                                      photo)
                                      OUTPUT inserted.id
                                      VALUES
                                          (@uid,
                                          @name,
                                          @email,
                                          @photo)";
                DbUtils.AddParameter(cmd, "@uid", user.Uid);
                DbUtils.AddParameter(cmd, "@name", user.Name);
                DbUtils.AddParameter(cmd, "@email", user.Email);
                DbUtils.AddParameter(cmd, "@photo", user.Photo);

                user.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(User user)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Users]
                                        SET uid = @uid,
                                            name = @name,
                                            email = @email,
                                            photo = @photo
                                        WHERE id = @id";

                DbUtils.AddParameter(cmd, "id", user.Id);
                DbUtils.AddParameter(cmd, "@uid", user.Uid);
                DbUtils.AddParameter(cmd, "@name", user.Name);
                DbUtils.AddParameter(cmd, "@email", user.Email);
                DbUtils.AddParameter(cmd, "@photo", user.Photo);

                cmd.ExecuteNonQuery();
            }
        }
    }

    public void Delete(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [Users] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}
