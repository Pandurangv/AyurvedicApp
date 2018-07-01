namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DignosysMaster")]
    public partial class DignosysMaster
    {
        [Key]
        public long DignosysId { get; set; }

        [StringLength(150)]
        public string DignosysName { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        public bool? IsDelete { get; set; }

        public long? ParamId { get; set; }
    }
}
