AyurvadApp.factory('RugnapatrikaService', ['$http', function ($http) {
    var urlBase = GetVirtualDirectory();
    var ReportService = {};
    ReportService.GetDetails = function (Id) {
        if (Id===undefined) {
            Id=0
        }
        return $http.get(urlBase + "/Rugnapatrika/GetDetails?PKID=" + Id);
    };

    ReportService.GetAdmitPatientList = function (Id) {
        return $http.get(urlBase + "/Readmit/GetAdmitPatientList");
    };

    ReportService.GetPrescriptionResult = function (PrescriptionId) {
        return $http.get(urlBase + "/Readmit/GetPrescriptionResult?PrescriptionId=" + PrescriptionId);
    }

    ReportService.GetCharges = function (AdmitId) {
        return $http.get(urlBase + "/Readmit/GetCharges?AdmitId=" + AdmitId);
    }


    ReportService.Save = function (model, IsEdit) {
        //var list = BaseList;
        var url = urlBase + '/Readmit/Save';
        if (IsEdit == false) {
            url = urlBase + '/Readmit/Update';
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

    ReportService.Save = function (model) {
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: urlBase + "/Rugnapatrika/Save",
            headers: {
                'Content-Type': 'application/json;'
            },
            data: JSON.stringify(model),
        }
        return $http(req);
    };

    
    ReportService.SavePastIllness = function (model) {
        model = { AdmitId: $("#admitid").val(), OtherInformation: JSON.stringify(model) };
        var req = {
            method: 'POST',
            dataType: 'JSON',
            url: urlBase + "/PatientHistory/Save",
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

    $scope.Step = 1;
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
        IsIPD: false,
    }

    $scope.PatientHistory = {
        CanAbleToWalk: "true",
        CanAnybodyHelpHim: "true",
        TreatmentDetails: "Ayurved",
        WakeUpTime: "4to5",
        WakeUpHabbit: "1glass",
        WaterType: "hotwater",
        WithLemon: "WithLemon",
        JimTime: "१० ते २० मिनिटं",
        Cycle: "१० ते २० मिनिटं",
        YogaTime: "१० ते २० मिनिटं",
        OtherExerciseTime: "१० ते २० मिनिटं",
        Bath: "1",
        BathWater: "गरम पाणी",
        WorkingTime: "6 hr",
        WorkType: "बैठे",
        ComputerWork: "",
        ComputerWorkingTime: "",
        TypingWork: "",
        TypingWorkHour: "",
        TravellingDistance: "",
        Hungry: "लागली",
        MealTime: "नियमित",
        MorningMeal: "8 to 9",
        AfterNoonMeal: "12 to 1",
        EveningMeal: "5 to 6",
        NightMeal: "7 to 8",
        MealTimeTaken: "10 to 20 minute",
        IsPsychicAccident: "Yes",
        IsConscious: "Yes",
        Nature: "हळवा",
        Adjustment: "Yes",
        AdjustmentAffect: "Yes",
        CompareWithOthers: "Yes",
        Inferirity: "Yes",
        Addiction: "Yes",
        ToiletType: "Khada",
        ToiletWithBlood: "Yes",
        ToiletWithShame: "Yes",
        StomouchGas: "होतात",
        UrineSense: "Yes",
        UrineColor: "पिवळा",
        UrineWithBlood: "Yes",
        UrineFeelHot: "Yes",
        Sudor: "12Months",
        SudorWithDeodrant: "Yes",
        SudorOnDress: "Yes",
        SudorOnFeetAndHand: "Yes",
        MC: "started",
        MarritalStatus: "समाधान",
        Children: "मुले",
        SleepMode: "DreamSleep",
        SleepFail: "Yes",
        SleepOnDay: "Yes",
        SleepAfterMeal: "Tomuch",
        SleepHabbits: "EatingTeeth",
        DontWantToSleep: "Yes",
        EyeIssue: "TV",
        Exercise:"",
    }

    $scope.MainAdmitPatientList = [];

    //$scope.PatientList = [];

    $scope.PatientList = [];

    $scope.AdmitPatientList = [];
    $scope.SearchAdmitPatientList = [];

    $scope.SelectedProductType = 0;

    $scope.Details = true;
    $scope.Add = false;
    $scope.Edit = false;
    $scope.Report = false;

    //$scope.ErrorModel = { IsPatientName: false };
    //$scope.ErrorMessage = ""

    $scope.AdmitId = 0;
    //$scope.ProductId = 0;
    $scope.Paging = 10;
    $scope.CurruntIndex = 0;
    $scope.SelectedPatient = {};


    $scope.ReadmitModel = { AdmitId: 0, AdmitDate: "", Dignosys: "", PKId: 0, IsIPD: false };

    $scope.First = function () {
        $scope.CurruntIndex = 0;
        $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, 0);
    }

    $scope.Prev = function () {
        $scope.CurruntIndex = $scope.CurruntIndex - $scope.Paging;
        if ($scope.CurruntIndex >= 0) {
            $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.CurruntIndex = 0;
        }
    }

    $scope.Next = function () {
        $scope.CurruntIndex = $scope.CurruntIndex + $scope.Paging;
        if ($scope.CurruntIndex <= $scope.AdmitPatientList.length) {
            $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, $scope.CurruntIndex);
        }
        else {
            $scope.Last();
        }
    }


    $scope.AddNewUI = function (isedit) {
        //$("#ddlPType").val(0);
        $scope.ReadmitModel = { AdmitId: 0, AdmitDate: "", Dignosys: "", PatientId: 0 };
        $scope.PatientModel =
        {
            Address: "",
            AdmitDate: new Date(),
            BirthDate: new Date(),
            BirthTime: "",
            BloodGroup: "",
            ContactNo: "",
            Gender: "",
            EmailId: "",
            ReferenceDoctorName: "",
            RefContact: "",
            Weight: 0,
            Occupation: "",
            Address1: "",
            FatherOccupation: "",
            PKId: 0,
            Name: "",
            Qualification: "",
            IsIPD: false,
        }
        $scope.Details = false;
        $scope.Add = true;
        $scope.Edit = false;
        $scope.Report = false;
    }

    $scope.FilterList = function () {
        var reg = new RegExp($scope.Prefix.toLowerCase());
        $scope.AdmitPatientList = $scope.MainAdmitPatientList.filter(function (actype) {
            return (reg.test(actype.PatientName.toLowerCase()));
        });
        $scope.First();
    }

    $scope.Last = function () {
        var total = $scope.AdmitPatientList.length;
        var rem = parseInt($scope.AdmitPatientList.length) % parseInt($scope.Paging);
        var position = $scope.AdmitPatientList.length - $scope.Paging;
        if (rem > 0) {
            position = $scope.AdmitPatientList.length - rem;
        }
        $scope.CurruntIndex = position;
        $scope.SearchAdmitPatientList = $filter('limitTo')($scope.AdmitPatientList, $scope.Paging, position);
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
        
        $scope.PatientModel.BirthDate = $("#txtBirthDate").val();
        $scope.PatientModel.BirthTime = $("#txtBirthTime").val();
        $scope.PatientModel.AdmitDate = $("#txtAdmitDate").val();
        var urlBase = GetVirtualDirectory();
        ShowLoader();
        //window.location = urlBase + "/PatientHistory";
        RugnapatrikaService.Save($scope.PatientModel)
           .success(function (qualifications) {
               HideLoader();
               var objShowCustomAlert = new ShowCustomAlert({
                   Title: "",
                   Message: "Record saved successfully.",
                   Type: "alert",
                   OnOKClick: function () {
                       if ($scope.PatientModel.IsIPD) {
                           window.location = urlBase + "/PatientHistory/Index?AdmitId=" + qualifications.Id;
                       }
                       else {
                           window.location = urlBase + "/Prescription";
                       }
                   }
               });
               objShowCustomAlert.ShowCustomAlertBox();
           }).error(function (error) {
               HideLoader();
               findAndCallErrorBox("", response.data.Error.Message, "alert", null, null);
           });
        
    }

    $scope.SaveNext = function ()
    {
        $scope.Step++;
        switch ($scope.Step) {
            case 1:
                $("#step1").show();
                $("#step2").hide();
                $("#step3").hide();
                $("#step4").hide();
                $("#step5").hide();
                break;
            case 2:
                var scroll = $(window).scrollTop();
                $("body").scrollTop(scroll);
                $("#step1").hide();
                $("#step2").show();
                $("#step3").hide();
                $("#step4").hide();
                $("#step5").hide();
                break;
            case 3:
                var scroll = $(window).scrollTop();
                $("body").scrollTop(scroll);
                $("#step1").hide();
                $("#step2").hide();
                $("#step3").show();
                $("#step4").hide();
                $("#step5").hide();
                break;
            case 4:
                $("#step1").hide();
                $("#step2").hide();
                $("#step3").hide();
                $("#step4").show();
                $("#step5").hide();
                break;
            case 5:
                $("#step1").hide();
                $("#step2").hide();
                $("#step3").hide();
                $("#step4").hide();
                $("#step5").show();
                break;
            case 6:
                ShowLoader();
                //window.location = urlBase + "/PatientHistory";
                RugnapatrikaService.SavePastIllness($scope.PatientHistory)
                   .success(function (qualifications) {
                       var urlBase = GetVirtualDirectory();
                       HideLoader();
                       var objShowCustomAlert = new ShowCustomAlert({
                           Title: "",
                           Message: "Record saved successfully.",
                           Type: "alert",
                           OnOKClick: function () {
                               window.location = urlBase + "/Prescription";
                           }
                       });
                       objShowCustomAlert.ShowCustomAlertBox();
                   }).error(function (error) {
                       HideLoader();
                       var objShowCustomAlert = new ShowCustomAlert({
                           Title: "",
                           Message: "Record Not saved.",
                           Type: "alert",
                           OnOKClick: function () {
                               window.location = urlBase + "/Dashboard";
                           }
                       });
                       objShowCustomAlert.ShowCustomAlertBox();
                   });
                break;
        }
        
    }

    function GetAdmitPatientList() {
        ShowLoader();
        RugnapatrikaService.GetAdmitPatientList()
           .success(function (qualifications) {
               $scope.Details = true;
               $scope.Add = false;
               $scope.Edit = false;
               $scope.Report = false;
               $scope.PatientList = qualifications.PatientList;

               //$("#txtExamDate").val("");
               var patient = { PKId: 0, Name: "---Select Patient---" };
               $scope.PatientList.splice(0, 0, patient);
               $scope.MainAdmitPatientList = qualifications.AdmitPatientList;
               $scope.AdmitPatientList = qualifications.AdmitPatientList;
               $scope.SelectedPatient = patient;

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
                minTime: '1',
                maxTime: '23:59pm',
                defaultTime: '11',
                startTime: '10:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
            });
            $scope.Step = 1;
            $("#step1").show();
            $("#step2").hide();
            $("#step3").hide();
            $("#step4").hide();
            $("#step5").hide();
        });
        GetAdmitPatientList();

    }

    $scope.init();

}]);