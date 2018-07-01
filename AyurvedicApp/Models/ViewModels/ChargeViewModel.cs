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

        public decimal ChargesAmount { get; set; }

    }
}