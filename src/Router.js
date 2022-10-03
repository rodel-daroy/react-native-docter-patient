// ====================== General Router Start =============================
import * as React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import ChatRoom from './containers/MainScreens/ChatRoom/ChatRoom';
// Auth - member
import LoginScreen from './containers/Auth/Login';
import RegisterScreen from './containers/Auth/Register';
import ProfileScreen from './containers/Auth/Profile';
import ChangePasswordScreen from './containers/Auth/ChangePassword';
// Auth - provider
import ProviderLoginScreen from './containers/Auth/Provider/ProviderLogin'
import ProviderRegisterScreen from './containers/Auth/Provider/ProviderRegister'
import ProviderProfileScreen from './containers/Auth/Provider/ProviderProfile'
import ProviderChangePasswordScreen from './containers/Auth/Provider/ProviderChangePassword'

import ForgotPasswordScreen from './containers/Auth/ForgotPassword'
// first page
import MainMenuScreen from './containers/MainScreens/Header/MainMenu';
import HomeScreen from './containers/MainScreens/HomeScreen';
import WhatCanWeDoScreen from './containers/MainScreens/WhatCanWeDo';
import WhatWeTreatScreen from './containers/MainScreens/WhatWeTreat';
import MemberScreen from './containers/MainScreens/Member';
import HowitWorksScreen from './containers/MainScreens/HowitWorks';
import SecondOptionScreen from './containers/MainScreens/SecondOption';
import PatientBenefitsScreen from './containers/MainScreens/PatientBenefits';
import ProviderScreen from './containers/MainScreens/Provider';
import ProviderBenefitsScreen from './containers/MainScreens/ProviderBenefits';
import OurProvidersScreen from './containers/MainScreens/OurProviders';
import ContactScreen from './containers/MainScreens/Contact';

// menu pages - member
import BookedAppointmentScreen from './containers/MainScreens/Member/Appointments/BookedAppointments';
import PreviousAppointmentScreen from './containers/MainScreens/Member/Appointments/PreviousAppointments';
import MedicalHistoriesScreen from './containers/MainScreens/Member/MedicalHistories';
import MedicalReportsScreen from './containers/MainScreens/Member/MedicalReports';
import MyPhotoScreen from './containers/MainScreens/Member/MyPhoto';
import PreferredPharmacyScreen from './containers/MainScreens/Member/PreferredPharmacy';
import PaymentScreen from './containers/MainScreens/Member/Payment';

// dashboard - member
import MemberFirstPageScreen from './containers/MainScreens/Member/MemberFirstPage';
import MemberVerifyPageScreen from './containers/MainScreens/Member/MemberVerifyPage';
import MemberAppointmentScreen from './containers/MainScreens/Member/MemberAppointment';
import MemberMyPatientScreen from './containers/MainScreens/Member/MyPatients';
import MemberMenuScreen from './containers/MainScreens/Menu/MemberMenu';
import PatientMenuScreen from './containers/MainScreens/Menu/PatientMenu';

import AppointmentTodayScreen from './containers/MainScreens/Member/AppointmentToday';
import SelectServiceTypeScreen from './containers/MainScreens/Member/SelectServiceType';
import ServiceListScreen from './containers/MainScreens/Member/ServiceList';
import PatientInfoScreen from './containers/MainScreens/Member/PatientInfomation';
import PatientImageScreen from './containers/MainScreens/Member/PatientImage';
import ReasonForTodayVisitScreen from './containers/MainScreens/Member/ReasonForTodayVisit';
import HaveSymptomsScreen from './containers/MainScreens/Member/HaveSymptoms';
import MedicalHistoryScreen from './containers/MainScreens/Member/MedicalHistory';
import SelectPharmacyScreen from './containers/MainScreens/Member/SelectPharmacy';
import ChooseDoctorScreen from './containers/MainScreens/Member/ChooseDoctor';
import AppointmentScheduleScreen from './containers/MainScreens/Member/AppointmentSchedule';
import PaymentInfomationScreen from './containers/MainScreens/Member/PaymentInfomation';
import PaymentSuccessScreen from './containers/MainScreens/Member/PaymentSuccess';
import PaymentFailedScreen from './containers/MainScreens/Member/PaymentFailed';
import RatingScreen from "./containers/MainScreens/Member/Rating";
import DoctorProfileViewScreen from "./containers/MainScreens/Member/DoctorProfileView";


