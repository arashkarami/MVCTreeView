using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVCTreeViewControl.Models
{
    public class TreeViewModel
    {
        public IEnumerable<Node> Nodes { get; set; }

        public UrlInfo ExpandUrl { get; set; }

        public string SuccessAlert { get; set; }

        public UrlInfo MainUrl { get; set; }

        public UrlInfo AddUrl { get; set; }

        public UrlInfo EditUrl { get; set; }

        public UrlInfo RemoveUrl { get; set; }

        public string ConfirmMessage { get; set; }

        public string SuccessRemoveMessage { get; set; }

        public TreeViewModel()
        {
            MainUrl = new UrlInfo();
            AddUrl = new UrlInfo();
            EditUrl = new UrlInfo();
            RemoveUrl = new UrlInfo();
            ExpandUrl = new UrlInfo();
        }
    }
}