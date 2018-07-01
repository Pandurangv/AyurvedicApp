namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("BaseDignosys")]
    public partial class BaseDignosy
    {
        [Key]
        public long ParamId { get; set; }

        [StringLength(150)]
        public string ParamName { get; set; }

        public bool? IsDelete { get; set; }
    }
}
