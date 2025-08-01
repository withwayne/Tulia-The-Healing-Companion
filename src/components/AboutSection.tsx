import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AboutModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutModal = ({ isOpen, onOpenChange }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            About Tulia
          </DialogTitle>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
        </DialogHeader>
        
        <div className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6">
          <p className="text-lg font-medium text-center mb-8 text-primary">
            Tulia – The Healing Companion was born in 2025, inspired by a simple but powerful need: to create a safe, gentle space where anyone can pause, breathe, and begin to heal.
          </p>
          
          <p>
            In a world that often moves too fast and listens too little, Tulia was built as a digital sanctuary — a comforting companion that offers support, encouragement, and understanding to anyone navigating emotional pain, stress, anxiety, or simply a difficult day.
          </p>
          
          <p>
            At the heart of Tulia is <strong>Imani</strong>, a soft-spoken, AI-powered chatbot designed to listen, uplift, and guide users using the powerful technology of ChatGPT. "Imani" means faith, while "Tulia" means to be still — two values deeply rooted in emotional recovery.
            Imani is always available — no appointments, no judgments, just a kind presence when you need it most.
          </p>
          
          <p>
            Created by <strong>Wayne Kabaraji</strong>, Tulia exists to gently remind you that:
          </p>
          
          <div className="bg-card p-6 rounded-lg shadow-soft my-8 border">
            <ul className="space-y-3 text-base font-medium text-primary">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-4"></span>
                You are not alone.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-4"></span>
                You are allowed to pause.
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-4"></span>
                Healing is not linear — and that's okay.
              </li>
            </ul>
          </div>
          
          <p className="text-base text-center">
            Whether you're looking for daily affirmations, a quiet space to reflect, or someone to talk to when the weight gets heavy, Tulia is here — in your pocket, on your phone, anytime you need a companion on the path to emotional wellness.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;