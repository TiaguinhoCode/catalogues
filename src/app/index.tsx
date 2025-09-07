// Expo
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

// React
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// bibliotecas
import * as Animatable from "react-native-animatable";

export default function WelcomeScreen() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <LinearGradient
      colors={["#f0fbff", "#ECECEC", "#e6f7ff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
        <Animated.View style={{ flex: 1, opacity: fade }}>
          <Animatable.View
            animation="fadeInDown"
            className="absolute -left-20 -top-12 w-56 h-56 rounded-full opacity-20 bg-blue-200"
          />
          <Animatable.View
            animation="fadeInUp"
            className="absolute -right-20 -bottom-16 w-72 h-72 rounded-full opacity-20 bg-blue-300"
          />

          <View className="flex-1 px-6">
            <Animatable.View
              animation="zoomIn"
              className="flex-1 items-center justify-center"
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

                <Animatable.View
                  animation="fadeIn"
                  className="mt-4 items-center"
                >
                  <Text className="text-3xl font-extrabold text-gray-800 text-center">
                    Bem-vindo ao{" "}
                    <Text className="text-blue-600">Cataloguês</Text>
                  </Text>

                  <Text className="text-gray-600 text-sm text-center mt-2 max-w-[260px]">
                    Gerencie seu estoque e sua loja virtual do seu jeito com o
                    Cataloguês.
                  </Text>
                </Animatable.View>
              </View>
            </Animatable.View>

            <Animatable.View
              delay={600}
              animation="fadeInUp"
              className="pb-8 mt-6"
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Entrar"
                onPress={() => router.push("/SignIn")}
                className="mx-5 bg-blue-600 px-4 py-2 rounded-full"
              >
                <View className="items-center">
                  <Animatable.Text
                    animation="pulse"
                    iterationCount="infinite"
                    easing="ease-out"
                    className="text-white text-lg font-semibold py-3"
                  >
                    Acessar
                  </Animatable.Text>
                </View>
              </Pressable>

              <Pressable
                accessibilityRole="link"
                accessibilityLabel="Ver catálogos de produtos"
                onPress={() => {
                  router.push("/Catalog");
                }}
                className="mt-4 items-center"
              >
                <View className="px-4 py-2">
                  <Animatable.Text
                    animation="fadeIn"
                    delay={1200}
                    className="text-blue-600 text-base underline underline-offset-4"
                  >
                    Ver catálogos de produtos
                  </Animatable.Text>
                </View>
              </Pressable>

              <Text className="text-gray-500 text-center text-sm mt-6">
                Feito com 💙 para o seu negócio
              </Text>
            </Animatable.View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}
