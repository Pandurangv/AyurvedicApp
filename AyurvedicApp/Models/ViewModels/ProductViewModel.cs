using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.ViewModels
{
    public class ProductViewModel
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string UOM { get; set; }

        public string SubUOM { get; set; }

        public decimal Price { get; set; }

        public bool IsReusable { get; set; }

        public bool IsDelete { get; set; }

        public int? ProductTypeId { get; set; }

        public string ProductType { get; set; }

        public string ProductContent { get; set; }
    }

    public class ProductResponse : ErrorDetails
    {
        public IQueryable<ProductViewModel> ProductList { get; set; }
    }
}