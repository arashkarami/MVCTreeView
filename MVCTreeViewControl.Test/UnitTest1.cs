using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using MVCTreeViewControl.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MVCTreeViewControl.Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void UniqueSampleDataIdGenerator()
        {
            var subNodes = SampleData.Nodes.SelectMany(m => m.SubNodes).Select(m => m.Id).ToList();
            var parents = SampleData.Nodes.Select(m => m.Id).ToList();

            parents.AddRange(subNodes);

            Assert.IsTrue(parents.Distinct().Count() == parents.Count);
        }
    }
}
