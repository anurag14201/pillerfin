import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiDeliveryTruck, CiMoneyCheck1 } from 'react-icons/ci';
import { FaUserTie } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { MdDensitySmall, MdPendingActions, MdVerified } from 'react-icons/md';
import { SiReacthookform } from 'react-icons/si';
import { VscUnverified } from 'react-icons/vsc';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../Hooks/useRole';

const DashBoardLayout = () => {
	const {role} = useRole();
    return (
			<div>
				<div className="drawer lg:drawer-open">
					<input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
					<div className="drawer-content">
						{/* Navbar */}
						<nav className="navbar w-full bg-base-300">
							<label
								htmlFor="my-drawer-4"
								aria-label="open sidebar"
								className="btn btn-square btn-ghost"
							>
								{/* Sidebar toggle icon */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2"
									fill="none"
									stroke="currentColor"
									className="my-1.5 inline-block size-4"
								>
									<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
									<path d="M9 4v16"></path>
									<path d="M14 10l2 2l-2 2"></path>
								</svg>
							</label>
							<Link to="/" className="px-4 text-xl font-bold text-primary">
								LoanLink
							</Link>
						</nav>
						{/* Page content here */}
						<Outlet></Outlet>
					</div>

					<div className="drawer-side is-drawer-close:overflow-visible">
						<label
							htmlFor="my-drawer-4"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
							{/* Sidebar content here */}
							<ul className="menu w-full grow py-15">
								{/* List item */}
								

								{/* List item */}
								<li className="gap-2">
									{role === 'Borrower' && (
										<>
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="My loans"
												to="/dashboard/my-loans"
											>
												<CiMoneyCheck1 />
												<span className="is-drawer-close:hidden">My Loans</span>
											</NavLink>
											{/* my profile */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="My Profile"
												to="/dashBoard/profile"
											>
												<CgProfile />
												<span className="is-drawer-close:hidden">
													My Profile
												</span>
											</NavLink>
										</>
									)}

									{role === 'Manager' && (
										<>
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Add loans"
												to="/dashboard/add-loan"
											>
												<IoIosAddCircleOutline />
												<span className="is-drawer-close:hidden">
													Add loans
												</span>
											</NavLink>
											{/* Manage Loans(manager)  */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Manage Loans"
												to="/dashboard/manage-loans"
											>
												<FaUserTie />
												<span className="is-drawer-close:hidden">
													Manage Loans
												</span>
											</NavLink>
											{/* Pending Application (manager) */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Pending Application"
												to="/dashboard/pending-loans"
											>
												<MdPendingActions />
												<span className="is-drawer-close:hidden">
													Pending Application
												</span>
											</NavLink>
											{/* Approved application(manager) */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Approved Application"
												to="/dashboard/approved-loans"
											>
												<MdVerified />
												<span className="is-drawer-close:hidden">
													Approved Application
												</span>
											</NavLink>
											{/* my profile(Manager) */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="My Profile"
												to="/dashboard/manager-profile"
											>
												<CgProfile />
												<span className="is-drawer-close:hidden">
													My Profile
												</span>
											</NavLink>
										</>
									)}

									{role === 'Admin' && (
										<>
											{/* Manage Users(admin) */}

											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Manage Users"
												to="/dashboard/manage-users"
											>
												<VscUnverified />
												<span className="is-drawer-close:hidden">
													Manage Users
												</span>
											</NavLink>
											{/* all loans(Admin) */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="All Loans"
												to="/dashboard/all-loans-admin"
											>
												<MdDensitySmall />
												<span className="is-drawer-close:hidden">
													All Loans
												</span>
											</NavLink>
											{/* Loan Application(admin) */}
											<NavLink
												className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
												data-tip="Loan Application"
												to="/dashboard/loan-application-admin"
											>
												<SiReacthookform />
												<span className="is-drawer-close:hidden">
													Loan Application
												</span>
											</NavLink>
										</>
									)}
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
};

export default DashBoardLayout;