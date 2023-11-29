<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GraphQl\DeleteMutation;
use ApiPlatform\Metadata\GraphQl\Mutation;
use ApiPlatform\Metadata\GraphQl\QueryCollection;
use App\Repository\ImageRecipeRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: ImageRecipeRepository::class)]
#[ORM\Table(name: '`image_recipe`')]
#[Vich\Uploadable]
#[ApiResource(
    operations: [],
    // Display when reading the object
    normalizationContext: ['groups' => ['image_recipe:read']],
    // Available to write
    denormalizationContext: ['groups' => ['image_recipe:create', 'image_recipe:update']],
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
class ImageRecipe implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['recipe:read', 'image_recipe:read', 'image_recipe:create', 'image_recipe:update'])]
    private ?Uuid $id = null;

    #[Vich\UploadableField(mapping: 'recipe_picture_file', fileNameProperty: 'pictureName')]
    #[Assert\File(
        maxSize: '1M',
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    )]
    #[Groups(['image_recipe:create', 'image_recipe:update'])]
    private ?File $pictureFile = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Assert\Length(
        max: 255,
        maxMessage: 'Le nom de l\'image ne peut pas dépasser 255 caractères.',
    )]
    #[Groups(['recipe:read', 'image_recipe:read', 'image_recipe:create', 'image_recipe:update'])]
    private ?string $pictureName = null;

    #[ORM\Column(type: 'boolean', nullable: false)]
    #[Groups(['recipe:read', 'image_recipe:read', 'image_recipe:create', 'image_recipe:update'])]
    private ?bool $isApiPicture = true;

    #[ORM\Column(type: 'integer')]
    #[Assert\Positive(
        message: 'Le tri doit être positif.'
    )]
    #[Groups(['recipe:read', 'image_recipe:read', 'image_recipe:create', 'image_recipe:update'])]
    private ?int $sort = null;

    #[ORM\ManyToOne(inversedBy: 'imageRecipes')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['recipe:read', 'image_recipe:read', 'image_recipe:create', 'image_recipe:update'])]
    private ?Recipe $recipe = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function setPictureFile(File $pictureFile = null): void
    {
        $this->pictureFile = $pictureFile;

        if (null !== $pictureFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new DateTimeImmutable();
        }
    }

    public function getPictureFile(): ?File
    {
        return $this->pictureFile;
    }

    public function getPictureName(): ?string
    {
        return $this->pictureName;
    }

    public function setPictureName(?string $pictureName): static
    {
        $this->pictureName = $pictureName;

        return $this;
    }

    public function getIsApiPicture(): ?bool
    {
        return $this->isApiPicture;
    }

    public function setIsApiPicture(?bool $isApiPicture): void
    {
        $this->isApiPicture = $isApiPicture;
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
