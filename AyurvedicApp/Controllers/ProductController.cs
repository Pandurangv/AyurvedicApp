using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class ProductController : Controller
    {
        ProductBLL objProduct = new ProductBLL();
        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetProducts(int ProductId = 0)
        {
            var result = objProduct.GetProductMasterList();
            if (ProductId>0)
            {
                result.ProductList = result.ProductList.Where(p => p.ProductId == ProductId);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Save(ProductViewModel model)
        {
            return Json(objProduct.Save(model), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(ProductViewModel model)
        {
            return Json(objProduct.Update(model), JsonRequestBehavior.AllowGet);
        }
    }
}