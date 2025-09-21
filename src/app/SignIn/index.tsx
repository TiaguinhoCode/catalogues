// Expo
import { signIn } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// React
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, TextInput, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const handleSignIn = async () => {
    try {
      if (!emailInput || !passwordInput) {
        alert("Por favor, preencha e-mail e senha.");
        return;
      }

      const data = await signIn(emailInput, passwordInput);

      if (data.message) {
        alert(data.message);
      } else {
        alert(data.msg || "Login realizado com sucesso!");
        router.push("/FormProducts");
      }
    } catch (error: any) {
      console.error("Erro inesperado:", error);
      alert("Erro inesperado. Tente novamente mais tarde.");
    }
  };

  return (
    <LinearGradient
      colors={["#f0fbff", "#ECECEC", "#e6f7ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView
        className="flex-1"
        edges={["top", "bottom", "left", "right"]}
      >
        <Animated.View style={{ flex: 1, opacity: fade }}>
          <Animatable.View
            animation="fadeInDown"
            className="absolute -right-20 -top-12 w-56 h-56 rounded-full opacity-20 bg-blue-200"
          />
          <Animatable.View
            animation="fadeInUp"
            className="absolute -left-20 -bottom-16 w-72 h-72 rounded-full opacity-20 bg-blue-300"
          />

          <View className="flex-1 px-6">
            <Animatable.View
              animation="zoomIn"
              className="flex-1 items-center justify-center"
            >
              <View className="w-full pb-3">
                <View className="flex-row bg-[#f1f5f9] rounded-xl mx-4 mt-6">
                  <Pressable
                    className={`flex-1 py-3 rounded-full ${
                      activeTab === "login" ? "bg-[#1465D1]" : ""
                    }`}
                  >
                    <Text
                      className={`text-center font-bold ${
                        activeTab === "login" ? "text-white" : "text-gray-600"
                      }`}
                    >
                      Acessar
                    </Text>
                  </Pressable>

                  <Pressable
                    className={`flex-1 py-3 rounded-full ${
                      activeTab === "register" ? "bg-[#1465D1]" : ""
                    }`}
                  >
                    <Text
                      className={`text-center font-bold ${
                        activeTab === "register"
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      Cadastrar no sistema
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View className="w-full max-w-md bg-white/90 rounded-3xl p-6 shadow-lg">
                <View className="w-28 h-28 rounded-full bg-white overflow-hidden self-center shadow-md">
                  <Animatable.Image
                    source={require("../../../assets/images/logo/logo.jpeg")}
                    animation="flipInY"
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>

                <Animatable.Text
                  animation="fadeIn"
                  delay={300}
                  className="text-2xl font-extrabold text-gray-800 text-center mt-4"
                >
                  Acesse o sistema
                </Animatable.Text>

                <Animatable.View animation="fadeInUp" delay={500}>
                  <Text className="text-gray-600 text-sm mt-6 px-2 pb-2">
                    E-mail*
                  </Text>
                  <View className="flex-row items-center bg-gray-100 rounded-full px-3">
                    <Ionicons
                      name="person-circle-outline"
                      size={28}
                      color="#666"
                      className="px-1"
                    />
                    <TextInput
                      placeholder="empresa@domain.com"
                      placeholderTextColor="#999"
                      className="flex-1 p-3 text-gray-700"
                      value={emailInput}
                      onChangeText={setEmailInput}
                    />
                  </View>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={700}>
                  <Text className="text-gray-600 text-sm mt-6 px-2 pb-2">
                    Senha*
                  </Text>
                  <View className="relative">
                    <View className="flex-row items-center bg-gray-100 rounded-full px-3">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#666"
                      />
                      <TextInput
                        placeholder="Sua senha"
                        placeholderTextColor="#999"
                        secureTextEntry={!showPassword}
                        className="flex-1 p-3 text-gray-700"
                        value={passwordInput}
                        onChangeText={setPasswordInput}
                      />
                    </View>
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#666"
                      />
                    </Pressable>
                  </View>
                </Animatable.View>

                <Animatable.View animation="fadeInUp" delay={900}>
                  <Pressable
                    className="mt-6 bg-blue-600 rounded-xl"
                    onPress={handleSignIn}
                  >
                    <Text className="text-center text-white font-semibold text-lg py-3">
                      Entrar
                    </Text>
                  </Pressable>
                </Animatable.View>

                <Pressable className="mt-4">
                  <Text className="text-center text-blue-600 underline underline-offset-2">
                    Esqueci minha senha
                  </Text>
                </Pressable>
              </View>
            </Animatable.View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
