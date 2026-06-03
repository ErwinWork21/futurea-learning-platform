import { useState } from 'react';
import StudentWorkspace from './components/StudentWorkspace';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState("python-lists-1");

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans flex flex-col">
      {/* Top Navigation for Platform Prototype */}
      <nav className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-900/50">
            F
          </div>
          <span className="font-bold text-lg tracking-tight">Futurea Learning</span>
        </div>
        
        {/* Simple Lesson Switcher for Prototype */}
        <select 
          value={currentLessonId}
          onChange={(e) => setCurrentLessonId(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-indigo-500 transition cursor-pointer"
        >
          <option value="python-lists-1">Python: Modifying Lists</option>
          <option value="web-dev-html-1">Web Dev: HTML Buttons</option>
          <option value="ai-engineer-1">AI: Basic Prompting</option>
        </select>
      </nav>

      {/* Main Workspace Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <StudentWorkspace lessonId={currentLessonId} />
      </main>
    </div>
  );
}

export default App;
