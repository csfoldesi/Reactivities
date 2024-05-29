using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class List
{
    public class Query : IRequest<Result<List<Profiles.Profile>>>
    {
        public required string Predicate { get; set; }
        public required string UserName { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<Profiles.Profile>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IMapper mapper, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<List<Profiles.Profile>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var profiles = new List<Profiles.Profile>();
            switch (request.Predicate)
            {
                case "followers":
                    profiles = await _dataContext.UserFollowings
                        .Where(x => x.Target.UserName == request.UserName)
                        .Select(u => u.Observer)
                        .ProjectTo<Profiles.Profile>(
                            _mapper.ConfigurationProvider,
                            new { currentUsername = _userAccessor.GetUsername() }
                        )
                        .ToListAsync();
                    break;
                case "following":
                    profiles = await _dataContext.UserFollowings
                        .Where(x => x.Observer.UserName == request.UserName)
                        .Select(u => u.Target)
                        .ProjectTo<Profiles.Profile>(
                            _mapper.ConfigurationProvider,
                            new { currentUsername = _userAccessor.GetUsername() }
                        )
                        .ToListAsync();
                    break;
            }

            return Result<List<Profiles.Profile>>.Success(profiles);
        }
    }
}
