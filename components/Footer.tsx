// Icons
import { AntDesign, Feather } from "@expo/vector-icons";

// Bibliotecas
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <>
      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white flex-row justify-between items-center p-5 shadow-lg">
        {/* Home Button */}
        <TouchableOpacity onPress={() => router.push("/Catalog")}>
          <Feather name="home" size={24} color="black" />
        </TouchableOpacity>

        {/* Search Button */}
        <TouchableOpacity onPress={() => router.push("/Search")}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>

        {/* Account Button */}
        <TouchableOpacity onPress={handleToggleModal}>
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Account Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleToggleModal}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={handleToggleModal}
        >
          <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-6">
            <Text className="text-xl font-bold mb-4">Minha Conta</Text>

            {/* Perfil */}
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => console.log("Ver perfil")}
            >
              <AntDesign name="user" size={20} color="black" />
              <Text className="ml-3 text-lg">Perfil</Text>
            </TouchableOpacity>

            {/* Settings */}
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => console.log("Configurações")}
            >
              <Feather name="settings" size={20} color="black" />
              <Text className="ml-3 text-lg">Configurações</Text>
            </TouchableOpacity>

            {/* Light/Dark mode */}
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center">
                <Feather name="moon" size={20} color="black" />
                <Text className="ml-3 text-lg">Modo Escuro</Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setIsDarkMode(value)}
              />
            </View>

            {/* Logout */}
            <TouchableOpacity
              className="flex-row items-center py-3"
              onPress={() => router.push("/")}
            >
              <AntDesign name="logout" size={20} color="red" />
              <Text className="ml-3 text-lg text-red-600">Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
