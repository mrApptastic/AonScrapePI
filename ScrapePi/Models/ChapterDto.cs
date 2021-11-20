using System;
using System.Collections.Generic;

namespace ScrapePI.Models
{
    public class ChapterDto
    {  
        public string ChapterId {get; set; }
        public string BookId {get; set; }
        public string SeriesId {get; set; }
        public List<StoryDto> Story { get; set; }
        public List<ImageDto> Illustration { get; set; }
        public List<CombatDto> Combat { get; set; }
        public List<ChoiceDto> Choice { get; set; }
    }  

    public class StoryDto
    {  
        public string Text { get; set; }
    }

    public class CombatDto
    {  
        public string Text { get; set; }
        public int CombatSkill { get; set; }
        public int Endurance { get; set; }
    }  

    public class ChoiceDto
    {  
        public string Text { get; set; }
        public string ChapterId { get; set; }
    }  
}
