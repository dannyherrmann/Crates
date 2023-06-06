using Crates.Models;
using Crates.Utils;

namespace Crates.Repositories;

public class CountryRepository : BaseRepository, ICountryRepository
{
    public CountryRepository(IConfiguration configuration) : base(configuration) { }

    public List<Country> GetAllCountries()
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"SELECT  id,
                                            name
                                    FROM Countries";

                var reader = cmd.ExecuteReader();

                var countries = new List<Country>();

                while (reader.Read())
                {
                    var country = new Country()
                    {
                        Id = DbUtils.GetInt(reader, "id"),
                        Name = DbUtils.GetString(reader, "name")
                    };

                    countries.Add(country);
                }

                reader.Close();
                return countries;
            }
        }
    }

    public void Add(Country country)
    {
        using (var conn = Connection)
        {
            conn.Open();
            using (var cmd = conn.CreateCommand())
            {
                cmd.CommandText = @"INSERT INTO [Countries]
                                        (name)
                                    OUTPUT inserted.id
                                    VALUES  (@name)";

                DbUtils.AddParameter(cmd, "@name", country.Name);

                country.Id = (int)cmd.ExecuteScalar();
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
                cmd.CommandText = "DELETE FROM [Countries] WHERE id = @id";
                DbUtils.AddParameter(cmd, "@id", id);
                cmd.ExecuteNonQuery();
            }
        }
    }

}