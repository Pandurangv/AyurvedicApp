using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class ReceiptViewModel
    {
        public long ReceiptNo { get; set; }

        public DateTime? ReceiptDate { get; set; }

        /// <summary>
        /// This Stores Patient Id not Admit Id to track patient wise not for Admission wise
        /// </summary>
        public long? AdmitId { get; set; }

        public decimal? Amount { get; set; }

        public string Description { get; set; }

        public bool? IsDelete { get; set; }

        public string PatientName { get; set; }
    }

    public class ReceiptRequest : ErrorDetails
    {

        public ReceiptViewModel Receipt { get; set; }

    }

    public class ReceiptResponse : ErrorDetails
    {

        public IQueryable<ReceiptViewModel> ReceiptList { get; set; }

        public IQueryable<PatientViewModel> PatientList { get; set; }

    }
}