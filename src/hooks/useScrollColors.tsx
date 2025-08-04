import { useState, useEffect } from 'react';

interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  gradient: string;
}

const colorThemes: ColorTheme[] = [
  {
    primary: '#FF6B6B', // coral red
    secondary: '#4ECDC4', // teal
    background: '#FDFDFD', // off white
    accent: '#FFE66D', // warm yellow
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFE66D 100%)'
  },
  {
    primary: '#A8E6CF', // mint green
    secondary: '#88D8A3', // forest green
    background: '#F8FFF9', // pale green
    accent: '#C7CEEA', // lavender
    gradient: 'linear-gradient(135deg, #A8E6CF 0%, #88D8A3 50%, #C7CEEA 100%)'
  },
  {
    primary: '#FFB347', // peach
    secondary: '#FFCC5C', // golden yellow
    background: '#FFFBF0', // cream
    accent: '#FF8E53', // orange
    gradient: 'linear-gradient(135deg, #FFB347 0%, #FFCC5C 50%, #FF8E53 100%)'
  },
  {
    primary: '#B19CD9', // purple
    secondary: '#C8A2C8', // lavender
    background: '#FAF8FF', // pale purple
    accent: '#E6E6FA', // light lavender
    gradient: 'linear-gradient(135deg, #B19CD9 0%, #C8A2C8 50%, #E6E6FA 100%)'
  },
  {
    primary: '#87CEEB', // sky blue
    secondary: '#98D8E8', // light blue
    background: '#F0F8FF', // alice blue
    accent: '#B0E0E6', // powder blue
    gradient: 'linear-gradient(135deg, #87CEEB 0%, #98D8E8 50%, #B0E0E6 100%)'
  }
];

export const useScrollColors = () => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[0]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      if (documentHeight > 0) {
        const progress = Math.min(scrollTop / documentHeight, 1);
        setScrollProgress(progress);

        // Calculate which theme to use based on scroll position
        const themeIndex = Math.floor(progress * (colorThemes.length - 1));
        const nextThemeIndex = Math.min(themeIndex + 1, colorThemes.length - 1);
        
        // Interpolate between themes for smooth transitions
        const localProgress = (progress * (colorThemes.length - 1)) - themeIndex;
        
        if (localProgress === 0 || themeIndex === nextThemeIndex) {
          setCurrentTheme(colorThemes[themeIndex]);
        } else {
          // Smooth transition between themes
          setCurrentTheme(colorThemes[themeIndex]);
        }
      }
    };

    const updateCSSVariables = () => {
      const root = document.documentElement;
      root.style.setProperty('--dynamic-primary', currentTheme.primary);
      root.style.setProperty('--dynamic-secondary', currentTheme.secondary);
      root.style.setProperty('--dynamic-background', currentTheme.background);
      root.style.setProperty('--dynamic-accent', currentTheme.accent);
      root.style.setProperty('--dynamic-gradient', currentTheme.gradient);
    };

    window.addEventListener('scroll', handleScroll);
    updateCSSVariables();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentTheme]);

  const getThemeForPage = (pageIndex: number): ColorTheme => {
    return colorThemes[pageIndex % colorThemes.length];
  };

  return {
    currentTheme,
    scrollProgress,
    getThemeForPage,
    colorThemes
  };
};