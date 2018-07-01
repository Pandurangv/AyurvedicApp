using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class ProductTypeController : Controller
    {
        ProductTypeBLL objProductBLL = new ProductTypeBLL();
        // GET: ProductType
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetProductTypes(int ProductTypeId=0)
        {
            return Json(objProductBLL.GetProductTypeList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(ProductTypeViewModel model)
        {
            return Json(objProductBLL.Save(model), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Update(ProductTypeViewModel model)
        {
            return Json(objProductBLL.Save(model), JsonRequestBehavior.AllowGet);
        }
    }
}