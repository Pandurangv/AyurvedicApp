using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;

namespace AyurvedicApp.Models.BusinessLayer
{
    public class ProductBLL
    {
        AyurvedApp objData = new AyurvedApp();

        

        public ProductResponse Save(ProductViewModel entProduct)
        {
            ProductResponse response = new ProductResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var patient = new ProductMaster()
            {
                ProductName = entProduct.ProductName,
                UOM = entProduct.UOM,
                SubUOM = entProduct.SubUOM,
                Price = Convert.ToDecimal(entProduct.Price),
                ProductContent = entProduct.ProductContent,
                ProductTypeId = entProduct.ProductTypeId,
                IsDelete = false,
            };

            objData.ProductMasters.Add(patient);
            objData.SaveChanges();
            response.Id = patient.ProductId;
            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public ChargeResponse Save(ChargeViewModel entCharge)
        {
            var response = new ChargeResponse();
            var charge= new Charge()
            {
                ChargeName = entCharge.ChargeName,
                ChargeAmount = entCharge.ChargesAmount,
                IsBedCharges = false,
                IsConsultingCharges = false,
                IsDelete = false
            };
            objData.Charges.Add(charge);
            objData.SaveChanges();
            response.Id = charge.ChargeId;
            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public ChargeResponse Update(ChargeViewModel entCharge)
        {
            ChargeResponse response = new ChargeResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var product = objData.Charges.Where(p => p.ChargeId == entCharge.ChargeId).FirstOrDefault();
            if (product != null)
            {
                product.ChargeName = entCharge.ChargeName;
                product.ChargeAmount = entCharge.ChargesAmount;
                objData.SaveChanges();
                response.Id = product.ChargeId;
            }

            response.Status = 1;
            response.ErrorMessage = "Record updated successfully.";
            return response;
        }

        public ProductResponse Update(ProductViewModel entProduct)
        {
            ProductResponse response = new ProductResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var product = objData.ProductMasters.Where(p => p.ProductId == entProduct.ProductId).FirstOrDefault();
            if (product != null)
            {
                product.ProductName = entProduct.ProductName;
                product.ProductContent = entProduct.ProductContent;
                product.Price = entProduct.Price;
                product.ProductTypeId = entProduct.ProductTypeId;
                product.UOM = entProduct.UOM;
                product.SubUOM = entProduct.SubUOM;
                objData.SaveChanges();
                response.Id = product.ProductId;
            }

            response.Status = 1;
            response.ErrorMessage = "Record updated successfully.";
            return response;
        }

        public ChargeResponse GetChargesList()
        {
            ChargeResponse response = new ChargeResponse() { Status = 0, ErrorMessage = "Patient list is empty." };
            response.ChargeList = from entCharge in objData.Charges
                                   where entCharge.IsDelete == false
                                   select new ChargeViewModel()
                                   {
                                       ChargeId= entCharge.ChargeId,
                                       ChargeName=entCharge.ChargeName,
                                       ChargesAmount=entCharge.ChargeAmount,
                                       IsBedCharges=entCharge.IsBedCharges,
                                       IsConsultingCharges=entCharge.IsConsultingCharges,
                                       IsDelete=entCharge.IsDelete 
                                   };
            return response;
        }

        public ProductResponse GetProductMasterList()
        {
            ProductResponse response = new ProductResponse() { Status = 0, ErrorMessage = "Patient list is empty." };
            response.ProductList = from entProduct in objData.ProductMasters
                                   join ptype in objData.ProductTypes
                                   on entProduct.ProductTypeId equals ptype.ProductTypeId
                                   where entProduct.IsDelete == false
                                   select new ProductViewModel()
                                   {
                                       ProductName = entProduct.ProductName,
                                       UOM = entProduct.UOM,
                                       SubUOM = entProduct.SubUOM,
                                       Price = entProduct.Price,
                                       ProductContent = entProduct.ProductContent,
                                       ProductTypeId = entProduct.ProductTypeId,
                                       IsDelete = entProduct.IsDelete,
                                       ProductType = ptype.ProductTyepe,
                                       ProductId=entProduct.ProductId,
                                   };
            return response;
        }
    }

}