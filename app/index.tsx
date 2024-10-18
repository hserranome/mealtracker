import { useRouter } from "expo-router";
import { useEffect } from "react";

import { LoadingScreen } from "~/components/common/LoadingScreen";
import { caloriesSchedule$ } from "~/data";

export default function Index() {
	return <LoadingScreen />;
}
