import React, { useState } from 'react';
import { Assignment, AIFeedback } from '../types';
import AssignmentSection from './AssignmentSection';
import AIJudgeSection from './AIJudgeSection';

interface RightPanelProps {
	isCollapsed: boolean;
}

const RightPanel: React.FC<RightPanelProps> = ({ isCollapsed }) => {
	const [assignment, setAssignment] = useState<Assignment>({
		title: 'Pirate GPT Challenge',
		instructions: `Your task is to create a prompt that makes GPT respond like a pirate in all its communications.

Requirements:
- The AI should use pirate language and terminology
- Include "Arr!" and other pirate expressions
- Maintain helpful and accurate responses
- The pirate personality should be consistent throughout the conversation

Bonus points for creativity and authenticity!`,
		rubric: [
			'Prompt clarity and specificity',
			'Successful pirate character adoption',
			'Maintained helpfulness',
			'Creative approach',
		],
	});

	const [currentFeedback, setCurrentFeedback] =
		useState<AIFeedback | null>(null);

	const handleAssignmentChange = (updates: Partial<Assignment>) => {
		setAssignment((prev) => ({ ...prev, ...updates }));
	};

	const generateFeedback = () => {
		// TODO: Replace with actual AI judge API call
		// Simulate AI feedback generation
		const feedback: AIFeedback = {
			score: Math.floor(Math.random() * 3) + 7, // Random score between 7-10
			explanation: `Your prompt shows good understanding of the requirements. The approach to character instruction is solid, and you've maintained clarity in your request.`,
			improvements: [
				'Consider adding more specific examples of pirate language',
				'Include instructions for handling edge cases',
				'Add constraints to prevent the character from breaking',
			],
			strengths: [
				'Clear and specific instructions',
				'Good balance of character and functionality',
				'Well-structured prompt format',
			],
		};

		setCurrentFeedback(feedback);
	};

	if (isCollapsed) {
		return null;
	}

	return (
		<div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
					Assignment & Feedback
				</h2>
			</div>

			<div className="flex-1 overflow-y-auto">
				<AssignmentSection
					assignment={assignment}
					onChange={handleAssignmentChange}
				/>

				<AIJudgeSection
					feedback={currentFeedback}
					onGenerateFeedback={generateFeedback}
				/>
			</div>
		</div>
	);
};

export default RightPanel;
