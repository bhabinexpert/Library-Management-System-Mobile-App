import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import ProtectedRoute from "../auth/protectedRoute";

export default function user() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("explore");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookRatings, setBookRatings] = useState({});
  const [burrowedBooks, setBurrowedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [showBorrowConfirm, setShowBorrowConfirm] = useState(false);
  const [burrowingBook, setBurrowingBook] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileError, setProfileError] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const userIdRef = useRef(null);

  useEffect(() => {
    userIdRef.current = currentUser?._id;
  }, [currentUser]);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setIsLoading(true);
        const storedUser = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("token");
        if (!storedUser || !token)
          return Alert.alert("Session expired", "Please login again");

        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        userIdRef.current = user._id;

        const userResponse = await axios.get(
          "https://library-management-system-gzjz.onrender.com/api/users/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const updatedUser = userResponse.data;
        setCurrentUser(updatedUser);
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

        await loadData(updatedUser._id);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    initializeDashboard();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        fullName: currentUser.fullName || "",
        email: currentUser.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [currentUser, showProfileModal]);

  const loadData = async (userId = null) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      const targetUserId = userId || userIdRef.current;
      if (!targetUserId) return;

      // Fetch all books
      const booksResponse = await axios.get("https://library-management-system-gzjz.onrender.com/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const booksData = booksResponse.data;

      const newRatings = {};
      booksData.forEach((book) => {
        if (!bookRatings[book._id])
          newRatings[book._id] = (Math.random() * 6.9 + 3).toFixed(1);
      });
      setBookRatings((prev) => ({ ...prev, ...newRatings }));
      setBooks(booksData);
      setFilteredBooks(booksData);

      // Fetch borrowed status
      const burrowedResponse = await axios.get(
        `https://library-management-system-gzjz.onrender.com/api/books/burrowstatus/${targetUserId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const records = Array.isArray(burrowedResponse.data)
        ? burrowedResponse.data
        : [];
      setBurrowedBooks(records);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let filtered = books;
    if (searchTerm)
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    if (selectedCategory !== "all")
      filtered = filtered.filter((book) => book.category === selectedCategory);
    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory]);

  const isAlreadyBorrowed = (bookId) =>
    burrowedBooks.some(
      (record) =>
        (record.book?._id === bookId || record.book === bookId) &&
        record.status === "burrowed"
    );

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handlePrepareBurrow = (book) => {
    if (!currentUser) return Alert.alert("Login required");
    if (isAlreadyBorrowed(book._id))
      return Alert.alert("Already borrowed");
    if (book.availableCopies <= 0)
      return Alert.alert("Unavailable");
    setBurrowingBook(book);
    setShowBorrowConfirm(true);
  };

  const handleBurrowBook = async () => {
    if (!burrowingBook || !currentUser) return;
    setShowBorrowConfirm(false);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `https://library-management-system-gzjz.onrender.com/api/books/burrow/${burrowingBook._id}`,
        { user: currentUser._id, book: burrowingBook._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", `Borrowed "${burrowingBook.title}"`);
      setBurrowingBook(null);
      setShowBookModal(false);
      await loadData();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to borrow book");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert("Logged out");
    router.replace("/landing")
  };

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1D4ED8" />
      </View>
    );

  const categories = ["All", ...new Set(books.map((b) => b.category))];

  // Filter borrowed books
  const myBooks = burrowedBooks.filter((b) => b.status === "burrowed");
  const historyBooks = burrowedBooks; // include all records for history

  const renderBookItem = (book) => (
    <TouchableOpacity
      onPress={() => handleSelectBook(book)}
      className="bg-white rounded shadow mb-3 p-3 flex-row"
    >
      <View className="w-16 h-20 bg-gray-300 rounded mr-3 justify-center items-center">
        {book.coverImage ? (
          <Image
            source={{ uri: book.coverImage }}
            className="w-full h-full rounded"
          />
        ) : (
          <Text>📖</Text>
        )}
      </View>
      <View className="flex-1 justify-between">
        <Text className="font-bold text-lg">{book.title}</Text>
        <Text className="text-gray-600">{book.author}</Text>
        <Text className="text-sm text-gray-400">{book.category}</Text>
        {activeTab === "explore" && (
          <TouchableOpacity
            onPress={() => handlePrepareBurrow(book)}
            disabled={book.availableCopies === 0 || isAlreadyBorrowed(book._id)}
            className={`mt-2 px-2 py-1 rounded ${
              book.availableCopies === 0 ? "bg-gray-400" : "bg-blue-500 "
            }`}
          >
            <Text className="text-white">
              {isAlreadyBorrowed(book._id) ? "Burrowed" : "📥 Burrow Book"}
            </Text>
          </TouchableOpacity>
        )}
        {activeTab === "history" && (
          <Text className="text-xs text-gray-500 mt-1">
            Status: {book.status} | Burrowed On: {new Date(book.burrowDate).toLocaleDateString()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ProtectedRoute allowedRoles={["user"]}>
    <View className="flex-1 bg-gray-100">
      
      <View className="flex-row items-center justify-between bg-white p-3 shadow">
        <Text className="text-2xl font-bold text-blue-700">GyanKosh</Text>
        <Text className = 'font-bold'> Welcome {currentUser.fullName.split(" ")[0]}</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setShowProfileModal(true)}
            className="bg-gray-200 px-3 py-1 rounded mr-2"
          >
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            <Text className="text-white">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around bg-white shadow p-2">
        {["explore", "borrowed", "history"].map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text
              className={`text-lg font-semibold ${
                activeTab === tab ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {tab === "explore"
                ? "Explore"
                : tab === "borrowed"
                ? "My Books"
                : "History"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explore Tab Search & Category */}
      {activeTab === "explore" && (
        <View className="p-2 bg-gray-100">
          <TextInput
            placeholder="Search books..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="bg-white p-2 rounded shadow mb-2"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-2"
          >
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                className={`px-3 py-1 mr-2 rounded ${
                  selectedCategory === cat ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <Text
                  className={`${
                    selectedCategory === cat ? "text-white" : "text-black"
                  } font-semibold`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Books List */}
      <FlatList
        data={
          activeTab === "explore"
            ? filteredBooks
            : activeTab === "borrowed"
            ? myBooks.map((b) => b.book)
            : historyBooks.map((b) => ({ ...b.book, ...b }))
        }
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderBookItem(item)}
        className="px-3 mt-2"
      />

     
      <Modal visible={showBookModal} transparent animationType="slide">
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded p-4 w-11/12">
            <Text className="text-xl font-bold">{selectedBook?.title}</Text>
            <Text className="text-gray-600">{selectedBook?.author}</Text>
            <Text className="mt-2">{selectedBook?.description}</Text>
            <TouchableOpacity
              onPress={() => setShowBookModal(false)}
              className="mt-4 bg-blue-500 p-2 rounded"
            >
              <Text className="text-white text-center">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Borrow Confirmation */}
      <Modal visible={showBorrowConfirm} transparent animationType="fade">
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center">
          <View className="bg-white rounded p-4 w-11/12">
            <Text className="text-lg font-bold">Confirm Borrow</Text>
            <Text className="mt-2">Borrow "{burrowingBook?.title}"?</Text>
            <View className="flex-row mt-4 justify-around">
              <TouchableOpacity
                onPress={() => setShowBorrowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleBurrowBook}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                <Text className="text-white">Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal visible={showProfileModal} transparent animationType="slide">
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center p-4">
          <View className="bg-white rounded-xl w-full p-5 shadow-lg max-h-[90%]">
            <Text className="text-2xl font-bold text-blue-700 mb-4">
              Update Profile
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              {[
                { label: "Full Name", key: "fullName" },
                { label: "Email", key: "email", keyboardType: "email-address" },
                { label: "Current Password", key: "currentPassword", secure: true },
                { label: "New Password", key: "newPassword", secure: true },
                { label: "Confirm New Password", key: "confirmPassword", secure: true },
              ].map((field) => (
                <View key={field.key} className="mb-3">
                  <Text className="text-gray-700 mb-1">{field.label}</Text>
                  <TextInput
                    value={profileForm[field.key]}
                    onChangeText={(text) =>
                      setProfileForm((prev) => ({ ...prev, [field.key]: text }))
                    }
                    placeholder={field.label}
                    secureTextEntry={field.secure}
                    keyboardType={field.keyboardType || "default"}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </View>
              ))}

              {profileError ? (
                <Text className="text-red-500 mb-2">{profileError}</Text>
              ) : null}

              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  onPress={() => setShowProfileModal(false)}
                  className="bg-gray-300 px-4 py-2 rounded flex-1 mr-2"
                >
                  <Text className="text-center font-semibold">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    if (!profileForm.fullName || !profileForm.email) {
                      setProfileError("Full name and email are required");
                      return;
                    }
                    if (
                      profileForm.newPassword &&
                      profileForm.newPassword !== profileForm.confirmPassword
                    ) {
                      setProfileError("New passwords do not match");
                      return;
                    }

                    try {
                      setIsUpdatingProfile(true);
                      const token = await AsyncStorage.getItem("token");
                      const response = await axios.put(
                        `https://library-management-system-gzjz.onrender.com/api/users/update/${currentUser._id}`,
                        {
                          fullName: profileForm.fullName,
                          email: profileForm.email,
                          currentPassword: profileForm.currentPassword,
                          newPassword: profileForm.newPassword,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      const updatedUser = response.data;
                      setCurrentUser(updatedUser);
                      await AsyncStorage.setItem(
                        "user",
                        JSON.stringify(updatedUser)
                      );
                      setProfileError("");
                      Alert.alert("Success", "Profile updated successfully");
                      setShowProfileModal(false);
                    } catch (err) {
                      console.error(err);
                      setProfileError(
                        err.response?.data?.message || "Failed to update profile"
                      );
                    } finally {
                      setIsUpdatingProfile(false);
                    }
                  }}
                  className="bg-blue-600 px-4 py-2 rounded flex-1 ml-2"
                >
                  <Text className="text-white text-center font-semibold">
                    {isUpdatingProfile ? "Updating..." : "Update"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
    </ProtectedRoute>
  );
}
