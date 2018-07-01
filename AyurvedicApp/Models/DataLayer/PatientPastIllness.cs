namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PatientPastIllness")]
    public partial class PatientPastIllness
    {
        [Key]
        public long CurrentIllnessId { get; set; }

        public string CurrentIllness { get; set; }

        [StringLength(50)]
        public string IllnessFromDays { get; set; }

        public string StartSymptoms { get; set; }

        public string Reason { get; set; }

        public bool? CanAbleToWalk { get; set; }

        public bool? CanAnybodyHelpHim { get; set; }

        [StringLength(10)]
        public string TreatmentDetails { get; set; }

        public string HelpfulTreatment { get; set; }

        public bool? IsDelete { get; set; }

        public string OtherInformation { get; set; }

        public long? AdmitId { get; set; }
    }
}
