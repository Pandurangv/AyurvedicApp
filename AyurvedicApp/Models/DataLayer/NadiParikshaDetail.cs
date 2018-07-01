namespace AyurvedicApp.Models.DataLayer
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NadiParikshaDetail
    {
        [Key]
        public long SRNo { get; set; }

        public long? DignosysId { get; set; }

        [StringLength(50)]
        public string Result { get; set; }

        public long? NadiParikshaId { get; set; }

        public bool? IsDelete { get; set; }

        public long? BaseDignosysId { get; set; }
    }
}
