using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;

namespace AyurvedicApp.Models.BusinessLayer
{

    public class PatientBLL
    {
        AyurvedApp objData = new AyurvedApp();

        public PatientResponse Save(PatientViewModel model)
        {
            PatientResponse response = new PatientResponse() { Status=0,ErrorMessage="Record not saved."};
            var patient = new PatientMaster()
            {
                Address = model.Address,
                AdminDate=model.AdmitDate,
                BirthDate=model.BirthDate,
                BirthTime=model.BirthTime,
                BloodGroup=model.BloodGroup,
                ContactNo=model.ContactNo,
                Gender=model.Gender,
                EmailId=model.EmailId,
                ReferedBy=model.ReferenceDoctorName,
                RefContact=model.RefContact,
                Weight=model.Weight,
                Occupation=model.Occupation,
                Address1=model.Address1,
                FatherOccupation=model.FatherOccupation,
                PatientName=model.Name,
                Qualification = model.Qualification,
                IsDelete=false,
            };

            objData.PatientMasters.Add(patient);

            objData.SaveChanges();
            

            var Admit = new PatientAdmitDetail()
            {
                AdmitDate=model.AdmitDate,
                PatientId=patient.PKId,
                IsDischarge=false,
                OPDIPD=model.IsIPD!=null?(model.IsIPD.Value?"IPD":"OPD"):"OPD",
                Dignosys = model.Dignosys,
                FolloUpDate = model.FollowUpDate
            };

            objData.PatientAdmitDetails.Add(Admit);
            objData.SaveChanges();
            response.Id = Admit.AdmitId;

            if (model.ChargeList.Count > 0)
            {
                Invoice inv = new Invoice() { AdmitId = Admit.AdmitId, InvoiceDate = model.AdmitDate, Amount = model.ChargeList.Sum(p => p.ChargesAmount) };
                inv.NetAmount = inv.Amount - (inv.Discount == null ? 0 : inv.Discount);
                objData.Invoices.Add(inv);
                objData.SaveChanges();
                foreach (var item in model.ChargeList)
                {
                    InvoiceDetail invdetail = new InvoiceDetail()
                    {
                        Amount = item.ChargesAmount,
                        ChargeId = item.ChargeId,
                        Charge = item.ChargesAmount,
                        Qty = 1,
                        InvoiceNo = inv.InvoiceNo,
                    };
                    objData.InvoiceDetails.Add(invdetail);
                }
                objData.SaveChanges();

                var patientReceipt = new Receipt()
                {
                    AdmitId = Admit.AdmitId,
                    Amount = model.ChargeList.Sum(p => p.ChargesAmount),
                    Description = "",
                    ReceiptDate = model.AdmitDate == null ? DateTime.Now.Date : model.AdmitDate,
                    //ReceiptNo = entProduct.ReceiptNo,
                    IsDelete = false,
                };

                objData.Receipts.Add(patientReceipt);
                objData.SaveChanges();
            }

            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public PatientResponse Save(PatientPastIllness model)
        {
            PatientResponse response = new PatientResponse() { Status = 0, ErrorMessage = "Record not saved." };
            objData.PatientPastIllnesses.Add(model);
            objData.SaveChanges();
            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public PatientResponse Save(AdmitViewModel model)
        {
            PatientResponse response = new PatientResponse() { Status = 0, ErrorMessage = "Record not saved." };

            var Admit = new PatientAdmitDetail()
            {
                AdmitDate = model.AdmitDate==null?DateTime.Now.Date:model.AdmitDate,
                PatientId = model.PatientId,
                IsDischarge = false,
                OPDIPD = model.IsIPD != null ? (model.IsIPD.Value ? "IPD" : "OPD") : "OPD",
                FolloUpDate=model.FollowUpDate,
                Dignosys=model.Dignosys,
            };

            objData.PatientAdmitDetails.Add(Admit);
            objData.SaveChanges();
            if (model.ChargeList.Count > 0)
            {
                Invoice inv = new Invoice() { AdmitId = Admit.AdmitId, InvoiceDate = model.AdmitDate, Amount = model.ChargeList.Sum(p => p.ChargesAmount) };
                inv.NetAmount = inv.Amount - (inv.Discount == null ? 0 : inv.Discount);
                objData.Invoices.Add(inv);
                objData.SaveChanges();
                foreach (var item in model.ChargeList)
                {
                    InvoiceDetail invdetail = new InvoiceDetail()
                    {
                        Amount = item.ChargesAmount,
                        ChargeId = item.ChargeId,
                        Charge = item.ChargesAmount,
                        Qty = 1,
                        InvoiceNo = inv.InvoiceNo,
                    };
                    objData.InvoiceDetails.Add(invdetail);
                }
                objData.SaveChanges();

                var patientReceipt = new Receipt()
                {
                    AdmitId = Admit.AdmitId,
                    Amount = model.ChargeList.Sum(p => p.ChargesAmount),
                    Description = "",
                    ReceiptDate = model.AdmitDate == null ? DateTime.Now.Date : model.AdmitDate,
                    //ReceiptNo = entProduct.ReceiptNo,
                    IsDelete = false,
                };

                objData.Receipts.Add(patientReceipt);
                objData.SaveChanges();
            }

            response.Status = 1;
            response.ErrorMessage = "Record saved successfully.";
            return response;
        }

        public PatientResponse Update(PatientViewModel model)
        {
            PatientResponse response = new PatientResponse() { Status = 0, ErrorMessage = "Record not saved." };
            var patient = objData.PatientMasters.Where(p => p.PKId == model.PKId).FirstOrDefault();
            if (patient != null)
            {
                patient.Address = model.Address;
                patient.AdminDate = model.AdmitDate;
                patient.BirthDate = model.BirthDate;
                patient.BirthTime = model.BirthTime;
                patient.BloodGroup = model.BloodGroup;
                patient.ContactNo = model.ContactNo;
                patient.Gender = model.Gender;
                patient.EmailId = model.EmailId;
                patient.ReferedBy = model.ReferenceDoctorName;
                patient.RefContact = model.RefContact;
                patient.Weight = model.Weight;
                patient.Occupation = model.Occupation;
                patient.Address1 = model.Address1;
                patient.FatherOccupation = model.FatherOccupation;
                patient.PatientName = model.Name;
                patient.Qualification = model.Qualification;
                //objData.PatientMasters.Add(patient);
                objData.SaveChanges();
                response.Id = patient.PKId;
            }
            
            response.Status = 1;
            response.ErrorMessage = "Record updated successfully.";
            return response;
        }

        public PatientResponse GetAdmitPatientList(int Id = 0,bool IsDischarge=false)
        {
            PatientResponse response = new PatientResponse() { Status = 0, ErrorMessage = "Patient list is empty." };
            response.AdmitPatientList = from model in objData.PatientMasters
                                   join tbladmit in objData.PatientAdmitDetails
                                   on model.PKId equals tbladmit.PatientId
                                   where model.IsDelete == false
                                   && tbladmit.IsDischarge== IsDischarge
                                   orderby tbladmit.AdmitDate descending
                                        select new AdmitViewModel()
                                   {
                                       Address = model.Address,
                                       AdmitDate = model.AdminDate,
                                       ContactNo = model.ContactNo,
                                       EmailId = model.EmailId,
                                       PatientId = model.PKId,
                                       PatientName = model.PatientName,
                                       AdmitId=tbladmit.AdmitId,
                                       IsDischarge=tbladmit.IsDischarge,
                                       Dignosys=model.Dignosys,
                                       Name=model.PatientName,
                                       OPDIPD=tbladmit.OPDIPD,
                                       FollowUpDate=tbladmit.FolloUpDate
                                     };

            response.PatientList = from model in objData.PatientMasters
                                   where model.IsDelete == false
                                   select new PatientViewModel()
                                   {
                                       Address = model.Address,
                                       AdmitDate = model.AdminDate,
                                       BirthDate = model.BirthDate,
                                       BirthTime = model.BirthTime,
                                       BloodGroup = model.BloodGroup,
                                       ContactNo = model.ContactNo,
                                       Gender = model.Gender,
                                       EmailId = model.EmailId,
                                       ReferenceDoctorName = model.ReferedBy,
                                       RefContact = model.RefContact,
                                       Weight = model.Weight,
                                       Occupation = model.Occupation,
                                       Address1 = model.Address1,
                                       FatherOccupation = model.FatherOccupation,
                                       PKId = model.PKId,
                                       Name = model.PatientName,
                                       Qualification = model.Qualification
                                   };
            response.ChargeList = from tbl in objData.Charges
                                  where tbl.IsDelete == false
                                  select new ChargeViewModel() {
                                      ChargeId=tbl.ChargeId,
                                      ChargeName=tbl.ChargeName, 
                                      ChargesAmount=tbl.ChargeAmount,
                                      IsConsultingCharges=tbl.IsConsultingCharges,
                                      IsDelete=tbl.IsDelete,
                                      IsBedCharges=tbl.IsBedCharges,
                                  };
            return response;
        }
        

        public PatientResponse GetPatientList(int Id=0)
        {
            PatientResponse response = new PatientResponse() { Status = 0, ErrorMessage = "Patient list is empty." };
            response.PatientList=from model in objData.PatientMasters
                                 where model.IsDelete==false
                                 select new PatientViewModel()
                                 {
                                     Address = model.Address,
                                     AdmitDate = model.AdminDate,
                                     BirthDate = model.BirthDate,
                                     BirthTime = model.BirthTime,
                                     BloodGroup = model.BloodGroup,
                                     ContactNo = model.ContactNo,
                                     Gender = model.Gender,
                                     EmailId = model.EmailId,
                                     ReferenceDoctorName = model.ReferedBy,
                                     RefContact = model.RefContact,
                                     Weight = model.Weight,
                                     Occupation = model.Occupation,
                                     Address1 = model.Address1,
                                     FatherOccupation = model.FatherOccupation,
                                     PKId=model.PKId,
                                     Name=model.PatientName,
                                     Qualification=model.Qualification
                                 };
            return response;
        }
    }
}