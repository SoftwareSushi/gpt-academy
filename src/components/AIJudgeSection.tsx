import React from 'react';
import {
	HiSparkles,
	HiTrophy,
	HiLightBulb,
	HiArrowTrendingUp,
} from 'react-icons/hi2';
import { AIFeedback } from '../types';

interface AIJudgeSectionProps {
	feedback: AIFeedback | null;
	onGenerateFeedback: () => void;
}

const AIJudgeSection: React.FC<AIJudgeSectionProps> = ({
	feedback,
	onGenerateFeedback,
}) => {
	const getScoreColor = (score: number) => {
		if (score >= 8) return 'text-green-600 dark:text-green-400';
		if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
		return 'text-red-600 dark:text-red-400';
	};

	const getScoreBgColor = (score: number) => {
		if (score >= 8) return 'bg-green-100 dark:bg-green-900/20';
		if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900/20';
		return 'bg-red-100 dark:bg-red-900/20';
	};

	return (
		<div className="p-4 border-t border-gray-200 dark:border-gray-600">
			<div className="flex items-center space-x-2 mb-4">
				<HiSparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
				<h3 className="text-md font-medium text-gray-900 dark:text-white">
					AI Judge
				</h3>
			</div>

			{/* Generate Feedback Button */}
			<div className="mb-4">
				<button
					onClick={onGenerateFeedback}
					className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2"
				>
					<HiSparkles className="w-5 h-5" />
					<span>Analyze My Prompt</span>
				</button>
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
					Get AI feedback on your prompt effectiveness
				</p>
			</div>

			{/* Feedback Display */}
			{feedback && (
				<div className="space-y-4">
					{/* Score */}
					<div
						className={`p-4 rounded-lg ${getScoreBgColor(feedback.score)}`}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-2">
								<HiTrophy
									className={`w-6 h-6 ${getScoreColor(feedback.score)}`}
								/>
								<span className="font-medium text-gray-900 dark:text-white">
									Overall Score
								</span>
							</div>
							<div
								className={`text-2xl font-bold ${getScoreColor(
									feedback.score
								)}`}
							>
								{feedback.score}/10
							</div>
						</div>
					</div>

					{/* Explanation */}
					<div className="space-y-2">
						<h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
							<HiLightBulb className="w-4 h-4 text-yellow-500" />
							<span>Analysis</span>
						</h4>
						<p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
							{feedback.explanation}
						</p>
					</div>

					{/* Strengths */}
					{feedback.strengths.length > 0 && (
						<div className="space-y-2">
							<h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
								<HiTrophy className="w-4 h-4 text-green-500" />
								<span>Strengths</span>
							</h4>
							<ul className="space-y-1">
								{feedback.strengths.map((strength, index) => (
									<li
										key={index}
										className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300"
									>
										<div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
										<span>{strength}</span>
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Improvements */}
					{feedback.improvements.length > 0 && (
						<div className="space-y-2">
							<h4 className="font-medium text-gray-900 dark:text-white flex items-center space-x-2">
								<HiArrowTrendingUp className="w-4 h-4 text-blue-500" />
								<span>Suggestions for Improvement</span>
							</h4>
							<ul className="space-y-1">
								{feedback.improvements.map((improvement, index) => (
									<li
										key={index}
										className="flex items-start space-x-2 text-sm text-gray-700 dark:text-gray-300"
									>
										<div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
										<span>{improvement}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			)}

			{/* Info Note */}
			<div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
				<p className="text-xs text-purple-800 dark:text-purple-300">
					<strong>How it works:</strong> The AI Judge analyzes your
					conversation to evaluate prompt clarity, instruction alignment,
					output quality, and creativity based on the assignment criteria.
				</p>
			</div>
		</div>
	);
};

export default AIJudgeSection;
