using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class CrateTrackRepository : BaseRepository, ICrateTrackRepository
{
    public CrateTrackRepository(IConfiguration configuration) : base(configuration) { }

    public List<CrateTrack> GetAllCrateTracks()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  ct.id AS crateTrackId,
                                            crateId AS crateId,
                                            ct.bpm AS crateTrackBpm,
                                            t.id AS trackId,
                                            t.name AS trackName,
                                            t.[position] AS trackPosition,
                                            t.duration AS trackDuration,
                                            t.bpm AS trackBpm,
                                            t.[key] AS trackKey,
                                            al.id AS albumId,
                                            al.name AS albumName,
                                            ar.name AS artistName,
                                            al.photo AS albumPhoto
                                    FROM CrateTracks ct
                                    JOIN Tracks t on ct.trackId = t.id
                                    JOIN Albums al on t.albumId = al.id
                                    JOIN Artists ar on al.artistId = ar.id";

                var reader = cmd.ExecuteReader();

                var crateTracks = new List<CrateTrack>();

                while (reader.Read())
                {
                    var crateTrack = new CrateTrack()
                    {
                        Id = DbUtils.GetInt(reader, "crateTrackId"),
                        CrateId = DbUtils.GetInt(reader, "crateId"),
                        TrackId = DbUtils.GetInt(reader, "trackId"),
                        Bpm = DbUtils.GetInt(reader, "crateTrackBpm"),
                        Track = new Track()
                        {
                            Id = DbUtils.GetInt(reader, "trackId"),
                            Name = DbUtils.GetString(reader, "trackName"),
                            Position = DbUtils.GetString(reader, "trackPosition"),
                            Duration = DbUtils.GetTimeSpan(reader, "trackDuration"),
                            Bpm = DbUtils.GetNullableInt(reader, "trackBpm"),
                            Key = DbUtils.GetString(reader, "trackKey"),
                            AlbumId = DbUtils.GetInt(reader, "albumId"),
                            AlbumName = DbUtils.GetString(reader, "albumName"),
                            ArtistName = DbUtils.GetString(reader, "artistName"),
                            AlbumPhoto = DbUtils.GetString(reader, "albumPhoto")
                        }
                    };

                    crateTracks.Add(crateTrack);
                }

                reader.Close();
                return crateTracks;
            }
        }
    }

    public void Add(CrateTrack crateTrack)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [CrateTracks]
                                        (crateId, 
                                        trackId,
                                        bpm)
                                    OUTPUT inserted.id
                                    SELECT @crateId, @trackId, (SELECT bpm FROM Tracks WHERE id = @trackId)";
                
                DbUtils.AddParameter(cmd, "@crateId", crateTrack.CrateId);
                DbUtils.AddParameter(cmd, "@trackId", crateTrack.TrackId);

                crateTrack.Id = (int)cmd.ExecuteScalar();
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
                cmd.CommandText = @"DELETE FROM [CrateTracks] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }
}