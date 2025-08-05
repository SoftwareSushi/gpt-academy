# GPT Academy 🎓

A modern, interactive web platform for learning and experimenting with prompt engineering using AI language models. Built with React, TypeScript, and TailwindCSS.

![GPT Academy](https://img.shields.io/badge/React-19.1.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC.svg)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF.svg)

## 🌟 Features

### 📋 Three-Panel Interface

- **Left Panel**: Model configuration and knowledge base management
- **Center Panel**: ChatGPT-like conversation interface
- **Right Panel**: Assignment instructions and AI-powered feedback

### ⚙️ Advanced Model Settings

- Multiple AI model selection (GPT-3.5, GPT-4, GPT-4 Turbo)
- Adjustable parameters (temperature, top_p, frequency penalty, etc.)
- Output token limits
- Advanced settings panel

### 📁 Knowledge Base Integration

- Multi-format file upload support (TXT, PDF, DOCX, CSV, PNG, JPG)
- OCR processing for image files
- File inclusion/exclusion toggles
- Visual file management interface

### 🤖 AI Judge System

- Automated prompt evaluation (0-10 scoring)
- Detailed feedback and improvement suggestions
- Assignment-based evaluation criteria
- Strengths and weaknesses analysis

### 🎨 Modern UI/UX

- Dark/Light mode toggle with system preference detection
- Collapsible panels for focused workflows
- Responsive design for desktop and tablet
- Smooth animations and transitions
- Custom scrollbars and sliders

### 🎯 Educational Focus

- Teacher-editable assignment instructions
- Student prompt experimentation environment
- Structured feedback for learning improvement
- Real-time conversation interface

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd gpt-academy
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx          # Main layout with panels
│   ├── TopNavigation.tsx   # Header navigation
│   ├── LeftPanel.tsx       # Configuration panel
│   ├── ChatInterface.tsx   # Chat conversation
│   ├── RightPanel.tsx      # Assignment & feedback
│   ├── ModelSettingsSection.tsx
│   ├── KnowledgeUploadSection.tsx
│   ├── AssignmentSection.tsx
│   └── AIJudgeSection.tsx
├── contexts/            # React contexts
│   └── ThemeContext.tsx    # Dark/light mode
├── hooks/              # Custom hooks
│   └── useApi.ts          # API integration hooks
├── types/              # TypeScript definitions
│   └── index.ts           # Type definitions
├── App.tsx             # Root component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Technologies

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: TailwindCSS 4.1.11
- **Build Tool**: Vite 7.0.4
- **Icons**: React Icons (Heroicons v2)
- **State Management**: React Context + useState
- **Theme**: Custom dark/light mode implementation

## 🎯 Target Users

- **Students**: Middle school to university level
- **Educators**: Teachers and instructors
- **Bootcamps**: Prompt engineering and AI courses
- **Developers**: Learning prompt optimization

## 🔌 Backend Integration

This frontend is ready for backend integration. See `BACKEND_INTEGRATION.md` for detailed implementation requirements including:

- OpenAI API integration
- File processing services (OCR, PDF parsing)
- AI Judge evaluation system
- User authentication
- Assignment management

Current implementation includes placeholder hooks in `src/hooks/useApi.ts` that simulate backend responses.

## 🎨 Customization

### Theme Customization

The application uses TailwindCSS with a custom dark/light mode implementation. Modify colors in:

- `src/index.css` for global styles
- Individual components for specific styling

### Adding New File Types

Extend the file upload system in `KnowledgeUploadSection.tsx`:

1. Update `acceptedTypes` constant
2. Add processing logic in backend
3. Update type definitions in `src/types/index.ts`

### Custom AI Models

Add new models in `ModelSettingsSection.tsx`:

1. Update the `ModelSettings` type
2. Add option to model selector
3. Implement backend support

## 🚧 Development Status

✅ **Completed Features:**

- Complete UI implementation
- Dark/light mode
- Responsive design
- File upload interface
- Chat interface with message history
- Model settings configuration
- Assignment editor
- AI Judge interface
- Collapsible panels

🔄 **In Progress:**

- Backend API integration
- Real file processing
- Actual AI model connections

📋 **Planned Features:**

- User authentication
- Assignment sharing
- Progress tracking
- Usage analytics
- Export functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions, issues, or feature requests:

1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce for bugs
4. Provide context for feature requests

---

**Built with ❤️ for educators and students exploring the world of AI and prompt engineering.**
