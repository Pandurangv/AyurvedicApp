using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class AdmitViewModel
    {
        public long AdmitId { get; set; }

        public DateTime? AdmitDate { get; set; }

        public long? PatientId { get; set; }

        public string Dignosys { get; set; }

        public bool? IsDischarge { get; set; }

        public string OPDIPD { get; set; }

        public string PatientName { get; set; }

        public DateTime? DOB { get; set; }

        public string ContactNo { get; set; }

        public string EmailId { get; set; }

        public bool? IsIPD { get; set; }

        public string Address { get; set; }

        public DateTime? FollowUpDate { get; set; }

        public string Name { get; internal set; }

        public List<ChargeViewModel> ChargeList { get; set; }

    }

    public class ReadmitResponse : ErrorDetails
    {
        public IQueryable<AdmitViewModel> ReadmitList { get; set; }
    }

    public class ReadmitRequest : ErrorDetails
    {
        public AdmitViewModel Readmit { get; set; }
    }
}