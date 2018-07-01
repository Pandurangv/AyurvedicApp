AyurvadApp.factory('RugnapatrikaService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.GetDetails = function (Id) {
        if (Id===undefined) {
            Id=0
        }
        return $http.get(urlBase + "/Rugnapatrika/GetDetails?PKID=" + Id);
    };

    ReportService.Save = function (model) {
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: urlBase + "/Rugnapatrika/Save",
            headers: {
                'Content-Type': 'application/json;'
            },
            data: model,
        }
        return $http(req);
    };

    //ReportService.MarriageDone = function (UserId) {
    //    return $http.post(urlBase + "/Rugnapatrika/MarriageDone", { UserId: UserId });
    //};

    //ReportService.SendSMS = function (UserId) {
    //    return $http.post(urlBase + "/Rugnapatrika/SendSMS", { UserId: UserId });
    //};

    return ReportService;
}]);

AyurvadApp.controller("RugnapatrikaController", ['$scope', '$http', '$filter', '$rootScope', 'RugnapatrikaService', function ($scope, $http, $filter, $rootScope, RugnapatrikaService) {

    $scope.ErrorDetails =
        {
            ErrorMessage: "",
            IsName: false,
            IsContact: false,
            IsGender: false,
            IsBirthDate: false,
            IsBirthTime: false,
        };


    $scope.PatientModel =
    {
        Address : "",
        AdmitDate : new Date(),
        BirthDate : new Date(),
        BirthTime : "",
        BloodGroup : "",
        ContactNo : "",
        Gender : "",
        EmailId : "",
        ReferenceDoctorName : "",
        RefContact : "",
        Weight : 0,
        Occupation : "",
        Address1 : "",
        FatherOccupation : "",
        PKId:0,
        Name: "",
        Qualification:"",

    }

    $scope.Save = function ()
    {
        if ($scope.PatientModel.Name=="") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please fill name.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        if ($scope.PatientModel.ContactNo == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please fill Contact No.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        if ($scope.PatientModel.Gender == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please fill Gender.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        if ($("#txtBirthDate").val() == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select Date of Birth.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        if ($("#txtBirthTime").val() == "") {
            var objShowCustomAlert = new ShowCustomAlert({
                Title: "",
                Message: "Please select Time of birth.",
                Type: "alert"
            });
            objShowCustomAlert.ShowCustomAlertBox();
            return false;
        }
        $scope.PatientModel.BirthDate = $("#txtBirthDate").val();
        $scope.PatientModel.BirthTime = $("#txtBirthTime").val();
        $scope.PatientModel.AdmitDate = $("#txtAdmitDate").val();
        var urlBase = GetVirtualDirectory();
        ShowLoader();
        
        RugnapatrikaService.Save($scope.PatientModel)
           .success(function (qualifications) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record saved successfully.",
                   Type: "alert",
                   OnOKClick: function () {
                       window.location = urlBase + "/Dashboard";
                   }
               });
               objShowCustomAlert.ShowCustomAlertBox();
           }).error(function (error) {
               HideLoader();
               findAndCallErrorBox("", response.data.Error.Message, "alert", null, null);
           });
        
    }

    $scope.init = function () {
        
        $(document).ready(function () {
            $('#txtAdmitDate').datetimepicker({
                timepicker: false,
                format: 'Y/m/d'
            });
            $('#txtBirthDate').datetimepicker({
                timepicker: false,
                format: 'Y/m/d'
            });
            $('#txtBirthTime').timepicker({
                timeFormat: 'h:mm p',
                interval: 1,
                minTime: '10',
                maxTime: '6:00pm',
                defaultTime: '11',
                startTime: '10:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
        });
    }

    $scope.init();

}]);