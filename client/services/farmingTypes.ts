import { Ionicons } from "@expo/vector-icons";

export type FarmingType = {
  en: string;
  sw: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
};

export const farmingTypes: FarmingType[] = [
  {
    en: "Crop Farming",
    sw: "Kilimo cha Mazao",
    icon: "leaf-outline",
  },
  {
    en: "Livestock Farming",
    sw: "Ufugaji wa Mifugo",
    icon: "paw-outline",
  },
  {
    en: "Poultry Farming",
    sw: "Ufugaji wa Kuku",
    icon: "egg-outline",
  },
  {
    en: "Dairy Farming",
    sw: "Ufugaji wa Maziwa",
    icon: "water-outline",
  },
  {
    en: "Fish Farming",
    sw: "Ufugaji wa Samaki",
    icon: "fish-outline",
  },
  {
    en: "Horticulture",
    sw: "Kilimo cha Bustani",
    icon: "flower-outline",
  },
  {
    en: "Organic Farming",
    sw: "Kilimo Hai",
    icon: "leaf-outline",
  },
  {
    en: "Mixed Farming",
    sw: "Kilimo Mseto",
    icon: "grid-outline",
  },
  {
    en: "Agroforestry",
    sw: "Kilimo cha Misitu na Mazao",
    icon: "git-branch-outline",
  },
  {
    en: "Greenhouse Farming",
    sw: "Kilimo cha Greenhouse",
    icon: "home-outline",
  },
  {
    en: "Irrigation Farming",
    sw: "Kilimo cha Umwagiliaji",
    icon: "water-outline",
  },
  {
    en: "Other",
    sw: "Nyingine",
    icon: "ellipsis-horizontal-circle-outline",
  },
];
