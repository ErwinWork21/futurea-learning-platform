import { useState, useEffect } from 'react';
import { useLesson } from '../hooks/useLesson';
import { Play, ChevronLeft, ChevronRight, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

export default function StudentWorkspace({ lessonId }: { lessonId: string }) {
  const { lesson, loading, error } = useLesson(lessonId);
  const [hintLevel, setHintLevel] = useState(0);
  const [codeInput, setCodeInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    if (lesson) {
      setCodeInput(lesson.startingCode);
      setHintLevel(0);
      setConsoleOutput("");
      setIsSuccess(null);
    }
  }, [lesson]);

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">Loading lesson...</div>;
  }

  if (error || !lesson) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-rose-400">Error: {error}</div>;
  }

  const handleRevealHint = () => {
    if (hintLevel < lesson.hints.length) {
      setHintLevel(prev => prev + 1);
    }
  };

  const handleRunCode = () => {
    // Basic simulation logic based on correctOutput. 
    // In reality, this would hit an API endpoint or use a local executor (like Pyodide).
    // Here we do a naive check for the prototype.
    const normalizedInput = codeInput.replace(/\s+/g, '');
    const normalizedRequired = lesson.correctOutput.replace(/\s+/g, '');
    
    // For python-lists-1 specifically, we look for 'orange' assignment and print(cart)
    const passed = codeInput.includes(lesson.correctOutput) || 
                  (codeInput.includes('cart[0]') && codeInput.includes('orange') && codeInput.includes('print(cart)')) ||
                  (codeInput.includes('<button>Click Me!</button>')) ||
                  (codeInput.includes('You are a helpful math tutor'));

    if (passed) {
      setConsoleOutput(lesson.correctOutput || "Execution Successful");
      setIsSuccess(true);
    } else {
      setConsoleOutput("SyntaxError / Incorrect Output: Review your logic and try again.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans p-4 lg:p-6 flex flex-col">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <div className="flex gap-2 items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-900">
              {lesson.subject}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-900">
              {lesson.difficulty}
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{lesson.title}</h1>
        </div>
        <div className="flex gap-3 text-sm font-medium w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-slate-800/80 rounded-lg hover:bg-slate-700 transition border border-slate-700">
            <ChevronLeft size={16} /> Back
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/20 border border-indigo-500">
            Next <ChevronRight size={16} />
          </button>
        </div>
      </header>

      {/* Main Split Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* LEFT COLUMN: Media, Instructions & Hints */}
        <div className="flex flex-col gap-6 overflow-y-auto pr-2 pb-6 custom-scrollbar">
          
          {/* Video Player Section */}
          {lesson.videoUrl && (
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-black aspect-video relative group">
              {/* Fallback overlay for prototype without real iframe src */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 group-hover:bg-slate-900/60 transition cursor-pointer">
                 <div className="flex flex-col items-center gap-3">
                   <div className="w-16 h-16 rounded-full bg-indigo-600/90 flex items-center justify-center text-white shadow-lg shadow-indigo-900/50">
                     <Play className="ml-1" size={28} />
                   </div>
                   <span className="font-medium text-slate-300">Play Tutorial Video</span>
                 </div>
              </div>
            </div>
          )}

          {/* Instructions Block */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3 mb-4 flex items-center gap-2">
              📝 Instructions
            </h2>
            <div className="text-slate-300 leading-relaxed text-sm whitespace-pre-line prose prose-invert">
              {lesson.instructions}
            </div>
          </div>

          {/* Progressive Hint Interface */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold tracking-wide uppercase text-slate-400 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-400" /> Need Help?
              </h3>
              {hintLevel < lesson.hints.length && (
                <button 
                  onClick={handleRevealHint}
                  className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition font-medium flex items-center gap-1 shadow-sm"
                >
                  Unlock Hint ({hintLevel}/{lesson.hints.length})
                </button>
              )}
            </div>

            {/* Rendered Hints Loop */}
            <div className="space-y-3">
              {hintLevel === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-4">Click "Unlock Hint" if you get stuck.</p>
              ) : (
                [...Array(hintLevel)].map((_, index) => (
                  <div key={index} className="p-4 bg-amber-950/20 border border-amber-900/50 text-amber-200 text-sm rounded-lg animate-fadeIn shadow-inner">
                    <span className="font-bold block text-xs text-amber-500/80 uppercase mb-2">Hint #{index + 1}</span>
                    <p className="whitespace-pre-line font-mono text-xs leading-relaxed text-amber-100/90">{lesson.hints[index]}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Code Workspace & Live Feedback Terminal */}
        <div className="flex flex-col gap-4 h-[600px] lg:h-full pb-6">
          {/* Code Editor Screen */}
          <div className="flex-1 flex flex-col bg-[#0d1117] border border-slate-700/60 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-3 flex justify-between items-center border-b border-slate-700/60">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                workspace.{lesson.subject === 'Python' ? 'py' : lesson.subject === 'Web Development' ? 'html' : 'txt'}
              </span>
              <button 
                onClick={handleRunCode}
                className="bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-1.5 rounded-lg transition shadow-lg shadow-emerald-900/20 border border-emerald-500 flex items-center gap-1.5"
              >
                <Play size={14} fill="currentColor" /> Run Code
              </button>
            </div>
            <textarea
              className="w-full flex-1 p-5 bg-transparent text-emerald-400 font-mono text-[13px] focus:outline-none resize-none leading-loose"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              spellCheck="false"
              placeholder="Type your code here..."
            />
          </div>

          {/* Console Output Screen */}
          <div className="h-48 bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 font-mono text-xs flex flex-col shadow-inner relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-3 flex items-center gap-2">
              <span className="text-emerald-500 animate-pulse">●</span> Terminal Output
            </span>
            <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-slate-300 font-medium">
              {consoleOutput || <span className="text-slate-600 italic">Waiting for execution...</span>}
            </div>
            
            {/* Feedback Toast embedded in terminal */}
            {isSuccess !== null && (
              <div className={`mt-3 p-3 rounded-lg border flex items-start gap-2 ${
                isSuccess 
                  ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400' 
                  : 'bg-rose-950/30 border-rose-900/50 text-rose-400'
              } animate-fadeIn`}>
                {isSuccess ? <CheckCircle2 size={16} className="mt-0.5 shrink-0" /> : <XCircle size={16} className="mt-0.5 shrink-0" />}
                <span className="font-sans font-medium text-sm">
                  {isSuccess 
                    ? "Verification Success! Great job." 
                    : "Validation Failed. Please review your code or check the hints."}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
