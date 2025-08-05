import React, { useState } from 'react';
import { ModelSettings, UploadedFile } from '../types';
import ModelSettingsSection from './ModelSettingsSection';
import KnowledgeUploadSection from './KnowledgeUploadSection';

interface LeftPanelProps {
	isCollapsed: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ isCollapsed }) => {
	const [modelSettings, setModelSettings] = useState<ModelSettings>({
		model: 'gpt-4',
		maxTokens: 2048,
		temperature: 0.7,
		topP: 1,
		frequencyPenalty: 0,
		presencePenalty: 0,
	});

	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(
		[]
	);

	const handleModelSettingsChange = (
		settings: Partial<ModelSettings>
	) => {
		setModelSettings((prev) => ({ ...prev, ...settings }));
	};

	const handleFileUpload = (file: File) => {
		const newFile: UploadedFile = {
			id: Math.random().toString(36).substr(2, 9),
			name: file.name,
			type: file.type,
			size: file.size,
			isIncluded: true,
			uploadedAt: new Date(),
		};

		// TODO: Process file content based on type
		// For now, just add to the list
		setUploadedFiles((prev) => [...prev, newFile]);
	};

	const handleFileDelete = (fileId: string) => {
		setUploadedFiles((prev) =>
			prev.filter((file) => file.id !== fileId)
		);
	};

	const handleFileToggle = (fileId: string) => {
		setUploadedFiles((prev) =>
			prev.map((file) =>
				file.id === fileId
					? { ...file, isIncluded: !file.isIncluded }
					: file
			)
		);
	};

	if (isCollapsed) {
		return null;
	}

	return (
		<div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
					Configuration
				</h2>
			</div>

			<div className="flex-1 overflow-y-auto">
				<ModelSettingsSection
					settings={modelSettings}
					onChange={handleModelSettingsChange}
				/>

				<KnowledgeUploadSection
					files={uploadedFiles}
					onFileUpload={handleFileUpload}
					onFileDelete={handleFileDelete}
					onFileToggle={handleFileToggle}
				/>
			</div>
		</div>
	);
};

export default LeftPanel;
