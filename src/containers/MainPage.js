import React from 'react';
import SideMenu from './MainScreens/Header/SideMenu';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from 'react-navigation-stack';
import {Dimensions, Text} from "react-native";

// import HomeScreen from './containers/MainScreens/HomeScreen';
// import OffersScreen from './containers/MainScreens/OffersScreen';
// import DetailScreen from './containers/MainScreens/DetailScreen';
// import LocationScreen from './containers/MainScreens/LocationScreen';
// import MenusScreen from './containers/MainScreens/MenusScreen';
// import MembershipScreen from './containers/MainScreens/MembershipScreen';
// import MyProfileScreen from './containers/MainScreens/MyProfileScreen';
// import PrivacyPolicyScreen from './containers/MainScreens/PrivacyPolicyScreen';
// import CreateScreen from './containers/MainScreens/CreateScreen';
import ChatRoom from './MainScreens/ChatRoom/ChatRoom';

// Auth - member
import LoginScreen from './Auth/Login';
import RegisterScreen from './Auth/Register';
import ProfileScreen from './Auth/Profile';
import ChangePasswordScreen from './Auth/ChangePassword';
// Auth - provider
import ProviderLoginScreen from './Auth/Provider/ProviderLogin'
import ProviderRegisterScreen from './Auth/Provider/ProviderRegister'
import ProviderProfileScreen from './Auth/Provider/ProviderProfile'
import ProviderChangePasswordScreen from './Auth/Provider/ProviderChangePassword'
// first page
import MainMenuScreen from './MainScreens/Header/MainMenu';
import HomeScreen from './MainScreens/HomeScreen';
import WhatCanWeDoScreen from './MainScreens/WhatCanWeDo';
import WhatWeTreatScreen from './MainScreens/WhatWeTreat';
import MemberScreen from './MainScreens/Member';
import HowitWorksScreen from './MainScreens/HowitWorks';
import SecondOptionScreen from './MainScreens/SecondOption';
import PatientBenefitsScreen from './MainScreens/PatientBenefits';
import ProviderScreen from './MainScreens/Provider';
import ProviderBenefitsScreen from './MainScreens/ProviderBenefits';
import OurProvidersScreen from './MainScreens/OurProviders';
import ContactScreen from './MainScreens/Contact';

// menu pages - member
import BookedAppointmentScreen from './MainScreens/Member/Appointments/BookedAppointments';
import PreviousAppointmentScreen from './MainScreens/Member/Appointments/PreviousAppointments';
import MedicalHistoriesScreen from './MainScreens/Member/MedicalHistories';
import MedicalReportsScreen from './MainScreens/Member/MedicalReports';
import MyPhotoScreen from './MainScreens/Member/MyPhoto';
import PreferredPharmacyScreen from './MainScreens/Member/PreferredPharmacy';
import PaymentScreen from './MainScreens/Member/Payment';
// dashboard - member
import AppointmentTodayScreen from './MainScreens/Member/AppointmentToday';
// import SelectServiceTypeScreen from './MainScreens/Member/PaymentInfomation';
import SelectServiceTypeScreen from './MainScreens/Member/SelectServiceType';
import PatientInfoScreen from './MainScreens/Member/PatientInfomation';
import PatientImageScreen from './MainScreens/Member/PatientImage';
import ReasonForTodayVisitScreen from './MainScreens/Member/ReasonForTodayVisit';
import HaveSymptomsScreen from './MainScreens/Member/HaveSymptoms';
import MedicalHistoryScreen from './MainScreens/Member/MedicalHistory';
import SelectPharmacyScreen from './MainScreens/Member/SelectPharmacy';
import ChooseDoctorScreen from './MainScreens/Member/ChooseDoctor';
import AppointmentScheduleScreen from './MainScreens/Member/AppointmentSchedule';
import PaymentInfomationScreen from './MainScreens/Member/PaymentInfomation';
import PaymentSuccessScreen from './MainScreens/Member/PaymentSuccess';
import PaymentFailedScreen from './MainScreens/Member/PaymentFailed';
import RatingScreen from "./MainScreens/Member/Rating";


// provider pages
import ProviderDashboardScreen from "./MainScreens/Provider/ProviderDashboard"
import ProviderGeneralHealthScreen from "./MainScreens/Provider/ProviderGeneralHealth"
import Provider2ndOptionScreen from "./MainScreens/Provider/Provider2ndOption"
import ProviderPhotoScreen from "./MainScreens/Provider/ProviderMyPhoto"
import ProviderBillingTransactionScreen from "./MainScreens/Provider/ProviderBillingTransactions"
import ProviderPreviousAppointmentScreen from "./MainScreens/Provider/ProviderPreviousAppointments"
import ProviderBookedAppointmentScreen from "./MainScreens/Provider/ProviderBookedAppointments"

var {height, width} = Dimensions.get('window');

const navigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
		backgroundColor: '#fd5c63',
		shadowOpacity: 0,
		borderBottomWidth: 0,
		elevation: 0,
	},
    headerBackTitle: null,
    headerTintColor: '#fff',
    headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    }
  }
};

