# Discussion Forum Module

A real-time discussion forum application built with React, Django, and RabbitMQ.

## Tech Stack

### Frontend
- React 18+ with TypeScript  
- TanStack Query (React Query) for data fetching  
- React Router v6 for routing  
- TailwindCSS + DaisyUI for styling  
- Vite as build tool  

### Backend
- Django 4.2+  
- Django REST Framework  
- Celery for async tasks  
- RabbitMQ for message queue  
- PostgreSQL database  

## Prerequisites
- Node.js 18+  
- Python 3.11+  
- Docker and Docker Compose  
- PostgreSQL 15  
- RabbitMQ 3.12+  

## Local Development Setup

### Backend Setup
1. **Navigate to backend directory**  
   ```bash
   cd backend
   ```
2. **Create virtual environment**  
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies**  
   ```bash
   pip install -r requirements.txt
   ```
4. **Start Docker services**  
   ```bash
   docker compose --env-file .env.development up --build    
   ```
5. **Create superuser (optional)**  
   ```bash
   python manage.py createsuperuser
   ```
6. **Run development server**  
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. **Navigate to frontend directory**  
   ```bash
   cd frontend
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```
3. **Start development server**  
   ```bash
   npm run dev
   ```