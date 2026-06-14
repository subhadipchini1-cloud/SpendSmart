import React from "react";
import {View,Text,ScrollView} from "react-native";
import {Card,SectionTitle,StatCard} from "./UI";
import {CATEGORIES,MONTHS_SHORT,formatINR} from "../constants";
function BarChart({data,currentMonth,theme}){
  const max=Math.max(...data,1);
  return <View style={{flexDirection:"row",alignItems:"flex-end",height:100,gap:4,paddingHorizontal:2}}>
    {data.map((val,i)=>{const pct=val/max;const active=i===currentMonth;return(<View key={i} style={{flex:1,alignItems:"center",gap:4}}><View style={{width:"100%",height:Math.max(pct*80,3),backgroundColor:active?theme.accent:theme.border,borderRadius:4,shadowColor:active?theme.accent:"transparent",shadowOpacity:active?0.6:0,shadowRadius:6,elevation:active?4:0}}/><Text style={{fontSize:7,color:active?theme.accent:theme.textMuted,fontWeight:active?"800":"400"}}>{MONTHS_SHORT[i]}</Text></View>);})}
  </View>;
}
export default function Analytics({data,theme}){
  const {monthTotal,yearTotal,monthlyData,filterMonth,filterYear,categoryTotals,budgets}=data;
  const peakMonth=monthlyData.indexOf(Math.max(...monthlyData));
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:24}} showsVerticalScrollIndicator={false}>
    <Card theme={theme}>
      <SectionTitle theme={theme}>Monthly Spending — {filterYear}</SectionTitle>
      <BarChart data={monthlyData} currentMonth={filterMonth} theme={theme}/>
      <Text style={{textAlign:"center",fontSize:11,color:theme.textMuted,marginTop:10}}>Highest: {MONTHS_SHORT[peakMonth]} — {formatINR(Math.max(...monthlyData))}</Text>
    </Card>
    <Card theme={theme}>
      <SectionTitle theme={theme}>Category vs Budget — {MONTHS_SHORT[filterMonth]}</SectionTitle>
      {CATEGORIES.map(cat=>{const spent=categoryTotals[cat.id]||0;const budget=budgets[cat.id]||0;const pct=budget>0?Math.min((spent/budget)*100,100):0;const over=spent>budget;return(<View key={cat.id} style={{marginBottom:14}}><View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:4}}><Text style={{fontSize:13,fontWeight:"600",color:theme.text}}>{cat.icon} {cat.label}</Text><Text style={{fontSize:12,color:over?"#FF6B6B":theme.textMuted}}>{formatINR(spent)} / {formatINR(budget)}</Text></View><View style={{height:7,backgroundColor:theme.border,borderRadius:99,overflow:"hidden"}}><View style={{height:"100%",width:`${pct}%`,backgroundColor:over?"#FF6B6B":cat.color,borderRadius:99}}/></View>{over&&<Text style={{fontSize:10,color:"#FF6B6B",marginTop:3}}>⚠️ Over by {formatINR(spent-budget)}</Text>}</View>);})}
    </Card>
    <Card theme={theme} glow>
      <SectionTitle theme={theme}>Year Summary — {filterYear}</SectionTitle>
      <View style={{flexDirection:"row",gap:10}}>
        <StatCard value={formatINR(yearTotal)} label={`Total ${filterYear}`} theme={theme}/>
        <StatCard value={formatINR(Math.round(yearTotal/12))} label="Monthly Avg" color={theme.blue} theme={theme}/>
      </View>
    </Card>
  </ScrollView>;
                     }
