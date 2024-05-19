namespace Application.Profile;

public class Profile
{
    public required string Username { get; set; }

    public required string DisplayName { get; set; }

    public string? Bio { get; set; }

    public string? Image { get; set; }
}
