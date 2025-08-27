import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { images } from "@/constants/image.js";
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import AboutUs from "../../components/AboutUs.jsx";


const Landing = () => {
  const router = useRouter();
  const scrollRef = useRef(null);

  return (
    <View className="w-full flex flex-1 max-h-full bg-white">
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ flexGrow: 1 }}   
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-light-100 flex flex-1 w-full">  
          {/* Hero Image */}
          <Image source={images.hero} className="w-full h-80" resizeMode="cover" />

          {/* Title Section */}
          <View className="items-center mt-6">
            <Text className="text-primary text-3xl font-bold">
              Burrow Read Learn!!!
            </Text>
            <Text className="text-white text-xl mt-1">
              Transform Your Knowledge
            </Text>
          </View>

          {/* Description Section */}
          <View className="px-6 mt-4 mb-4">
            <Text className="text-gray-800 text-base text-center leading-relaxed">
              Join thousands of readers accessing our vast digital library.
              Borrow books instantly, read offline, and discover your next great
              adventure. Start your learning journey today!
            </Text>
          </View>

          {/* Call to Action Section */}
          <View className="items-center mt-4 px-6 mb-4">
            {/* Heading */}
            <View className="mb-4">
              <Text className="text-xl font-bold text-black text-center">
                New to Gyan Kosh?
              </Text>
              <Text className="text-gray-700 text-center mt-2 leading-relaxed">
                Join 1000+ readers across the country with the latest available
                books and borrow without hassle!!!✔️{"\n"}
                And it's Completely Free!!👀
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-col mb-4 items-center justify-center gap-2 p-4">
              <TouchableOpacity
                className="bg-blue-600 px-5 py-4 rounded-2xl shadow-lg mb-2"
                onPress={() => router.push("../auth/login")}
              >
                <Text className="text-white font-semibold">
                  🚀 Start Borrowing Free
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-gray-200 px-5 py-3 rounded-2xl shadow-lg mb-6"
                onPress={() => router.push("../auth/signup")}
              >
                <Text className="text-black font-semibold">
                  Sign In to Library
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className= 'bg-light-200'><AboutUs /></View>
      </ScrollView>
    </View>
  );
};

export default Landing;
