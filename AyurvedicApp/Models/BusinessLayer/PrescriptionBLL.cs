using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;


namespace AyurvedicApp.Models.BusinessLayer
{
    public class PrescriptionBLL
    {
        AyurvedApp objData = new AyurvedApp();

        public PrescriptionResponse GetPreesciption()
        {
            PrescriptionResponse response = new PrescriptionResponse();
            response.Status = 0;
            response.PrescriptionList = (from tbl in objData.tblPrescriptions
                                         join tbladmit in objData.PatientAdmitDetails
                                         on tbl.AdmitId equals tbladmit.AdmitId
                                         join tblpatient in objData.PatientMasters
                                         on tbladmit.PatientId equals tblpatient.PKId
                                         select new PrescriptionModel()
                                         {
                                             Prescription_Id=tbl.Prescription_Id,
                                             AdmitId=tbl.AdmitId,
                                             Description = tbl.Description,
                                             IsDressing=tbl.IsDressing,
                                             PatientName=tblpatient.PatientName,
                                             Prescription_Date=tbl.Prescription_Date,
                                             FollowUpDate=tbl.FollowUpDate,
                                             IsDelete=tbl.IsDelete
                                         });

            response.PatientList = new PatientBLL().GetAdmitPatientList().AdmitPatientList;//.Where(p=>p.IsDischarge==false);
            response.ProductList = new ProductBLL().GetProductMasterList().ProductList;
            response.Status = 1;
            return response;
        }

        public ChargeViewModel GetCharges(int admitId)
        {
            var ChargeVM = (from tbl in objData.Charges
                            where tbl.IsConsultingCharges==true
                            select new ChargeViewModel() {
                                ChargeId=tbl.ChargeId,
                                ChargeName=tbl.ChargeName,
                                ChargesAmount=0,
                            }).FirstOrDefault();
            var setting = SettingsManager.Instance();
            var admit = objData.PatientAdmitDetails.Where(p => p.AdmitId == admitId).FirstOrDefault();
            if (admit!=null)
            {
                var admitlist= objData.PatientAdmitDetails.Where(p => p.PatientId == admit.PatientId).OrderByDescending(p => p.AdmitId).Take(2).ToList();
                ChargeVM.ChargesAmount = setting.ChargesBefore;
                if (admitlist!=null && admitlist.Count>=2)
                {
                    double days=admitlist[0].AdmitDate.Value.Subtract(admitlist[0].AdmitDate.Value).TotalDays;
                    if (days> setting.Days)
                    {
                        ChargeVM.ChargesAmount = setting.ChargesAfter;
                    }
                }
            }
            return ChargeVM;
        }

        public PrescriptionResponse GetPreesciptionResult(int PrescriptioId)
        {
            PrescriptionResponse response = new PrescriptionResponse();
            response.Status = 0;
            response.Prescription = (from tbl in objData.tblPrescriptions
                                         join tbladmit in objData.PatientAdmitDetails
                                         on tbl.AdmitId equals tbladmit.AdmitId
                                         join tblpatient in objData.PatientMasters
                                         on tbladmit.PatientId equals tblpatient.PKId
                                         where tbl.Prescription_Id==PrescriptioId
                                         select new PrescriptionModel()
                                         {
                                             Prescription_Id = tbl.Prescription_Id,
                                             AdmitId = tbl.AdmitId,
                                             Description = tbl.Description,
                                             IsDressing = tbl.IsDressing,
                                             PatientName = tblpatient.PatientName,
                                             Prescription_Date = tbl.Prescription_Date,
                                             FollowUpDate=tbl.FollowUpDate,
                                             AdmitDate=tbladmit.AdmitDate,
                                             IsDelete = tbl.IsDelete,
                                             PrescriptionDetailList=(from presd in objData.tblPrescriptionDetails
                                                                     join prod in objData.ProductMasters
                                                                     on presd.ProductId equals prod.ProductId
                                                                     where presd.Prescription_Id==tbl.Prescription_Id
                                                                     select new PrescriptionDetailModel() {
                                                                         Afternoon=presd.Afternoon,
                                                                         Morning=presd.Morning,
                                                                         Night=presd.Night,
                                                                         MedicineName=prod.ProductName,
                                                                         IsBeforeLunch=presd.IsbeforeLunch,
                                                                         NoOfDays=presd.NoOfDays,
                                                                         PrescriptionDetailId=presd.PrescriptionDetailId,
                                                                         ProductId=prod.ProductId,
                                                                         IsDelete=prod.IsDelete,
                                                                         Quantity=presd.Quantity,
                                                                         ContentWith=presd.ContentWith==null?0:presd.ContentWith,
                                                                     })
                                         }).FirstOrDefault();
            response.Status = 1;
            return response;

        }

        public PrescriptionResponse SavePrescription(PrescriptionModel model)
        {
            PrescriptionResponse response = new PrescriptionResponse();
            response.Status = 0;
            PrescriptionModel tbl = model;
            tblPrescription pres = new tblPrescription() {
                Prescription_Id = tbl.Prescription_Id,
                AdmitId = tbl.AdmitId,
                Description = tbl.Description,
                IsDressing = tbl.IsDressing,
                Prescription_Date = tbl.Prescription_Date,
                FollowUpDate = model.FollowUpDate,
                IsDelete = false
            };
            objData.tblPrescriptions.Add(pres);
            objData.SaveChanges();
            
            foreach (var item in tbl.PrescriptionDetails)
            {
                tblPrescriptionDetail objsal = new tblPrescriptionDetail()
                {
                    ProductId = item.ProductId,
                    Morning = item.Morning,
                    Afternoon = item.Afternoon,
                    Night = item.Night,
                    NoOfDays = item.NoOfDays,
                    Quantity = item.Quantity,
                    Prescription_Id = Convert.ToInt32(pres.Prescription_Id),
                    IsDelete = false,
                    IsbeforeLunch = item.IsBeforeLunch,
                    ContentWith=item.ContentWith,
                };
                objData.tblPrescriptionDetails.Add(objsal);
            }
            objData.SaveChanges();
            //if (model.ChargeList.Count>0)
            //{
            //    Invoice inv = new Invoice() {AdmitId=model.AdmitId,InvoiceDate=model.Prescription_Date,Amount=model.ChargeList.Sum(p=>p.ChargesAmount) };
            //    inv.NetAmount = inv.Amount - (inv.Discount == null ? 0 : inv.Discount);
            //    objData.Invoices.Add(inv);
            //    objData.SaveChanges();
            //    foreach (var item in model.ChargeList)
            //    {
            //        InvoiceDetail invdetail = new InvoiceDetail() {
            //            Amount=item.ChargesAmount,
            //            ChargeId=item.ChargeId,
            //            Charge=item.ChargesAmount,
            //            Qty=1,
            //            InvoiceNo=inv.InvoiceNo,        
            //        };
            //        objData.InvoiceDetails.Add(invdetail);
            //    }
            //    objData.SaveChanges();
            //}

            var admit = objData.PatientAdmitDetails.Where(p => p.AdmitId == model.AdmitId).FirstOrDefault();
            if (admit != null)
            {
                admit.IsDischarge = true;
                objData.SaveChanges();
            }
            response.Status = 1;
            return response;
        }
    }
}