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
            className="bg-gradient-to-br from-card to-card/90 rounded-2xl p-8 shadow-floating border-l-4 border-primary/30 relative"
            style={{
              background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card))/0.95 100%)`,
              backgroundImage: `
                repeating-linear-gradient(
                  transparent,
                  transparent 30px,
                  hsl(var(--border)) 30px,
                  hsl(var(--border)) 31px
                ),
                linear-gradient(
                  90deg,
                  hsl(var(--primary))/0.1 0px,
                  hsl(var(--primary))/0.1 2px,
                  transparent 2px,
                  transparent 40px
                )
              `
            }}
          >
            {/* Notebook Header */}
            <div className="mb-6 pb-4 border-b border-border/30">
              <h3 className="text-xl font-semibold text-foreground mb-2 handwriting">
                Today's Targets
              </h3>
              <p className="text-sm text-muted-foreground">
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
                  className="flex items-center space-x-3 group hover:bg-muted/20 rounded-lg p-2 transition-colors duration-200"
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTarget(target.id)}
                    className={`w-5 h-5 border-2 rounded transition-all duration-200 flex items-center justify-center ${
                      target.completed 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-muted-foreground hover:border-primary'
                    }`}
                  >
                    {target.completed && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    )}
                  </button>

                  {/* Target Text */}
                  <span 
                    className={`flex-1 transition-all duration-200 ${
                      target.completed 
                        ? 'line-through text-muted-foreground' 
                        : 'text-foreground'
                    }`}
                  >
                    {target.text}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeTarget(target.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Target */}
            <div className="space-y-3">
              {isAddingTarget ? (
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded"></div>
                  <input
                    type="text"
                    value={newTargetText}
                    onChange={(e) => setNewTargetText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Write your target..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground border-b border-primary/30 pb-1"
                    autoFocus
                  />
                  <button
                    onClick={addTarget}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingTarget(true)}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-primary transition-colors duration-200 w-full p-2 rounded-lg hover:bg-muted/20"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add a new target</span>
                </button>
              )}
            </div>

            {/* Progress Summary */}
            {targets.length > 0 && (
              <div className="mt-6 pt-4 border-t border-border/30">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Progress: {targets.filter(t => t.completed).length} of {targets.length} completed
                  </span>
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
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