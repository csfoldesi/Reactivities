﻿using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class FollowToggle
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string TargetUsername { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>?>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Result<Unit>?> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var observer = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.UserName == _userAccessor.GetUsername()
            );
            var target = await _dataContext.Users.FirstOrDefaultAsync(
                x => x.UserName == request.TargetUsername
            );
            if (target == null)
                return null;

            var following = await _dataContext.UserFollowings.FindAsync(observer!.Id, target.Id);

            if (following == null)
            {
                following = new UserFollowing
                {
                    Observer = observer,
                    Target = target,
                    ObserverId = observer.Id,
                    TargetId = target.Id
                };
                _dataContext.UserFollowings.Add(following);
            }
            else
            {
                _dataContext.UserFollowings.Remove(following);
            }
            var success = await _dataContext.SaveChangesAsync() > 0;

            return success
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Unable to update following");
        }
    }
}
