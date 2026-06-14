export const CATEGORIES = [
  { id:"food",          label:"Food & Dining",    icon:"🍽️", color:"#FF6B6B" },
  { id:"transport",     label:"Transport",         icon:"🚗", color:"#4ECDC4" },
  { id:"shopping",      label:"Shopping",          icon:"🛍️", color:"#A78BFA" },
  { id:"health",        label:"Health",            icon:"💊", color:"#34D399" },
  { id:"bills",         label:"Bills & Utilities", icon:"⚡", color:"#FBBF24" },
  { id:"entertainment", label:"Entertainment",     icon:"🎬", color:"#F472B6" },
  { id:"education",     label:"Education",         icon:"📚", color:"#60A5FA" },
  { id:"other",         label:"Other",             icon:"📦", color:"#94A3B8" },
];
export const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
export const DEFAULT_BUDGETS = { food:5000, transport:2000, shopping:5000, health:2000, bills:3000, entertainment:2000, education:3000, other:2000 };
export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(amount);
}
export function todayString() { return new Date().toISOString().split("T")[0]; }
export function getDateParts(dateStr) { const d=new Date(dateStr); return {day:d.getDate(),month:d.getMonth(),year:d.getFullYear()}; }
export function getCategoryById(id) { return CATEGORIES.find(c=>c.id===id)||CATEGORIES[7]; }
export const DARK  = { bg:"#0A0A0F", surface:"#13131E", surface2:"#1A1A2E", border:"#2A2A45", text:"#E8E8FF", textMuted:"#6B6B99", accent:"#7C3AED", green:"#00FF94", blue:"#00C8FF" };
export const LIGHT = { bg:"#F0F4FF", surface:"#FFFFFF",  surface2:"#F8FAFF", border:"#E2E8F0", text:"#1A1A3E", textMuted:"#64748B", accent:"#7C3AED", green:"#059669",  blue:"#0284C7"  };
