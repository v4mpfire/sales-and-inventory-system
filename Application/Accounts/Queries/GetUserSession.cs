using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;

namespace Application.Accounts;

public class GetUserSession
{
    public class Query : IRequest<Result<UserInfoDTO>> { }

    public class GetUserSessionRequestHandler(IUserAccessor userAccessor, IMapper mapper) : IRequestHandler<Query, Result<UserInfoDTO>>
    {
        public async Task<Result<UserInfoDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();
            var userDto = mapper.Map<UserInfoDTO>(user);

            return Result<UserInfoDTO>.Success(userDto);
        }
    }
}