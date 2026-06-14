import React,{useState,useMemo} from "react";
import {View,Text,ScrollView,TouchableOpacity,TextInput} from "react-native";
import {Card,SectionTitle,MonthNav} from "./UI";
import {MONTHS_SHORT,formatINR,getCategoryById} from "../constants";
export default function History({data,theme,showToast}){
  const {monthExpenses,monthTotal,filterMonth,filterYear,prevMonth,nextMonth,deleteExpense}=data;
  const [search,setSearch]=useState("");
  const [confirm,setConfirm]=useState(null);
  const filtered=useMemo(()=>[...monthExpenses].filter(e=>{if(!search)return true;const q=search.toLowerCase();const cat=getCategoryById(e.category);return e.note.toLowerCase().includes(q)||cat.label.toLowerCase().includes(q);}).sort((a,b)=>new Date(b.date)-new Date(a.date)),[monthExpenses,search]);
  const handleDelete=id=>{deleteExpense(id);setConfirm(null);showToast("Expense deleted");};
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:24}} showsVerticalScrollIndicator={false}>
    <MonthNav month={filterMonth} year={filterYear} onPrev={prevMonth} onNext={nextMonth} theme={theme} MONTHS_SHORT={MONTHS_SHORT}/>
    <View style={{flexDirection:"row",alignItems:"center",backgroundColor:theme.surface,borderWidth:1,borderColor:theme.border,borderRadius:12,paddingHorizontal:12,marginBottom:12,gap:8}}>
      <Text style={{fontSize:16}}>🔍</Text>
      <TextInput style={{flex:1,color:theme.text,fontSize:14,paddingVertical:12}} placeholder="Search expenses..." placeholderTextColor={theme.textMuted} value={search} onChangeText={setSearch}/>
      {!!search&&<TouchableOpacity onPress={()=>setSearch("")}><Text style={{color:theme.textMuted,fontSize:18}}>×</Text></TouchableOpacity>}
    </View>
    <Card theme={theme}>
      <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:12}}><SectionTitle theme={theme}>{filtered.length} Expenses</SectionTitle><Text style={{fontWeight:"800",color:"#FF6B6B",fontSize:14}}>{formatINR(monthTotal)}</Text></View>
      {filtered.map(exp=>{const cat=getCategoryById(exp.category);const isConfirm=confirm===exp.id;return(<View key={exp.id} style={{flexDirection:"row",alignItems:"center",gap:12,paddingVertical:12,borderBottomWidth:1,borderBottomColor:theme.border}}><View style={{width:40,height:40,borderRadius:12,backgroundColor:cat.color+"22",alignItems:"center",justifyContent:"center"}}><Text style={{fontSize:20}}>{cat.icon}</Text></View><View style={{flex:1,minWidth:0}}><Text style={{fontWeight:"600",fontSize:14,color:theme.text}} numberOfLines={1}>{exp.note}</Text><Text style={{fontSize:11,color:theme.textMuted}}>{cat.label} · {exp.date}</Text></View><View style={{alignItems:"flex-end",gap:4}}><Text style={{fontWeight:"800",fontSize:14,color:"#FF6B6B"}}>-{formatINR(exp.amount)}</Text>{isConfirm?<View style={{flexDirection:"row",gap:4}}><TouchableOpacity onPress={()=>handleDelete(exp.id)} style={{backgroundColor:"#FF4444",borderRadius:6,paddingHorizontal:8,paddingVertical:3}}><Text style={{color:"#fff",fontSize:11,fontWeight:"700"}}>Delete</Text></TouchableOpacity><TouchableOpacity onPress={()=>setConfirm(null)} style={{backgroundColor:theme.border,borderRadius:6,paddingHorizontal:8,paddingVertical:3}}><Text style={{color:theme.text,fontSize:11}}>Cancel</Text></TouchableOpacity></View>:<TouchableOpacity onPress={()=>setConfirm(exp.id)}><Text style={{fontSize:16}}>🗑️</Text></TouchableOpacity>}</View></View>);})}
      {filtered.length===0&&<Text style={{textAlign:"center",color:theme.textMuted,paddingVertical:24,fontSize:13}}>{search?"No matching expenses.":"No expenses this month."}</Text>}
    </Card>
  </ScrollView>;
  }
