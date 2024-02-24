import { Redirect, Stack } from "expo-router";
import { useAuth } from "../../lib/AuthProvider";
import { ActivityIndicator } from "react-native";

export default function TabScreen() {
	const { session, loading } = useAuth();

	if (!session) {
		return <Redirect href='/' />;
	} else if (loading) {
		return <ActivityIndicator size='large' color='#f97316' />;
	} else {
		return <Stack screenOptions={{ headerShown: false }} />;
	}
}