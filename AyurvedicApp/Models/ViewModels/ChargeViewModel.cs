using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class ChargeViewModel
    {
        public long ChargeId { get; set; }

        public string ChargeName { get; set; }

        public bool? IsConsultingCharges { get; set; }

        public decimal? ChargesAmount { get; set; }
        public bool? IsDelete { get; internal set; }
        public bool? IsBedCharges { get; internal set; }
    }




    public class ChargeResponse : ErrorDetails
    {
        public IQueryable<ChargeViewModel> ChargeList { get; set; }
    }
}