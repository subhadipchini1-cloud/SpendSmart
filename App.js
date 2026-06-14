import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, Platform } from "react-native";
import { useTheme } from "./hooks/useTheme";
import { useExpenses } from "./hooks/useExpenses";
import { Toast } from "./components/UI";
import Dashboard from "./components/Dashboard";
import AddExpense from "./components/AddExpense";
import History from "./components/History";
import Analytics from "./components/Analytics";
import Budget from "./components/Budget";

const TABS = [
  { id: "dashboard", icon: "🏠", label: "Home" },
  { id: "add",       icon: "➕", label: "Add" },
  { id: "history",   icon: "📋", label: "History" },
  { id: "analytics", icon: "📊", label: "Charts" },
  { id: "budget",    icon: "🎯", label: "Budget" },
];

export default function App() {
  const { isDark, theme, toggleTheme } = useTheme();
  const expenseData = useExpenses();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const handleAdd = useCallback((exp) => {
    expenseData.addExpense(exp);
    setActiveTab("dashboard");
  }, [expenseData]);

  const sharedProps = { data: { ...expenseData }, theme, showToast };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={theme.surface} />
      <View style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:20, paddingVertical:14, backgroundColor:theme.surface, borderBottomWidth:1, borderBottomColor:theme.border }}>
        <View>
          <Text style={{ fontSize:18, fontWeight:"800", color:theme.accent }}>💰 SpendSmart</Text>
          <Text style={{ fontSize:10, color:theme.textMuted }}>Your AI Expense Tracker</Text>
        </View>
        <TouchableOpacity onPress={toggleTheme} style={{ backgroundColor:theme.surface2, borderWidth:1, borderColor:theme.border, borderRadius:20, paddingHorizontal:14, paddingVertical:7 }}>
          <Text style={{ color:theme.text, fontWeight:"600", fontSize:13 }}>{isDark ? "☀️ Light" : "🌙 Dark"}</Text>
        </TouchableOpacity>
      </View>
      {toast && <Toast message={toast.msg} type={toast.type} />}
      <View style={{ flex:1 }}>
        {activeTab==="dashboard" && <Dashboard {...sharedProps} onViewAll={()=>setActiveTab("history")} />}
        {activeTab==="add" && <AddExpense theme={theme} onAdd={handleAdd} showToast={showToast} />}
        {activeTab==="history" && <History {...sharedProps} />}
        {activeTab==="analytics" && <Analytics {...sharedProps} />}
        {activeTab==="budget" && <Budget {...sharedProps} />}
      </View>
      <View style={{ flexDirection:"row", backgroundColor:theme.surface, borderTopWidth:1, borderTopColor:theme.border, paddingBottom:Platform.OS==="ios"?20:10, paddingTop:10 }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <TouchableOpacity key={tab.id} onPress={()=>setActiveTab(tab.id)} style={{ flex:1, alignItems:"center", gap:3, paddingVertical:4, borderRadius:12, backgroundColor:active?theme.accent+"22":"transparent", marginHorizontal:4 }}>
              <Text style={{ fontSize:20 }}>{tab.icon}</Text>
              <Text style={{ fontSize:9, fontWeight:active?"700":"500", color:active?theme.accent:theme.textMuted, textTransform:"uppercase", letterSpacing:0.8 }}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
