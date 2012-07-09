using System;
using System.Collections.Generic;
using System.Web.Mvc;
using MVCTreeViewControl.Models;

namespace MVCTreeViewControl.Helper
{
    public static class TreeViewHelper
    {
        public static MvcHtmlString TreeView(this HtmlHelper helper, Action<List<Node>> nodeBuilder)
        {
            var nodes = new List<Node>();
            nodeBuilder(nodes);

            if (nodes.Count == 0)
                return null;

            //<div id="nav">
            var mainDiv = new TagBuilder("div");
            mainDiv.Attributes.Add("id", "nav");

            //<ul>
            var ul = new TagBuilder("ul");
            ul.InnerHtml = MakeTree(nodes);
            mainDiv.InnerHtml = ul.ToString();
            return MvcHtmlString.Create(mainDiv.ToString());
        }

        private static string MakeTree(IEnumerable<Node> nodes)
        {
            var result = string.Empty;
            if (nodes == null) return result;

            foreach (var node in nodes)
            {
                if (!node.Visible) continue;

                //<li id="@rowId">
                var li = new TagBuilder("li");
                li.Attributes.Add("id", string.Format("row{0}", node.Id));
                li.InnerHtml = MakeNodeElement(node);

                //if(node.SubNodes.Any())
                //    li.InnerHtml = li.InnerHtml + "<ul>" + MakeTree(node.SubNodes) + "</ul>";

                result = result + li;
            }
            return result;
        }

        private static string MakeNodeElement(Node node)
        {
            var ul = new TagBuilder("ul");
            ul.AddCssClass("treeview-node-element");

            var expandLi = MakeLitteralExpand(node);
            var titleLi = MakeLitteralTitle(node);
            var addLi = MakeLitteralAdd(node);
            var editLi = MakeLitteralEdit(node);
            var removeLi = MakeLitteralRemove(node);

            ul.InnerHtml = expandLi + titleLi + addLi + editLi + removeLi;
            return ul.ToString();
        }

        private static string MakeLitteralEdit(Node node)
        {
            //<li class="treeview-node-tools"><img src="../../Images/Icons/edit2.png" onclick="edit(@node.Id)" alt="edit"/></li>
            var li = new TagBuilder("li");
            li.AddCssClass("treeview-node-tools");
            li.InnerHtml = string.Format("<img alt=\"{0}\" src=\"{1}\" onclick=\"edit({2})\"/>", "add", "../../Images/Icons/edit2.png", node.Id);
            return li.ToString();
        }

        private static string MakeLitteralRemove(Node node)
        {
            //<li class="treeview-node-tools"><img src="../../Images/Icons/trash.png" onclick="remove(@node.Id)" alt="remove"/></li>
            var li = new TagBuilder("li");
            li.AddCssClass("treeview-node-tools");
            li.InnerHtml = string.Format("<img alt=\"{0}\" src=\"{1}\" onclick=\"remove({2})\"/>", "remove", "../../Images/Icons/trash.png", node.Id);
            return li.ToString();
        }

        private static string MakeLitteralAdd(Node node)
        {
            //<li class="treeview-node-tools"><img src="../../Images/Icons/add.png" onclick="add(@node.Id)" alt="add"/></li>
            var li = new TagBuilder("li");
            li.AddCssClass("treeview-node-tools");
            li.InnerHtml = string.Format("<img alt=\"{0}\" src=\"{1}\" onclick=\"add({2})\"/>", "add", "../../Images/Icons/add.png", node.Id);
            return li.ToString();
        }

        private static string MakeLitteralTitle(Node node)
        {
            //<li onclick="onClickNode(@node.Id)" title="@node.Tooltip">@node.Title</li>
            var li = new TagBuilder("li");
            li.Attributes.Add("onclick", string.Format("onClickNode({0})", node.Id));
            li.Attributes.Add("title", node.Tooltip);

            li.InnerHtml = node.Title;
            return li.ToString();
        }

        private static string MakeLitteralExpand(Node node)
        {
            //<li class="treeview-node-expand" onclick="expand(@node.Id)"><img src="../../Images/Icons/add.png"/></li>
            var li = new TagBuilder("li");
            li.AddCssClass("treeview-node-expand");
            li.Attributes.Add("onclick", string.Format("expand({0})", node.Id));
            li.InnerHtml = string.Format("<img src=\"{0}\"/>", "../../Images/Icons/add.png");
            return li.ToString();
        }
    }
}