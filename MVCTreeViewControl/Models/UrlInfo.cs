using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCTreeViewControl.Models
{
    public class UrlInfo
    {
        public string Action { get; set; }
        public string Controller { get; set; }
        public string Area { get; set; }
        public object Parammeters { get; set; }
        public string UrlNavigation { get; set; }

        public UrlInfo()
        {
            UrlNavigation = "#";
        }
    }
}