// TODO: Gérer le type de recipe
export default function Breadcrumb({ recipe }: { recipe: any }) {
  return (
    <p className="text-xs">
      {/* TODO: Ajouter les liens au fil d'ariane */}
      recette au hasard <span className="text-sp-primary-400">&gt;</span>{' '}
      {recipe?.subCategory.category.label}{' '}
      <span className="text-sp-primary-400">&gt;</span>{' '}
      {recipe?.subCategory.label}{' '}
      <span className="text-sp-primary-400">&gt;</span> {recipe?.label}
    </p>
  );
}
