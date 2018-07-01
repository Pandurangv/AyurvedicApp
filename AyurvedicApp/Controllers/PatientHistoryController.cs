using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class PatientHistoryController : Controller
    {
        // GET: PatientHistory
        PatientBLL objBLL = new PatientBLL();
        public ActionResult Index(int? AdmitId)
        {
            ViewBag.AdmitId = AdmitId;
            return View();
        }

        public ActionResult Save(PatientPastIllness model)
        {
            objBLL.Save(model);
            return Json(true);
        }
    }
}