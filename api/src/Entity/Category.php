<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\SluggableInterface;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Sluggable\SluggableTrait;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
#[ORM\Table(name: '`category`')]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Post(
            validationContext: ['groups' => ['Default', 'category:create']],
        ),
        new Get(),
        new Put(),
        new Delete(),
    ],
    // Display when reading the object
    normalizationContext: ['groups' => ['category:read']],
    // Available to write
    denormalizationContext: ['groups' => ['category:create', 'category:update']],
)]
class Category implements TimestampableInterface, SluggableInterface
{
    use TimestampableTrait;
    use sluggableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['category:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'La catégorie ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['category:read', 'category:create', 'category:update'])]
    private ?string $label = null;

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
        return strtolower(implode('-', $values));
    }
}
