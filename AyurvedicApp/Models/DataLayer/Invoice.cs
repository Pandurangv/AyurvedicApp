namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Invoice")]
    public partial class Invoice
    {
        [Key]
        public long InvoiceNo { get; set; }

        public DateTime? InvoiceDate { get; set; }

        public long? AdmitId { get; set; }

        [StringLength(500)]
        public string Desciption { get; set; }

        public decimal? Amount { get; set; }

        public decimal? Discount { get; set; }

        public decimal? NetAmount { get; set; }

        public decimal? Tax { get; set; }
    }
}
