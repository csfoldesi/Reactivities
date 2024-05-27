namespace Domain;

public class Comment
{
    public int Id { get; set; }

    public required string Body { get; set; }

    public required AppUser Author { get; set; }

    public required Activity Activity { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
