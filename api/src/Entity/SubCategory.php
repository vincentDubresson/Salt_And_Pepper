<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\Query;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\SubCategoryRepository;
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

#[ORM\Entity(repositoryClass: SubCategoryRepository::class)]
#[ORM\Table(name: '`sub_category`')]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['sub_category:read']],
    // Available to write
    denormalizationContext: ['groups' => ['sub_category:create', 'sub_category:update']],
    graphQlOperations: [
        new QueryCollection(),
        new Query(),
    ]
)]
class SubCategory implements TimestampableInterface, SluggableInterface
{
    use TimestampableTrait;
    use sluggableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['sub_category:read'])]
    private ?Uuid $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'La sous-catégorie ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['sub_category:read', 'sub_category:create', 'sub_category:update'])]
    private string $label;

    /**
     * @var string
     */
    #[Groups(['sub_category:read'])]
    protected $slug;

    #[ORM\Column(type: 'integer')]
    #[Groups(['sub_category:read', 'sub_category:create', 'sub_category:update'])]
    private int $sort = 0;

    #[ORM\ManyToOne(inversedBy: 'subCategories')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['sub_category:read', 'sub_category:create', 'sub_category:update'])]
    private ?Category $category;

    public function __toString(): string
    {
        return $this->getLabel();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function setLabel(string $label): static
    {
        $this->label = $label;

        return $this;
    }

    public function getSort(): int
    {
        return $this->sort;
    }

    public function setSort(int $sort): static
    {
        $this->sort = $sort;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

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
