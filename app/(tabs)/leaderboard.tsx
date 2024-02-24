import { Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Board from "../../components/Board";
import { useEffect, useState } from "react";
import { getLeaderBoard } from "../../lib/util";

interface Props {
	total_score: number;
	user_id: string;
}
export default function LeaderboardScreen() {
	const [leaderboard, setLeaderboard] = useState<Props[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchLeaders = async () => {
			const leaders = await getLeaderBoard();
			if (!leaders) return;
			setLeaderboard(leaders);
			setLoading(false);
		};
		fetchLeaders();
	}, []);

	return (
		<SafeAreaView className='flex-1 bg-orange-100 p-4'>
				<Text className='text-2xl font-bold text-gray-500 text-center mb-6'>
					Leaderboard
				</Text>

				{loading ? (
					<ActivityIndicator size='large' color='#ea580c' />
				) : (
					<FlatList
						data={leaderboard}
						renderItem={({ item }) => <Board item={item} />}
						keyExtractor={(item) => item.user_id}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</SafeAreaView>
	);
}