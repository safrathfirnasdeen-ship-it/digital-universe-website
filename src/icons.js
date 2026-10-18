// Only the Lucide icons this site actually uses, bundled locally.
// Add new icons here when you use them.
import {
  createIcons,
  AlertCircle, ArrowRight, AtSign, Award, BookOpen, Briefcase, Building2, Calculator,
  CalendarCheck, Camera, Check, CheckCircle2, ClipboardCheck, Clock, Code2, CreditCard,
  Eye, FileSpreadsheet, FileText, Gauge, Globe, GraduationCap, Hammer, Heart,
  HeartHandshake, Images, Keyboard, KeyRound, Landmark, Languages, Layers, LifeBuoy, Lock, Mail,
  MapPin, Megaphone, MessageCircle, MessageSquare, Monitor, Navigation, Newspaper,
  Palette, PanelsTopLeft, PenTool, Phone, Plus, RefreshCw, Rocket, School, Search, Send,
  ShieldCheck, ShoppingBag, Smartphone, Sparkles, Stethoscope, Store, TrendingUp, Users,
  UtensilsCrossed, Video, Wifi, X,
} from 'lucide';

const icons = {
  AlertCircle, ArrowRight, AtSign, Award, BookOpen, Briefcase, Building2, Calculator,
  CalendarCheck, Camera, Check, CheckCircle2, ClipboardCheck, Clock, Code2, CreditCard,
  Eye, FileSpreadsheet, FileText, Gauge, Globe, GraduationCap, Hammer, Heart,
  HeartHandshake, Images, Keyboard, KeyRound, Landmark, Languages, Layers, LifeBuoy, Lock, Mail,
  MapPin, Megaphone, MessageCircle, MessageSquare, Monitor, Navigation, Newspaper,
  Palette, PanelsTopLeft, Layout: PanelsTopLeft, PenTool, Phone, Plus, RefreshCw, Rocket,
  School, Search, Send, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Stethoscope, Store,
  TrendingUp, Users, UtensilsCrossed, Video, Wifi, X,
};

// Keep the existing `window.lucide.createIcons()` calls working.
window.lucide = { createIcons: () => createIcons({ icons }) };
