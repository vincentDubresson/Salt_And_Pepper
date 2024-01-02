<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\IngredientRecipeRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IngredientRecipeRepository::class)]
#[ORM\Table(name: '`ingredient_recipe`')]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['ingredient_recipe:read']],
    // Available to write
    denormalizationContext: ['groups' => ['ingredient_recipe:create', 'ingredient_recipe:update']],
    graphQlOperations: [
        new QueryCollection(),
        new Mutation(
            security: 'is_granted("ROLE_USER")',
            name: 'create',
        ),
        new Mutation(
            security: 'is_granted("ROLE_USER")',
            name: 'update',
        ),
        new DeleteMutation(
            security: 'is_granted("ROLE_USER")',
            name: 'delete'
        ),
    ]
)]
class IngredientRecipe implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['recipe:read', 'ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'float')]
    #[Assert\Type(
        type: 'float',
        message: 'La valeur "{{ value }}" n\'est un nombre à virgule (ex: 1,00).',
    )]
    #[Groups(['recipe:read', 'ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?float $quantity = null;

    #[ORM\Column(type: 'integer')]
    #[Assert\Positive(
        message: 'Le tri doit être positif.'
    )]
    #[Groups(['recipe:read', 'ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?int $sort = null;

    #[ORM\ManyToOne(inversedBy: 'ingredientRecipes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?Recipe $recipe = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['recipe:read', 'ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?Unity $unity = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recipe:read', 'ingredient_recipe:read', 'ingredient_recipe:create', 'ingredient_recipe:update'])]
    private ?Ingredient $ingredient = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getQuantity(): ?float
    {
        return $this->quantity;
    }

    public function setQuantity(float $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function setSort(int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): static
    {
        $this->recipe = $recipe;

        return $this;
    }

    public function getUnity(): ?Unity
    {
        return $this->unity;
    }

    public function setUnity(?Unity $unity): static
    {
        $this->unity = $unity;

        return $this;
    }

    public function getIngredient(): ?Ingredient
    {
        return $this->ingredient;
    }

    public function setIngredient(?Ingredient $ingredient): static
    {
        $this->ingredient = $ingredient;

        return $this;
    }
}
