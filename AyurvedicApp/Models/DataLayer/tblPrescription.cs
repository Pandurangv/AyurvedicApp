namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("tblPrescription")]
    public partial class tblPrescription
    {
        [Key]
        public int Prescription_Id { get; set; }

        public DateTime? Prescription_Date { get; set; }

        public long? AdmitId { get; set; }

        public bool? IsDelete { get; set; }

        public bool? IsDressing { get; set; }

        public bool? IsInjection { get; set; }

        [StringLength(500)]
        public string Description { get; set; }
    }
}
