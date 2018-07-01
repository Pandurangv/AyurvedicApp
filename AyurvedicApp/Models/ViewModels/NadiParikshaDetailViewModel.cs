using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class NadiParikshaDetailViewModel
    {
        public long SRNo { get; set; }

        public long? DignosysId { get; set; }

        public string Result { get; set; }

        public long? NadiParikshaId { get; set; }

        public bool? IsDelete { get; set; }
        public string ParamName { get; internal set; }
        public long? BaseDignosysId { get; internal set; }
    }
}