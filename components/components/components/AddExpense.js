import React,{useState} from "react";
import {View,Text,ScrollView,TouchableOpacity,KeyboardAvoidingView,Platform} from "react-native";
import {Card,SectionTitle,PrimaryButton,StyledInput} from "./UI";
import {CATEGORIES,formatINR,todayString} from "../constants";
export default function AddExpense({theme,onAdd,showToast}){
  const [amount,setAmount]=useState("");
  const [category,setCategory]=useState("food");
  const [note,setNote]=useState("");
  const [date,setDate]=useState(todayString());
  const handleAdd=()=>{const num=parseFloat(amount);if(!amount||isNaN(num)||num<=0){showToast("Enter a valid amount","error");return;}onAdd({amount:num,category,note:note||"No note",date});setAmount("");setNote("");setDate(todayString());showToast("Expense added! ✓");};
  const selectedCat=CATEGORIES.find(c=>c.id===category);
  return <KeyboardAvoidingView style={{flex:1,backgroundColor:theme.bg}} behavior={Platform.OS==="ios"?"padding":undefined}>
    <ScrollView contentContainerStyle={{padding:16,paddingBottom:32}} showsVerticalScrollIndicator={false}>
      <Card theme={theme} glow>
        <SectionTitle theme={theme}>💸 Add Expense</SectionTitle>
        <Text style={{fontSize:12,color:theme.textMuted,marginBottom:6}}>Amount (₹)</Text>
        <StyledInput theme={theme} value={amount} onChangeText={setAmount} placeholder="0" keyboardType="numeric" style={{fontSize:24,fontWeight:"800",marginBottom:14}}/>
        <Text style={{fontSize:12,color:theme.textMuted,marginBottom:8}}>Category</Text>
        <View style={{flexDirection:"row",flexWrap:"wrap",gap:8,marginBottom:14}}>
          {CATEGORIES.map(cat=><TouchableOpacity key={cat.id} onPress={()=>setCategory(cat.id)} style={{backgroundColor:category===cat.id?cat.color+"33":theme.surface2,borderWidth:1,borderColor:category===cat.id?cat.color:theme.border,borderRadius:10,paddingHorizontal:12,paddingVertical:8}}><Text style={{color:category===cat.id?cat.color:theme.textMuted,fontWeight:"600",fontSize:13}}>{cat.icon} {cat.label.split(" ")[0]}</Text></TouchableOpacity>)}
        </View>
        <Text style={{fontSize:12,color:theme.textMuted,marginBottom:6}}>Note (optional)</Text>
        <StyledInput theme={theme} value={note} onChangeText={setNote} placeholder="What was this for?" style={{marginBottom:14}}/>
        <Text style={{fontSize:12,color:theme.textMuted,marginBottom:6}}>Date (YYYY-MM-DD)</Text>
        <StyledInput theme={theme} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" style={{marginBottom:20}}/>
        {!!amount&&!isNaN(parseFloat(amount))&&<View style={{backgroundColor:theme.accent+"18",borderWidth:1,borderColor:theme.accent+"40",borderRadius:12,padding:14,flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><View style={{flexDirection:"row",alignItems:"center",gap:8}}><Text style={{fontSize:22}}>{selectedCat?.icon}</Text><Text style={{color:theme.textMuted,fontSize:13}}>{selectedCat?.label}</Text></View><Text style={{fontWeight:"900",fontSize:20,color:theme.green}}>{formatINR(parseFloat(amount)||0)}</Text></View>}
        <PrimaryButton label="Add Expense ✓" onPress={handleAdd} theme={theme}/>
      </Card>
    </ScrollView>
  </KeyboardAvoidingView>;
  }
