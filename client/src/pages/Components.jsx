import { useState, useEffect } from 'react';
import { fetchComponents } from '../lib/api';
import { Loader2 } from 'lucide-react';

function Components() {
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetchComponents();
      setComponents(res.data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Components</h1>
        <p className="text-[var(--text-secondary)]">Pre-built, customizable Roblox UI components.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--accent-primary)]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map(comp => (
            <div key={comp.id} className="glass rounded-xl border border-[var(--border-color)] p-6 hover:border-[var(--accent-primary)] transition-all group">
              <h3 className="font-bold text-xl mb-4">{comp.name}</h3>
              <div className="h-32 bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center border border-[var(--border-color)] mb-4">
                 {/* Visual Mock for the component */}
                 <button className="px-6 py-2 bg-[var(--accent-primary)] hover:bg-[#5b4dcf] text-white rounded-lg font-bold transition-all group-hover:anim-pulse">
                   Primary Button
                 </button>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                A standard primary action button with hover states.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Components;
