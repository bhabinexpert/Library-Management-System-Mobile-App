import "@/global.css";

import { images } from "@/constants/image.js";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function index() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/landing"); // navigate after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View className="w-full h-full flex items-center justify-center bg-primary">
      <Image source={images.logo} className="flex-1 absolute w-full z-0"></Image>
    </View>
  );
}