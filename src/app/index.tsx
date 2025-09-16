// Expo
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// React
import React from "react";
import { Pressable, Text, View } from "react-native";

// Biblioteca
import * as Animatable from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#f0fbff", "#ECECEC", "#e6f7ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      {/* Container principal com padding seguro */}
      <SafeAreaView
        className="flex-1 px-6 pt-10 pb-6"
        edges={["top", "bottom", "left", "right"]}
      >
        {/* Formulário / Card */}
        <Animatable.View
          animation="zoomIn"
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View className="w-[350px] h-[290px] bg-white/80 rounded-3xl p-6 items-center shadow-lg">
            <View className="w-[140px] h-[140px] rounded-full bg-white overflow-hidden items-center justify-center">
              <Animatable.Image
                source={require("../../assets/images/logo/logo.jpeg")}
                animation="flipInY"
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>

            <Animatable.View animation="fadeIn" className="mt-4 items-center">
              <Text className="text-3xl font-extrabold text-gray-800 text-center">
                Bem-vindo ao <Text className="text-blue-600">Cataloguês</Text>
              </Text>

              <Text className="text-gray-600 text-sm text-center mt-2 max-w-[260px]">
                Gerencie seu estoque e sua loja virtual do seu jeito com o
                Cataloguês.
              </Text>
            </Animatable.View>
          </View>
        </Animatable.View>

        {/* Botões */}
        <Animatable.View
          delay={600}
          animation="fadeInUp"
          className="mt-6 items-center"
        >
          <Pressable
            onPress={() => router.push("/SignIn")}
            className="w-64 bg-blue-600 px-4 py-3 rounded-full"
          >
            <Animatable.Text
              animation="pulse"
              iterationCount="infinite"
              easing="ease-out"
              className="text-white text-lg font-semibold text-center"
            >
              Acessar
            </Animatable.Text>
          </Pressable>

          <Pressable onPress={() => router.push("/Catalog")} className="mt-4">
            <Animatable.Text
              animation="fadeIn"
              delay={1200}
              className="text-blue-600 text-base underline underline-offset-4 text-center"
            >
              Ver catálogos de produtos
            </Animatable.Text>
          </Pressable>

          <Text className="text-gray-500 text-center text-sm mt-6">
            Feito com 💙 para o seu negócio
          </Text>
        </Animatable.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
