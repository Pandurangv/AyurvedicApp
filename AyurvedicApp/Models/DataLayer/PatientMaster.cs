namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PatientMaster")]
    public partial class PatientMaster
    {
        [Key]
        public long PKId { get; set; }

        [StringLength(50)]
        public string PatientName { get; set; }

        public DateTime? AdminDate { get; set; }

        [StringLength(50)]
        public string AdmitTime { get; set; }

        [StringLength(50)]
        public string PatientType { get; set; }

        [StringLength(100)]
        public string Address { get; set; }

        [StringLength(20)]
        public string ContactNo { get; set; }

        [StringLength(6)]
        public string BloodGroup { get; set; }

        public DateTime? BirthDate { get; set; }

        [StringLength(50)]
        public string ReferedBy { get; set; }

        [StringLength(50)]
        public string Gender { get; set; }

        public int? Age { get; set; }

        [StringLength(50)]
        public string AgeIn { get; set; }

        [StringLength(150)]
        public string Weight { get; set; }

        [StringLength(150)]
        public string Occupation { get; set; }

        [StringLength(50)]
        public string Religion { get; set; }

        [StringLength(50)]
        public string Caste { get; set; }

        [StringLength(50)]
        public string City { get; set; }

        [StringLength(50)]
        public string State { get; set; }

        [StringLength(50)]
        public string Country { get; set; }

        [StringLength(100)]
        public string PastMedHistory { get; set; }

        [StringLength(50)]
        public string PatientCategory { get; set; }

        [StringLength(100)]
        public string FamilyHistory { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(50)]
        public string Dignosys { get; set; }

        public int? PatientTypeId { get; set; }

        [StringLength(100)]
        public string EmailId { get; set; }

        [StringLength(50)]
        public string BirthTime { get; set; }

        [StringLength(50)]
        public string RefContact { get; set; }

        [StringLength(150)]
        public string Qualification { get; set; }

        [StringLength(150)]
        public string Address1 { get; set; }

        [StringLength(150)]
        public string FatherOccupation { get; set; }
    }
}
