using AyurvedicApp.Models.BusinessLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AyurvedicApp.Controllers
{
    public class NadiParikshaController : Controller
    {
        NadiParikshaBLL objNadi = new NadiParikshaBLL();  
            // GET: NadiPariksha
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult Save(NadiParikshaRequest request)
        {
            return Json(objNadi.Save(request), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetNadiParikshaDetails()
        {
            return Json(objNadi.GetNadiParikshaDetails(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetNadiParikshaResult(int NadiParikshaId)
        {
            return Json(objNadi.GetNadiParikshaResult(NadiParikshaId), JsonRequestBehavior.AllowGet);
        }
    }
}