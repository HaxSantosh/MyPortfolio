import React from 'react';

const TerminalElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-20 dark:opacity-40">
      {/* Top left digital readout */}
      <div className="absolute top-4 left-4 text-xs font-mono text-green-500 dark:text-hacker-primary">
        <div className="flex">
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full mr-1">0</span>
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full">1</span>
        </div>
        <div className="flex my-1">
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full mr-1">2</span>
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full">3</span>
        </div>
        <div className="flex my-1">
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full mr-1">4</span>
          <span className="px-2 py-1 border border-green-500 dark:border-hacker-primary rounded-full">5</span>
        </div>
        <div className="mt-1 text-center">
          <span>23/19/67</span>
        </div>
      </div>

      {/* Bottom left wireframe globe */}
      <div className="absolute bottom-8 left-8 border border-green-500 dark:border-hacker-primary rounded w-32 h-32 flex items-center justify-center">
        <div className="w-24 h-24 border-2 border-green-500/30 dark:border-hacker-primary/30 rounded-full flex items-center justify-center animate-spin-slow">
          <div className="w-20 h-20 border border-green-500/50 dark:border-hacker-primary/50 rounded-full"></div>
        </div>
        <div className="absolute top-0 right-0 left-0 bottom-0">
          <div className="w-full h-full border-t border-green-500/30 dark:border-hacker-primary/30"></div>
          <div className="w-full h-full border-r border-green-500/30 dark:border-hacker-primary/30"></div>
          <div className="absolute bottom-0 left-0 text-[9px] text-green-500 dark:text-hacker-primary">TERMINAL_68</div>
        </div>
      </div>
      
      {/* Top right system monitor */}
      <div className="absolute top-4 right-4 border border-green-500 dark:border-hacker-primary rounded p-1">
        <div className="flex justify-between text-[8px] text-green-500 dark:text-hacker-primary mb-1">
          <span>SYSTEM MONITOR</span>
          <span>CPU: 42%</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <div 
              key={i} 
              className="h-4 w-4 flex items-center justify-center rounded text-[8px] text-green-500 dark:text-hacker-primary border border-green-500/50 dark:border-hacker-primary/50 hover:bg-green-500/20 dark:hover:bg-hacker-primary/20"
            >
              {String.fromCharCode(65 + i % 26)}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom right status indicators */}
      <div className="absolute bottom-8 right-8 text-green-500 dark:text-hacker-primary">
        <div className="grid grid-cols-3 gap-1 text-[8px]">
          {["SYS", "NET", "CPU", "MEM", "I/O", "SEC"].map((label) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full border border-green-500 dark:border-hacker-primary mb-1">
                <div className={`w-2 h-2 rounded-full bg-green-500 dark:bg-hacker-primary m-1 ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'}`}></div>
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Center code readouts */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="border border-green-500 dark:border-hacker-primary p-2 rounded bg-black/30 backdrop-blur-sm">
          <div className="text-[10px] text-green-500 dark:text-hacker-primary font-mono mb-1">ARRAY 559FE03/11</div>
          <div className="text-[10px] text-green-500 dark:text-hacker-primary font-mono mb-1">B_ARRAY B76/4CCE76</div>
          <div className="text-[10px] text-green-500 dark:text-hacker-primary font-mono">K_ARRAY 4FA7F/CD5AB</div>
        </div>
      </div>
    </div>
  );
};

export default TerminalElements;
