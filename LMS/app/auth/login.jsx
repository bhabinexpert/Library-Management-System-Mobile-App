import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Link } from "expo-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  // ✅ Token check on first load
  const verifyToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);

      const response = await axios.get(
        "https://library-management-system-gzjz.onrender.com/", 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.user) {
        const { role, fullName } = response.data.user;

        // Store user info locally
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect based on role
        if (role === "admin") {
          router.replace("/admin");
        } else {
          router.replace("/user");
        }
      }
    } catch (err) {
      console.log("Token verification failed:", err.response?.data || err.message);
      // Clear invalid token
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid Email!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://library-management-system-gzjz.onrender.com/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        setSuccessMessage("Login successful!");
        setError("");

        setTimeout(() => {
          if (user.role === "admin") {
            router.replace("/admin");
          } else {
            router.replace("/user");
          }
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-50 px-6 py-10 justify-center">
      <View className="mb-8 items-center">
        <Text className="text-3xl font-bold text-indigo-900 text-center">Welcome back 👋</Text>
        <Text className="text-lg text-gray-700 mt-2 text-center">Please log in to your account</Text>
      </View>

      <View className="bg-white p-6 rounded-2xl shadow-lg">
        <Text className="text-gray-700 mb-2 font-medium">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50"
          placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
        />

        <Text className="text-gray-700 mb-2 font-medium">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-50"
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
          value={formData.password}
          onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
        />

        {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
        {successMessage ? <Text className="text-green-500 mb-2">{successMessage}</Text> : null}

        {loading ? (
          <View className="flex-row justify-center items-center py-4">
            <ActivityIndicator size="large" color="#4f46e5" />
            <Text className="ml-3 text-indigo-600 font-semibold">Processing...</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-indigo-600 p-4 rounded-lg shadow-md mt-2"
          >
            <Text className="text-white text-center font-semibold text-base">Login</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="mt-6 items-center">
        <Text className="text-gray-700">Don't have an account?</Text>
        <Link href="./signup">
          <Text className="text-indigo-600 font-semibold mt-1">Sign up</Text>
        </Link>
      </View>
    </View>
  );
};

export default Login;
