import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function Index() {
  const { navigate } = useRouter();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigate("/onboarding")}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </TouchableOpacity>
  );
}
