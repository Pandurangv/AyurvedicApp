namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Receipt")]
    public partial class Receipt
    {
        [Key]
        public long ReceiptNo { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ReceiptDate { get; set; }

        public long? AdmitId { get; set; }

        public decimal? Amount { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(500)]
        public string Description { get; set; }
    }
}
