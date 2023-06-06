using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class AlbumGenreRepository : BaseRepository, IAlbumGenreRepository
{
    public AlbumGenreRepository(IConfiguration configuration) : base(configuration) { }

    public List<AlbumGenre> GetAllAlbumGenres()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            albumId,
                                            genreId
                                    FROM AlbumGenres";

                var reader = cmd.ExecuteReader();

                var albumGenres = new List<AlbumGenre>();

                while (reader.Read())
                {
                    var albumGenre = new AlbumGenre()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        GenreId = DbUtils.GetInt(reader, "genreId")
                    };

                    albumGenres.Add(albumGenre);
                }

                reader.Close();
                return albumGenres;
            }
        }
    }

    public void Add(AlbumGenre albumGenre)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [AlbumGenres]
                                        (albumId,
                                        genreId)
                                    OUTPUT inserted.id
                                    VALUES  (@albumId,
                                            @genreId)";
                
                DbUtils.AddParameter(cmd, "@albumId", albumGenre.AlbumId);
                DbUtils.AddParameter(cmd, "@genreId", albumGenre.GenreId);

                albumGenre.Id = (int)cmd.ExecuteScalar();
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
                cmd.CommandText = "DELETE FROM [AlbumGenres] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}