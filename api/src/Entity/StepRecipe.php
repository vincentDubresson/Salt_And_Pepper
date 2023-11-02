<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StepRecipeRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: StepRecipeRepository::class)]
#[ORM\Table(name: '`step_recipe`')]
#[ApiResource(
    operations: [],
    graphQlOperations: []
)]
class StepRecipe implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['recipe:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\Blank(message: 'La description est obligatoire')]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?string $description = null;

    #[ORM\Column(type: 'integer')]
    #[Assert\Positive(
        message: 'Le tri doit être positif.'
    )]
    #[Groups(['recipe:read', 'recipe:create', 'recipe:update'])]
    private ?int $sort = null;

    #[ORM\ManyToOne(inversedBy: 'stepRecipes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Recipe $recipe = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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
}
