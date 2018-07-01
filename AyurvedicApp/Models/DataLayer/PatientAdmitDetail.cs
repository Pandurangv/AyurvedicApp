namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class PatientAdmitDetail
    {
        [Key]
        public long AdmitId { get; set; }

        [Column(TypeName = "date")]
        public DateTime? AdmitDate { get; set; }

        public long? PatientId { get; set; }

        [StringLength(500)]
        public string Dignosys { get; set; }

        public bool? IsDischarge { get; set; }

        [StringLength(500)]
        public string OPDIPD { get; set; }
    }
}
