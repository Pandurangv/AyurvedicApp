using System.Web;
using System.Web.Optimization;

namespace AyurvedicApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include(
                      "~/Scripts/JS/jquery.js",
                      "~/Scripts/JS/bootstrap.min.js",
                      "~/Scripts/JS/jquery.datetimepicker.js",
                      "~/Scripts/JS/jquery.timepicker.min.js",
                       "~/Scripts/JS/angular.min.js",
                       "~/Scripts/JS/App.js",
                       "~/Scripts/JS/common.js",
                       "~/Scripts/JS/ShowCustomAlert.js",
                       "~/Scripts/JS/datehelper.js"
                      ));


            bundles.Add(new ScriptBundle("~/bundles/rugnapatrika").Include("~/Scripts/Js/RugnapatrikaController.js"));

            bundles.Add(new ScriptBundle("~/bundles/ProductType").Include("~/Scripts/Js/ProductTypeController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Prescription").Include("~/Scripts/Js/printThis.js","~/Scripts/Js/PrescriptionController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Receipt").Include("~/Scripts/Js/printThis.js", "~/Scripts/Js/ReceiptController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Product").Include("~/Scripts/Js/ProductController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Readmit").Include("~/Scripts/Js/ReadmitController.js"));

            bundles.Add(new ScriptBundle("~/bundles/BarChart").Include("~/Scripts/Js/raphael.min.js", "~/Scripts/Js/morris.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/NadiPariksha").Include("~/Scripts/Js/Chart.bundle.js", "~/Scripts/Js/utils.js", 
                "~/Scripts/Js/printThis.js", "~/Scripts/Js/NadiParikshaController.js"));

            //bundles.Add(new ScriptBundle("~/bundles/NadiParikshaResult").Include(
            //    "~/Scripts/Js/canvasjs.min.js",
            //    "~/Scripts/Js/NadiParikshaResultController.js"
            //    ));


            bundles.Add(new StyleBundle("~/Content/datepicker").Include(
                      "~/Content/css/angular-datepicker.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/bootstrap.min.css",
                      "~/Content/Css/font-awesome.min.css",
                      "~/Content/Css/mystyle.css",
                      "~/Content/css/sb-admin.css",
                      "~/Content/css/jquery.datetimepicker.css",
                      "~/Content/css/jquery.timepicker.min.css"));

            bundles.Add(new ScriptBundle("~/bundles/datepicker").Include("~/Scripts/Js/angular-datepicker.js"));
        }
    }
}
