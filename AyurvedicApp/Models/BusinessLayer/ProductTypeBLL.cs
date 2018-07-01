using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.BusinessLayer
{
    public class ProductTypeBLL
    {
        AyurvedApp objData = new AyurvedApp();

        public ProductTypeResponse Save(ProductTypeViewModel model)
        {
            ProductTypeResponse response = new ProductTypeResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var patient = new ProductType()
            {
                Description = model.Description,
                IsDelete = false,
                ProductTyepe = model.ProductTyepe
            };

            objData.ProductTypes.Add(patient);
            objData.SaveChanges();
            response.Id = patient.ProductTypeId;
            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public ProductTypeResponse Update(ProductTypeViewModel model)
        {
            ProductTypeResponse response = new ProductTypeResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var patient = objData.ProductTypes.Where(p => p.ProductTypeId == model.ProductTypeId).FirstOrDefault();
            if (patient != null)
            {
                patient.Description = model.Description;
                patient.ProductTyepe = model.ProductTyepe;
                
                objData.SaveChanges();
                response.Id = patient.ProductTypeId;
            }

            response.Status = 1;
            response.ErrorMessage = "Record updated successfully.";
            return response;
        }

        public ProductTypeResponse GetProductTypeList()
        {
            ProductTypeResponse response = new ProductTypeResponse() { Status = 0, ErrorMessage = "Patient list is empty." };
            response.ProductTypeList = from model in objData.ProductTypes
                                   where model.IsDelete == false
                                   select new ProductTypeViewModel()
                                   {
                                       ProductTypeId=model.ProductTypeId,
                                       Description=model.Description,
                                       IsDelete=model.IsDelete,
                                       ProductTyepe=model.ProductTyepe
                                   };
            return response;
        }
    }
}