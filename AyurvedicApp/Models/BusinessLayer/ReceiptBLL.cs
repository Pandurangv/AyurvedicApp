using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;

namespace AyurvedicApp.Models.BusinessLayer
{
    public class ReceiptBLL
    {
        AyurvedApp objData = new AyurvedApp();

        public ReceiptResponse Save(ReceiptViewModel entProduct)
        {
            ReceiptResponse response = new ReceiptResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var patient = new Receipt()
            {
                AdmitId = entProduct.AdmitId,
                Amount = entProduct.Amount,
                Description = entProduct.Description,
                ReceiptDate = entProduct.ReceiptDate==null?DateTime.Now.Date:entProduct.ReceiptDate,
                ReceiptNo = entProduct.ReceiptNo,
                IsDelete = false,
            };

            objData.Receipts.Add(patient);
            objData.SaveChanges();
            response.Id = patient.ReceiptNo;
            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        //public ProductResponse Update(ProductViewModel entProduct)
        //{
        //    ProductResponse response = new ProductResponse() { Status = 0, ErrorMessage = "Record not saved." };
        //    var product = objData.ProductMasters.Where(p => p.ProductId == entProduct.ProductId).FirstOrDefault();
        //    if (product != null)
        //    {
        //        product.ProductName = entProduct.ProductName;
        //        product.ProductContent = entProduct.ProductContent;
        //        product.Price = entProduct.Price;
        //        product.ProductTypeId = entProduct.ProductTypeId;
        //        product.UOM = entProduct.UOM;
        //        product.SubUOM = entProduct.SubUOM;
        //        objData.SaveChanges();
        //        response.Id = product.ProductId;
        //    }

        //    response.Status = 1;
        //    response.ErrorMessage = "Record updated successfully.";
        //    return response;
        //}

        public decimal? GetOutstanding(int PatientId)
        {
            decimal? Outstanding = 0;
            var admitids = objData.PatientAdmitDetails.Where(p => p.PatientId == PatientId).Select(p => p.AdmitId);

            var sumofinv = (from tbl in objData.Invoices
                            where admitids.Contains(tbl.AdmitId.Value)
                            select tbl.NetAmount).Sum();

            var sumofrec = objData.Receipts.Where(p => p.AdmitId == PatientId).Sum(p => p.Amount);

            Outstanding = sumofinv - (sumofrec==null?0:sumofrec);
            return Outstanding;
        }

        public ReceiptResponse GetReceipts()
        {
            ReceiptResponse response = new ReceiptResponse() { Status = 0, ErrorMessage = "Receipt list is empty." };
            response.ReceiptList = from entProduct in objData.Receipts
                                   join ptype in objData.PatientMasters
                                   on entProduct.AdmitId equals ptype.PKId
                                   where entProduct.IsDelete == false
                                   select new ReceiptViewModel()
                                   {
                                       AdmitId=entProduct.AdmitId,
                                       Amount=entProduct.Amount,
                                       Description=entProduct.Description,
                                       IsDelete=entProduct.IsDelete,
                                       PatientName=ptype.PatientName,
                                       ReceiptDate=entProduct.ReceiptDate,
                                       ReceiptNo=entProduct.ReceiptNo, 
                                   };

            response.PatientList = new PatientBLL().GetPatientList().PatientList;
            return response;
        }
    }
}