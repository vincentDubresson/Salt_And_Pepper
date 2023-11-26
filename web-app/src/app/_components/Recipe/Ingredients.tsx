// TODO: Trouver un moyen de récupérer les ingrédients de la recette
// TODO: Gérer le type de recipe
export default function Ingredients({ recipe }: { recipe: any }) {
  console.log(recipe?.ingredientRecipes.edges);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Ingrédients</h2>
        <div className="flex items-center gap-2">
          <span className="text-sp-primary-400">4</span>
          <span>personnes</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {recipe?.ingredientRecipes.edges.map((ingredient: any) => (
          <div
            key={ingredient.node.id}
            className="flex justify-between items-center"
          >
            <span>{ingredient.node.label}</span>
            <span className="text-sp-primary-400">
              {ingredient.node.quantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
