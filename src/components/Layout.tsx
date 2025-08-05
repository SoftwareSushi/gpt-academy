import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import type { PanelState } from '../types';
import TopNavigation from './TopNavigation';
import LeftPanel from './LeftPanel';
import ChatInterface from './ChatInterface';
import RightPanel from './RightPanel';

const Layout: React.FC = () => {
	const [panelState, setPanelState] = useState<PanelState>({
		leftPanelCollapsed: false,
		rightPanelCollapsed: false,
	});

	const toggleLeftPanel = () => {
		setPanelState((prev) => ({
			...prev,
			leftPanelCollapsed: !prev.leftPanelCollapsed,
		}));
	};

	const toggleRightPanel = () => {
		setPanelState((prev) => ({
			...prev,
			rightPanelCollapsed: !prev.rightPanelCollapsed,
		}));
	};

	return (
		<div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
			<TopNavigation />

			<div className="flex-1 flex overflow-hidden">
				{/* Left Panel */}
				<div
					className={`transition-all duration-300 flex-shrink-0 ${
						panelState.leftPanelCollapsed ? 'w-0' : 'w-80 md:w-72 lg:w-80'
					}`}
				>
					<div className="h-full relative">
						<LeftPanel isCollapsed={panelState.leftPanelCollapsed} />
						<button
							onClick={toggleLeftPanel}
							className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-200"
						>
							{panelState.leftPanelCollapsed ? (
								<HiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
							) : (
								<HiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
							)}
						</button>
					</div>
				</div>

				{/* Center Panel - Chat Interface */}
				<div className="flex-1 flex flex-col min-w-0">
					<ChatInterface />
				</div>

				{/* Right Panel */}
				<div
					className={`transition-all duration-300 flex-shrink-0 ${
						panelState.rightPanelCollapsed ? 'w-0' : 'w-80 md:w-72 lg:w-80'
					}`}
				>
					<div className="h-full relative">
						<RightPanel isCollapsed={panelState.rightPanelCollapsed} />
						<button
							onClick={toggleRightPanel}
							className="absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-lg hover:shadow-xl transition-all duration-200"
						>
							{panelState.rightPanelCollapsed ? (
								<HiChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
							) : (
								<HiChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
