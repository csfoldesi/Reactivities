﻿using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class Create
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public required string Body { get; set; }
        public Guid ActivityId { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Body).NotEmpty();
        }
    }

    public class Handler : IRequestHandler<Command, Result<CommentDto>?>
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

        public async Task<Result<CommentDto>?> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var activity = await _dataContext.Activities.FindAsync(request.ActivityId);
            if (activity == null)
                return null;

            var user = await _dataContext.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            if (user == null)
                return null;

            var comment = new Comment
            {
                Author = user,
                Activity = activity,
                Body = request.Body,
            };

            activity.Comments.Add(comment);

            var success = await _dataContext.SaveChangesAsync() > 0;

            return success
                ? Result<CommentDto>.Success(_mapper.Map<CommentDto>(comment))
                : Result<CommentDto>.Failure("Unable to create the comment");
        }
    }
}
