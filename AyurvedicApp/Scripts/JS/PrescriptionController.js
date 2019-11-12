AyurvadApp.factory('Prescription', ['$http', function ($http) {

    var urlBase = GetVirtualDirectory();
    var ReportService = {};

    ReportService.GetPrescriptionDetails = function (Id) {
        return $http.get(urlBase + "/Prescription/GetPrescriptionDetails");
    };

    ReportService.GetPrescriptionResult = function (PrescriptionId) {
        return $http.get(urlBase + "/Prescription/GetPrescriptionResult?PrescriptionId=" + PrescriptionId);
    }

    ReportService.GetCharges = function (AdmitId)
    {
        return $http.get(urlBase + "/Prescription/GetCharges?AdmitId=" + AdmitId);
    }


    ReportService.Save = function (model, IsEdit) {
        //var list = BaseList;
        var url = urlBase + '/Prescription/Save';
        if (IsEdit == false) {
            url = urlBase + '/Prescription/Update';
        }
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: url,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            data: model,
        }
        return $http(req);
    };

    return ReportService;
}]);
AyurvadApp.controller("PrescriptionController", ['$scope', '$http', '$filter', '$rootScope', 'Prescription', function ($scope, $http, $filter, $rootScope, Prescription) {

    $scope.ProductList = [];
    $scope.MainPrescriptionList = [];

    $scope.PatientList = [];

    $scope.PrescriptionList = [];
    $scope.SearchPrescriptionList = [];

    $scope.SelectedProductType = 0;

    $scope.Details = true;
    $scope.Add = false;
    $scope.Edit = false;
    $scope.Report = false;

    $scope.ErrorModel = { IsPatientName: false, IsUOM: false, IsQty: false, IsProductName: false };
    $scope.ErrorMessage = ""

    $scope.PrescriptionId = 0;
    $scope.ProductId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.SelectedPatient = {};

    $scope.SelectedProduct = {};

    $scope.PrescriptionModel = { Prescription_Id: 0, Prescription_Date: "", AdmitId: 0, Description: "", FollowUpDate :""};

    

    $scope.PrescriptionResult = {};

    $scope.PrescriptionDetailsList = [];

    $scope.ChargesList = [];

    $scope.ContentList = [];

    $scope.Prefix = "";

    $scope.ChargeAmount = 0;

    $scope.GetCharges = function (Patient)
    {
        ShowLoader();
        Prescription.GetCharges(Patient.AdmitId)
           .success(function (response) {
               HideLoader();
               $scope.ChargesList.push(response);
               angular.forEach($scope.ChargesList, function (value, key) {
                   $scope.ChargeAmount += value.ChargesAmount;
               });
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    
    $scope.PrescriptionDetails = {
        PrescriptionDetailId: 0, ProductId: 0, MedicineName: "",
        IsBeforeLunch: false, Morning: "", Afternoon: "", Night: "", NoOfDays: "", Quantity: "",
        ContentWith:0
    };

    $scope.Save = function ()
    {
        var flag = true;
        if ($scope.SelectedPatient.AdmitId=="0") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select Patient Name",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            flag = false;
        }
        else {
            flag = true;
        }
        if ($scope.PrescriptionDetailsList.length==0) {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please Add Product.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
        }
        else {
            flag = true;
        }
        if (flag) {
            $scope.PrescriptionModel.AdmitId = $scope.SelectedPatient.AdmitId;
            $scope.PrescriptionModel.Prescription_Date = $("#txtExamDate").val();
            $scope.PrescriptionModel.PrescriptionDetails = $scope.PrescriptionDetailsList;
            $scope.PrescriptionModel.ChargeList = $scope.ChargesList;
            //var model = { Prescription: $scope.PrescriptionModel };
            ShowLoader();
            Prescription.Save($scope.PrescriptionModel)
               .success(function (qualifications) {
                   HideLoader();
                   var objShowCustomAlert = new ShowCustomAlert({
                       Title: "",
                       Message: "Records saved successfully.",
                       Type: "alert",
                   });
                   objShowCustomAlert.ShowCustomAlertBox();
                   
                   GetPrescriptionDetails();

               }).error(function (error) {
                   HideLoader();
                   var objShowCustomAlert = new ShowCustomAlert({
                       Title: "",
                       Message: "Records not found.",
                       Type: "alert",
                   });
                   objShowCustomAlert.ShowCustomAlertBox();
               });
        }
    }

    $scope.CancelClick = function () {
        $scope.Details = true;
        $scope.Add = false;
        $scope.Edit = false;
        $scope.Report = false;
        $scope.GetPrescriptionDetails();
    }

    

    $scope.IsDisable = false;

    $scope.SavePrescription = function ()
    {
        $scope.IsDisable = true;
        var flag = true;
        if ($scope.PrescriptionDetails.Morning=="" && $scope.PrescriptionDetails.Night=="" && $scope.PrescriptionDetails.Afternoon=="") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please Fill Morning/Afternoon or Evening quantity.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            flag = false;
        }
        else {
            $scope.PrescriptionDetails.Morning == "" ? 0 : $scope.PrescriptionDetails.Morning;
            $scope.PrescriptionDetails.Night == "" ? 0 : $scope.PrescriptionDetails.Night;
            $scope.PrescriptionDetails.Afternoon == "" ? 0 : $scope.PrescriptionDetails.Afternoon;
            //flag = true;
            $scope.PrescriptionDetails.ContentWith = $scope.SelectedContent.ContentId;
        }
        if ($scope.PrescriptionDetails.NoOfDays == "" && $scope.PrescriptionDetails.Quantity == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please Fill No of days or quantity.",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            flag = false;
        } else {
            $scope.PrescriptionDetails.NoOfDays == "" ? 0 : $scope.PrescriptionDetails.NoOfDays;
            $scope.PrescriptionDetails.Quantity == "" ? 0 : $scope.PrescriptionDetails.Quantity;
            //flag = true;
        }
        if ($scope.SelectedProduct.ProductId == "0") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select Product Name",
                Type: "alert",
            });
            objShowCustomAlert.ShowCustomAlertBox();
            flag = false;
        } else {
            //flag = true;
        }
        if (flag) {
            $scope.IsDisable = false;
            $scope.PrescriptionDetails.ProductId = $scope.SelectedProduct.ProductId;
            var pelement = $scope.ProductList.filter(function (actype) {
                return (actype.ProductId === $scope.SelectedProduct.ProductId);
            });
            $scope.PrescriptionDetails.ProductName = pelement[0].ProductName;
            if ($scope.PrescriptionDetailsList.length == 0) {
                $scope.PrescriptionDetailsList.push($scope.PrescriptionDetails);
                $scope.PrescriptionDetails = { PrescriptionDetailId: 0, ProductId: 0, MedicineName: "", IsBeforeLunch: false, Morning: "", Afternoon: "", Night: "", NoOfDays: "", Quantity: "" };
                $scope.SelectedProduct = { ProductId: 0, ProductName: "---Select Product----" };
            }
            else {
                var element = $scope.PrescriptionDetailsList.filter(function (actype) {
                    return (actype.ProductId === $scope.SelectedProduct.ProductId);
                });
                if (element!==undefined){
                    $scope.PrescriptionDetailsList.push($scope.PrescriptionDetails);
                    $scope.PrescriptionDetails = { PrescriptionDetailId: 0, ProductId: 0, MedicineName: "", IsBeforeLunch: false, Morning: "", Afternoon: "", Night: "", NoOfDays: "", Quantity: "" };
                    $scope.SelectedProduct = {ProductId:0,ProductName:"---Select Product----"};
                }
                else {
                    var objShowCustomAlert = new ShowCustomAlert({
                        Title: "",
                        Message: "Same product already exist.",
                        Type: "alert",
                    });
                    objShowCustomAlert.ShowCustomAlertBox();
                }
            }
        }
        
    }

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchPrescriptionList = $filter('limitTo')($scope.PrescriptionList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.PrescriptionList.length) {
            $scope.SearchPrescriptionList = $filter('limitTo')($scope.PrescriptionList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }

    $scope.GetPrescriptionResult = function (PrescriptionId) {
        ShowLoader();
        Prescription.GetPrescriptionResult(PrescriptionId)
           .success(function (response) {
               HideLoader();
               $scope.Details = false;
               $scope.Add = false;
               $scope.Edit = false;
               $scope.Report = true;
               $scope.PrescriptionResult = response.Prescription;
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.PrescriptionList = $scope.MainPrescriptionList.filter(function (actype) {
            return (reg.test(actype.PatientName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Last = function () {
        var total = $scope.PrescriptionList.length;
        var rem = parseInt($scope.PrescriptionList.length) % parseInt($scope.Paging);
        var position = $scope.PrescriptionList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.PrescriptionList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchPrescriptionList = $filter('limitTo')($scope.PrescriptionList, $scope.Paging, position);
    }

    function GetPrescriptionDetails() {
        ShowLoader();
        Prescription.GetPrescriptionDetails()
           .success(function (qualifications) {
               $scope.Details = true;
               $scope.Add = false;
               $scope.Edit = false;
               $scope.Report = false;
               $scope.PatientList = qualifications.PatientList;
               $("#txtExamDate").val("");
               var patient = { AdmitId: 0, Name: "---Select Patient---" };
               $scope.PatientList.splice(0, 0, patient);
               $scope.ProductList = qualifications.ProductList;
               $scope.MainPrescriptionList = qualifications.PrescriptionList;
               $scope.PrescriptionList = qualifications.PrescriptionList;
               $scope.SelectedPatient = patient;
               var product = { ProductId: 0, ProductName: "---Select Product---" };
               $scope.ProductList.splice(0, 0, product);
               $scope.SelectedProduct = product;
               $scope.First();
               HideLoader();
           }).error(function (error) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Records not found.",
                   Type: "alert",
               });
               objShowCustomAlert.ShowCustomAlertBox();
           });
    }

    $scope.AddNewUI = function (isedit) {
        //$("#ddlPType").val(0);
        $scope.PrescriptionModel = { PrescriptionId: 0, Prescription_Date: "", AdmitId: 0, Description:"" };
        $("#txtExamDate").val("");
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
        $scope.Report = false;
    }

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchPrescriptionList = $filter('limitTo')($scope.PrescriptionList, $scope.Paging, 0);
    }

    $scope.SelectedContent = {};

    $scope.init = function ()
    {
        var model1 = { ContentId: 0, ContentWith: "---Select With Content---" };

        $scope.ContentList.push(model1);
        var model = { ContentId: 1, ContentWith: "With Water" };
        $scope.ContentList.push(model);
        model = { ContentId: 2, ContentWith: "With Honey" };
        $scope.ContentList.push(model);
        model = { ContentId: 3, ContentWith: "With Milk" };
        $scope.ContentList.push(model);
        $scope.SelectedContent = model1;
        $(document).ready(function () {
            $('#txtExamDate').datetimepicker({
                timepicker: false,
                format: 'Y/m/d'
            });
        });
        GetPrescriptionDetails();
    }

    $scope.init();

}]);