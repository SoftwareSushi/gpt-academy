import React, { useRef } from 'react';
import {
	HiPlus,
	HiTrash,
	HiDocument,
	HiPhoto,
	HiEye,
	HiEyeSlash,
} from 'react-icons/hi2';
import { UploadedFile } from '../types';

interface KnowledgeUploadSectionProps {
	files: UploadedFile[];
	onFileUpload: (file: File) => void;
	onFileDelete: (fileId: string) => void;
	onFileToggle: (fileId: string) => void;
}

const KnowledgeUploadSection: React.FC<
	KnowledgeUploadSectionProps
> = ({ files, onFileUpload, onFileDelete, onFileToggle }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileSelect = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (file) {
			onFileUpload(file);
		}
		// Reset input value to allow uploading the same file again
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return (
			parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
		);
	};

	const getFileIcon = (type: string) => {
		if (type.startsWith('image/')) {
			return <HiPhoto className="w-5 h-5 text-green-500" />;
		}
		return <HiDocument className="w-5 h-5 text-blue-500" />;
	};

	const acceptedTypes = '.txt,.pdf,.docx,.csv,.png,.jpg,.jpeg';

	return (
		<div className="p-4 border-t border-gray-200 dark:border-gray-600">
			<h3 className="text-md font-medium text-gray-900 dark:text-white mb-4">
				Knowledge Base
			</h3>

			{/* Upload Button */}
			<div className="mb-4">
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileSelect}
					accept={acceptedTypes}
					className="hidden"
				/>
				<button
					onClick={() => fileInputRef.current?.click()}
					className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200 flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
				>
					<HiPlus className="w-5 h-5" />
					<span>Upload Knowledge File</span>
				</button>
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
					Supports: TXT, PDF, DOCX, CSV, PNG, JPG
				</p>
			</div>

			{/* File List */}
			{files.length > 0 && (
				<div className="space-y-2">
					<h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
						Uploaded Files ({files.length})
					</h4>
					<div className="space-y-2 max-h-64 overflow-y-auto">
						{files.map((file) => (
							<div
								key={file.id}
								className={`p-3 rounded-lg border transition-all duration-200 ${
									file.isIncluded
										? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
										: 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
								}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-start space-x-2 flex-1 min-w-0">
										{getFileIcon(file.type)}
										<div className="min-w-0 flex-1">
											<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
												{file.name}
											</p>
											<p className="text-xs text-gray-500 dark:text-gray-400">
												{formatFileSize(file.size)}
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-1 ml-2">
										{/* Toggle Include/Exclude */}
										<button
											onClick={() => onFileToggle(file.id)}
											className={`p-1 rounded transition-colors duration-200 ${
												file.isIncluded
													? 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300'
													: 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
											}`}
											title={
												file.isIncluded
													? 'Exclude from prompts'
													: 'Include in prompts'
											}
										>
											{file.isIncluded ? (
												<HiEye className="w-4 h-4" />
											) : (
												<HiEyeSlash className="w-4 h-4" />
											)}
										</button>

										{/* Delete */}
										<button
											onClick={() => onFileDelete(file.id)}
											className="p-1 rounded text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
											title="Delete file"
										>
											<HiTrash className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Usage Info */}
			<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
				<p className="text-xs text-blue-800 dark:text-blue-300">
					<strong>Note:</strong> Included files will be processed and added
					to your prompt context. Images will be processed with OCR for
					text extraction.
				</p>
			</div>
		</div>
	);
};

export default KnowledgeUploadSection;
