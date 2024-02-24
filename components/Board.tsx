import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { returnFirstSixWords } from "../lib/util";

interface Props {
	total_score: number;
	user_id: string;
}

export default function Board({ item }: { item: Props }) {
	return (
		<View className='flex flex-row items-center justify-between bg-white w-full rounded-xl shadow-sm shadow-white mb-3' style={{padding: 22}}>
			<View className='flex flex-row items-center'>
				<FontAwesome5
					name='trophy'
					size={24}
					color='#d97706'
					className='mr-3'
				/>
			</View>

			<Text className='font-bold text-gray-500 text-lg'>
				{returnFirstSixWords(item.user_id)}
			</Text>
			<View className='bg-orange-500 px-4 py-3 rounded-full'>
				<Text className='font-bold text-white text-lg'>{item.total_score}</Text>
			</View>
		</View>
	);
}