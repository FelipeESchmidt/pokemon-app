import { ScrollView, StyleSheet, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { Text } from "@/components/Themed";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCustomStore } from "@/store/customPokemons";
import { generatePokemon } from "@/helpers/generatePokemon";

const schema = z.object({
  name: z.string().min(2),
  type: z.string().min(3).optional(),
  sprite: z.string().url().optional(),
});

export type NewPokemonFormData = z.infer<typeof schema>;

export default function AddPokemonScreen() {
  const router = useRouter();
  const { add } = useCustomStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPokemonFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: NewPokemonFormData) => {
    const completedPokemon = generatePokemon(data);
    add(completedPokemon);
    router.back();
    Alert.alert("Success", `Added ${data.name}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Pokémon</Text>

      <Input
        label="Name"
        {...register("name")}
        onChangeText={(t: string) => setValue("name", t)}
        placeholder="e.g. MyMon"
        error={errors.name}
        customErrorMessage="Name is required and must be at least 2 characters"
      />

      <Input
        label="Type"
        {...register("type")}
        onChangeText={(t: string) => setValue("type", t)}
        placeholder="e.g. fire"
        error={errors.type}
        customErrorMessage="Type must be at least 3 characters"
      />

      <Input
        label="Sprite URL"
        {...register("sprite")}
        onChangeText={(t: string) => setValue("sprite", t)}
        placeholder="https://...png"
        error={errors.sprite}
        customErrorMessage="Must be a valid URL"
      />

      <Button text="Create" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { display: "flex", gap: 12, padding: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
});
