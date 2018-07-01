using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class PatientViewModel
    {
        public string Address { get; set; }
        public string Address1 { get; set; }
        public DateTime? AdmitDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string BirthTime { get;  set; }
        public string BloodGroup { get;  set; }
        public string ContactNo { get;  set; }
        public string EmailId { get;  set; }
        public string FatherOccupation { get;  set; }
        public string Gender { get;  set; }
        public string Name { get;  set; }
        public string Occupation { get;  set; }
        public long PKId { get;  set; }
        public string Qualification { get;  set; }
        public string RefContact { get;  set; }
        public string ReferenceDoctorName { get;  set; }
        public string Weight { get;  set; }

        public long AdmitId { get; set; }
        public bool? IsDischarge { get; internal set; }

        public bool? IsIPD { get; set; }
    }

    

    public class PatientResponse:ErrorDetails
    {
        public IQueryable<PatientViewModel> PatientList { get; set; }

        public IQueryable<AdmitViewModel> AdmitPatientList { get; set; }

    }
}