namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("InvoiceDetail")]
    public partial class InvoiceDetail
    {
        public long InvoiceDetailId { get; set; }

        public long? InvoiceNo { get; set; }

        public long? ChargeId { get; set; }

        public int? Qty { get; set; }

        public decimal? Charge { get; set; }

        public decimal? Amount { get; set; }
    }
}
