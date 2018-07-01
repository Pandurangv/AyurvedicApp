namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductMaster")]
    public partial class ProductMaster
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(30)]
        public string ProductName { get; set; }

        [Required]
        [StringLength(20)]
        public string UOM { get; set; }

        [Required]
        [StringLength(10)]
        public string SubUOM { get; set; }

        public decimal Price { get; set; }

        public bool IsReusable { get; set; }

        public bool IsDelete { get; set; }

        public int? ProductTypeId { get; set; }

        [StringLength(150)]
        public string ProductContent { get; set; }
    }
}
