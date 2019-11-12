using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class ChargeController : Controller
    {
        ProductBLL objProduct = new ProductBLL();
        // GET: Charge
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetCharges(int ChargeId = 0)
        {
            var result = objProduct.GetChargesList();
            if (ChargeId > 0)
            {
                result.ChargeList = result.ChargeList.Where(p => p.ChargeId == ChargeId);
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Save(ChargeViewModel model)
        {
            return Json(objProduct.Save(model), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Update(ChargeViewModel model)
        {
            return Json(objProduct.Update(model), JsonRequestBehavior.AllowGet);
        }
    }
}