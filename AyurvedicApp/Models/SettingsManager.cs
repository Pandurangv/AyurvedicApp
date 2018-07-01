using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models
{
    public class SettingsManager
    {
        public static SettingsManager _Instance = null;

        private SettingsManager()
        {

        }

        public static SettingsManager Instance()
        {
            if (_Instance == null)
            {
                _Instance = new SettingsManager();
            }
            return _Instance;
        }

        public double Days
        {
            get
            {
                double days = 90;
                if (ConfigurationManager.AppSettings["days"]!=null)
                {
                    days = Convert.ToDouble(ConfigurationManager.AppSettings["days"]);
                }
                return days;
            }
        }

        public decimal ChargesBefore
        {
            get
            {
                decimal chargesbefore = 250;
                if (ConfigurationManager.AppSettings["chargesbefore"] != null)
                {
                    chargesbefore = Convert.ToDecimal(ConfigurationManager.AppSettings["chargesbefore"]);
                }
                return chargesbefore;
            }
        }

        public decimal ChargesAfter
        {
            get
            {
                decimal chargesafter = 250;
                if (ConfigurationManager.AppSettings["chargesafter"] != null)
                {
                    chargesafter = Convert.ToDecimal(ConfigurationManager.AppSettings["chargesafter"]);
                }
                return chargesafter;
            }
        }
    }
}