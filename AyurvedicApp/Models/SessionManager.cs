using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models
{
    public class SessionManager
    {
        public static SessionManager _Instance = null;

        private SessionManager()
        {

        }

        public static SessionManager Instance()
        {
            if (_Instance==null)
            {
                _Instance = new SessionManager();
            }
            return _Instance;
        }

        public EmployeeViewModel LoginUser
        {
            get
            {
                EmployeeViewModel model = null;
                if (HttpContext.Current.Session["user"]!=null)
                {
                    model = (EmployeeViewModel)HttpContext.Current.Session["user"];
                }
                return model;
            }
        }
    }

    public class ErrorDetails
    {
        public int Status { get; set; }

        public string ErrorMessage { get; set; }

        public long Id { get; set; }
    }
}