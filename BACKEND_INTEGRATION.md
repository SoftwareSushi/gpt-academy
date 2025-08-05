# GPT Academy - Backend Integration Guide

This document outlines the backend services and API endpoints needed to fully integrate GPT Academy with actual AI services and file processing capabilities.

## 🔧 Required Backend Services

### 1. OpenAI API Integration

**Endpoint**: `POST /api/chat`

**Purpose**: Send prompts to OpenAI and return responses

**Request Body**:

```json
{
  "message": "string",
  "settings": {
    "model": "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo",
    "maxTokens": "number",
    "temperature": "number",
    "topP": "number",
    "frequencyPenalty": "number",
    "presencePenalty": "number"
  },
  "files": [
    {
      "id": "string",
      "name": "string",
      "content": "string",
      "type": "string"
    }
  ]
}
```

**Response**:

```json
{
	"id": "string",
	"role": "assistant",
	"content": "string",
	"timestamp": "ISO string",
	"usage": {
		"promptTokens": "number",
		"completionTokens": "number",
		"totalTokens": "number"
	}
}
```

**Implementation Notes**:

- Combine file contents with user message for context
- Handle OpenAI API rate limits and errors
- Track token usage for billing/limits
- Support streaming responses for better UX

---

### 2. AI Judge Service

**Endpoint**: `POST /api/judge`

**Purpose**: Analyze conversation quality against assignment criteria

**Request Body**:

```json
{
  "messages": [
    {
      "role": "user" | "assistant",
      "content": "string",
      "timestamp": "ISO string"
    }
  ],
  "assignment": {
    "title": "string",
    "instructions": "string",
    "rubric": ["string"]
  }
}
```

**Response**:

```json
{
	"score": "number (0-10)",
	"explanation": "string",
	"improvements": ["string"],
	"strengths": ["string"],
	"rubricScores": {
		"clarity": "number (0-10)",
		"alignment": "number (0-10)",
		"creativity": "number (0-10)",
		"effectiveness": "number (0-10)"
	}
}
```

**Implementation Notes**:

- Use a separate AI model (potentially GPT-4) for evaluation
- Create structured prompts for consistent scoring
- Consider using specialized evaluation models
- Cache results to avoid re-evaluation of identical content

---

### 3. File Processing Service

**Endpoint**: `POST /api/files/process`

**Purpose**: Extract text content from various file types

**Request**: Multipart form data with file upload

**Response**:

```json
{
	"success": "boolean",
	"content": "string",
	"metadata": {
		"originalName": "string",
		"size": "number",
		"type": "string",
		"processedAt": "ISO string"
	},
	"error": "string (optional)"
}
```

**Supported File Types**:

1. **Text Files (.txt)**

   - Direct text extraction
   - UTF-8 encoding support

2. **PDF Documents (.pdf)**

   - Libraries: PyPDF2, pdfplumber, or PDFtk
   - Handle multi-page documents
   - Extract text while preserving structure

3. **Word Documents (.docx)**

   - Libraries: python-docx, mammoth
   - Extract text, headers, and basic formatting
   - Handle tables and lists

4. **CSV Files (.csv)**

   - Parse and format as structured data
   - Convert to readable text format
   - Handle different delimiters and encodings

5. **Images (.png, .jpg, .jpeg)**
   - **OCR Service Options**:
     - Tesseract OCR (open source)
     - Google Cloud Vision API
     - AWS Textract
     - Azure Computer Vision
   - Pre-process images for better OCR results
   - Handle multiple languages

**Implementation Notes**:

- Implement file size limits (e.g., 10MB max)
- Virus scanning for uploaded files
- Store processed content temporarily
- Rate limiting to prevent abuse

---

### 4. User Management (Optional)

**Endpoints**:

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/profile`
- `POST /api/auth/register`

**Purpose**: User authentication and profile management

**Features**:

- Student/Teacher role management
- Assignment sharing between teachers and students
- Progress tracking
- Usage analytics

---

### 5. Assignment Management (Optional)

**Endpoints**:

- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment
- `PUT /api/assignments/:id` - Update assignment
- `DELETE /api/assignments/:id` - Delete assignment
- `GET /api/assignments/:id/submissions` - View student submissions

**Purpose**: Manage assignments and student submissions

---

## 🛠️ Implementation Technologies

### Recommended Stack:

**Backend Framework**:

- Node.js with Express
- Python with FastAPI
- Python with Django/Flask

**Database**:

- PostgreSQL (for structured data)
- MongoDB (for flexible document storage)
- Redis (for caching and sessions)

**File Storage**:

- AWS S3
- Google Cloud Storage
- Local filesystem with proper security

**AI Services**:

- OpenAI API (GPT models)
- Alternative: Anthropic Claude, Google Gemini
- Open source options: Ollama, LocalAI

### Environment Variables:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_ORG_ID=your_org_id (optional)
DATABASE_URL=your_database_connection_string
REDIS_URL=your_redis_connection_string
AWS_ACCESS_KEY_ID=your_aws_key (if using S3)
AWS_SECRET_ACCESS_KEY=your_aws_secret
JWT_SECRET=your_jwt_secret
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com
```

---

## 🔒 Security Considerations

1. **API Security**:

   - Rate limiting on all endpoints
   - Input validation and sanitization
   - CORS configuration
   - Authentication tokens (JWT)

2. **File Upload Security**:

   - File type validation
   - Virus scanning
   - Size limits
   - Secure file storage

3. **AI API Security**:

   - Secure API key storage
   - Usage monitoring and limits
   - Content filtering

4. **Data Privacy**:
   - Don't log sensitive user content
   - Implement data retention policies
   - GDPR compliance considerations

---

## 🚀 Deployment Considerations

### Docker Setup:

```dockerfile
# Example Dockerfile for Node.js backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Required Services:

- Backend API server
- Database (PostgreSQL/MongoDB)
- Redis for caching
- File storage service
- Load balancer (for production)

### Monitoring:

- API response times
- OpenAI API usage and costs
- Error rates
- File processing success rates

---

## 📝 Development Notes

The current frontend implementation includes placeholder hooks in `src/hooks/useApi.ts` that simulate backend calls. Replace these with actual API calls once the backend is implemented.

Key integration points in the frontend:

- `ChatInterface.tsx` - Needs real OpenAI integration
- `KnowledgeUploadSection.tsx` - Needs file processing service
- `AIJudgeSection.tsx` - Needs AI judge service
- `ModelSettingsSection.tsx` - Settings should be passed to backend
