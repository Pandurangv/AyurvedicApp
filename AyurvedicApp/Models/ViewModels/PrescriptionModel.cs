using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{

    public class PrescriptionResponse:ErrorDetails
    {
        public IQueryable<PrescriptionModel> PrescriptionList { get; set; }

        public IQueryable<ProductViewModel> ProductList { get; set; }

        public IQueryable<AdmitViewModel> PatientList { get; set; }

        public PrescriptionModel Prescription { get; set; }
    }

    public class PrescriptionRequest : ErrorDetails
    {
        public PrescriptionModel Prescription { get; set; }
    }

    public class PrescriptionModel
    {
        public int Prescription_Id { get; set; }

        public DateTime? Prescription_Date { get; set; }

        public long? AdmitId { get; set; }

        public string PatientName { get; set; }

        public bool? IsDelete { get; set; }

        public bool? IsDressing { get; set; }

        public bool? IsInjection { get; set; }

        public string Description { get; set; }

        public IQueryable<PrescriptionDetailModel> PrescriptionDetailList { get; set; }

        public List<PrescriptionDetailModel> PrescriptionDetails { get; set; }

        public List<ChargeViewModel> ChargeList { get; set; }
        public DateTime? AdmitDate { get; internal set; }
    }

    public class PrescriptionDetailModel
    {
        public int PrescriptionDetailId { get; set; }

        public int? Prescription_Id { get; set; }

        public int ProductId { get; set; }

        public string MedicineName { get; set; }

        public string Morning { get; set; }

        public string Afternoon { get; set; }

        public string Night { get; set; }

        public string NoOfDays { get; set; }

        public string Quantity { get; set; }

        public bool? IsDressing { get; set; }

        public bool? IsInjection { get; set; }

        public string InjectionName { get; set; }

        public bool? IsDelete { get; set; }

        public string Investigation { get; set; }

        public string Impression { get; set; }

        public string AdviceNote { get; set; }
        public bool? IsBeforeLunch { get; internal set; }

        public int? ContentWith { get; set; }
    }
}