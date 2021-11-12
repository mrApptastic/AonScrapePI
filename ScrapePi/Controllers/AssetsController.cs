using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScrapePI.Helpers;
using ScrapePI.Models;

namespace ScrapePI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetsController : ControllerBase
    {

        private readonly ILogger<AssetsController> _logger;

        public AssetsController(ILogger<AssetsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{series}/{book}/{file}")]
        public ActionResult<ImageDto> GetAsset([FromRoute] string series, [FromRoute] string book, [FromRoute] string file, [FromQuery] string lang = "en", [FromQuery] string type = "xhtml")
        {
            // HtmlWeb web = new HtmlWeb();
            // web.AutoDetectEncoding = false;
            // web.OverrideEncoding = Encoding.GetEncoding("iso-8859-1");

            string basePath = Constants.SiteUrl;
            string realPath = Path.Combine(basePath, lang, type, series, book, file).Replace("\\", "/");
            return Ok(new ImageDto {
                Title = file.Split(".")[0],
                Url = GetDataUrl(realPath, (basePath == Constants.LocalUrl))
            });
        }

        private string GetDataUrl (string path, bool localPath = false) {
            return ImageHelper.ConvertToDataUrl(path, localPath);    
        }
    }
}
