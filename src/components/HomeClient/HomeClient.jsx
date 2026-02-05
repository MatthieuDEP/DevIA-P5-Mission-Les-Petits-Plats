"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FiltersBar from "@/components/FiltersBar/FiltersBar";
import RecipeGrid from "@/components/RecipeGrid/RecipeGrid";

function normalize(str) {
  return String(str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Première lettre en majuscule
function capitalize(str) {
  const s = String(str || "").trim();
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

// URL <-> listes
function parseList(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildQueryString({ ingredients, appliances, ustensils }) {
  const sp = new URLSearchParams();

  if (ingredients.length) sp.set("ingredients", ingredients.join(","));
  if (appliances.length) sp.set("appliances", appliances.join(","));
  if (ustensils.length) sp.set("ustensils", ustensils.join(","));

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

// Transforme une liste en liste unique triée
function uniqueSorted(list) {
  const map = new Map();
  for (const item of list) {
    if (!item?.key) continue;
    if (!map.has(item.key)) map.set(item.key, item.label);
  }
  return Array.from(map, ([key, label]) => ({ key, label })).sort((a, b) =>
    a.label.localeCompare(b.label, "fr")
  );
}

function includesAll(haystackSet, selectedKeys) {
  return selectedKeys.every((k) => haystackSet.has(k));
}

export default function HomeClient({ recipes }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedIngredients, setSelectedIngredients] = useState(() =>
    parseList(searchParams.get("ingredients"))
  );
  const [selectedAppliances, setSelectedAppliances] = useState(() =>
    parseList(searchParams.get("appliances"))
  );
  const [selectedUstensils, setSelectedUstensils] = useState(() =>
    parseList(searchParams.get("ustensils"))
  );

  // Sync -> URL sens unique
  useEffect(() => {
    const qs = buildQueryString({
      ingredients: selectedIngredients,
      appliances: selectedAppliances,
      ustensils: selectedUstensils,
    });

    router.replace(`${pathname}${qs}`, { scroll: false });
  }, [selectedIngredients, selectedAppliances, selectedUstensils, pathname, router]);

  // Filtrage des recettes par tags sélectionnés
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const ingSet = new Set(r.ingredients.map((i) => normalize(i.ingredient)));
      const ustSet = new Set(r.ustensils.map((u) => normalize(u)));
      const applianceKey = normalize(r.appliance);

      const okIng = includesAll(ingSet, selectedIngredients);
      const okUst = includesAll(ustSet, selectedUstensils);
      const okApp =
        selectedAppliances.length === 0 || selectedAppliances.includes(applianceKey);

      return okIng && okUst && okApp;
    });
  }, [recipes, selectedIngredients, selectedUstensils, selectedAppliances]);

  // Tags disponibles recalculés sur les recettes filtrées
  const availableTags = useMemo(() => {
    const ing = [];
    const app = [];
    const ust = [];

    for (const r of filteredRecipes) {
      for (const i of r.ingredients) {
        const key = normalize(i.ingredient);
        ing.push({ key, label: capitalize(i.ingredient) });
      }

      const appKey = normalize(r.appliance);
      app.push({ key: appKey, label: capitalize(r.appliance) });

      for (const u of r.ustensils) {
        const key = normalize(u);
        ust.push({ key, label: capitalize(u) });
      }
    }

    const ingUnique = uniqueSorted(ing).filter((t) => !selectedIngredients.includes(t.key));
    const appUnique = uniqueSorted(app).filter((t) => !selectedAppliances.includes(t.key));
    const ustUnique = uniqueSorted(ust).filter((t) => !selectedUstensils.includes(t.key));

    return {
      ingredients: ingUnique,
      appliances: appUnique,
      ustensils: ustUnique,
    };
  }, [filteredRecipes, selectedIngredients, selectedAppliances, selectedUstensils]);

  // Actions sur les tags
  const onSelectTag = (type, key) => {
    if (!key) return;

    if (type === "ingredients") {
      setSelectedIngredients((prev) => (prev.includes(key) ? prev : [...prev, key]));
      return;
    }
    if (type === "appliances") {
      setSelectedAppliances((prev) => (prev.includes(key) ? prev : [...prev, key]));
      return;
    }
    if (type === "ustensils") {
      setSelectedUstensils((prev) => (prev.includes(key) ? prev : [...prev, key]));
    }
  };

  const onRemoveTag = (type, key) => {
    if (type === "ingredients") setSelectedIngredients((prev) => prev.filter((k) => k !== key));
    if (type === "appliances") setSelectedAppliances((prev) => prev.filter((k) => k !== key));
    if (type === "ustensils") setSelectedUstensils((prev) => prev.filter((k) => k !== key));
  };

  return (
    <>
      <FiltersBar
        count={filteredRecipes.length}
        tags={availableTags}
        selected={{
          ingredients: selectedIngredients,
          appliances: selectedAppliances,
          ustensils: selectedUstensils,
        }}
        onSelectTag={onSelectTag}
        onRemoveTag={onRemoveTag}
      />

      <RecipeGrid recipes={filteredRecipes} />
    </>
  );
}
