import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface Attempts {
	score: number;
	date: string;
}

export default function Attempts({ item }: { item: string }) {
	const { score, date }: Attempts = JSON.parse(item);

	return (
		<View className='flex flex-row items-center justify-between bg-white w-full rounded-xl shadow-sm shadow-white p-4 mb-3'  style={{padding: 22}}>
			<View className='flex flex-row items-center'>
				<FontAwesome5
					name='star'
					size={24}
					color='#d97706'
					className='mr-3'
				/>
			</View>

			<Text className='font-bold text-gray-500 text-lg'>{date}</Text>
			<View className='bg-orange-500 px-4 py-3 rounded-full'>
				<Text className='font-bold text-white text-lg'>{score}</Text>
			</View>
		</View>
	);
}