using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class GenreRepository : BaseRepository, IGenreRepository
{
    public GenreRepository(IConfiguration configuration) : base(configuration) { }

    public List<Genre> GetAllGenres()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            [name]
                                    FROM Genres";

                var reader = cmd.ExecuteReader();

                var genres = new List<Genre>();

                while (reader.Read())
                {
                    var genre = new Genre()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name")
                    };

                    genres.Add(genre);
                }

                reader.Close();
                return genres;
            }
        }
    }

    public void Add(Genre genre)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Genres]
                                        (name)
                                    OUTPUT inserted.id
                                    VALUES(@name)";
                
                DbUtils.AddParameter(cmd, "@name", genre.Name);

                genre.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Update(Genre genre)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"UPDATE [Genres]
                                        SET name = @name
                                    WHERE id = @id";

                DbUtils.AddParameter(cmd, "@id", genre.Id);
                DbUtils.AddParameter(cmd, "@name", genre.Name);

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
                cmd.CommandText = "DELETE FROM [Genres] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}