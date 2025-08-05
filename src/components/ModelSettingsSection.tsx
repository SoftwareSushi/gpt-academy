import React, { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2';
import type { ModelSettings } from '../types';

interface ModelSettingsSectionProps {
	settings: ModelSettings;
	onChange: (settings: Partial<ModelSettings>) => void;
}

const ModelSettingsSection: React.FC<ModelSettingsSectionProps> = ({
	settings,
	onChange,
}) => {
	const [showAdvanced, setShowAdvanced] = useState(false);

	return (
		<div className="p-4 space-y-6">
			<h3 className="text-md font-medium text-gray-900 dark:text-white">
				Model Settings
			</h3>

			{/* Model Selection */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Model
				</label>
				<select
					value={settings.model}
					onChange={(e) =>
						onChange({ model: e.target.value as ModelSettings['model'] })
					}
					className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
				>
					<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
					<option value="gpt-4">GPT-4</option>
					<option value="gpt-4-turbo">GPT-4 Turbo</option>
				</select>
			</div>

			{/* Max Tokens */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Max Output Tokens
				</label>
				<input
					type="number"
					min="1"
					max="4096"
					value={settings.maxTokens}
					onChange={(e) =>
						onChange({ maxTokens: parseInt(e.target.value) })
					}
					className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
				/>
			</div>

			{/* Temperature */}
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Temperature: {settings.temperature}
				</label>
				<input
					type="range"
					min="0"
					max="2"
					step="0.1"
					value={settings.temperature}
					onChange={(e) =>
						onChange({ temperature: parseFloat(e.target.value) })
					}
					className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
				/>
				<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
					<span>Focused</span>
					<span>Creative</span>
				</div>
			</div>

			{/* Advanced Settings Toggle */}
			<button
				onClick={() => setShowAdvanced(!showAdvanced)}
				className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
			>
				<span>Advanced Settings</span>
				{showAdvanced ? (
					<HiChevronUp className="w-4 h-4" />
				) : (
					<HiChevronDown className="w-4 h-4" />
				)}
			</button>

			{/* Advanced Settings */}
			{showAdvanced && (
				<div className="space-y-4 pt-2 border-t border-gray-200 dark:border-gray-600">
					{/* Top P */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Top P: {settings.topP}
						</label>
						<input
							type="range"
							min="0"
							max="1"
							step="0.1"
							value={settings.topP}
							onChange={(e) =>
								onChange({ topP: parseFloat(e.target.value) })
							}
							className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
						/>
					</div>

					{/* Frequency Penalty */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Frequency Penalty: {settings.frequencyPenalty}
						</label>
						<input
							type="range"
							min="-2"
							max="2"
							step="0.1"
							value={settings.frequencyPenalty}
							onChange={(e) =>
								onChange({ frequencyPenalty: parseFloat(e.target.value) })
							}
							className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
						/>
					</div>

					{/* Presence Penalty */}
					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Presence Penalty: {settings.presencePenalty}
						</label>
						<input
							type="range"
							min="-2"
							max="2"
							step="0.1"
							value={settings.presencePenalty}
							onChange={(e) =>
								onChange({ presencePenalty: parseFloat(e.target.value) })
							}
							className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ModelSettingsSection;
