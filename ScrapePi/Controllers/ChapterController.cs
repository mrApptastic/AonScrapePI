using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ScrapePI.Helpers;
using ScrapePI.Models;

namespace ScrapePI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
            web.AutoDetectEncoding = true;
            web.OverrideEncoding = Encoding.GetEncoding("iso-8859-1");

            string basePath = Constants.SiteUrl;
            string realPath = Path.Combine(basePath, lang, type, series, book, chapter).Replace("\\", "/") + "." + extention;

            var site = web.Load(realPath);

            var storyNodes = site.DocumentNode.SelectNodes("//div[@class='maintext']//p[not(@class='choice')]").ToList();

            var choiceNodes = site.DocumentNode.SelectNodes("//div[@class='maintext']//p[@class='choice']").ToList();

            var chapterDto = new ChapterDto {
                ChapterId = chapter,
                BookId = book,
                SeriesId = series,
                Story = new List<StoryDto>(),
                Combat = new List<CombatDto>(),
                Choice = new List<ChoiceDto>()                
            };

            foreach (var story in storyNodes) {
                if (story.InnerHtml.ToUpper().Contains("COMBAT")) {
                    chapterDto.Combat.Add(new CombatDto() {
                        Text = story.InnerHtml
                    });
                } else {
                    chapterDto.Story.Add(new StoryDto() {
                        Text = story.InnerHtml
                    });
                }
   
            }

            foreach (var choice in choiceNodes) {
                chapterDto.Choice.Add(new ChoiceDto() {
                    Text = choice.InnerHtml,
                    ChapterId = choice.SelectSingleNode("//a").GetAttributeValue("href", "")
                });
            }

            return Ok(chapterDto);
        }

     
    }
}
