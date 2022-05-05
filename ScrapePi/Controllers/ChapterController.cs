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
            web.OverrideEncoding = Encoding.UTF8;

            string basePath = Constants.SiteUrl;
            string realPath = Path.Combine(basePath, lang, type, series, book, chapter).Replace("\\", "/") + "." + extention;

            if (basePath == Constants.LocalUrl) {
                realPath = Path.Combine(Directory.GetCurrentDirectory(), realPath).Replace("\\", "/");
            }
            var site = web.Load(realPath);

            var storyNodes = site.DocumentNode.SelectNodes("//div[@class='maintext']//p[not(@class='choice')]")?.ToList();

            var imageNodes = site.DocumentNode.SelectNodes("//img[@alt='[illustration]']")?.ToList();

            var choiceNodes = site.DocumentNode.SelectNodes("//div[@class='maintext']//p[@class='choice']")?.ToList();

            var chapterDto = new ChapterDto {
                ChapterId = chapter,
                BookId = book,
                SeriesId = series,
                Story = new List<StoryDto>(),
                Illustration = new List<ImageDto>(),
                Combat = new List<CombatDto>(),
                Choice = new List<ChoiceDto>()                
            };

            foreach (var story in storyNodes) {
                if (story.InnerHtml.ToUpper().Contains("COMBAT SKILL") &&
                    story.InnerHtml.ToUpper().Contains("ENDURANCE")) {
                      chapterDto.Combat.Add(new CombatDto() {
                        Text = story.InnerHtml,
                        CombatSkill = parseCombatSkill(story.InnerHtml),
                        Endurance = parseEndurance(story.InnerHtml)
                    });
                } else {
                    chapterDto.Story.Add(new StoryDto() {
                        Text = story.InnerHtml
                    });
                }
   
            }

            if (imageNodes != null) {
                foreach (var image in imageNodes) {
                    string img = image.GetAttributeValue("src", "");
                     string extPath = Path.Combine(basePath, lang, type, series, book, img).Replace("\\", "/");
                    chapterDto.Illustration.Add(new ImageDto() {
                        Title = img.Split(".")[0],
                        Url = ImageHelper.ConvertToDataUrl(extPath, basePath == Constants.LocalUrl) 
                    });
                }
            }
           
            int index = 0;

            if (choiceNodes != null) {
                foreach (var choice in choiceNodes) {                
                    chapterDto.Choice.Add(new ChoiceDto() {
                        Text = choice.InnerHtml,
                        ChapterId = site.DocumentNode.SelectNodes("//div[@class='maintext']//p[@class='choice']//a")[index].GetAttributeValue("href", "").Split(".")[0]
                    });

                    index++;
                }
            }


            return Ok(chapterDto);
        }

        private int parseCombatSkill (string combatNode) {
            string baseNode = combatNode.Split("COMBAT SKILL</span>")[1].Split("<span")[0].Trim();
            int.TryParse(baseNode, out int ib);
            return ib;
        }

        private int parseEndurance (string combatNode) {
            string baseNode = combatNode.Split("ENDURANCE</span>")[1].Trim();
            int.TryParse(baseNode, out int ib);
            return ib;
        }


     
    }
}
