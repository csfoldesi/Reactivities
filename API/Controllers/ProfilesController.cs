﻿using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ProfilesController : BaseApiController
{
    [HttpGet("{username}")]
    public async Task<IActionResult> GetProfile(string username)
    {
        return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
    }

    [HttpPut]
    public async Task<IActionResult> EditProfile(Update.Command command)
    {
        return HandleResult<Profile>(await Mediator.Send(command));
    }

    [HttpGet("{username}/activities")]
    public async Task<IActionResult> GetUserActivities(string username, string predicate = "")
    {
        return HandleResult<List<ActivityDto>>(
            await Mediator.Send(
                new ActivityList.Query { Username = username, Predicate = predicate }
            )
        );
    }
}
