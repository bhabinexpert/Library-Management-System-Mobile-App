import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import axios from "axios";
import { Link } from "expo-router"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();


  const handleSubmit = async () => {
  if (!email || !password || !confirmPassword || !fullName) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Alert.alert("Error", "Invalid email address");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post("https://library-management-system-gzjz.onrender.com/signup", {
      fullName,
      email,
      password,
    });

    // ✅ Save token + user (like web version)
    if (response.data.token && response.data.user) {
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      Alert.alert("Success", "Signup Successful!");
      
      router.replace("/user");
    } else {
      Alert.alert("Error", response.data.message || "Signup failed");
    }
  } catch (error) {
    Alert.alert("Error", error.response?.data?.message || "Signup failed");
    console.log("Signup error:", error.response?.data || error.message);
  }
};



  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-50">
      <View className="flex-1 p-6 justify-center">
        {/* Header */}
        <View className="mb-8 items-center">
          <Text className="text-2xl font-bold text-indigo-900 text-center">
            Don’t have an Account? {"\n"}Let’s get Started!
          </Text>
          <Text className="text-indigo-700 mt-3 text-base text-center">
            Join <Text className="font-semibold">Gyan Kosh</Text> today and start exploring for free!
          </Text>
        </View>

        {/* Form */}
        <View className="bg-white p-6 rounded-2xl shadow-lg">
          {/* Full Name */}
          <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
          <TextInput
            placeholder="Bhabin Dulal"
            className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50"
            value={fullName}
            onChangeText={setFullName}
          />

          {/* Email */}
          <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
          <TextInput
            placeholder="bhabindada@gmail.com"
            className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Password */}
          <Text className="text-gray-700 mb-2 font-medium">Password</Text>
          <TextInput
            placeholder="********"
            secureTextEntry
            className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50"
            value={password}
            onChangeText={setPassword}
          />

          {/* Confirm Password */}
          <Text className="text-gray-700 mb-2 font-medium">Confirm Password</Text>
          <TextInput
            placeholder="********"
            secureTextEntry
            className="border border-gray-300 rounded-lg p-3 mb-6 bg-gray-50"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Signup Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-indigo-600 p-4 rounded-lg shadow-md"
          >
            <Text className="text-white text-center font-semibold text-base">Signup</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-6 items-center">
          <Text className="text-gray-700">Already have an account?</Text>
          <Link href="/auth/login">
            <Text className="text-indigo-600 font-semibold mt-1">Login</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
