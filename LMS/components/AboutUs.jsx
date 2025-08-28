import { View, Text } from "react-native";

export default function AboutUs() {
  return (
    <View className="p-2 w-full flex gap-3 flex-wrap bg-light-300">

      {/* About Section */}
      <View className="items-center mb-2">
        <Text className="text-3xl font-bold text-center mt-2 mb-4">
          About Gyan Kosh
        </Text>
        <Text className="text-center mt-2 text-gray-900 text-base mb-5 leading-relaxed font-medium">
          Revolutionizing how people access, discover, and enjoy books through
          technology and seamless experience.
        </Text>
      </View>

      {/* Mission Section */}
      <View className="p-4">
        <Text className="text-3xl font-bold mb-2 text-center">Our Mission</Text>
        <Text className="text-base text-primary font-medium leading-relaxed text-center">
          At Gyan Kosh, we believe knowledge should be accessible to everyone.
          Our mission is to break down barriers to learning by providing instant
          access to a vast collection of books and creating a global community of
          passionate readers.
        </Text>
      </View>

      {/* Features Cards */}
      <View className="flex flex-1 flex-col gap-2 p-4">
        <View className="w-full h-44 bg-light-100 rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-3xl mb-2">📚</Text>
          <Text className="font-bold text-center mb-1">Vast Book Collection</Text>
          <Text className="text-gray-600 text-xs text-center">
            Access over 500+ books across all genres and categories.
          </Text>
        </View>

        <View className="w-full h-44 bg-light-100 rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-3xl mb-2">🎓</Text>
          <Text className="font-bold text-center mb-1">Educational Excellence</Text>
          <Text className="text-gray-600 text-xs text-center">
            Supporting learners with academic resources.
          </Text>
        </View>

        <View className="w-full h-44 bg-light-100 rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-3xl mb-2">💡</Text>
          <Text className="font-bold text-center mb-1">Innovation in Reading</Text>
          <Text className="text-gray-600 text-xs text-center">
            Engaging with books through modern technology.
          </Text>
        </View>

        <View className="w-full h-44 bg-light-100 rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-3xl mb-2">⚡</Text>
          <Text className="font-bold text-center mb-1">Instant Borrowing</Text>
          <Text className="text-gray-600 text-xs text-center">
            Borrow instantly and start reading within seconds.
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View className="flex flex-col gap-2 p-6 mt-6">
        <View className="w-full h-28 bg-primary rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-xl font-bold text-white">1000+</Text>
          <Text className="font-semibold text-white">Books Available</Text>
          <Text className="text-white text-xs">Growing collection</Text>
        </View>

        <View className="w-full h-28 bg-primary rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-xl font-bold text-white">5,000+</Text>
          <Text className="font-semibold text-white">Active Readers</Text>
          <Text className="text-white text-xs">Growing daily</Text>
        </View>

        <View className="w-full h-28 bg-primary rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-xl font-bold text-white">10+</Text>
          <Text className="font-semibold text-white">Book Categories</Text>
          <Text className="text-white text-xs">Fiction to academic</Text>
        </View>

        <View className="w-full h-28 bg-primary rounded-2xl shadow-md p-4 items-center justify-center">
          <Text className="text-xl font-bold text-white">24/7</Text>
          <Text className="font-semibold text-white">Access</Text>
          <Text className="text-white text-xs">Always available</Text>
        </View>
      </View>
    </View>
  );
}
