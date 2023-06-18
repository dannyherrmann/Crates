using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class AlbumStyleRepository : BaseRepository, IAlbumStyleRepository
{
    public AlbumStyleRepository(IConfiguration configuration) : base(configuration) { }

    public List<AlbumStyle> GetAllAlbumStyles()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            albumId,
                                            styleId
                                    FROM AlbumStyles";

                var reader = cmd.ExecuteReader();

                var albumStyles = new List<AlbumStyle>();

                while (reader.Read())
                {
                    var albumStyle = new AlbumStyle()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        AlbumId = DbUtils.GetInt(reader, "albumId"),
                        StyleId = DbUtils.GetInt(reader, "styleId")
                    };

                    albumStyles.Add(albumStyle);
                }

                reader.Close();
                return albumStyles;
            }
        }
    }

    public void Add(AlbumStyle albumStyle)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [AlbumStyles]
                                        (albumId,
                                        styleId)
                                    OUTPUT inserted.id
                                    VALUES  (@albumId,
                                            @styleId)";

                DbUtils.AddParameter(cmd, "@albumId", albumStyle.AlbumId);
                DbUtils.AddParameter(cmd, "@styleId", albumStyle.StyleId);

                albumStyle.Id = (int)cmd.ExecuteScalar();
            }
        }
    }

    public void Delete(int albumId)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = "DELETE FROM [AlbumStyles] WHERE albumId = @albumId";
                DbUtils.AddParameter(cmd, "@albumId", albumId);
                cmd.ExecuteNonQuery();
            }
        }
    }
}