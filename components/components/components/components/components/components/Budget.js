import React,{useState} from "react";
import {View,Text,ScrollView,TouchableOpacity,Modal,TextInput,KeyboardAvoidingView,Platform} from "react-native";
import {Card,SectionTitle,StatCard} from "./UI";
import {CATEGORIES,formatINR,getCategoryById} from "../constants";
export default function Budget({data,theme,showToast}){
  const {categoryTotals,budgets,updateBudget,monthTotal}=data;
  const [editCat,setEditCat]=useState(null);
  const [inputVal,setInputVal]=useState("");
  const totalBudget=Object.values(budgets).reduce((a,b)=>a+b,0);
  const overallPct=totalBudget>0?Math.min((monthTotal/totalBudget)*100,100):0;
  const overallOver=monthTotal>totalBudget;
  const handleSave=()=>{const val=parseFloat(inputVal);if(!val||val<=0){showToast("Enter a valid amount","error");return;}updateBudget(editCat,val);showToast("Budget updated!");setEditCat(null);setInputVal("");};
  return <ScrollView style={{flex:1,backgroundColor:theme.bg}} contentContainerStyle={{padding:16,paddingBottom:24}} showsVerticalScrollIndicator={false}>
    <Card theme={theme} glow>
      <SectionTitle theme={theme}>Overall Budget Health</SectionTitle>
      <View style={{flexDirection:"row",gap:10,marginBottom:12}}>
        <StatCard value={formatINR(totalBudget)} label="Total Budget" theme={theme}/>
        <StatCard value={formatINR(monthTotal)} label="Spent" color={overallOver?"#FF6B6B":theme.green} theme={theme}/>
      </View>
      <View style={{height:8,backgroundColor:theme.border,borderRadius:99,overflow:"hidden"}}><View style={{height:"100%",width:`${overallPct}%`,backgroundColor:overallOver?"#FF6B6B":theme.accent,borderRadius:99}}/></View>
      <Text style={{fontSize:11,color:overallOver?"#FF6B6B":theme.textMuted,marginTop:6,textAlign:"center"}}>{overallOver?`⚠️ Over by ${formatINR(monthTotal-totalBudget)}`:`${formatINR(totalBudget-monthTotal)} remaining`}</Text>
    </Card>
    <Card theme={theme}>
      <SectionTitle theme={theme}>Monthly Budgets</SectionTitle>
      {CATEGORIES.map(cat=>{const spent=categoryTotals[cat.id]||0;const budget=budgets[cat.id]||0;const pct=budget>0?Math.min((spent/budget)*100,100):0;const over=spent>budget;return(<View key={cat.id} style={{flexDirection:"row",alignItems:"center",gap:10,marginBottom:12,backgroundColor:theme.surface2,borderRadius:12,borderWidth:1,borderColor:over?"#FF6B6B40":theme.border,padding:12}}><Text style={{fontSize:22}}>{cat.icon}</Text><View style={{flex:1}}><View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:4}}><Text style={{fontWeight:"600",fontSize:13,color:theme.text}}>{cat.label}</Text><Text style={{fontSize:11,color:over?"#FF6B6B":theme.green,fontWeight:"700"}}>{over?"Over!":`${Math.round(100-pct)}% left`}</Text></View><View style={{height:5,backgroundColor:theme.border,borderRadius:99,overflow:"hidden",marginBottom:4}}><View style={{height:"100%",width:`${pct}%`,backgroundColor:over?"#FF6B6B":cat.color,borderRadius:99}}/></View><Text style={{fontSize:11,color:theme.textMuted}}>{formatINR(spent)} of {formatINR(budget)}</Text></View><TouchableOpacity onPress={()=>{setEditCat(cat.id);setInputVal(String(budget));}} style={{backgroundColor:theme.accent+"18",borderWidth:1,borderColor:theme.accent+"40",borderRadius:8,paddingHorizontal:10,paddingVertical:6}}><Text style={{color:theme.accent,fontWeight:"700",fontSize:12}}>Edit</Text></TouchableOpacity></View>);})}
    </Card>
    <Modal visible={!!editCat} transparent animationType="fade">
      <KeyboardAvoidingView style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#00000090",padding:24}} behavior={Platform.OS==="ios"?"padding":undefined}>
        <View style={{backgroundColor:theme.surface,borderRadius:20,padding:24,width:"100%",borderWidth:1,borderColor:theme.accent}}>
          {editCat&&<>
            <Text style={{fontWeight:"700",fontSize:16,color:theme.text,marginBottom:16}}>{getCategoryById(editCat).icon} Set Budget — {getCategoryById(editCat).label}</Text>
            <TextInput style={{backgroundColor:theme.surface2,borderWidth:1,borderColor:theme.border,borderRadius:12,padding:13,color:theme.text,fontSize:22,fontWeight:"800",marginBottom:16}} value={inputVal} onChangeText={setInputVal} keyboardType="numeric" placeholder="Enter budget" placeholderTextColor={theme.textMuted} autoFocus/>
            <View style={{flexDirection:"row",gap:10}}>
              <TouchableOpacity onPress={()=>{setEditCat(null);setInputVal("");}} style={{flex:1,backgroundColor:theme.surface2,borderWidth:1,borderColor:theme.border,borderRadius:12,padding:13,alignItems:"center"}}><Text style={{color:theme.text,fontWeight:"600"}}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={{flex:1,backgroundColor:theme.accent,borderRadius:12,padding:13,alignItems:"center"}}><Text style={{color:"#fff",fontWeight:"700"}}>Save</Text></TouchableOpacity>
            </View>
          </>}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  </ScrollView>;
    }
