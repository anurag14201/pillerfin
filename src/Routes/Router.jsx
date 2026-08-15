import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Home from '../Pages/Home/Home/Home';
import AuthLayout from '../Layouts/AuthLayout';
import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';
import AllLoans from '../Pages/AllLoans/AllLoans';
import LoanDetails from '../Pages/AllLoans/LoanDetails';
import LoanApplicationForm from '../Pages/AllLoans/LoanApplication/LoanApplicationForm';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Contact from '../Pages/Contact/Contact';
import PrivateRoutes from './PrivateRoutes';
import DashBoardLayout from '../Layouts/DashBoardLayout';
import MyLoans from '../Pages/MyLoans/MyLoans';
import PaymentSuccess from '../Pages/Home/DashBoard/Payment/PaymentSuccess';
import PaymentCancel from '../Pages/Home/DashBoard/Payment/PaymentCancel';
import Profile from '../Pages/Home/DashBoard/Profile/Profile';
import ManageUsers from '../Pages/Home/DashBoard/Admin/ManageUsers';
import AllLoansAdmin from '../Pages/Home/DashBoard/Admin/AllLoansAdmin';
import LoanApplicationAdmin from '../Pages/Home/DashBoard/Admin/LoanApplicationAdmin';
import AddLoans from '../Pages/Home/DashBoard/Manager/AddLoans';
import ManageLoans from '../Pages/Home/DashBoard/Manager/ManageLoans';
import PendingLoans from '../Pages/Home/DashBoard/Manager/PendingLoans';
import ApprovedLoans from '../Pages/Home/DashBoard/Manager/ApprovedLoans';
import ManagerProfile from '../Pages/Home/DashBoard/Manager/ManagerProfile';
import LoanUpdate from '../Pages/Home/DashBoard/Manager/LoanUpdate';
import Loading from '../Component/Loading/Loading';
import ManageUsersRole from '../Pages/Home/DashBoard/Admin/ManageUsersRole';
import AdminRoute from './AdminRoute';
import ManagerRoute from './ManagerRoute';
import ErrorPage from '../Component/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
	// root layout
	{
		path: '/',
		Component: RootLayout,
		errorElement: <ErrorPage></ErrorPage>,
		hydrateFallbackElement: <Loading></Loading>,

		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: 'all-loans',
				Component: AllLoans,
			},
			{
				path: 'all-loans/:id',
				element: (
					<PrivateRoutes>
						{' '}
						<LoanDetails></LoanDetails>{' '}
					</PrivateRoutes>
				),
			},
			{
				path: 'loan-application/:id',
				element: (
					<PrivateRoutes>
						<LoanApplicationForm></LoanApplicationForm>
					</PrivateRoutes>
				),
			},
			{
				path: 'about-us',
				Component: AboutUs,
			},
			{
				path: 'contact',
				Component: Contact,
			},
		],
	},
	// authLayout
	{
		path: '/',
		Component: AuthLayout,
		children: [
			{
				path: 'login',
				Component: Login,
			},
			{
				path: 'register',
				Component: Register,
			},
		],
	},
	// DashboardLayout
	{
		path: '/dashBoard',
		element: (
			<PrivateRoutes>
				<DashBoardLayout></DashBoardLayout>
			</PrivateRoutes>
		),
		hydrateFallbackElement: <Loading></Loading>,
		children: [
			{
				path: 'my-loans',
				Component: MyLoans,
			},
			{
				path: 'profile',
				Component: Profile,
			},
			{
				path: 'payment-success',
				Component: PaymentSuccess,
			},
			{
				path: 'payment-cancel',
				Component: PaymentCancel,
			},
			{
				path: 'manage-users',
				element: (
					<AdminRoute>
						{' '}
						<ManageUsers></ManageUsers>{' '}
					</AdminRoute>
				),
			},
			{
				path: 'manage-user-role/:id',
				element: (
					<AdminRoute>
						{' '}
						<ManageUsersRole></ManageUsersRole>{' '}
					</AdminRoute>
				),
			},
			{
				path: 'all-loans-admin',
				element: (
					<AdminRoute>
						<AllLoansAdmin></AllLoansAdmin>
					</AdminRoute>
				),
			},
			{
				path: 'loan-application-admin',
				element: (
					<AdminRoute>
						<LoanApplicationAdmin></LoanApplicationAdmin>
					</AdminRoute>
				),
			},
			{
				path: 'add-loan',
				element: (
					<ManagerRoute>
						<AddLoans></AddLoans>
					</ManagerRoute>
				),
			},
			{
				path: 'manage-loans',
				element: (
					<ManagerRoute>
						<ManageLoans></ManageLoans>
					</ManagerRoute>
				),
			},
			{
				path: 'update-loans/:id',
				element: <LoanUpdate></LoanUpdate>,
			},
			{
				path: 'pending-loans',
				Component: PendingLoans,
				element: (
					<ManagerRoute>
						<PendingLoans></PendingLoans>
					</ManagerRoute>
				),
			},
			{
				path: 'approved-loans',
				Component: ApprovedLoans,
				element: (
					<ManagerRoute>
						<ApprovedLoans></ApprovedLoans>
					</ManagerRoute>
				),
			},
			{
				path: 'manager-profile',
				element: (
					<ManagerRoute>
						<ManagerProfile></ManagerProfile>
					</ManagerRoute>
				),
			},
		],
	},
]);
