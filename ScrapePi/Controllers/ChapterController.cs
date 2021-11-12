using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ScrapePI.Helpers;
using ScrapePI.Models;

namespace ScrapePI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChapterController : ControllerBase
    {

        private readonly ILogger<ChapterController> _logger;


         public ChapterController(ILogger<ChapterController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{series}/{book}/{chapter}")]
        public ActionResult<ChapterDto> GetChapter([FromRoute] string series, [FromRoute] string book, [FromRoute] string chapter, [FromQuery] string lang = "en", [FromQuery] string type = "xhtml", [FromQuery] string extention = "htm")
        {
            HtmlWeb web = new HtmlWeb();
            web.AutoDetectEncoding = false;
            web.OverrideEncoding = Encoding.GetEncoding("iso-8859-1");

            string basePath = Constants.SiteUrl;
            string realPath = Path.Combine(basePath, lang, type, series, book, chapter, extention).Replace("\\", "/");

            var nameList = web.Load(realPath);
            var ib = nameList.DocumentNode.Descendants("p").ToList().FindAll(x => x.InnerHtml.Contains("</big>"));

            return Ok(new ChapterDto {
                NodeId = 0
            });
        }

     
    }
}
