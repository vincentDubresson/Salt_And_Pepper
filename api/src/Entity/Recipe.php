<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\RecipeRepository;
use App\Resolver\LastFourRecipesQueryResolver;
use App\Resolver\RandomRecipeQueryResolver;
use DateTime;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\SluggableInterface;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Sluggable\SluggableTrait;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecipeRepository::class)]
#[ORM\Table(name: '`recipe`')]
#[UniqueEntity(fields: ['label'], message: 'Ce nom de recette a déjà été utilisé.')]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['recipe:read']],
    // Available to write
    denormalizationContext: ['groups' => ['recipe:create', 'recipe:update']],
    graphQlOperations: [
        new QueryCollection(),
        new QueryCollection(
            args: [],
            paginationItemsPerPage: 5,
            order: ['createdAt' => 'DESC'],
            name: 'lastFour'
        ),
        new Query(),
        new Query(
            resolver: RandomRecipeQueryResolver::class,
            args: [],
            name: 'random',
        ),
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
class Recipe implements TimestampableInterface, SluggableInterface
{
    use TimestampableTrait;
    use SluggableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['recipe:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Le titre est obligatoire.')]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Le titre ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?string $label = null;

    /**
     * @var string
     */
    #[Groups(['recipe:read'])]
    protected $slug;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?string $description = null;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotBlank(message: 'Ce nombre est obligatoire.')]
    #[Assert\Positive(
        message: 'Ce nombre doit être positif.'
    )]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?int $servingNumber = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank(message: 'Ce champ est obligatoire.')]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Ce champ ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?string $servingUnit = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Assert\NotBlank(message: 'La durée de préparation est obligatoire.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?DateTime $preparationTime = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Assert\NotBlank(message: 'La durée de cuisson est obligatoire.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?DateTime $cookingTime = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Assert\NotBlank(message: 'La durée de repos est obligatoire.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?DateTime $restingTime = null;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?SubCategory $subCategory = null;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?CookingType $cookingType = null;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?Difficulty $difficulty = null;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?Cost $cost = null;

    #[ORM\ManyToOne(inversedBy: 'recipes')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: IngredientRecipe::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private Collection $ingredientRecipes;

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: StepRecipe::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private Collection $stepRecipes;

    #[ORM\OneToMany(mappedBy: 'recipe', targetEntity: ImageRecipe::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private Collection $imageRecipes;

    /**
     * @var DateTimeInterface
     */
    #[Groups(['recipe:read'])]
    protected $createdAt;

    /**
     * @var DateTimeInterface
     */
    #[Groups(['recipe:read'])]
    protected $updatedAt;

    public function __construct()
    {
        $this->ingredientRecipes = new ArrayCollection();
        $this->stepRecipes = new ArrayCollection();
        $this->imageRecipes = new ArrayCollection();
    }

    public function __toString(): string
    {
        return (string) $this->getLabel();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getServingNumber(): ?int
    {
        return $this->servingNumber;
    }

    public function setServingNumber(int $servingNumber): static
    {
        $this->servingNumber = $servingNumber;

        return $this;
    }

    public function getServingUnit(): ?string
    {
        return $this->servingUnit;
    }

    public function setServingUnit(string $servingUnit): static
    {
        $this->servingUnit = $servingUnit;

        return $this;
    }

    public function getPreparationTime(): ?DateTime
    {
        return $this->preparationTime;
    }

    public function setPreparationTime(DateTime $preparationTime): static
    {
        $this->preparationTime = $preparationTime;

        return $this;
    }

    public function getCookingTime(): ?DateTime
    {
        return $this->cookingTime;
    }

    public function setCookingTime(DateTime $cookingTime): static
    {
        $this->cookingTime = $cookingTime;

        return $this;
    }

    public function getRestingTime(): ?DateTime
    {
        return $this->restingTime;
    }

    public function setRestingTime(DateTime $restingTime): static
    {
        $this->restingTime = $restingTime;

        return $this;
    }

    public function getSubCategory(): ?SubCategory
    {
        return $this->subCategory;
    }

    public function setSubCategory(?SubCategory $subCategory): static
    {
        $this->subCategory = $subCategory;

        return $this;
    }

    public function getCookingType(): ?CookingType
    {
        return $this->cookingType;
    }

    public function setCookingType(?CookingType $cookingType): static
    {
        $this->cookingType = $cookingType;

        return $this;
    }

    public function getDifficulty(): ?Difficulty
    {
        return $this->difficulty;
    }

    public function setDifficulty(?Difficulty $difficulty): static
    {
        $this->difficulty = $difficulty;

        return $this;
    }

    public function getCost(): ?Cost
    {
        return $this->cost;
    }

    public function setCost(?Cost $cost): static
    {
        $this->cost = $cost;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return string[]
     */
    public function getSluggableFields(): array
    {
        return ['label'];
    }

    /**
     * @param array<string> $values
     */
    public function generateSlugValue(array $values): string
    {
        $stringValues = strtolower(implode(' ', $values));

        $slugger = new AsciiSlugger('fr');

        return $slugger->slug($stringValues);
    }

    /**
     * @return Collection<int, IngredientRecipe>
     */
    public function getIngredientRecipes(): Collection
    {
        return $this->ingredientRecipes;
    }

    public function addIngredientRecipe(IngredientRecipe $ingredientRecipe): static
    {
        if (!$this->ingredientRecipes->contains($ingredientRecipe)) {
            $this->ingredientRecipes->add($ingredientRecipe);
            $ingredientRecipe->setRecipe($this);
        }

        return $this;
    }

    public function removeIngredientRecipe(IngredientRecipe $ingredientRecipe): static
    {
        if ($this->ingredientRecipes->removeElement($ingredientRecipe)) {
            // set the owning side to null (unless already changed)
            if ($ingredientRecipe->getRecipe() === $this) {
                $ingredientRecipe->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, StepRecipe>
     */
    public function getStepRecipes(): Collection
    {
        return $this->stepRecipes;
    }

    public function addStepRecipe(StepRecipe $stepRecipe): static
    {
        if (!$this->stepRecipes->contains($stepRecipe)) {
            $this->stepRecipes->add($stepRecipe);
            $stepRecipe->setRecipe($this);
        }

        return $this;
    }

    public function removeStepRecipe(StepRecipe $stepRecipe): static
    {
        if ($this->stepRecipes->removeElement($stepRecipe)) {
            // set the owning side to null (unless already changed)
            if ($stepRecipe->getRecipe() === $this) {
                $stepRecipe->setRecipe(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ImageRecipe>
     */
    public function getImageRecipes(): Collection
    {
        return $this->imageRecipes;
    }

    public function addImageRecipe(ImageRecipe $imageRecipe): static
    {
        if (!$this->imageRecipes->contains($imageRecipe)) {
            $this->imageRecipes->add($imageRecipe);
            $imageRecipe->setRecipe($this);
        }

        return $this;
    }

    public function removeImageRecipe(ImageRecipe $imageRecipe): static
    {
        if ($this->imageRecipes->removeElement($imageRecipe)) {
            // set the owning side to null (unless already changed)
            if ($imageRecipe->getRecipe() === $this) {
                $imageRecipe->setRecipe(null);
            }
        }

        return $this;
    }
}
