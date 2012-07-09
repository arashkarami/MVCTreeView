using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace MVCTreeViewControl.Models
{
    public class Node
    {
        public int Id { get; set; }

        public Node Parent { get; set; }

        public string Title { get; set; }

        public string Tooltip { get; set; }

        [DefaultValue(true)]
        public bool Visible { get; set; }

        [DefaultValue(true)]
        public bool IsEditable { get; set; }

        public UrlInfo Url { get; set; }

        public IEnumerable<Node> SubNodes { get; set; }

        public Node()
        {
            Visible = true;
            SubNodes = new List<Node>();
        }
    }
}