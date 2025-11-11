using Gateway.Application.Exchanges.Dto;
using Gateway.Application.Exchanges.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Gateway.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ExchangesController(
    IExchangeService exchangeService) : ControllerBase
{
    [HttpGet(Name = "GetExchange")]
    public async Task<ActionResult<ExchangeResponse>> Get([FromQuery] ExchangeQuery query)
    {
        return Ok(await exchangeService.GetExchangeAsync(query));
    }
}