using Crates.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IAlbumRepository, AlbumRepository>();
builder.Services.AddTransient<IUserAlbumRepository, UserAlbumRepository>();
builder.Services.AddTransient<IArtistRepository, ArtistRepository>();
builder.Services.AddTransient<ITrackRepository, TrackRepository>();
builder.Services.AddTransient<IGenreRepository, GenreRepository>();
builder.Services.AddTransient<IStyleRepository, StyleRepository>();
builder.Services.AddTransient<IAlbumGenreRepository, AlbumGenreRepository>();
builder.Services.AddTransient<IAlbumStyleRepository, AlbumStyleRepository>();
builder.Services.AddTransient<ICountryRepository, CountryRepository>();
builder.Services.AddTransient<ILabelRepository, LabelRepository>();
builder.Services.AddTransient<ISpeedRepository, SpeedRepository>();
builder.Services.AddTransient<ISizeRepository, SizeRepository>();
builder.Services.AddTransient<ICrateTrackRepository, CrateTrackRepository>();
builder.Services.AddTransient<IUserCrateRepository, UserCrateRepository>();
builder.Services.AddTransient<IUserDigRepository, UserDigRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors(options =>
    {
        options.AllowAnyOrigin();
        options.AllowAnyMethod();
        options.AllowAnyHeader();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
