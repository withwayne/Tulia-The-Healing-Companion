import { useState } from 'react';

const Footer = () => {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  return (
    <footer className="bg-gradient-to-t from-muted/30 to-background py-12 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-float hover:scale-150 hover:bg-secondary transition-all duration-500 cursor-pointer" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-accent rounded-full blur-3xl animate-float hover:scale-150 hover:bg-primary transition-all duration-500 cursor-pointer" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-secondary rounded-full blur-3xl animate-float hover:scale-150 hover:bg-accent transition-all duration-500 cursor-pointer" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto max-w-4xl text-center">
        {/* Main Footer Content */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer mb-4">
            Tulia – The Healing Companion
          </h3>

          <p className="text-lg text-primary font-medium mb-6 hover:scale-105 transition-transform duration-300 cursor-default">
            Created with love for healing hearts 💛
          </p>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed hover:text-foreground transition-colors duration-300 cursor-default">
            Remember: You are not alone in your journey. Every step forward, 
            no matter how small, is a victory worth celebrating.
          </p>
        </div>

        {/* Contact Section */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-500 interactive-card">
          <h4 className="text-lg font-semibold text-foreground mb-4 hover:text-primary transition-colors duration-300">
            Need Additional Support?
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
            <a
              href="mailto:kabarajiwayne@gmail.com"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 group"
              onMouseEnter={() => setHoveredContact('email')}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${hoveredContact === 'email' ? 'animate-bounce-gentle' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300">Email Support</span>
            </a>

            <div className="w-px h-6 bg-border hidden sm:block"></div>

            <a
              href="https://wa.me/254776149310"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110 group"
              onMouseEnter={() => setHoveredContact('whatsapp')}
              onMouseLeave={() => setHoveredContact(null)}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${hoveredContact === 'whatsapp' ? 'animate-wiggle' : ''}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span className="group-hover:translate-x-1 transition-transform duration-300">WhatsApp</span>
            </a>
          </div>

          <p className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
            If you're experiencing a mental health emergency, please contact your local emergency services or crisis hotline immediately.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          <p className="hover:text-primary transition-colors duration-300 cursor-default">
            © 2025 Tulia – The Healing Companion. Made with care for your wellbeing.
          </p>
        </div>

        {/* Floating Hearts */}
        <div className="absolute bottom-20 left-1/4 w-4 h-4 text-primary/30 animate-float hover:scale-150 hover:text-primary/60 transition-all duration-300 cursor-pointer" style={{ animationDelay: '1s' }}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 right-1/3 w-3 h-3 text-accent/40 animate-float hover:scale-150 hover:text-accent/70 transition-all duration-300 cursor-pointer" style={{ animationDelay: '2s' }}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
