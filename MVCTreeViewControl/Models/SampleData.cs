using System.Collections.Generic;
using System.Linq;

namespace MVCTreeViewControl.Models
{
    public static class SampleData
    {
        public static List<Node> Nodes
        {
            get { return GetNodes(); }
        }

        private static IEnumerable<Node> GenerateNodes(int startIndex, int size)
        {
            for (var i = startIndex; i < startIndex + size; i++)
                yield return new Node
                                 {
                                     Id = i,
                                     IsEditable = false,
                                     Title = string.Format("node {0}", i),
                                     Tooltip = string.Format("node tooltip {0}", i),
                                     Url = new UrlInfo { UrlNavigation = "#" },
                                     Visible = true
                                 };
        }

        private static List<Node> GetNodes()
        {
            var parents = GenerateNodes(0, 5).ToList();

            var i = 1;
            foreach (var parent in parents)
            {
                var startIndex = 5 * i++;
                parent.SubNodes =GenerateNodes(startIndex, 5).ToList();
            }

            return parents;
        }
    }
}