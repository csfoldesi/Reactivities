﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Details
{
    public class Query : IRequest<Result<Profile>>
    {
        public required string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Profile>?>
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

        public async Task<Result<Profile>?> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            var user = await _dataContext.Users
                .ProjectTo<Profile>(
                    _mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() }
                )
                .SingleOrDefaultAsync(x => x.Username == request.Username);

            if (user == null)
                return null;

            return Result<Profile>.Success(user);
        }
    }
}
