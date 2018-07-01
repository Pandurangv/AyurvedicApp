using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class PrescriptionController : Controller
    {
        // GET: Prescription

        PrescriptionBLL objPres = new PrescriptionBLL();
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetPrescriptionDetails()
        {
            return Json(objPres.GetPreesciption(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(PrescriptionModel model)
        {
            return Json(objPres.SavePrescription(model));
        }

        [HttpGet]
        public ActionResult GetPrescriptionResult(int PrescriptionId)
        {
            return Json(objPres.GetPreesciptionResult(PrescriptionId), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetCharges(int AdmitId)
        {
            return Json(objPres.GetCharges(AdmitId), JsonRequestBehavior.AllowGet);
        }
    }
}