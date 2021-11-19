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
            string basePath = Constants.SiteUrl;
            string realPath = Path.Combine(basePath, lang, type, series, book, file).Replace("\\", "/");
            return Ok(new ImageDto {
                Title = file.Split(".")[0],
                Url = GetDataUrl(realPath, (basePath == Constants.LocalUrl))
            });
        }

        [HttpPost("{series}/{book}")]
        public ActionResult<List<ImageDto>> GetAssets([FromRoute] string series, [FromRoute] string book, [FromBody] List<ImageSearchDto> search, [FromQuery] string lang = "en", [FromQuery] string type = "xhtml")
        {
            var images = new List<ImageDto>();
            string basePath = Constants.SiteUrl;

            foreach (var file in search) {
                string realPath = Path.Combine(basePath, lang, type, series, book, file.File).Replace("\\", "/");
                images.Add(new ImageDto {
                    Title = file.File.Split(".")[0],
                    Url = GetDataUrl(realPath, (basePath == Constants.LocalUrl))
                });
            }

            return images;
        }

        private string GetDataUrl (string path, bool localPath = false) {
            return ImageHelper.ConvertToDataUrl(path, localPath);    
        }
    }
}
