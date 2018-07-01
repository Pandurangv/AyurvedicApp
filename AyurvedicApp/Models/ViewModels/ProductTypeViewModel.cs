using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class ProductTypeViewModel
    {
        public int ProductTypeId { get; set; }

        public string ProductTyepe { get; set; }

        public bool? IsDelete { get; set; }

        public string Description { get; set; }
    }

    public class ProductTypeResponse : ErrorDetails
    {
        public IQueryable<ProductTypeViewModel> ProductTypeList { get; set; }

    }
}