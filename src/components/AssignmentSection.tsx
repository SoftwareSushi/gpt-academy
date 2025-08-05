import React, { useState } from 'react';
import {
	HiPencil,
	HiCheck,
	HiX,
	HiClipboardDocumentList,
} from 'react-icons/hi2';
import { Assignment } from '../types';

interface AssignmentSectionProps {
	assignment: Assignment;
	onChange: (assignment: Partial<Assignment>) => void;
}

const AssignmentSection: React.FC<AssignmentSectionProps> = ({
	assignment,
	onChange,
}) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [isEditingInstructions, setIsEditingInstructions] =
		useState(false);
	const [tempTitle, setTempTitle] = useState(assignment.title);
	const [tempInstructions, setTempInstructions] = useState(
		assignment.instructions
	);

	const handleTitleEdit = () => {
		setTempTitle(assignment.title);
		setIsEditingTitle(true);
	};

	const handleTitleSave = () => {
		onChange({ title: tempTitle });
		setIsEditingTitle(false);
	};

	const handleTitleCancel = () => {
		setTempTitle(assignment.title);
		setIsEditingTitle(false);
	};

	const handleInstructionsEdit = () => {
		setTempInstructions(assignment.instructions);
		setIsEditingInstructions(true);
	};

	const handleInstructionsSave = () => {
		onChange({ instructions: tempInstructions });
		setIsEditingInstructions(false);
	};

	const handleInstructionsCancel = () => {
		setTempInstructions(assignment.instructions);
		setIsEditingInstructions(false);
	};

	return (
		<div className="p-4 space-y-4">
			<div className="flex items-center space-x-2">
				<HiClipboardDocumentList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
				<h3 className="text-md font-medium text-gray-900 dark:text-white">
					Assignment Instructions
				</h3>
			</div>

			{/* Assignment Title */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Title
					</label>
					{!isEditingTitle && (
						<button
							onClick={handleTitleEdit}
							className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
						>
							<HiPencil className="w-4 h-4" />
						</button>
					)}
				</div>

				{isEditingTitle ? (
					<div className="space-y-2">
						<input
							type="text"
							value={tempTitle}
							onChange={(e) => setTempTitle(e.target.value)}
							className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
							autoFocus
						/>
						<div className="flex items-center space-x-2">
							<button
								onClick={handleTitleSave}
								className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
							>
								<HiCheck className="w-4 h-4" />
							</button>
							<button
								onClick={handleTitleCancel}
								className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
							>
								<HiX className="w-4 h-4" />
							</button>
						</div>
					</div>
				) : (
					<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
						{assignment.title}
					</h4>
				)}
			</div>

			{/* Assignment Instructions */}
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Instructions
					</label>
					{!isEditingInstructions && (
						<button
							onClick={handleInstructionsEdit}
							className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
						>
							<HiPencil className="w-4 h-4" />
						</button>
					)}
				</div>

				{isEditingInstructions ? (
					<div className="space-y-2">
						<textarea
							value={tempInstructions}
							onChange={(e) => setTempInstructions(e.target.value)}
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 h-40 resize-none"
							autoFocus
						/>
						<div className="flex items-center space-x-2">
							<button
								onClick={handleInstructionsSave}
								className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-200 text-sm"
							>
								Save
							</button>
							<button
								onClick={handleInstructionsCancel}
								className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200 text-sm"
							>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
						<div className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300">
							{assignment.instructions}
						</div>
					</div>
				)}
			</div>

			{/* Rubric */}
			{assignment.rubric && assignment.rubric.length > 0 && (
				<div className="space-y-2">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Evaluation Criteria
					</label>
					<ul className="space-y-1">
						{assignment.rubric.map((criterion, index) => (
							<li
								key={index}
								className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
							>
								<div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
								<span>{criterion}</span>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Info Note */}
			<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
				<p className="text-xs text-blue-800 dark:text-blue-300">
					<strong>For Teachers:</strong> Edit the assignment instructions
					to guide your students. The AI Judge will evaluate student
					prompts based on these criteria.
				</p>
			</div>
		</div>
	);
};

export default AssignmentSection;
