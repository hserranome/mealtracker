import { useRouter } from "expo-router";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import {
	Button,
	InputContainer,
	Separator,
	TextInput,
} from "~/components/common";
import { MacrosRow } from "~/components/common/MacrosRow/MacrosRow";
import type { Recipe } from "~/data";
import { RecipeIngredientsList } from "./RecipeIngredientsList";

interface RecipeFormProps {
	form: UseFormReturn<Recipe>;
	onSubmit: (data: Recipe) => void;
	submitButtonText?: string;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
	form,
	onSubmit,
	submitButtonText = "Save",
}) => {
	const router = useRouter();
	const { styles, theme } = useStyles(stylesheet);

	const submit = form.handleSubmit(onSubmit);

	return (
		<KeyboardAwareScrollView>
			<FormProvider {...form}>
				<View style={styles.container}>
					<TextInput
						name="name"
						label="Recipe Name"
						autoFocus
						onSubmitEditing={() => form.setFocus("description")}
					/>
					<TextInput
						name="description"
						label="Description"
						multiline
						numberOfLines={3}
					/>
					<InputContainer direction="horizontal" label="Serving Size">
						<TextInput
							name="serving_size"
							type="number"
							keyboardType="numeric"
							style={styles.servingSizeInput}
						/>
						<TextInput
							name="serving_unit"
							placeholder="e.g., servings, g, ml"
							style={styles.servingUnitInput}
						/>
					</InputContainer>
					<Separator title="Ingredients" />
					<RecipeIngredientsList />
					<Separator title="Nutrition Facts" />
					<MacrosRow {...form.watch("nutriments")} />
					<View style={styles.buttonContainer}>
						<Button onPress={submit} title={submitButtonText} />
					</View>
				</View>
			</FormProvider>
		</KeyboardAwareScrollView>
	);
};

const stylesheet = createStyleSheet((theme) => ({
	container: {
		flex: 1,
		padding: theme.margins[16],
	},
	servingSizeInput: {
		flex: 1,
		marginRight: theme.margins[8],
	},
	servingUnitInput: {
		flex: 2,
	},
	buttonContainer: {
		marginTop: theme.margins[24],
	},
}));
