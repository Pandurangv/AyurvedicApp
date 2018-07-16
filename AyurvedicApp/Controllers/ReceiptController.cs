using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class ReceiptController : Controller
    {
        ReceiptBLL objReceipt = new ReceiptBLL();
        // GET: Receipt
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetReceipts()
        {
            return Json(objReceipt.GetReceipts(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult PrintReceipt(int AdmitId)
        {
            return Json(objReceipt.GetReceipts().ReceiptList.Where(p=>p.AdmitId==AdmitId), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetOutstanding(int PatientId)
        {
            return Json(objReceipt.GetOutstanding(PatientId), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(ReceiptViewModel model)
        {
            return Json(objReceipt.Save(model), JsonRequestBehavior.AllowGet);
        }


    }
}