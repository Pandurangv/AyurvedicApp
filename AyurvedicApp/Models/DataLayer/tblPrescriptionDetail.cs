namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class tblPrescriptionDetail
    {
        [Key]
        public int PrescriptionDetailId { get; set; }

        public int? Prescription_Id { get; set; }

        [StringLength(50)]
        public string MedicineName { get; set; }

        [StringLength(50)]
        public string Morning { get; set; }

        [StringLength(50)]
        public string Afternoon { get; set; }

        [StringLength(50)]
        public string Night { get; set; }

        [StringLength(50)]
        public string NoOfDays { get; set; }

        [StringLength(50)]
        public string Quantity { get; set; }

        public bool? IsDressing { get; set; }

        public bool? IsInjection { get; set; }

        [StringLength(50)]
        public string InjectionName { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(50)]
        public string Investigation { get; set; }

        [StringLength(50)]
        public string Impression { get; set; }

        [StringLength(50)]
        public string AdviceNote { get; set; }

        public int? ProductId { get; set; }

        public bool? IsbeforeLunch { get; set; }

        public int? ContentWith { get; set; }
    }
}
