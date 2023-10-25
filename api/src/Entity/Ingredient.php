<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\IngredientRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\SluggableInterface;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Sluggable\SluggableTrait;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: IngredientRepository::class)]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['ingredient:read']],
    graphQlOperations: [
        new QueryCollection(),
        new Query(),
    ]
)]
class Ingredient implements TimestampableInterface, SluggableInterface
{
    use TimestampableTrait;
    use sluggableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['ingredient:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'L\'ingrédient ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['ingredient:read'])]
    private ?string $label = null;

    /**
     * @var string
     */
    #[Groups(['ingredient:read', 'ingredient:read'])]
    protected $slug;

    public function __toString(): string
    {
        return (string) $this->getlabel();
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
