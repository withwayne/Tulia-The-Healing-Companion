import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

interface Target {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const NotebookSection = () => {
  const [targets, setTargets] = useState<Target[]>([]);
  const [newTargetText, setNewTargetText] = useState('');
  const [isAddingTarget, setIsAddingTarget] = useState(false);

  useEffect(() => {
    // Load targets from localStorage
    const today = new Date().toDateString();
    const storedTargets = localStorage.getItem(`daily-targets-${today}`);
    if (storedTargets) {
      setTargets(JSON.parse(storedTargets));
    }
  }, []);

  const saveTargets = (updatedTargets: Target[]) => {
    const today = new Date().toDateString();
    localStorage.setItem(`daily-targets-${today}`, JSON.stringify(updatedTargets));
    setTargets(updatedTargets);
  };

  const addTarget = () => {
    if (newTargetText.trim()) {
      const newTarget: Target = {
        id: Date.now().toString(),
        text: newTargetText.trim(),
        completed: false,
        createdAt: new Date()
      };
      const updatedTargets = [...targets, newTarget];
      saveTargets(updatedTargets);
      setNewTargetText('');
      setIsAddingTarget(false);
    }
  };

  const toggleTarget = (id: string) => {
    const updatedTargets = targets.map(target =>
      target.id === id ? { ...target, completed: !target.completed } : target
    );
    saveTargets(updatedTargets);
  };

  const removeTarget = (id: string) => {
    const updatedTargets = targets.filter(target => target.id !== id);
    saveTargets(updatedTargets);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTarget();
    } else if (e.key === 'Escape') {
      setIsAddingTarget(false);
      setNewTargetText('');
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Daily Targets
          </h2>
          <p className="text-muted-foreground text-lg">
            Write down your goals and check them off as you achieve them
          </p>
        </div>

        {/* Notebook Style Container */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="bg-gradient-to-br from-yellow-50 to-yellow-100/90 rounded-2xl p-8 shadow-floating border-l-4 border-red-300 relative transform rotate-1 hover:rotate-0 transition-transform duration-300"
            style={{
              background: `
                linear-gradient(135deg, #fefce8 0%, #fef3c7 100%),
                repeating-linear-gradient(
                  transparent,
                  transparent 28px,
                  #e5e7eb 28px,
                  #e5e7eb 30px
                ),
                linear-gradient(
                  90deg,
                  #ef4444 0px,
                  #ef4444 3px,
                  transparent 3px,
                  transparent 40px
                )
              `,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
            }}
          >
            {/* Notebook Header */}
            <div className="mb-6 pb-4 border-b-2 border-dashed border-gray-400/50">
              <h3 className="text-xl font-bold text-gray-800 mb-2 transform -rotate-1" style={{
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                Today's Targets ✏️
              </h3>
              <p className="text-sm text-gray-600 italic transform rotate-0.5" style={{
                fontFamily: 'Comic Sans MS, cursive'
              }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Targets List */}
            <div className="space-y-4 mb-6">
              {targets.map((target, index) => (
                <div 
                  key={target.id} 
                  className="flex items-center space-x-3 group hover:bg-yellow-100/50 rounded-lg p-2 transition-colors duration-200 transform hover:-rotate-0.5"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 0.3 : -0.2)}deg)`
                  }}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTarget(target.id)}
                    className={`w-6 h-6 border-2 rounded-sm transition-all duration-200 flex items-center justify-center transform hover:scale-110 ${
                      target.completed 
                        ? 'bg-green-400 border-green-600 text-white shadow-md' 
                        : 'bg-white border-gray-600 hover:border-green-500 shadow-sm'
                    }`}
                    style={{
                      boxShadow: target.completed ? '2px 2px 4px rgba(0,0,0,0.2)' : '1px 1px 2px rgba(0,0,0,0.1)',
                      transform: `rotate(${target.completed ? '0deg' : '1deg'})`
                    }}
                  >
                    {target.completed && (
                      <svg className="w-4 h-4 font-bold" fill="currentColor" viewBox="0 0 20 20" style={{
                        filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))'
                      }}>
                        <path strokeWidth="2" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </button>

                  {/* Target Text */}
                  <span 
                    className={`flex-1 transition-all duration-200 text-lg ${
                      target.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-800'
                    }`}
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)'
                    }}
                  >
                    {target.text}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeTarget(target.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-all duration-200 transform hover:scale-110"
                  >
                    <X className="w-4 h-4" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))' }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Target */}
            <div className="space-y-3">
              {isAddingTarget ? (
                <div className="flex items-center space-x-3 transform -rotate-0.5">
                  <div className="w-6 h-6 border-2 border-gray-600 rounded-sm bg-white shadow-sm"></div>
                  <input
                    type="text"
                    value={newTargetText}
                    onChange={(e) => setNewTargetText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Write your target..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 border-b-2 border-dashed border-gray-400 pb-1 text-lg"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)'
                    }}
                    autoFocus
                  />
                  <button
                    onClick={addTarget}
                    className="px-4 py-2 bg-green-400 text-white rounded-lg text-sm hover:bg-green-500 transition-colors duration-200 shadow-md transform hover:scale-105"
                    style={{
                      fontFamily: 'Comic Sans MS, cursive',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}
                  >
                    Add ✓
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingTarget(true)}
                  className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors duration-200 w-full p-2 rounded-lg hover:bg-yellow-100/50 transform hover:-rotate-0.5"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  <Plus className="w-5 h-5" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))' }} />
                  <span className="text-lg">Add a new target ✏️</span>
                </button>
              )}
            </div>

            {/* Progress Summary */}
            {targets.length > 0 && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-400/50">
                <div className="flex items-center justify-between text-sm transform rotate-0.5">
                  <span className="text-gray-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Progress: {targets.filter(t => t.completed).length} of {targets.length} completed 🎯
                  </span>
                  <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-400 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 shadow-sm"
                      style={{ 
                        width: `${targets.length > 0 ? (targets.filter(t => t.completed).length / targets.length) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotebookSection;