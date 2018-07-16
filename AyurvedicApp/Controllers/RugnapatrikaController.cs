using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace AyurvedicApp.Controllers
{
    public class RugnapatrikaController : Controller
    {
        PatientBLL objBLL = new PatientBLL();
        
        // GET: Rugnapatrika
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult GetDetails(int? PKID=0)
        {
            var response = objBLL.GetPatientList();
            if (PKID!=null && PKID.Value>0)
            {
                response.PatientList = response.PatientList.Where(p => p.PKId == PKID);//.FirstOrDefault();
            }
            return Json(response,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetAdmitPatientList()
        {
            return Json(objBLL.GetAdmitPatientList(0, false), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Save(PatientViewModel model)
        {
            return Json(objBLL.Save(model), JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult Update(PatientViewModel model)
        {
            return Json(objBLL.Update(model), JsonRequestBehavior.AllowGet);
        }

    }
}