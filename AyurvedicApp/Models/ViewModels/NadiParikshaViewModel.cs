using AyurvedicApp.Models.DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class NadiParikshaViewModel
    {
        public long NadiParikshaId { get; set; }

        public long? PatientId { get; set; }

        public DateTime? ExamDate { get; set; }

        public bool? IsDelete { get; set; }

        public string Description { get; set; }

        public string PatientName { get; set; }

        //public IQueryable<NadiParikshaDetailViewModel> PatientDignosysList { get; set; }

        //public I MyProperty { get; set; }
    }

    public class BaseDignosysViewModel
    {
        public long? ParamId { get; set; }

        public string ParamName { get; set; }

        public bool? IsDelete { get; set; }

        public IQueryable<DignosysMasterViewModel> DiagnosysList { get; set; }

        public List<DignosysMasterViewModel> SubDiagnosysList { get; set; }

        public string Result { get; set; }
    }

    public class DignosysMasterViewModel
    {
        public long? DignosysId { get; set; }


        public string DignosysName { get; set; }

        public string Description { get; set; }

        public bool? IsDelete { get; set; }


        public long? ParamId { get; set; }

        public string Result { get; set; }
    }

    public class NadiParikshaRequest : ErrorDetails
    {

        public NadiParikshaViewModel NadiPariksha { get; set; }

        public List<BaseDignosysViewModel> BaseList { get; set; }
    }

    public class NadiParikshaResponse:ErrorDetails
    {
        
        public IQueryable<NadiParikshaViewModel> NadiParikshaList { get; set; }
        public IQueryable<BaseDignosysViewModel> MainList { get; set; }

        public IQueryable<AdmitViewModel> PatientList { get; set; }

        public NadiParikshaViewModel NadiPariksha { get; set; }

        public List<BaseDignosysViewModel> BaseList { get; set; }

        public IQueryable<NadiParikshaDetailViewModel> PatientDignosysList { get; set; }
    }

    
}