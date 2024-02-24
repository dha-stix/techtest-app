import { Tabs, Redirect } from "expo-router";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../../lib/AuthProvider";
import { ActivityIndicator } from "react-native";


export default function TabScreen() {
	const { session, loading } = useAuth();

	if (!session) {
		return <Redirect href="/" />
	} else if (loading) {
		return <ActivityIndicator size='large' color='#f97316' />;
	} else {
		return (
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: "#f97316",
					tabBarInactiveTintColor: "gray",
					tabBarShowLabel: false,
					headerShown: false,
					tabBarStyle: { backgroundColor: "#ffedd5", borderTopColor: "#ffedd5" },
				}}
			>
				<Tabs.Screen
					name='index'
					options={{
						tabBarIcon: ({ color }) => (
							<Ionicons name='home' size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='leaderboard'
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialIcons name='leaderboard' size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name='profile'
					options={{
						tabBarIcon: ({ color }) => (
							<FontAwesome5 name='user-alt' size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		);
	}
}