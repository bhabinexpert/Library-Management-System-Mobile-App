import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, FlatList, TextInput, Modal, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function AdminDashboard() {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("overview");
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [burrowedBooksCount, setBurrowedBooksCount] = useState(0);
  const [overdueBooksCount, setOverdueBooksCount] = useState(0);
  const [statistics, setStatistics] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [burrowRecords, setBurrowRecords] = useState([]);



  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditBookModal, setShowEditBookModal] = useState(false);

  const [userForm, setUserForm] = useState({ fullName: "", email: "", password: "", role: "user", _id: null });
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    description: "",
    publisher: "",
    publishedYear: new Date().getFullYear(),
    coverImage: "",
    totalCopies: 1,
    availableCopies: 1,
    _id: null
  });

  // Fetch overview stats
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const booksRes = await axios.get("http://localhost:9000/api/books/count");
        const usersRes = await axios.get("http://localhost:9000/totalusers");
        const burrowedRes = await axios.get("http://localhost:9000/api/stats/burrowed/count");
        const overdueRes = await axios.get("http://localhost:9000/api/burrowings/overdue");
        const catRes = await axios.get("http://localhost:9000/api/category-counts");

        setTotalBooks(booksRes.data.totalBooks);
        setTotalUsers(usersRes.data.totalUsers);
        setBurrowedBooksCount(burrowedRes.data.burrowedBooksCount);
        setOverdueBooksCount(overdueRes.data.overdueBooksCount);
        setStatistics(catRes.data);
      } catch (err) { console.log(err); }
    };
    fetchCounts();
  }, []);

  // Fetch tab-specific data
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "users") {
          const res = await axios.get("http://localhost:9000/api/userdata");
          const usersWithBurrow = await Promise.all(res.data.map(async user => {
            const burrowRes = await axios.get(`http://localhost:9000/api/books/burrowstatus/${user._id}`);
            const currentBurrows = Array.isArray(burrowRes.data) ? burrowRes.data.filter(r => r.status === "burrowed" || r.status === "borrowed").length : 0;
            return { ...user, currentBurrows };
          }));
          setUsers(usersWithBurrow);
        } else if (activeTab === "books") {
          const res = await axios.get("http://localhost:9000/api/books");
          setBooks(res.data);
        } else if (activeTab === "burrowing") {
          const res = await axios.get("http://localhost:9000/api/burrowings");
          setBurrowRecords(res.data);
        }
      } catch (err) { console.log(err); }
    };
    fetchData();
  }, [activeTab]);

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("user");
    Alert.alert("Logged out");
    
    router.replace("/landing")
  };

  // Users CRUD
  const handleAddUser = async () => {
    try {
      const res = await axios.post("http://localhost:9000/api/users", userForm);
      setUsers(prev => [...prev, res.data]);
      setShowAddUserModal(false);
      setUserForm({ fullName: "", email: "", password: "", role: "user", _id: null });
    } catch (err) { alert("Error adding user"); }
  };

  const handleEditUser = async () => {
    try {
      const res = await axios.put(`http://localhost:9000/api/users/${userForm._id}`, userForm);
      setUsers(prev => prev.map(u => u._id === userForm._id ? res.data : u));
      setShowEditUserModal(false);
      setUserForm({ fullName: "", email: "", password: "", role: "user", _id: null });
    } catch (err) { alert("Error editing user"); }
  };

  const handleDeleteUser = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this user?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
        try {
          await axios.delete(`http://localhost:9000/api/users/${id}`);
          setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) { alert("Error deleting user"); }
      }, style: "destructive" }
    ]);
  };

  // Books CRUD
  const handleAddBook = async () => {
    try {
      const newBook = { ...bookForm, availableCopies: bookForm.totalCopies };
      const res = await axios.post("http://localhost:9000/api/books", newBook);
      setBooks(prev => [...prev, res.data]);
      setShowAddBookModal(false);
      setBookForm({
        title: "", author: "", category: "", isbn: "", description: "",
        publisher: "", publishedYear: new Date().getFullYear(), coverImage: "",
        totalCopies: 1, availableCopies: 1, _id: null
      });
    } catch (err) { alert("Error adding book"); }
  };

  const handleEditBook = async () => {
    try {
      const res = await axios.put(`http://localhost:9000/api/books/${bookForm._id}`, bookForm);
      setBooks(prev => prev.map(b => b._id === bookForm._id ? res.data : b));
      setShowEditBookModal(false);
      setBookForm({
        title: "", author: "", category: "", isbn: "", description: "",
        publisher: "", publishedYear: new Date().getFullYear(), coverImage: "",
        totalCopies: 1, availableCopies: 1, _id: null
      });
    } catch (err) { alert("Error editing book"); }
  };

  const handleDeleteBook = async (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this book?", [
      { text: "Cancel" },
      { text: "Delete", onPress: async () => {
        try {
          await axios.delete(`http://localhost:9000/api/books/${id}`);
          setBooks(prev => prev.filter(b => b._id !== id));
        } catch (err) { alert("Error deleting book"); }
      }, style: "destructive" }
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-blue-700">Welcome ADMIN</Text>
        <TouchableOpacity onPress={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          <Text className="text-white font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around mb-4">
        {["overview","users","books","burrowing"].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${activeTab===tab?"bg-blue-600":"bg-gray-200"}`}>
            <Text className={`${activeTab===tab?"text-white font-bold":"text-gray-700 font-semibold"}`}>{tab.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Overview */}
      {activeTab === "overview" && (
        <View className="space-y-4">
          <View className="flex-row flex-wrap justify-between">
            {[{title:"Total Books",value:totalBooks},{title:"Total Users",value:totalUsers},{title:"Burrowed Books",value:burrowedBooksCount},{title:"Overdue",value:overdueBooksCount}].map(stat => (
              <View key={stat.title} className="bg-white p-5 rounded-xl shadow w-[48%] mb-4">
                <Text className="text-gray-500 font-semibold">{stat.title}</Text>
                <Text className="text-2xl font-bold text-blue-600 mt-1">{stat.value}</Text>
              </View>
            ))}
          </View>
          <Text className="text-lg font-bold text-gray-700 mt-2">Books by Category</Text>
          <View className="flex-row flex-wrap mt-2">
            {Object.entries(statistics.categoryCounts || {}).map(([cat, cnt]) => (
              <View key={cat} className="bg-white p-3 rounded shadow mr-2 mb-2">
                <Text className="font-medium">{cat}</Text>
                <Text className="text-blue-600 font-bold">{cnt}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Users Tab */}
      {activeTab==="users" && (
        <View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-bold text-lg">Users ({users.length})</Text>
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded" onPress={()=>setShowAddUserModal(true)}>
              <Text className="text-white font-semibold">➕ Add User</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={users}
            keyExtractor={item=>item._id}
            renderItem={({item})=>(
              <View className="bg-white p-3 rounded-xl shadow mb-2 flex-row justify-between items-center">
                <View>
                  <Text className="font-bold">{item.fullName}</Text>
                  <Text className="text-gray-500">{item.email}</Text>
                  <Text className="text-gray-500">Role: {item.role} | Burrowed: {item.currentBurrows}</Text>
                </View>
                <View className="flex-row">
                  <TouchableOpacity onPress={()=>{ setUserForm(item); setShowEditUserModal(true)}} className="bg-yellow-400 px-3 py-1 rounded mr-2">
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleDeleteUser(item._id)} className="bg-red-500 px-3 py-1 rounded">
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* Books Tab */}
      {activeTab==="books" && (
        <View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="font-bold text-lg">Books ({books.length})</Text>
            <TouchableOpacity className="bg-green-500 px-4 py-2 rounded" onPress={()=>setShowAddBookModal(true)}>
              <Text className="text-white font-semibold">➕ Add Book</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={books}
            keyExtractor={item=>item._id}
            renderItem={({item})=>(
              <View className="bg-white p-3 rounded-xl shadow mb-2 flex-row justify-between items-center">
                <View>
                  <Text className="font-bold">{item.title}</Text>
                  <Text className="text-gray-500">{item.author}</Text>
                  <Text className="text-gray-500">Available: {item.availableCopies}/{item.totalCopies}</Text>
                </View>
                <View className="flex-row">
                  <TouchableOpacity onPress={()=>{ setBookForm(item); setShowEditBookModal(true)}} className="bg-yellow-400 px-3 py-1 rounded mr-2">
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>handleDeleteBook(item._id)} className="bg-red-500 px-3 py-1 rounded">
                    <Text className="text-white">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}

      {/* Burrowing Tab */}
      {activeTab==="burrowing" && (
        <View>
          <Text className="font-bold mb-2">Burrowing Records ({burrowRecords.length})</Text>
          <FlatList
            data={burrowRecords}
            keyExtractor={item=>item._id}
            renderItem={({item})=>(
              <View className="bg-white p-3 rounded-xl shadow mb-2">
                <Text>User: {item.user?.fullName ?? "Unknown"}</Text>
                <Text>Book: {item.book?.title ?? "Unknown"}</Text>
                <Text>Burrow Date: {new Date(item.burrowDate).toLocaleDateString()}</Text>
                <Text>Due Date: {new Date(item.dueDate).toLocaleDateString()}</Text>
                <Text>Status: {item.status}</Text>
              </View>
            )}
          />
        </View>
      )}

      {/* Add/Edit Modals */}
      {/* Users */}
      <Modal visible={showAddUserModal || showEditUserModal} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 p-5 rounded-xl">
            <Text className="text-lg font-bold mb-2">{showAddUserModal ? "Add User" : "Edit User"}</Text>
            <TextInput placeholder="Full Name" className="border p-2 mb-2 rounded" value={userForm.fullName} onChangeText={text=>setUserForm({...userForm, fullName:text})}/>
            <TextInput placeholder="Email" className="border p-2 mb-2 rounded" value={userForm.email} onChangeText={text=>setUserForm({...userForm, email:text})}/>
            {showAddUserModal && <TextInput placeholder="Password" secureTextEntry className="border p-2 mb-2 rounded" value={userForm.password} onChangeText={text=>setUserForm({...userForm,password:text})}/>}
            <TextInput placeholder="Role (admin/user)" className="border p-2 mb-2 rounded" value={userForm.role} onChangeText={text=>setUserForm({...userForm, role:text})}/>
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity onPress={()=>{ setShowAddUserModal(false); setShowEditUserModal(false); setUserForm({ fullName: "", email: "", password: "", role: "user", _id: null })}} className="px-4 py-2 mr-2 bg-gray-300 rounded"><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={showAddUserModal ? handleAddUser : handleEditUser} className="px-4 py-2 bg-blue-500 rounded"><Text className="text-white">{showAddUserModal ? "Add" : "Save"}</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Books */}
      <Modal visible={showAddBookModal || showEditBookModal} transparent animationType="slide">
        <ScrollView className="flex-1 bg-black/50 p-5">
          <View className="bg-white p-5 rounded-xl">
            <Text className="text-lg font-bold mb-2">{showAddBookModal ? "Add Book" : "Edit Book"}</Text>
            {["title","author","category","isbn","description","publisher","coverImage"].map(field=>(
              <TextInput key={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)} className="border p-2 mb-2 rounded" value={bookForm[field]} onChangeText={text=>setBookForm({...bookForm,[field]:text})}/>
            ))}
            <TextInput placeholder="Published Year" keyboardType="numeric" className="border p-2 mb-2 rounded" value={String(bookForm.publishedYear)} onChangeText={text=>setBookForm({...bookForm,publishedYear:Number(text)})}/>
            <TextInput placeholder="Total Copies" keyboardType="numeric" className="border p-2 mb-2 rounded" value={String(bookForm.totalCopies)} onChangeText={text=>setBookForm({...bookForm,totalCopies:Number(text), availableCopies:Number(text)})}/>
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity onPress={()=>{ setShowAddBookModal(false); setShowEditBookModal(false); setBookForm({
                title: "", author: "", category: "", isbn: "", description: "",
                publisher: "", publishedYear: new Date().getFullYear(), coverImage: "",
                totalCopies: 1, availableCopies: 1, _id: null })}} className="px-4 py-2 mr-2 bg-gray-300 rounded"><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity onPress={showAddBookModal ? handleAddBook : handleEditBook} className="px-4 py-2 bg-blue-500 rounded"><Text className="text-white">{showAddBookModal ? "Add" : "Save"}</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  );
}
