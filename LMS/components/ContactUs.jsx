import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = () => {
    if (!email || !subject || !message) {
      setSuccessMessage("Please fill in all fields.");
      return;
    }

    setSuccessMessage("Message sent successfully! We will contact you soon.");

    setEmail("");
    setSubject("General Inquiry");
    setMessage("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <ScrollView className="flex-1 flex p-4 bg-light-300">
      {/* Top Section */}
      <View className="items-center mb-6 ">
        <Text className="text-3xl font-bold">
          Get in Touch!!
        </Text>
        <Text className="text-center text-gray-600 mt-2">
          Need help? Have questions about Gyan Kosh? About your account?
           We are here to support you and make your reading journey effortless!
        </Text>
       
          <Text className="text-white text-xl mt-4">📞</Text>
      </View>

     
      <View className="mb-6">
        <Text className="text-xl font-semibold text-white mb-4 text-center">
          How can we help you??
        </Text>

        <View className="space-y-4">
          <View className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <Text className="text-2xl mb-2">📧</Text>
            <Text className="text-lg font-semibold text-gray-800">Email Support</Text>
            <Text className="text-gray-600 mt-1">
              Get your issue solved via email:{" "}
              <Text className="text-blue-600">bhabindulal46@gmail.com</Text>
            </Text>
          </View>

          <View className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <Text className="text-2xl mb-2">📞</Text>
            <Text className="text-lg font-semibold text-gray-800">Direct Phone Call</Text>
            <Text className="text-gray-600 mt-1">
              Call us at <Text className="text-blue-600">9824009974</Text>
            </Text>
          </View>

          <View className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <Text className="text-2xl mb-2">💬</Text>
            <Text className="text-lg font-semibold text-gray-800">Direct Message</Text>
            <Text className="text-gray-600 mt-1">
              Message us on WhatsApp. Replies within 1 hour!
            </Text>
            <TouchableOpacity className="mt-2 bg-green-500 px-4 py-2 rounded-lg">
              <Text className="text-white text-center">Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Contact Form */}
      <View className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <Text className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</Text>

        {successMessage ? (
          <Text className="text-green-600 mb-3">{successMessage}</Text>
        ) : null}

        {/* Email */}
        <Text className="text-gray-700 mb-1">Email Address</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="bhabindada@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        {/* Subject */}
        <Text className="text-gray-700 mb-1">Subject</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="General Inquiry"
          value={subject}
          onChangeText={setSubject}
        />

        {/* Message */}
        <Text className="text-gray-700 mb-1">Message</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4 h-28"
          placeholder="Enter your message"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        {/* Submit */}
        <TouchableOpacity
          className="bg-blue-600 p-4 rounded-lg shadow"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center font-semibold">Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
