// Model settings types
export interface ModelSettings {
	model: 'gpt-3.5-turbo' | 'gpt-4' | 'gpt-4-turbo';
	maxTokens: number;
	temperature: number;
	topP: number;
	frequencyPenalty: number;
	presencePenalty: number;
}

// File upload types
export interface UploadedFile {
	id: string;
	name: string;
	type: string;
	size: number;
	content?: string;
	isIncluded: boolean;
	uploadedAt: Date;
}

// Chat message types
export interface ChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

// Assignment and feedback types
export interface Assignment {
	title: string;
	instructions: string;
	rubric?: string[];
}

export interface AIFeedback {
	score: number; // 0-10
	explanation: string;
	improvements: string[];
	strengths: string[];
}

// Panel state
export interface PanelState {
	leftPanelCollapsed: boolean;
	rightPanelCollapsed: boolean;
}

// Theme
export type Theme = 'light' | 'dark';
