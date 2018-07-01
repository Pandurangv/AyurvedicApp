using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class ReadmitController : Controller
    {
        // GET: Readmit
        PatientBLL objPatient = new PatientBLL();
        
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetAdmitPatientList()
        {
            return Json(objPatient.GetAdmitPatientList(0,true), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(AdmitViewModel model)
        {
            return Json(objPatient.Save(model), JsonRequestBehavior.AllowGet);
        }
    }
}