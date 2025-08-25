import { View, Text, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import axios from 'axios';
// import asyncStorage from "@react-native-async-storage/async-storage"
import {Link, useRouter} from 'expo-router';


const login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password:""
//   })

//   const [error, setError] = useState("")
//   const router = useRouter();

  
//   const handleLogin = async ()=>{
    
    
//     if(!formData.email || !formData.password){
//       setError("All fields are required!")
//       return;
//     }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(formData.email)) {
//     setError("Invalid Email!")
//     return ;
//   }
//   try {
//     const response = await axios.post("http://localhost:9000/auth",formData)
//     console.log(response)

//     if(response.status === 200){
//       // console.log(response.data)
//       const data = response?.data;
//       const token = data?.token;
//       const user = data?.user;
//       await asyncStorage.setItem("token", token);
//       await asyncStorage.setItem("user", JSON.stringify(user));
//       router.replace("/");
      
//       // const token = response.data.token;
//       // const user = response.data.user;

//     }
    
//   } catch (error) {
//     setError( error.response.data.message)
    
//   }
    

//   }

  
  return (
    <View className = "flex-1 flex-col items-center gap-4 px-6" >
      <Text className = "text-xl font-bold" >Welcome back! 👋</Text>
      <Text className = "text-xl font-bold" >Please log in to your account</Text>
      <View className = "flex flex-col gap-3 w-full" >
        <Text className = 'text-lg'> Email</Text>
        <TextInput className ="border p-2 rounded-md"
        placeholder='Enter your email'
        autoCapitalize={false}
        keyboardType='email-address'
        // onChangeText={(text)=> setFormData((prev)=>({...prev, email: text}))}
         ></TextInput>
      

        <Text className = 'text-lg'> Password</Text>
        <TextInput className ="border p-2 rounded-md"
        placeholder='********' 
        autoCapitalize= {false}
        secureTextEntry = {true}
        //  onChangeText={(text)=> setFormData((prev)=>({...prev, password: text}))}

        ></TextInput>

        {/* {error && <Text className = 'text-red-500'> {error}</Text>} */}

      </View>

      {/* Login button */}

      <TouchableOpacity
    //   onPress={handleLogin}
      className = "bg-black w-full items-center p-2 rounded-md">
        <Text className ="text-white"> Login</Text>
      </TouchableOpacity>

      <View>
        <Text>Don't have an account?</Text>
        
        {/* <Link to="./auth/signup"> */}
        
        <Text>Sign up</Text>
        
        {/* </Link> */}
        
      </View>
    </View>
  )
}

export default login 