// provider pages
import ProviderFirstPageScreen from "./containers/MainScreens/Provider/ProviderFirstPage"
import ProviderMenuScreen from "./containers/MainScreens/Menu/ProviderMenu"
import ProviderDashboardScreen from "./containers/MainScreens/Provider/ProviderDashboard"
import ProviderGeneralHealthScreen from "./containers/MainScreens/Provider/ProviderGeneralHealth"
import Provider2ndOptionScreen from "./containers/MainScreens/Provider/Provider2ndOption"
import ProviderPhotoScreen from "./containers/MainScreens/Provider/ProviderMyPhoto"
import ProviderBillingTransactionScreen from "./containers/MainScreens/Provider/ProviderBillingTransactions"
import ProviderPreviousAppointmentScreen from "./containers/MainScreens/Provider/ProviderPreviousAppointments"
import ProviderBookedAppointmentScreen from "./containers/MainScreens/Provider/ProviderBookedAppointments"

import LearnMoreScreen from "./containers/MainScreens/LearnMore/index"


class Routes extends React.Component {
  render() {
    return (  
      <Router>
        <Scene key = "root">
          <Scene key = "ChatRoom" hideNavBar = {true} component = {ChatRoom} />
          <Scene key = "LoginScreen" hideNavBar = {true} component = {LoginScreen} />
          <Scene key = "RegisterScreen" hideNavBar = {true} component = {RegisterScreen} />
          <Scene key = "ProfileScreen" hideNavBar = {true} component = {ProfileScreen} />
          <Scene key = "ChangePasswordScreen" hideNavBar = {true} component = {ChangePasswordScreen} />
          
          <Scene key = "ForgotPasswordScreen" hideNavBar = {true} component = {ForgotPasswordScreen} />

          <Scene key = "ProviderLoginScreen" hideNavBar = {true} component = {ProviderLoginScreen} />
          <Scene key = "ProviderRegisterScreen" hideNavBar = {true} component = {ProviderRegisterScreen} />
          <Scene key = "ProviderProfileScreen" hideNavBar = {true} component = {ProviderProfileScreen} />
          <Scene key = "ProviderChangePasswordScreen" hideNavBar = {true} component = {ProviderChangePasswordScreen} />


          <Scene key = "MainMenuScreen" hideNavBar = {true} component = {MainMenuScreen} />
          <Scene key = "HomeScreen" hideNavBar = {true}  initial component = {HomeScreen} />
          <Scene key = "WhatCanWeDoScreen" hideNavBar = {true} component = {WhatCanWeDoScreen} />
          <Scene key = "WhatWeTreatScreen" hideNavBar = {true} component = {WhatWeTreatScreen} />
          <Scene key = "MemberScreen" hideNavBar = {true} component = {MemberScreen} />
          <Scene key = "HowitWorksScreen" hideNavBar = {true} component = {HowitWorksScreen} />
          <Scene key = "SecondOptionScreen" hideNavBar = {true} component = {SecondOptionScreen} />
          <Scene key = "PatientBenefitsScreen" hideNavBar = {true} component = {PatientBenefitsScreen} />
          <Scene key = "ProviderScreen" hideNavBar = {true} component = {ProviderScreen} />
          <Scene key = "ProviderBenefitsScreen" hideNavBar = {true} component = {ProviderBenefitsScreen} />
          <Scene key = "OurProvidersScreen" hideNavBar = {true} component = {OurProvidersScreen} />
          <Scene key = "ContactScreen" hideNavBar = {true} component = {ContactScreen} />


          <Scene key = "BookedAppointmentScreen" hideNavBar = {true} component = {BookedAppointmentScreen} />
          <Scene key = "PreviousAppointmentScreen" hideNavBar = {true} component = {PreviousAppointmentScreen} />
          <Scene key = "MedicalHistoriesScreen" hideNavBar = {true} component = {MedicalHistoriesScreen} />
          <Scene key = "MedicalReportsScreen" hideNavBar = {true} component = {MedicalReportsScreen} />
          <Scene key = "MyPhotoScreen" hideNavBar = {true} component = {MyPhotoScreen} />
          <Scene key = "PreferredPharmacyScreen" hideNavBar = {true} component = {PreferredPharmacyScreen} />
          <Scene key = "PaymentScreen" hideNavBar = {true} component = {PaymentScreen} />


          <Scene key = "MemberFirstPageScreen" hideNavBar = {true} component = {MemberFirstPageScreen} />
          <Scene key = "MemberVerifyPageScreen" hideNavBar = {true} component = {MemberVerifyPageScreen} />
          <Scene key = "MemberAppointmentScreen" hideNavBar = {true} component = {MemberAppointmentScreen} />
          <Scene key = "MemberMyPatientScreen" hideNavBar = {true} component = {MemberMyPatientScreen} />
          <Scene key = "MemberMenuScreen" hideNavBar = {true} component = {MemberMenuScreen} />
          <Scene key = "PatientMenuScreen" hideNavBar = {true} component = {PatientMenuScreen} />
          {/* =================================================================================== */}
          <Scene key = "AppointmentTodayScreen" hideNavBar = {true} component = {AppointmentTodayScreen} />
          <Scene key = "SelectServiceTypeScreen" hideNavBar = {true} component = {SelectServiceTypeScreen} />
          <Scene key = "ServiceListScreen" hideNavBar = {true} component = {ServiceListScreen} />
          <Scene key = "PatientInfoScreen" hideNavBar = {true} component = {PatientInfoScreen} />
          <Scene key = "PatientImageScreen" hideNavBar = {true} component = {PatientImageScreen} />
          <Scene key = "ReasonForTodayVisitScreen" hideNavBar = {true} component = {ReasonForTodayVisitScreen} />
          <Scene key = "HaveSymptomsScreen" hideNavBar = {true} component = {HaveSymptomsScreen} />
          <Scene key = "MedicalHistoryScreen" hideNavBar = {true} component = {MedicalHistoryScreen} />
          <Scene key = "SelectPharmacyScreen" hideNavBar = {true} component = {SelectPharmacyScreen} />
          <Scene key = "ChooseDoctorScreen" hideNavBar = {true} component = {ChooseDoctorScreen} />
          <Scene key = "AppointmentScheduleScreen" hideNavBar = {true} component = {AppointmentScheduleScreen} />
          <Scene key = "PaymentInfomationScreen" hideNavBar = {true} component = {PaymentInfomationScreen} />
          <Scene key = "PaymentSuccessScreen" hideNavBar = {true} component = {PaymentSuccessScreen} />
          <Scene key = "PaymentFailedScreen" hideNavBar = {true} component = {PaymentFailedScreen} />
          <Scene key = "RatingScreen" hideNavBar = {true} component = {RatingScreen} />
          <Scene key = "DoctorProfileViewScreen" hideNavBar = {true} component = {DoctorProfileViewScreen} />

          
          <Scene key = "ProviderFirstPageScreen" hideNavBar = {true} component = {ProviderFirstPageScreen} />
          <Scene key = "ProviderDashboardScreen" hideNavBar = {true} component = {ProviderDashboardScreen} />
          <Scene key = "ProviderMenuScreen" hideNavBar = {true} component = {ProviderMenuScreen} />
          <Scene key = "ProviderPhotoScreen" hideNavBar = {true} component = {ProviderPhotoScreen} />
          <Scene key = "ProviderBillingTransactionScreen" hideNavBar = {true} component = {ProviderBillingTransactionScreen} />
          <Scene key = "ProviderPreviousAppointmentScreen" hideNavBar = {true} component = {ProviderPreviousAppointmentScreen} />
          <Scene key = "ProviderBookedAppointmentScreen" hideNavBar = {true} component = {ProviderBookedAppointmentScreen} />
          <Scene key = "ProviderGeneralHealthScreen" hideNavBar = {true} component = {ProviderGeneralHealthScreen} />
          <Scene key = "Provider2ndOptionScreen" hideNavBar = {true} component = {Provider2ndOptionScreen} />


          <Scene key = "LearnMoreScreen" hideNavBar = {true} component = {LearnMoreScreen} />
        </Scene>
      </Router>
    );
  }
}

export default Routes;