using System.Text.Json.Serialization;

namespace Application.Profiles;

public class ActivityDto
{
    public Guid Id { get; set; }

    public required string Title { get; set; }

    public DateTime Date { get; set; }

    public required string Category { get; set; }

    [JsonIgnore]
    public string? HostUsername { get; set; }
}
