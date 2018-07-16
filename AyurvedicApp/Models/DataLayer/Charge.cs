namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Charge")]
    public partial class Charge
    {
        public long ChargeId { get; set; }

        [StringLength(500)]
        public string ChargeName { get; set; }

        public bool? IsBedCharges { get; set; }

        public bool? IsConsultingCharges { get; set; }

        public bool? IsOperation { get; set; }

        public bool? IsDelete { get; set; }

        public decimal? ChargeAmount { get; set; }
    }
}
