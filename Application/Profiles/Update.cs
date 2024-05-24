using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Update
{
    public class Command : IRequest<Result<Profile>>
    {
        public required string DisplayName { get; set; }
        public string? Bio { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.DisplayName).NotEmpty();
        }
    }

    public class Handler : IRequestHandler<Command, Result<Profile>?>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IUserAccessor userAccessor, IMapper mapper)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }

        public async Task<Result<Profile>?> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.UserName == _userAccessor.GetUsername()
            );
            if (user == null)
                return null;

            user.DisplayName = request.DisplayName;
            user.Bio = request.Bio;

            var result = await _dataContext.SaveChangesAsync() > 0;

            return result
                ? Result<Profile>.Success(_mapper.Map<AppUser, Profile>(user))
                : Result<Profile>.Failure("Unable to upldate the profile");
        }
    }
}
