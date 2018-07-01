using AyurvedicApp.Models.DataLayer;
using AyurvedicApp.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AyurvedicApp.Models.BusinessLayer
{
    public class NadiParikshaBLL
    {
        AyurvedApp objData = new AyurvedApp();

        public NadiParikshaBLL()
        {

        }

        internal NadiParikshaResponse Save(NadiParikshaRequest model)
        {
            NadiParikshaResponse response = new NadiParikshaResponse();
            //NadiParikshaViewModel modelnadi = model.NadiParikshaList.FirstOrDefault();
            var nadipariksha = new NadiPariksha()
            {
                Description= model.NadiPariksha.Description,
                ExamDate= model.NadiPariksha.ExamDate==null?DateTime.Now.Date:model.NadiPariksha.ExamDate,
                IsDelete=false,
                PatientId= model.NadiPariksha.PatientId, 
            };

            objData.NadiParikshas.Add(nadipariksha);
            objData.SaveChanges();

            foreach (var item in model.BaseList)
            {
                var nadiparikshadetail = new NadiParikshaDetail()
                {
                    DignosysId = 0,
                    IsDelete=false,
                    Result=item.Result,
                    NadiParikshaId=nadipariksha.NadiParikshaId,
                    BaseDignosysId= item.ParamId,
                };
                objData.NadiParikshaDetails.Add(nadiparikshadetail);
                if (item.SubDiagnosysList!=null)
                {
                    foreach (var npdetail in item.SubDiagnosysList)
                    {
                        var nadiparikshadetails = new NadiParikshaDetail()
                        {
                            DignosysId = npdetail.DignosysId,
                            IsDelete = false,
                            Result = npdetail.Result,
                            BaseDignosysId = item.ParamId,
                            NadiParikshaId = nadipariksha.NadiParikshaId,
                        };
                        objData.NadiParikshaDetails.Add(nadiparikshadetails);
                    }
                }
            }
            objData.SaveChanges();
            response.Status = 1;
            return response;
        }

        //public NadiParikshaResponse GetDignosysDetails()
        //{
        //    NadiParikshaResponse response = new NadiParikshaResponse();
        //    response.MainList = from tbl in objData.BaseDignosys
        //                            select new BaseDignosysViewModel
        //                            {
        //                                ParamId=tbl.ParamId,
        //                                IsDelete=tbl.IsDelete,
        //                                ParamName=tbl.ParamName,
        //                                DiagnosysList=(from tblD in objData.DignosysMasters
        //                                               where tblD.ParamId==tbl.ParamId
        //                                               select new DignosysMasterViewModel
        //                                               {
        //                                                   Description=tblD.Description,
        //                                                   DignosysId=tblD.DignosysId,
        //                                                   DignosysName=tblD.DignosysName,
        //                                                   IsDelete=tblD.IsDelete,
        //                                                   ParamId=tblD.ParamId,
        //                                               })
        //                            };


        //    return response;
        //}





        public NadiParikshaResponse GetNadiParikshaResult(int NadiParikshaId)
        {
            NadiParikshaResponse response = new NadiParikshaResponse();

            response.PatientDignosysList = (from tbl in objData.NadiParikshaDetails
                                            join tbln in objData.BaseDignosys
                                            on tbl.BaseDignosysId equals tbln.ParamId
                                            where tbl.DignosysId == 0
                                            && tbl.NadiParikshaId==NadiParikshaId
                                            select new NadiParikshaDetailViewModel
                                            {
                                                BaseDignosysId = tbl.BaseDignosysId,
                                                DignosysId = tbl.DignosysId,
                                                NadiParikshaId = tbl.NadiParikshaId,
                                                Result = tbl.Result,
                                                IsDelete = tbl.IsDelete,
                                                SRNo = tbl.SRNo,
                                                ParamName = tbln.ParamName,
                                            }).Union(from tbl in objData.NadiParikshaDetails
                                                     join tbln in objData.DignosysMasters
                                                     on tbl.DignosysId equals tbln.DignosysId
                                                     where tbl.DignosysId != 0
                                                     && tbl.NadiParikshaId == NadiParikshaId
                                                     select new NadiParikshaDetailViewModel
                                                     {
                                                         BaseDignosysId = tbl.BaseDignosysId,
                                                         DignosysId = tbl.DignosysId,
                                                         NadiParikshaId = tbl.NadiParikshaId,
                                                         Result = tbl.Result,
                                                         IsDelete = tbl.IsDelete,
                                                         SRNo = tbl.SRNo,
                                                         ParamName = tbln.DignosysName,
                                                     }).OrderBy(p=>p.DignosysId);
            return response;
        }

        public NadiParikshaResponse GetNadiParikshaDetails()
        {
            NadiParikshaResponse response = new NadiParikshaResponse();

            response.NadiParikshaList = (from tbl in objData.NadiParikshas
                                         join tblAdmit in objData.PatientAdmitDetails
                                         on tbl.PatientId equals tblAdmit.AdmitId
                                         join tblP in objData.PatientMasters
                                         on tblAdmit.PatientId equals tblP.PKId
                                         select new NadiParikshaViewModel()
                                         {
                                             NadiParikshaId = tbl.NadiParikshaId,
                                             PatientId = tblAdmit.AdmitId,
                                             ExamDate = tbl.ExamDate,
                                             IsDelete = tbl.IsDelete,
                                             Description = tbl.Description,
                                             PatientName = tblP.PatientName,
                                         });
            var list= (from tbl in objData.BaseDignosys
                               select new BaseDignosysViewModel
                               {
                                   ParamId = tbl.ParamId,
                                   IsDelete = tbl.IsDelete,
                                   ParamName = tbl.ParamName,
                               }).ToList();

            for (int i = 0; i < list.Count; i++)
            {
                long? ParamId = list[i].ParamId;
                list[i].DiagnosysList = (from tbls in objData.DignosysMasters
                                         where tbls.ParamId == ParamId
                                         select new DignosysMasterViewModel
                                         {
                                             Description = tbls.Description,
                                             DignosysId = tbls.DignosysId,
                                             DignosysName = tbls.DignosysName,
                                             IsDelete = tbls.IsDelete,
                                             ParamId = ParamId==null?0:ParamId.Value
                                         });
            }
            response.MainList = list.AsQueryable();
            

            PatientBLL objPatient = new PatientBLL();
            response.PatientList = objPatient.GetAdmitPatientList().AdmitPatientList;//.Where(p=>p.IsDischarge==false);

            response.Status = 1;
            return response;
        }
    }
}