namespace Domain;

public class UserFollowing
{
    public required string ObserverId { get; set; }

    public required AppUser Observer { get; set; }

    public required string TargetId { get; set; }

    public required AppUser Target { get; set; }
}
