using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVCTreeViewControl.Models;

namespace MVCTreeViewControl.Controllers
{
    public class TreeViewController : Controller
    {
        //
        // GET: /TreeView/
        public ActionResult Index()
        {
            var model = new TreeViewModel();
            model.ExpandUrl.UrlNavigation = "/Treeview/expand";
            model.AddUrl.UrlNavigation = "/Treeview/create";
            model.EditUrl.UrlNavigation = "/Treeview/edit";
            model.Nodes = SampleData.Nodes;
            return View(model);
        }

        [HttpPost]
        public ActionResult Expand(int parentId)
        {
            var json = new JsonResult();
            json.Data = SampleData.Nodes.First(p => p.Id == parentId).SubNodes;
            return Json(json);
        }
        public ActionResult Details(int id)
        {
            return View();
        }

        //
        // GET: /TreeView/Create

        public ActionResult Create(int? parentId)
        {
            var model = new Node();
            model.Parent = SampleData.Nodes.First(p => p.Id == parentId);

            return View(model);
        }

        //
        // POST: /TreeView/Create

        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /TreeView/Edit/5

        public ActionResult Edit(int id)
        {
            return View();
        }

        //
        // POST: /TreeView/Edit/5

        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        //
        // GET: /TreeView/Delete/5

        public ActionResult Delete(int id)
        {
            return View();
        }

        //
        // POST: /TreeView/Delete/5

        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
