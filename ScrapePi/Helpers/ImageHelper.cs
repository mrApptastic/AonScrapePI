using System;
using System.IO;

namespace ScrapePI.Helpers
{
    public class ImageHelper
    {
       public static string ConvertToDataUrl (string relativePath) {
        string type = relativePath.Split(".")[1].ToLower();
        string mediaFolder = Path.Combine("", relativePath);
        string fullPath = Path.Combine(Directory.GetCurrentDirectory(), mediaFolder);
        Byte[] bytes = File.ReadAllBytes(fullPath);
        return getPrefix(type) + Convert.ToBase64String(bytes);
        }

        private static string getPrefix(string type) {
            switch (type) {
                case "png": return "data:image/png;base64,";
                case "gif": return "data:image/gif;base64,";
                default: return "data:image/jpg;base64,";
            }
        }
    }        
}
