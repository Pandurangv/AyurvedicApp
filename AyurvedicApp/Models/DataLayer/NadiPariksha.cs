namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("NadiPariksha")]
    public partial class NadiPariksha
    {
        public long NadiParikshaId { get; set; }

        public long? PatientId { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ExamDate { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(500)]
        public string Description { get; set; }
    }
}
