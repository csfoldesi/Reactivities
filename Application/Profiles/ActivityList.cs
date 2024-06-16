using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ActivityList
{
    public class Query : IRequest<Result<List<ActivityDto>>>
    {
        public required string Username { get; set; }

        public required string Predicate { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;

        public Handler(DataContext dataContext, IMapper mapper)
        {
            _dataContext = dataContext;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var query = _dataContext.Activities
                .Where(a => a.Attendees.Any(at => at.AppUser.UserName == request.Username))
                .OrderBy(a => a.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider);

            switch (request.Predicate)
            {
                case "":
                case "next":
                    query = query.Where(a => a.Date >= DateTime.UtcNow);
                    break;
                case "hosting":
                    query = query.Where(a => a.HostUsername == request.Username);
                    break;
                case "past":
                    query = query.Where(a => a.Date <= DateTime.UtcNow);
                    break;
            }

            return Result<List<ActivityDto>>.Success(await query.ToListAsync());
        }
    }
}
