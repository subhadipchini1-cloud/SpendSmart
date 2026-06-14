import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card, SectionTitle, StatCard, MonthNav, CatBar, Pill } from "./UI";
import { CATEGORIES, MONTHS_SHORT, formatINR, getCategoryById } from "../constants";
export default function Dashboard({data,theme,onViewAll}){
  const {monthTotal,yearTotal,todayTotal,monthExpenses,filterMonth,filterYear,categoryTotals,prevMonth,nextMonth}=data;
  const avgPerTxn=monthExpenses.length?Math.round(monthTotal/monthExpenses.length):0;
  const avgPerDay=Math.round(monthTotal/(new Date().getDate()));
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:24}} showsVerticalScrollIndicator={false}>
    <MonthNav month={filterMonth} year={filterYear} onPrev={prevMonth} onNext={nextMonth} theme={theme} MONTHS_SHORT={MONTHS_SHORT}/>
    <Card theme={theme} glow>
      <Text style={{textAlign:"center",fontSize:11,color:theme.textMuted,textTransform:"uppercase",letterSpacing:2}}>Month Spent</Text>
      <Text style={{fontSize:38,fontWeight:"900",color:theme.green,textAlign:"center",marginVertical:8}}>{formatINR(monthTotal)}</Text>
      <View style={{flexDirection:"row",justifyContent:"center",gap:8,flexWrap:"wrap"}}>
        <Pill label={`Today  ${formatINR(todayTotal)}`} color={theme.green} theme={theme}/>
        <Pill label={`Year  ${formatINR(yearTotal)}`} color={theme.blue} theme={theme}/>
      </View>
    </Card>
    <View style={{flexDirection:"row",gap:10,marginBottom:12}}>
      <StatCard value={monthExpenses.length} label="Transactions" theme={theme}/>
      <StatCard value={formatINR(avgPerTxn)} label="Avg / Txn" color="#FBBF24" theme={theme}/>
      <StatCard value={formatINR(avgPerDay)} label="Avg / Day" color="#F472B6" theme={theme}/>
    </View>
    <Card theme={theme}>
      <SectionTitle theme={theme}>Spending by Category</SectionTitle>
      {CATEGORIES.map(cat=>{const amt=categoryTotals[cat.id]||0;return(<View key={cat.id} style={{flexDirection:"row",alignItems:"center",gap:10,marginBottom:10}}><Text style={{fontSize:18}}>{cat.icon}</Text><View style={{flex:1}}><View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:4}}><Text style={{fontSize:12,fontWeight:"600",color:theme.text}}>{cat.label}</Text><Text style={{fontSize:12,color:theme.textMuted}}>{formatINR(amt)}</Text></View><CatBar category={cat} spent={amt} total={monthTotal} theme={theme}/></View></View>);})}
    </Card>
    <Card theme={theme}>
      <SectionTitle theme={theme}>Recent Expenses</SectionTitle>
      {[...monthExpenses].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5).map(exp=>{const cat=getCategoryById(exp.category);return(<View key={exp.id} style={{flexDirection:"row",alignItems:"center",gap:12,paddingVertical:11,borderBottomWidth:1,borderBottomColor:theme.border}}><View style={{width:38,height:38,borderRadius:12,backgroundColor:cat.color+"22",alignItems:"center",justifyContent:"center"}}><Text style={{fontSize:18}}>{cat.icon}</Text></View><View style={{flex:1}}><Text style={{fontWeight:"600",fontSize:14,color:theme.text}} numberOfLines={1}>{exp.note}</Text><Text style={{fontSize:11,color:theme.textMuted}}>{cat.label} · {exp.date}</Text></View><Text style={{fontWeight:"800",fontSize:14,color:"#FF6B6B"}}>-{formatINR(exp.amount)}</Text></View>);})}
      {monthExpenses.length===0&&<Text style={{textAlign:"center",color:theme.textMuted,paddingVertical:20,fontSize:13}}>No expenses yet. Tap ➕ to add one!</Text>}
      {monthExpenses.length>5&&<TouchableOpacity onPress={onViewAll} style={{marginTop:10,backgroundColor:theme.accent+"18",borderWidth:1,borderColor:theme.accent+"40",borderRadius:10,padding:10,alignItems:"center"}}><Text style={{color:theme.accent,fontWeight:"700",fontSize:13}}>View All {monthExpenses.length} Expenses →</Text></TouchableOpacity>}
    </Card>
  </ScrollView>;
                                                                                      }
