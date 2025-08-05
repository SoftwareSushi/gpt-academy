import React, { useState } from 'react';
import {
	HiMoon,
	HiSun,
	HiChevronDown,
	HiCog6Tooth,
	HiUser,
	HiArrowRightOnRectangle,
} from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';

const TopNavigation: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	const [userMenuOpen, setUserMenuOpen] = useState(false);

	return (
		<nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
			<div className="flex items-center justify-between">
				{/* Logo */}
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">GP</span>
					</div>
					<h1 className="text-xl font-bold text-gray-900 dark:text-white">
						GPT Academy
					</h1>
				</div>

				{/* Right section */}
				<div className="flex items-center space-x-4">
					{/* Dark/Light mode toggle */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
					>
						{theme === 'dark' ? (
							<HiSun className="w-5 h-5 text-yellow-500" />
						) : (
							<HiMoon className="w-5 h-5 text-gray-600" />
						)}
					</button>

					{/* User profile dropdown */}
					<div className="relative">
						<button
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
						>
							<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
								<HiUser className="w-5 h-5 text-white" />
							</div>
							<span className="text-sm font-medium text-gray-700 dark:text-gray-300">
								Student
							</span>
							<HiChevronDown
								className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
									userMenuOpen ? 'rotate-180' : ''
								}`}
							/>
						</button>

						{/* Dropdown menu */}
						{userMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
								<button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
									<HiUser className="w-4 h-4" />
									<span>Profile</span>
								</button>
								<button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
									<HiCog6Tooth className="w-4 h-4" />
									<span>Settings</span>
								</button>
								<hr className="my-1 border-gray-200 dark:border-gray-700" />
								<button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2">
									<HiArrowRightOnRectangle className="w-4 h-4" />
									<span>Sign out</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Close dropdown when clicking outside */}
			{userMenuOpen && (
				<div
					className="fixed inset-0 z-40"
					onClick={() => setUserMenuOpen(false)}
				/>
			)}
		</nav>
	);
};

export default TopNavigation;
