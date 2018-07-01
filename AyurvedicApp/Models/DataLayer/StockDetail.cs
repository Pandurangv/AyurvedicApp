namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class StockDetail
    {
        [Key]
        public int StockId { get; set; }

        public int ProductId { get; set; }

        public int? OpeningQty { get; set; }

        public DateTime? OpeningQtyDate { get; set; }

        public int? InwardQty { get; set; }

        public decimal? InwardPrice { get; set; }

        public int? OutwardQty { get; set; }

        public decimal? OutwardPrice { get; set; }

        public int? DocumentNo { get; set; }

        [StringLength(10)]
        public string TransactionType { get; set; }

        public bool IsDelete { get; set; }

        [StringLength(50)]
        public string BatchNo { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public decimal? InwardAmount { get; set; }

        public decimal? OutwardAmount { get; set; }
    }
}
