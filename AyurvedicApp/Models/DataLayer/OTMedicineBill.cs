namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("OTMedicineBill")]
    public partial class OTMedicineBill
    {
        [Key]
        public int BillNo { get; set; }

        public DateTime? Bill_Date { get; set; }

        public int? AdmitId { get; set; }

        public decimal? TotalAmount { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(500)]
        public string TreatmentDetails { get; set; }

        [StringLength(500)]
        public string TreatmentPro { get; set; }

        public int? DoctorId { get; set; }

        public decimal? TotalTaxAmount { get; set; }

        [StringLength(250)]
        public string TreatmentTime { get; set; }

        public decimal? NetAmount { get; set; }
    }
}
