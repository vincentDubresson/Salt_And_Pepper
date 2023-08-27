<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    // Display when reading the object
    normalizationContext: ['groups' => ['read']],
    // Available to write
    denormalizationContext: ['groups' => ['write']],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    #[Groups(['read'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le prénom est obligatoire.')]
    #[Assert\Range(
        maxMessage: 'Le prénom ne peut pas dépasser 255 caractères.',
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le nom est obligatoire.')]
    #[Assert\Range(
        maxMessage: 'Le nom ne peut pas dépasser 255 caractères.',
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank(message: 'Une adresse email est obligatoire.')]
    #[Assert\Range(
        maxMessage: "L'adresse email ne peut pas dépasser 180 caractères.",
        max: 180
    )]
    #[Assert\Email(message: "Cette adresse email n'est pas au bon format.")]
    #[Groups(['read', 'write'])]
    private ?string $email = null;

    #[ORM\Column]
    #[Assert\NotBlank]
    private ?string $password = null;

    /**
     * @var array<string>
     */
    #[ORM\Column]
    #[Assert\NotBlank]
    #[Groups(['read', 'write'])]
    private array $roles = [];

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Range(
        maxMessage: "L'adresse 1 ne peut pas dépasser 255 caractères.",
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $address1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Range(
        maxMessage: "L'adresse 2 ne peut pas dépasser 255 caractères.",
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $address2 = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['read', 'write'])]
    private ?int $zipCode = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Range(
        maxMessage: 'La ville ne peut pas dépasser 255 caractères.',
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank(message: 'Le pays est obligatoire.')]
    #[Assert\Range(
        maxMessage: 'Le pays ne peut pas dépasser 255 caractères.',
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $country = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Range(
        maxMessage: 'Le numéro de téléphone ne peut pas dépasser 255 caractères.',
        max: 255
    )]
    #[Groups(['read', 'write'])]
    private ?string $phoneNumber = null;

    #[ORM\Column(type: Types::DATE_IMMUTABLE, nullable: true)]
    #[Assert\Date(message: "La date de naissance n'est pas au bon format.")]
    #[Groups(['read', 'write'])]
    private ?\DateTimeImmutable $birthDate = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param array<string> $roles
     *
     * @return $this
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthDate(): ?\DateTimeImmutable
    {
        return $this->birthDate;
    }

    public function setBirthDate(?\DateTimeImmutable $birthDate): static
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getAddress1(): ?string
    {
        return $this->address1;
    }

    public function setAddress1(?string $address1): static
    {
        $this->address1 = $address1;

        return $this;
    }

    public function getAddress2(): ?string
    {
        return $this->address2;
    }

    public function setAddress2(?string $address2): static
    {
        $this->address2 = $address2;

        return $this;
    }

    public function getZipCode(): ?int
    {
        return $this->zipCode;
    }

    public function setZipCode(?int $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }
}
