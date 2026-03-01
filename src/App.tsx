import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Twitter, 
  Calendar, 
  Zap, 
  Settings, 
  ChevronRight, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen, 
  BarChart3, 
  Wrench, 
  Users, 
  TrendingUp, 
  Camera, 
  Coffee,
  PenTool
} from 'lucide-react';
import { DayOfWeek, STRATEGY, WeeklyStrategy } from './types';
import { generateTweets } from './services/gemini';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface GeneratedTweet {
  content: string;
  type: string;
  imagePrompt: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'strategy' | 'generator'>('generator');
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTweets, setGeneratedTweets] = useState<GeneratedTweet[]>([]);
  const [copiedState, setCopiedState] = useState<{ index: number; type: 'content' | 'image' } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const tweets = await generateTweets(selectedDay, topic);
      setGeneratedTweets(tweets);
    } catch (error) {
      console.error('Generation failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, index: number, type: 'content' | 'image') => {
    navigator.clipboard.writeText(text);
    setCopiedState({ index, type });
    setTimeout(() => setCopiedState(null), 2000);
  };

  const getIconForDay = (day: DayOfWeek) => {
    switch (day) {
      case 'Monday': return <TrendingUp className="w-4 h-4" />;
      case 'Tuesday': return <BarChart3 className="w-4 h-4" />;
      case 'Wednesday': return <PenTool className="w-4 h-4" />;
      case 'Thursday': return <Users className="w-4 h-4" />;
      case 'Friday': return <Zap className="w-4 h-4" />;
      case 'Saturday': return <Camera className="w-4 h-4" />;
      case 'Sunday': return <Coffee className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#141414] flex flex-col">
        <div className="p-6 border-bottom border-[#141414]">
          <div className="flex items-center gap-2 mb-2">
            <Twitter className="w-6 h-6 fill-current" />
            <h1 className="text-xl font-bold tracking-tight italic serif">X-STRATEGIST</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-50 font-mono">Biplab Biswas Edition</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('generator')}
            className={`w-full flex items-center justify-between p-3 transition-all duration-200 ${activeTab === 'generator' ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
          >
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Content Generator</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'generator' ? 'rotate-90' : ''}`} />
          </button>

          <button 
            onClick={() => setActiveTab('strategy')}
            className={`w-full flex items-center justify-between p-3 transition-all duration-200 ${activeTab === 'strategy' ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">Weekly Strategy</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === 'strategy' ? 'rotate-90' : ''}`} />
          </button>
        </nav>

        <div className="p-6 border-t border-[#141414] opacity-50">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-[#E4E3E0] font-bold">B</div>
            <div>
              <p className="text-xs font-bold">Biplab Biswas</p>
              <p className="text-[10px] font-mono">@biplab_expert</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-bottom border-[#141414] flex items-center justify-between px-8 bg-[#E4E3E0]/80 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50 font-mono">System Status: </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Operational
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono opacity-50">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'generator' ? (
              <motion.div 
                key="generator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-4xl mx-auto space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <section className="space-y-4">
                      <label className="text-[11px] uppercase tracking-widest opacity-50 font-mono block italic serif">Select Day of Week</label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {DAYS.map((day) => (
                          <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`p-2 border border-[#141414] text-[10px] font-mono transition-all duration-200 ${selectedDay === day ? 'bg-[#141414] text-[#E4E3E0]' : 'hover:bg-[#141414]/5'}`}
                          >
                            {day.substring(0, 3).toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] uppercase tracking-widest opacity-50 font-mono block italic serif">Optional: Specific Topic</label>
                        <span className="text-[10px] font-mono opacity-30">Leave empty for auto-strategy</span>
                      </div>
                      <input 
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. YouTube Shorts Algorithm, Scripting with AI..."
                        className="w-full bg-transparent border border-[#141414] p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all"
                      />
                    </section>

                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-[#141414] text-[#E4E3E0] p-4 font-bold tracking-widest uppercase text-xs flex items-center justify-center gap-3 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Generating Unique Content...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          Generate 4 Daily Tweets
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-[#141414] p-6 space-y-4 bg-[#141414]/5">
                      <div className="flex items-center gap-2">
                        {getIconForDay(selectedDay)}
                        <h3 className="text-sm font-bold uppercase tracking-tight italic serif">{selectedDay} Strategy</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] font-mono uppercase opacity-50">Focus</p>
                          <p className="text-xs font-medium">{STRATEGY[selectedDay].title}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase opacity-50">Description</p>
                          <p className="text-xs leading-relaxed">{STRATEGY[selectedDay].description}</p>
                        </div>
                        <div className="pt-2 border-t border-[#141414]/10">
                          <p className="text-[10px] font-mono uppercase opacity-50">Content Angle</p>
                          <p className="text-xs italic">"{STRATEGY[selectedDay].example}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                {generatedTweets.length > 0 && (
                  <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6 pt-8 border-t border-[#141414]"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold italic serif tracking-tight">Generated Content</h2>
                      <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">4 Unique Posts</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedTweets.map((tweet, idx) => (
                        <div key={idx} className="group border border-[#141414] p-6 bg-white hover:bg-[#141414] hover:text-[#E4E3E0] transition-all duration-300 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 group-hover:opacity-100">{tweet.type}</span>
                            <button 
                              onClick={() => copyToClipboard(tweet.content, idx, 'content')}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded flex items-center gap-1.5"
                            >
                              <span className="text-[10px] font-mono uppercase">Copy Post</span>
                              {copiedState?.index === idx && copiedState?.type === 'content' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1 font-medium italic serif">
                            {tweet.content}
                          </p>
                          
                          <div className="mt-6 pt-4 border-t border-[#141414]/10 group-hover:border-white/10 space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 opacity-50 group-hover:opacity-100">
                                <Camera className="w-3 h-3" />
                                <span className="text-[10px] font-mono uppercase tracking-widest">Image Prompt</span>
                              </div>
                              <button 
                                onClick={() => copyToClipboard(tweet.imagePrompt, idx, 'image')}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded flex items-center gap-1.5"
                              >
                                <span className="text-[10px] font-mono uppercase">Copy Prompt</span>
                                {copiedState?.index === idx && copiedState?.type === 'image' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                            <p className="text-[11px] leading-relaxed opacity-60 group-hover:opacity-80 italic">
                              {tweet.imagePrompt}
                            </p>
                          </div>

                          <div className="mt-4 pt-4 border-t border-[#141414]/10 group-hover:border-white/10 flex items-center justify-between">
                            <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100">{tweet.content.length} chars</span>
                            <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100">Ready to post</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.section>
                )}
              </motion.div>
            ) : (
              <motion.div 
                key="strategy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto"
              >
                <div className="mb-12 space-y-2">
                  <h2 className="text-4xl font-bold italic serif tracking-tight uppercase">The Weekly Masterplan</h2>
                  <p className="text-sm opacity-60 font-mono">Designed for maximum authority and growth in the YouTube niche.</p>
                </div>

                <div className="grid grid-cols-1 divide-y divide-[#141414] border-y border-[#141414]">
                  {DAYS.map((day) => (
                    <div key={day} className="group grid grid-cols-1 md:grid-cols-4 py-8 hover:bg-[#141414] hover:text-[#E4E3E0] transition-all duration-300 px-4">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <span className="text-2xl font-bold italic serif opacity-20 group-hover:opacity-100">{day.substring(0, 3)}</span>
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-tight">{day}</h3>
                          <span className="text-[10px] font-mono opacity-50 uppercase group-hover:opacity-100">{STRATEGY[day].focus}</span>
                        </div>
                      </div>
                      <div className="md:col-span-2 flex items-center">
                        <p className="text-sm leading-relaxed max-w-md">{STRATEGY[day].description}</p>
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="text-right">
                          <p className="text-[10px] font-mono uppercase opacity-30 group-hover:opacity-100 mb-1">Example Angle</p>
                          <p className="text-xs italic opacity-60 group-hover:opacity-100">"{STRATEGY[day].example}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 border border-[#141414] bg-[#141414]/5 space-y-4">
                  <h3 className="text-lg font-bold italic serif uppercase tracking-tight">Core Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest">Authority First</p>
                      <p className="text-xs opacity-70">Always provide data or specific examples. Never just "advice".</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest">Value Loop</p>
                      <p className="text-xs opacity-70">Every tweet should either teach, inspire, or solve a problem.</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-widest">Consistency</p>
                      <p className="text-xs opacity-70">4 tweets a day keeps the algorithm happy and the audience engaged.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
