using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404 && !string.IsNullOrEmpty(result.Error)) return NotFound(result.Error);

            if (!result.IsSuccess && result.Code == 404) return NotFound();

            if (!result.IsSuccess && result.Code == 401) return Unauthorized();

            if (result.IsSuccess && result.Value != null && result.Code == 200) return Ok(result.Value);

            if (result.IsSuccess && result.Value != null && result.Code == 204) return NoContent();

            return BadRequest(result.Error);
        }
    }
}
