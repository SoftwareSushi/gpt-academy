import React, { useState, useRef, useEffect } from 'react';
import { HiPaperAirplane, HiStop } from 'react-icons/hi2';
import type { ChatMessage } from '../types';

const ChatInterface: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!inputValue.trim() || isLoading) return;

		const userMessage: ChatMessage = {
			id: Math.random().toString(36).substr(2, 9),
			role: 'user',
			content: inputValue.trim(),
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue('');
		setIsLoading(true);

		// TODO: Replace with actual API call
		// Simulate AI response
		setTimeout(() => {
			const assistantMessage: ChatMessage = {
				id: Math.random().toString(36).substr(2, 9),
				role: 'assistant',
				content: `Ahoy there, matey! 🏴‍☠️

Ye've come to the right pirate for help! I be Captain LLM, and I've sailed the seven seas of knowledge to bring ye the finest answers.

What treasure of wisdom be ye seekin' today? Whether it's codin' secrets, writin' tales, or navigatin' the treacherous waters of problem-solvin', this old sea dog has got ye covered!

*Arrr, this be a simulated response from yer friendly neighborhood AI pirate!*`,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, assistantMessage]);
			setIsLoading(false);
		}, 1500);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};

	const handleTextareaChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setInputValue(e.target.value);

		// Auto-resize textarea
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto';
			textareaRef.current.style.height = `${Math.min(
				textareaRef.current.scrollHeight,
				120
			)}px`;
		}
	};

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="h-full flex flex-col bg-white dark:bg-gray-800">
			{/* Chat Header */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
					Prompt Playground
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Write and test your prompts here
				</p>
			</div>

			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && (
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
								<HiPaperAirplane className="w-8 h-8 text-blue-600 dark:text-blue-400" />
							</div>
							<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
								Start your conversation
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Type a prompt below to begin experimenting with AI responses
							</p>
						</div>
					</div>
				)}

				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.role === 'user' ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`max-w-[80%] rounded-lg px-4 py-2 ${
								message.role === 'user'
									? 'bg-blue-600 text-white'
									: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
							}`}
						>
							<div className="whitespace-pre-wrap">{message.content}</div>
							<div
								className={`text-xs mt-1 ${
									message.role === 'user'
										? 'text-blue-200'
										: 'text-gray-500 dark:text-gray-400'
								}`}
							>
								{formatTime(message.timestamp)}
							</div>
						</div>
					</div>
				))}

				{isLoading && (
					<div className="flex justify-start">
						<div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-[80%]">
							<div className="flex items-center space-x-2">
								<div className="flex space-x-1">
									<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
									<div
										className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
										style={{ animationDelay: '0.1s' }}
									></div>
									<div
										className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
										style={{ animationDelay: '0.2s' }}
									></div>
								</div>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									AI is thinking...
								</span>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className="border-t border-gray-200 dark:border-gray-700 p-4">
				<form
					onSubmit={handleSubmit}
					className="flex items-end space-x-2"
				>
					<div className="flex-1 min-w-0">
						<textarea
							ref={textareaRef}
							value={inputValue}
							onChange={handleTextareaChange}
							onKeyDown={handleKeyDown}
							placeholder="Type your prompt here... (Shift+Enter for new line)"
							className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-[120px]"
							rows={1}
						/>
					</div>
					<button
						type="submit"
						disabled={!inputValue.trim() || isLoading}
						className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
					>
						{isLoading ? (
							<HiStop className="w-5 h-5" />
						) : (
							<HiPaperAirplane className="w-5 h-5" />
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatInterface;
