<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\CookingTypeRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CookingTypeRepository::class)]
#[ORM\Table(name: '`cooking_type`')]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['cooking_type:read']],
    graphQlOperations: [
        new QueryCollection(),
        new Query(),
    ]
)]
class CookingType implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['cooking_type:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Le type de cuisson ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['cooking_type:read'])]
    private ?string $label = null;

    #[ORM\Column(type: 'integer')]
    #[Assert\Positive(
        message: 'Le tri doit être positif.'
    )]
    #[Groups(['cooking_type:read'])]
    private ?int $sort = null;

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

    public function getSort(): ?int
    {
        return $this->sort;
    }

    public function setSort(int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }
}
