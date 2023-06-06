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

}