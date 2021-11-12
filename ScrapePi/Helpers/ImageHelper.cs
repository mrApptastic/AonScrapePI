using System;
using System.IO;
using System.Net;

namespace ScrapePI.Helpers
{
    public class ImageHelper
    {
       public static string ConvertToDataUrl (string path, bool local = false) {
        string type = path.Split(".")[1].ToLower();
        byte[] bytes;
        if (local) {
            bytes = File.ReadAllBytes(path);
        } else {
            using(var webClient = new WebClient())
            {
                bytes = webClient.DownloadData(path);
            }
        }

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
