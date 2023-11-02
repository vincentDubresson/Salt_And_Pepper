<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\RecipeRepository;
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
    normalizationContext: ['groups' => ['user:read']],
    // Available to write
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
    graphQlOperations: [
        new QueryCollection(),
        new Query(),
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

    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    #[Assert\NotBlank(message: 'La durée de préparation est obligatoire.')]
    #[Assert\Time(message: 'Le format de durée de préparation n\'est pas conforme.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?\DateTimeImmutable $preparationTime = null;

    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    #[Assert\NotBlank(message: 'La durée de cuisson est obligatoire.')]
    #[Assert\Time(message: 'Le format de durée de cuisson n\'est pas conforme.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?\DateTimeImmutable $cookingTime = null;

    #[ORM\Column(type: Types::TIME_IMMUTABLE)]
    #[Assert\NotBlank(message: 'La durée de repose est obligatoire.')]
    #[Assert\Time(message: 'Le format de durée de repos n\'est pas conforme.')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?\DateTimeImmutable $restingTime = null;

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

    /**
     * @var \DateTimeInterface
     */
    #[Groups(['recipe:read'])]
    protected $createdAt;

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

    public function getPreparationTime(): ?\DateTimeImmutable
    {
        return $this->preparationTime;
    }

    public function setPreparationTime(\DateTimeImmutable $preparationTime): static
    {
        $this->preparationTime = $preparationTime;

        return $this;
    }

    public function getCookingTime(): ?\DateTimeImmutable
    {
        return $this->cookingTime;
    }

    public function setCookingTime(\DateTimeImmutable $cookingTime): static
    {
        $this->cookingTime = $cookingTime;

        return $this;
    }

    public function getRestingTime(): ?\DateTimeImmutable
    {
        return $this->restingTime;
    }

    public function setRestingTime(\DateTimeImmutable $restingTime): static
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
}
