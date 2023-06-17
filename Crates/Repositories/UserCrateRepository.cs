using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class UserCrateRepository : BaseRepository, IUserCrateRepository
{
    public UserCrateRepository (IConfiguration configuration) : base(configuration) { }

    public List<UserCrate> GetAllUserCrates(int userId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name,
                                            userId,
                                            dateCreated
                                    FROM UserCrates
                                    WHERE userId = @userId";

                DbUtils.AddParameter(cmd, "@userId", userId);

                var reader = cmd.ExecuteReader();

                var userCrates = new List<UserCrate>();

                while (reader.Read())
                {
                    var userCrate = new UserCrate()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCrated = DbUtils.GetDateTime(reader, "dateCreated")
                    };

                    userCrates.Add(userCrate);
                }

                reader.Close();
                return userCrates;
            }
        }
    }

    public UserCrate GetById(int id)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name,
                                            userId,
                                            dateCreated
                                    FROM UserCrates
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", id);

                var reader = cmd.ExecuteReader();

                UserCrate userCrate = null;

                if (reader.Read())
                {
                    userCrate = new UserCrate()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name"),
                        UserId = DbUtils.GetInt(reader, "userId"),
                        DateCrated = DbUtils.GetDateTime(reader, "dateCreated")
                    };
                }

                reader.Close();
                return userCrate;
            }
        }
    }

    public void Add(UserCrate userCrate)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [UserCrates]
                                        (name, 
                                        userId,
                                        dateCreated)
                                    OUTPUT inserted.id
                                    VALUES 
                                        (@name,
                                        @userId,
                                        @dateCreated)";
                
                DbUtils.AddParameter(cmd, "@name", userCrate.Name);
                DbUtils.AddParameter(cmd, "@userId", userCrate.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", userCrate.DateCrated);
                userCrate.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(UserCrate userCrate)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE UserCrates
                                        SET name = @name,
                                            userId = @userId,
                                            dateCreated = @dateCreated
                                        WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", userCrate.Id);
                DbUtils.AddParameter(cmd, "@name", userCrate.Name);
                DbUtils.AddParameter(cmd, "@userId", userCrate.UserId);
                DbUtils.AddParameter(cmd, "@dateCreated", userCrate.DateCrated);
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
                cmd.CommandText = "DELETE FROM UserCrates WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

}