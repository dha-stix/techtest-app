import {
	categories,
	getGreeting,
	getQuestions,
	returnFirstSixWords,
} from "../../lib/util";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../lib/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { SvgUri } from "react-native-svg";
import Categories from "../../components/Categories";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function HomeScreen() {
	const greet = getGreeting();
	const router = useRouter();
	const { session } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const [userCategories, setUserCategories] = useState<string[]>([]);

	const fetchQuestions = async () => {
		setLoading(true);
		const selectedQuestions = categories.filter((obj) =>
			userCategories.includes(obj.topic)
		);
		const endpoints = selectedQuestions.map((question) => question.url);
		const response = await getQuestions(endpoints);
		if (response) {
			router.push("/(stack)/test");
			setLoading(false);
		}
	};

	const handleStartTest = async () => {
		Alert.alert("Start Test", "Are you sure you want to start the test?", [
			{
				text: "Cancel",
				style: "destructive",
			},
			{
				text: "Yes",
				onPress: () => fetchQuestions(),
			},
		]);
	};

	return (
		<SafeAreaView className='flex-1 bg-orange-100 px-4 py-2'>
			<View className='flex flex-row items-center justify-between mb-2'>
				<View>
					<Text className='font-bold text-2xl mb-[1px]'>
						{greet.greeting}

						<Ionicons
							name={`${greet.day ? "partly-sunny-sharp" : "moon"}`}
							size={24}
							color='orange'
						/>
					</Text>

					<Text className='text-lg'>
						Welcome {returnFirstSixWords(session?.user.email)}
					</Text>
				</View>

				<View className='rounded-full w-[70px] h-[70px] flex items-center justify-center bg-[#fdba74]'>
					<SvgUri
						width='60'
						height='50'
						uri={`https://api.dicebear.com/7.x/notionists/svg?backgroundColor=fdba74&seed=${
							session?.user.email || "user"
						}`}
					/>
				</View>
			</View>
			{userCategories.length === 4 && (
				<Pressable
					className={`w-full h-[70px] flex items-center justify-center ${
						loading ? "bg-orange-300" : "bg-orange-500"
					} rounded-xl mb-2`}
					disabled={loading}
					onPress={() => handleStartTest()}
				>
					<Text className='text-xl font-bold text-orange-50'>
						{loading ? "Loading questions..." : "START TEST"}
					</Text>
				</Pressable>
			)}

			<View className='w-full flex-1'>
				<Text className='text-xl font-bold text-orange-500 mb-4'>
					Available Categories
				</Text>
				<FlatList
					data={categories}
					numColumns={2}
					contentContainerStyle={{ width: "100%", gap: 10 }}
					columnWrapperStyle={{ gap: 10 }}
					renderItem={({ item }) => (
						<Categories
							item={item}
							userCategories={userCategories}
							setUserCategories={setUserCategories}
						/>
					)}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
		
	);
}