const HomeNavigator = createStackNavigator(
    {
        ChatRoom: {
            screen: ChatRoom,
            navigationOptions: { headerShown: false },
        },
        LoginScreen: {
            screen: LoginScreen,
            navigationOptions: { header: null },
        },
        RegisterScreen: {
            screen: RegisterScreen,
            navigationOptions: { header: null },
        },
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: { header: null },
        },
        ChangePasswordScreen: {
            screen: ChangePasswordScreen,
            navigationOptions: { header: null },
        },

        ProviderLoginScreen: {
            screen: ProviderLoginScreen,
            navigationOptions: { header: null },
        },
        ProviderRegisterScreen: {
            screen: ProviderRegisterScreen,
            navigationOptions: { header: null },
        },
        ProviderProfileScreen: {
            screen: ProviderProfileScreen,
            navigationOptions: { header: null },
        },
        ProviderChangePasswordScreen: {
            screen: ProviderChangePasswordScreen,
            navigationOptions: { header: null },
        },


        MainMenuScreen: {
            screen: MainMenuScreen,
            navigationOptions: { header: null },
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: { header: null },
        },
        WhatCanWeDoScreen: {
            screen: WhatCanWeDoScreen,
            navigationOptions: { header: null },
        },
        WhatWeTreatScreen: {
            screen: WhatWeTreatScreen,
            navigationOptions: { header: null },
        },
        MemberScreen: {
            screen: MemberScreen,
            navigationOptions: { header: null },
        },
        HowitWorksScreen: {
            screen: HowitWorksScreen,
            navigationOptions: { header: null },
        },
        SecondOptionScreen: {
            screen: SecondOptionScreen,
            navigationOptions: { header: null },
        },
        PatientBenefitsScreen: {
            screen: PatientBenefitsScreen,
            navigationOptions: { header: null },
        },
        ProviderScreen: {
            screen: ProviderScreen,
            navigationOptions: { header: null },
        },
        ProviderBenefitsScreen: {
            screen: ProviderBenefitsScreen,
            navigationOptions: { header: null },
        },
        OurProvidersScreen: {
            screen: OurProvidersScreen,
            navigationOptions: { header: null },
        },
        ContactScreen: {
            screen: ContactScreen,
            navigationOptions: { header: null },
        },


        BookedAppointmentScreen: {
            screen: BookedAppointmentScreen,
            navigationOptions: { header: null },
        },
        PreviousAppointmentScreen: {
            screen: PreviousAppointmentScreen,
            navigationOptions: { header: null },
        },
        MedicalHistoriesScreen: {
            screen: MedicalHistoriesScreen,
            navigationOptions: { header: null },
        },
        MedicalReportsScreen: {
            screen: MedicalReportsScreen,
            navigationOptions: { header: null },
        },
        MyPhotoScreen: {
            screen: MyPhotoScreen,
            navigationOptions: { header: null },
        },
        PreferredPharmacyScreen: {
            screen: PreferredPharmacyScreen,
            navigationOptions: { header: null },
        },
        PaymentScreen: {
            screen: PaymentScreen,
            navigationOptions: { header: null },
        },


        AppointmentTodayScreen: {
            screen: AppointmentTodayScreen,
            navigationOptions: { header: null },
        },
        SelectServiceTypeScreen: {
            screen: SelectServiceTypeScreen,
            navigationOptions: { header: null },
        },
        PatientInfoScreen: {
            screen: PatientInfoScreen,
            navigationOptions: { header: null },
        },
        PatientImageScreen: {
            screen: PatientImageScreen,
            navigationOptions: { header: null },
        },
        ReasonForTodayVisitScreen: {
            screen: ReasonForTodayVisitScreen,
            navigationOptions: { header: null },
        },
        HaveSymptomsScreen: {
            screen: HaveSymptomsScreen,
            navigationOptions: { header: null },
        },
        MedicalHistoryScreen: {
            screen: MedicalHistoryScreen,
            navigationOptions: { header: null },
        },
        SelectPharmacyScreen: {
            screen: SelectPharmacyScreen,
            navigationOptions: { header: null },
        },
        ChooseDoctorScreen: {
            screen: ChooseDoctorScreen,
            navigationOptions: { header: null },
        },
        AppointmentScheduleScreen: {
            screen: AppointmentScheduleScreen,
            navigationOptions: { header: null },
        },
        PaymentInfomationScreen: {
            screen: PaymentInfomationScreen,
            navigationOptions: { header: null },
        },
        PaymentSuccessScreen: {
            screen: PaymentSuccessScreen,
            navigationOptions: { header: null },
        },
        PaymentFailedScreen: {
            screen: PaymentFailedScreen,
            navigationOptions: { header: null },
        },
        RatingScreen: {
            screen: RatingScreen,
            navigationOptions: { header: null },
        },
        
        ProviderDashboardScreen: {
            screen: ProviderDashboardScreen,
            navigationOptions: { header: null },
        },
        ProviderPhotoScreen: {
            screen: ProviderPhotoScreen,
            navigationOptions: { header: null },
        },
        ProviderBillingTransactionScreen: {
            screen: ProviderBillingTransactionScreen,
            navigationOptions: { header: null },
        },
        ProviderPreviousAppointmentScreen: {
            screen: ProviderPreviousAppointmentScreen,
            navigationOptions: { header: null },
        },
        ProviderBookedAppointmentScreen: {
            screen: ProviderBookedAppointmentScreen,
            navigationOptions: { header: null },
        },
        ProviderGeneralHealthScreen: {
            screen: ProviderGeneralHealthScreen,
            navigationOptions: { header: null },
        },
        Provider2ndOptionScreen: {
            screen: Provider2ndOptionScreen,
            navigationOptions: { header: null },
        },
    },
	{
		initialRouteName: 'HomeScreen',
		// initialRouteName: 'xxx',
    }, 
    navigationOptions

);

const RootStack = createDrawerNavigator({
Home: {
    screen: HomeNavigator,
  },
}, {
  contentComponent: SideMenu,
  drawerWidth: width * .7,
  drawerPosition:'right',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});

export default createAppContainer(RootStack)