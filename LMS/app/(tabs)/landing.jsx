import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";
import { images } from "@/constants/image.js";
import { useRouter } from "expo-router";

const Landing = () => {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [popup, setPopup] = useState({ visible: false, type: "", message: "" });

  const showPopup = (type, message) => {
    setPopup({ visible: true, type, message });
    setTimeout(() => {
      setPopup({ visible: false, type: "", message: "" });
    }, 2000); // auto close after 2s
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Send button pressed ✅");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      showPopup("error", "Please enter your full name.");
      return;
    }
    if (!formData.email.trim()) {
      showPopup("error", "Please enter your email address.");
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      showPopup("error", "Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      showPopup("error", "Please enter your message.");
      return;
    }

    console.log("Form submitted:", formData);

    showPopup("success", "Your message has been sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-amber-50 to-white">
      {popup.visible && (
        <View
          className={`absolute bottom-10 self-center px-6 py-3 rounded-lg shadow-md ${
            popup.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <Text className="text-white font-semibold">{popup.message}</Text>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 w-full">
          {/* Hero Image */}
          <Image
            source={images.hero}
            className="w-full h-80"
            resizeMode="cover"
          />

          {/* Title Section */}
          <View className="items-center mt-6 px-4">
            <Text className="text-3xl font-extrabold text-gray-800">
              Burrow Read Learn!!!
            </Text>
            <Text className="text-amber-600 text-xl mt-2 font-bold">
              Transform Your Knowledge
            </Text>
          </View>

          {/* Description Section */}
          <View className="px-6 mt-4 mb-6">
            <Text className="text-gray-600 text-base text-center leading-relaxed max-w-md mx-auto">
              Join thousands of readers accessing our vast digital library.
              Borrow books instantly, read offline, and discover your next great
              adventure. Start your learning journey today!
            </Text>
          </View>

          {/* Call to Action Section */}
          <View className="items-center mt-6 px-6 mb-8">
            <View className="mb-6">
              <Text className="text-2xl font-bold text-gray-800 text-center">
                New to Gyan Kosh?
              </Text>
              <Text className="text-gray-600 text-center mt-3 leading-relaxed text-sm max-w-md mx-auto">
                Join 1000+ readers across the country with the latest available
                books and borrow without hassle!!!✔️{"\n"}
                And it's Completely Free!!👀
              </Text>
            </View>
            <View className="flex-col items-center justify-center gap-3">
              <TouchableOpacity
                className="bg-amber-600 px-6 py-3 rounded-lg shadow-lg flex-row items-center gap-2"
                onPress={() => router.push("../auth/login")}
              >
                <Text className="text-white font-semibold">🚀</Text>
                <Text className="text-white font-semibold">
                  Start Borrowing Free
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border border-amber-600 px-6 py-3 rounded-lg"
                onPress={() => router.push("../auth/signup")}
              >
                <Text className="text-amber-600 font-semibold">
                  Sign In to Library
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Section */}
          <View className="py-10 bg-gradient-to-br from-amber-500 to-amber-700">
            <View className="px-4">
              <Text className="text-2xl font-bold text-center text-black mb-8">
                Gyan Kosh in Numbers
              </Text>
              <View className="grid grid-cols-2 gap-4">
                <View className="bg-white bg-opacity-20 p-4 rounded-2xl items-center border border-amber-300 border-opacity-30">
                  <Text className="text-xl font-bold text-black mb-1">
                    1,500+
                  </Text>
                  <Text className="text-sm">Books Collection</Text>
                </View>
                <View className="bg-white bg-opacity-20 p-4 rounded-2xl items-center border border-amber-300 border-opacity-30">
                  <Text className="text-xl font-bold text-black mb-1">
                    1,000+
                  </Text>
                  <Text className="text-sm">Active Members</Text>
                </View>
                <View className="bg-white bg-opacity-20 p-4 rounded-2xl items-center border border-amber-300 border-opacity-30">
                  <Text className="text-xl font-bold text-black mb-1">10+</Text>
                  <Text className="text-sm">Categories</Text>
                </View>
                <View className="bg-white bg-opacity-20 p-4 rounded-2xl items-center border border-amber-300 border-opacity-30">
                  <Text className="text-xl font-bold text-black mb-1">
                    24/7
                  </Text>
                  <Text className="text-sm">Digital Access</Text>
                </View>
              </View>
              <View className="mt-8 bg-white bg-opacity-20 rounded-2xl p-6 border border-amber-300 border-opacity-30">
                <Text className="text-xl font-bold text-center text-black mb-2">
                  Proudly Serving Nepal's Literary Community
                </Text>
                <Text className="text-sm text-center max-w-md mx-auto">
                  Gyan Kosh is a powerful and modern Library Management System
                  designed to make knowledge management simple, efficient, and
                  accessible for all. More than just a digital catalog, it is a
                  complete platform that organizes, preserves, and streamlines
                  access to books, journals, research papers, and digital
                  resources in one unified space. Built with the vision of
                  empowering educational institutions, public libraries, and
                  organizations, Gyan Kosh ensures smooth cataloging, borrowing,
                  returning, and tracking of resources while reducing manual
                  effort. Its user-friendly design bridges the gap between
                  traditional libraries and the digital era, making knowledge
                  available anytime, anywhere. Gyan Kosh is not just a tool—it
                  is a partner in nurturing learning communities, preserving
                  valuable knowledge, and building a smarter future where
                  information flows seamlessly and education becomes limitless.
                </Text>
              </View>
            </View>
          </View>

          {/* Features Section */}
          <View className="py-10 bg-white">
            <View className="px-4">
              <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
                Why Choose <Text className="text-amber-600">Gyan Kosh</Text>
              </Text>
              <Text className="text-gray-600 text-center max-w-md mx-auto mb-8 text-sm">
                We bring together the best of Nepali literature, academic
                resources, and cultural archives in one accessible platform.
              </Text>
              <View className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <View className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <Text className="text-2xl mb-2">⚡</Text>
                  <Text className="font-bold text-base text-amber-800">
                    Instant Access
                  </Text>
                  <Text className="text-gray-600 mt-1 text-sm">
                    Start reading in seconds with our digital lending system,
                    anytime, anywhere.
                  </Text>
                </View>
                <View className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <Text className="text-2xl mb-2">🎓</Text>
                  <Text className="font-bold text-base text-amber-800">
                    Academic Support
                  </Text>
                  <Text className="text-gray-600 mt-1 text-sm">
                    Textbooks, research papers, and educational materials for
                    students and scholars.
                  </Text>
                </View>
                <View className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                  <Text className="text-2xl mb-2">🔍</Text>
                  <Text className="font-bold text-base text-amber-800">
                    Advanced Search
                  </Text>
                  <Text className="text-gray-600 mt-1 text-sm">
                    Find exactly what you need with our powerful search and
                    filtering tools.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* About Us Section */}
          <View className="py-10 bg-white">
            <View className="px-4">
              <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
                About <Text className="text-amber-600">Gyan Kosh</Text>
              </Text>
              <View className="flex-col gap-6">
                <View className="bg-amber-100 p-4 rounded-2xl border border-amber-200 items-center">
                  <Image
                    source={images.logo}
                    className="w-12 h-12 mb-1" // Adjusted size to be small
                    resizeMode="contain"
                  />
                  <Text className="text-gray-700 text-center text-sm">
                    "Preserving Nepal's knowledge heritage for future
                    generations"
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-600 mb-3 text-sm">
                    Gyan Kosh is Itahari's premier digital library platform,
                    dedicated to preserving and sharing the knowledge and
                    cultural heritage of Nepal with the world.
                  </Text>
                  <Text className="text-gray-600 mb-3 text-sm">
                    Founded in 2023, our mission is to make Nepali literature
                    and academic resources accessible to everyone, everywhere
                    while supporting local authors and publishers.
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    We partner with educational institutions, cultural
                    organizations, and publishing houses across Nepal to bring
                    you the most comprehensive collection of Nepali knowledge
                    resources.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Section */}
          <View className="py-10 bg-amber-50">
            <View className="px-4">
              <Text className="text-2xl font-bold text-center text-gray-800 mb-8">
                Get in <Text className="text-amber-600">Touch</Text>
              </Text>
              <View className="flex-col gap-6">
                {/* Contact Info */}
                <View className="space-y-4">
                  <View className="flex-row items-start gap-3">
                    <Text className="text-xl text-amber-600 mt-1">📍</Text>
                    <View>
                      <Text className="font-bold text-gray-800">Visit Us</Text>
                      <Text className="text-gray-700 text-sm">
                        Itahari International Collage, Dulari, Nepal
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Text className="text-xl text-amber-600 mt-1">📧</Text>
                    <View>
                      <Text className="font-bold text-gray-800">Email Us</Text>
                      <Text className="text-gray-700 text-sm">
                        info@gyankosh.com
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-start gap-3">
                    <Text className="text-xl text-amber-600 mt-1">📞</Text>
                    <View>
                      <Text className="font-bold text-gray-800">Call Us</Text>
                      <Text className="text-gray-700 text-sm">
                        +977 980XXXXXXX
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-600 text-sm">
                    Have questions about our collection or membership? Our team
                    is here to help you explore the wisdom of Nepal.
                  </Text>
                </View>

                {/* Contact Form */}
                <View className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                  <View>
                    <Text className="text-gray-700 font-medium mb-1">
                      Full Name
                    </Text>
                    <TextInput
                      placeholder="Your Name"
                      value={formData.name}
                      onChangeText={(text) => handleInputChange("name", text)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-amber-500"
                    />
                  </View>
                  <View>
                    <Text className="text-gray-700 font-medium mb-1">
                      Email Address
                    </Text>
                    <TextInput
                      placeholder="you@example.com"
                      value={formData.email}
                      onChangeText={(text) => handleInputChange("email", text)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-amber-500"
                    />
                  </View>
                  <View>
                    <Text className="text-gray-700 font-medium mb-1">
                      Message
                    </Text>
                    <TextInput
                      placeholder="Your message here..."
                      value={formData.message}
                      onChangeText={(text) =>
                        handleInputChange("message", text)
                      }
                      multiline
                      numberOfLines={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-amber-500"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-amber-600 px-6 py-3 rounded-lg"
                  >
                    <Text className="text-white font-medium text-center">
                      Send Message
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
