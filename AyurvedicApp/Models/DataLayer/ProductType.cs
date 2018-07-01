namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ProductType")]
    public partial class ProductType
    {
        public int ProductTypeId { get; set; }

        [StringLength(50)]
        public string ProductTyepe { get; set; }

        public bool? IsDelete { get; set; }

        [StringLength(150)]
        public string Description { get; set; }
    }
}
