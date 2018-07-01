namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class OTMedicineBillDetail
    {
        [Key]
        public int BillDetailId { get; set; }

        public int? BillNo { get; set; }

        public int? TabletId { get; set; }

        public int? Quantity { get; set; }

        public decimal? Price { get; set; }

        public decimal? Amount { get; set; }

        public bool? IsDelete { get; set; }

        public decimal? TaxPercent { get; set; }

        public decimal? TaxAmount { get; set; }
    }
}
