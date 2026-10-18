// Only the Lucide icons this site actually uses, bundled locally.
// Replaces the full library previously loaded from unpkg.com/lucide@latest
// (render-blocking, ~1,500 icons). Add new icons here when you use them.
import {
  createIcons,
  AlertCircle, ArrowRight, Award, BookOpen, Briefcase, Calculator,
  CheckCircle2, ClipboardCheck, Clock, Code2, FileSpreadsheet, GraduationCap,
  Heart, Keyboard, Layers, PanelsTopLeft, Mail, MapPin, MessageCircle,
  MessageSquare, Monitor, Navigation, Palette, Phone, Send, ShieldCheck,
  Sparkles, TrendingUp, Users, Video, Wifi, X,
} from 'lucide';

const icons = {
  AlertCircle, ArrowRight, Award, BookOpen, Briefcase, Calculator,
  CheckCircle2, ClipboardCheck, Clock, Code2, FileSpreadsheet, GraduationCap,
  Heart, Keyboard, Layers, Layout: PanelsTopLeft, Mail, MapPin, MessageCircle,
  MessageSquare, Monitor, Navigation, Palette, Phone, Send, ShieldCheck,
  Sparkles, TrendingUp, Users, Video, Wifi, X,
};

// Keep the existing `window.lucide.createIcons()` calls working.
window.lucide = { createIcons: () => createIcons({ icons }) };
