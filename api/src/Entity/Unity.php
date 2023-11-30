<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\UnityRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UnityRepository::class)]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['unity:read']],
    graphQlOperations: [
        new QueryCollection(),
        new Query(),
    ]
)]
class Unity implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['ingredient_recipe:read', 'unity:read', 'recipe:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255, unique: true, nullable: true)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'L\'unité ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['ingredient_recipe:read', 'unity:read', 'recipe:read'])]
    private ?string $label = null;

    #[ORM\Column(type: 'string', length: 255, unique: true, nullable: true)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'L\'abréviation de l\'unité ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['ingredient_recipe:read', 'unity:read', 'recipe:read'])]
    private ?string $abreviation = null;

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

    public function getAbreviation(): ?string
    {
        return $this->abreviation;
    }

    public function setAbreviation(string $abreviation): static
    {
        $this->abreviation = $abreviation;

        return $this;
    }
}
