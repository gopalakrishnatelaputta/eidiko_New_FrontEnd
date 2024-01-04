
import Forgot from "./Pages/user-module/Forgot"
import Login from "./Pages/user-module/Login";
import { Route,Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Profile from "./Pages/user-module/Profile";
import ResponsiveAppBar from "./Components/Navbar/Navbar";
import Homepage from "./Pages/Home-module/homepage";
import UserRoute from "./Pages/user-module/UserRoute";
import { theme } from "./Components/stylecomponent/theme";
import CreateEmployee from "./Pages/Employee/CreateEmployee";
import { ThemeProvider } from "@emotion/react";
import WorkInfo from "./Pages/User-Information/CreationPages/WorkInfo";
import ShiftTimings from "./Pages/User-Information/CreationPages/ShiftTimings";
import ReportingManager from "./Pages/User-Information/CreationPages/ReportingManager";
import ResetPassword from "./Pages/user-module/ResetPassword";
import DataUpload from "./Pages/BiometricTables/DataUpload";
import Loading from "./Components/LoadingComponent/Loading";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Employees from "./Pages/Employee/Employees";
import Employee from "./Pages/Employee/Employee";
import DailyReport from "./Pages/TaskDetails/DailyReport";
import ReportingMangr from "./Pages/User-Information/Tables/ReportingMangr";
import EmpShiftTime from "./Pages//User-Information/Tables/EmpShiftTime";
import EmpWorkLocation from "./Pages//User-Information/Tables/EmpWorkLocation";
import { TaskStatus} from "./Pages/TaskDetails/TaskStatus";
import {VerificationPending} from "./Pages/TaskDetails/VerificationPending"
import {Errorr} from "./Components/error/Errorr";
import BiometricTable from "./Pages/BiometricTables/BiometricTable";
import { BiometricSearch } from "./Pages/BiometricTables/BiometricSearch";
import TaskDetailsElaborately from "./Components/TaskComponent/TaskDetailsElaborately";
import EmpShiftTimingfromProfileData from "../src/Pages/Access-Level-Pages/Tables-EmployeeDataFromProfile/EmpShiftTimingfromProfileData"
import EmpWorkLocationFromProfile from "../src/Pages/Access-Level-Pages/Tables-EmployeeDataFromProfile/EmpWorkLocationFromProfile"
import ReportingManagerFromProfileData from "../src/Pages/Access-Level-Pages/Tables-EmployeeDataFromProfile/ReportingManagerFromProfileData"
import AccessReportingManager from "./Pages/Access-Level-Pages/Creation-Pages/AccessReportingManager";
import AccessShiftTimings from "./Pages/Access-Level-Pages/Creation-Pages/AccessShiftTimings";
import AccessWorkInfo from "./Pages/Access-Level-Pages/Creation-Pages/AccessWorkInfo";
import BiometricTableAterClickingView from "./Pages/BiometricTables/BiometricTableAfterClickingView";
import { EmpTaskDetails } from "./Pages/TaskDetails/EmpTaskDetails";
import EmpBioTableAfterClickingView from "./Pages/BiometricTables/EmpBioTableAfterClickingView";
import EmpTaskDetailsElaborately from "./Components/TaskComponent/EmpTaskDetailsElaborately"
import EmpAccess from "./Pages/AccessTables/EmpAccess";
import LeaveDataUpload from "./Pages/Leaves/LeaveDataUpload";
import ReportingEmpProfile from "./Pages/ReportingManager/ReportingEmpProfile";
import { ReportingEmployees } from "./Pages/ReportingManager/ReportingEmployees";
import LeavesReport from "./Pages/Leaves/LeavesReport";
import EmployeeLeaveSpent from "./Pages/Leaves/EmployeeLeaveSpent";
import EmployeeLeaveSpentAfterRowClick from "./Pages/Leaves/EmployeeleavesAfterRowClick";
import LeavesAsPerBand from "./Pages/Leaves/LeavesAsPerBand";
import {  BiometricReportDetails } from "./Pages/BiometricTables/BiometricReportDetails";
import {BiometricReport1} from "./Pages/BiometricTables/BiometricReport1";
import AccessLevelMissingReportSearch from "./Pages/BiometricTables/MissingReports/AccessLevelMissingReportSearch";
import AccessLevelMissingReports from "./Pages/BiometricTables/MissingReports/AccesslLevelMissingReports";
import CreateWarningMailsPage from "./Pages/WarningMails/CreateWarningMails";
import WarningMailSerach from "./Pages/WarningMails/WarningMailSearch";
import ParticularWarningMail from "./Pages/WarningMails/WarnigMaillTable";
import { AllWarningMailReportsWithSearch } from "./Pages/WarningMails/AllWarningMailReportsWithSearch";
import { EmpReviewRating } from "./Pages/Rating/EmpReviewRating";
import { EmpReviewModule } from "./Pages/Rating/EmpReviewModule";
import { AllEmpReviewRating } from "./Pages/Rating/AllEmpReviewRating";
import { EmpAccessModal } from "./Pages/AccessTables/EmpAccessModal";
import CreateReport from "./Pages/EmpSkillReport/CreateReport";
import { Skills } from "./Pages/EmpSkillReport/Skills";
import { EmployeeSkillsReport } from "./Pages/EmpSkillReport/EmployeeSkillsReport";
import { ReportingManagerCreateSkill } from "./Pages/EmpSkillReport/ReportingManagerCreateSkill";
import LeavesCreationPage from "./Pages/Leaves/LeaveCreation";
import TerminationTable from "./Pages/Employee/TerminatedEmployee/TerminationTable";
import { HolidayTable } from "./Pages/Holiday/HolidayTable";
import { HolidayEmp } from "./Pages/Holiday/HolidayEmp";


function App() {



  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/error" element={<Errorr/>}/>

        <Route path="/user" element={<UserRoute />}>
          <Route index path="profile" element={<Profile />} />
          <Route index path="create-employee" element={<CreateEmployee />} />
          <Route index path="workinfo" element={<WorkInfo />} />
          <Route index path="shift-timings" element={<ShiftTimings />} />
          <Route index path="reporting-manager" element={<ReportingManager></ReportingManager>}></Route>
          <Route index path="change-password" element={<ResetPassword />} />
          <Route index path="employees" element={<Employees />} />
          <Route index path=":id" element={<Employee />} />
          <Route index path="reporting-manager-data" element={< ReportingMangr />} />
          <Route index path="employee-shift-timing-data" element={< EmpShiftTime />} />
          <Route index path="employee-work-location-data" element={< EmpWorkLocation />} />
          <Route index path="daily-report" element={<DailyReport />} />
          <Route index path="ts" element={<TaskStatus/>}/>
          <Route index path="vp" element={<VerificationPending/>}/>
          <Route index path="biometric" element={<DataUpload />} />
          <Route index path="biometric-search" element={<BiometricSearch/>}/>
          <Route index path="task-details" element={<TaskDetailsElaborately/>}/>

          <Route index path="employee-shiftTiming-via-profile" element={<EmpShiftTimingfromProfileData/>}/>
          <Route index path="employee-workingLocation-via-profile" element={<EmpWorkLocationFromProfile/>}/>
          <Route index path="employee-reportingManager-via-profile" element={<ReportingManagerFromProfileData/>}/>
          <Route index path="access-level-reporting-manager-creation" element={<AccessReportingManager />} />
          <Route index path="access-level-shift-timing-creation" element={<AccessShiftTimings />} />
          <Route index path="access-level-working-location-creation" element={<AccessWorkInfo />} />
          

          <Route index path="Biometric-Table-After-Clicking-View" element={<BiometricTableAterClickingView/>}/>
          <Route index path="Biometric-Table-Data-Showing" element={<BiometricTable/>}/>
          <Route index path="emptaskstatus" element={<EmpTaskDetails/>}/> 


          {/* <Route index path="empbiometric" element={<EmpBiometricDetails />}/> */}

      
          <Route index path="Emp-Bio-Table-Ater-Clicking-View" element={<EmpBioTableAfterClickingView/>}/>

          <Route index path="emp-task-details" element={<EmpTaskDetailsElaborately/>}/>

          <Route index path="emp-access" element={<EmpAccess/>}/>
          <Route index path="Employee-access-creation-page" element={<EmpAccessModal/>}/>

          <Route index path="reporting-employees" element={<ReportingEmployees/>}/>
          <Route index path="report-emp" element={<ReportingEmpProfile/>}/>
          

          {/* leaves Routes */}

          <Route index path="Leaves-Data-upload" element={<LeaveDataUpload/>}/>
          <Route index path="All-employees-Leave-Report" element={<LeavesReport/>}/>
          <Route index path="employee-spent-leaves" element={<EmployeeLeaveSpent/>}/>
          <Route index path="employee-spent-after-row-click" element={<EmployeeLeaveSpentAfterRowClick/>}/>
          <Route index path="employee-leave-data-upload-as-per-band" element={<LeavesAsPerBand/>}/>
          <Route index path="employee-leave-creation-page" element={<LeavesCreationPage/>}/>



          <Route index path="empbiometric" element={<BiometricReport1/>} />
          <Route index path="biometric-report-details" element={<BiometricReportDetails/>}/>
          <Route index path="all-employee-biometric-missing-reports" element={<AccessLevelMissingReportSearch/>}/>
          <Route index path="employee-biometric-detailed-missing-reports" element={<AccessLevelMissingReports/>}/>



          {/* warning mails */}
          <Route index path="create-warning-mails" element={<CreateWarningMailsPage/>} />
          <Route index path="all-employees-warning-mails" element={<WarningMailSerach/>} />
          <Route index path="particular-employees-warning-mails" element={<ParticularWarningMail/>} />
          <Route index path="all-warning-mails-between-given-dates" element={<AllWarningMailReportsWithSearch/>} />


       {/* review rating pages */}
       <Route index path="Employee-review-rating-creation" element={<EmpReviewRating/>} />
       <Route index path="Employee-detailed-review-rating-table" element={<EmpReviewModule/>} />
       <Route index path="All-Employees-review-rating-table" element={<AllEmpReviewRating/>} />


{/* Emp Skills Report */}
<Route index path="create-skill-report" element={<CreateReport/>}/>
<Route index path="employee-skills-report" element={<Skills/>}/>
<Route index path="all-emp-skills" element={<EmployeeSkillsReport/>}/>
<Route index path="Skill-creation-via-reporting-manager" element={<ReportingManagerCreateSkill/>}/>
<Route index path="All-Employee-Termination-details" element={<TerminationTable/>}/>


{/* Holidays */}

<Route  index path="holiday" element={<HolidayTable/>}/>
<Route  index path="employee-Holiday" element={<HolidayEmp/>}/>

        </Route>

      </Routes>
    </BrowserRouter>
     
   
    </ThemeProvider>



  );
}

export default App;
