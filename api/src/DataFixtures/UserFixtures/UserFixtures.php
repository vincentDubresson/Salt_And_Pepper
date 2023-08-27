<?php

namespace App\DataFixtures\UserFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Intl\Countries;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;
    private string $userEmail;
    private string $userPassword;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,

        #[Autowire(env: 'USER_EMAIL')]
        string $userEmail,

        #[Autowire(env: 'USER_PASSWORD')]
        string $userPassword,
    ) {
        $this->passwordHasher = $passwordHasher;
        $this->userEmail = $userEmail;
        $this->userPassword = $userPassword;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();

        $user
            ->setFirstname('Vincent')
            ->setLastname('Dubresson')
            ->setEmail($this->userEmail)
            ->setPassword($this->passwordHasher->hashPassword($user, $this->userPassword))
            ->setRoles(['ROLE_ADMIN'])
            ->setCountry(Countries::getName('FR'))
        ;

        $manager->persist($user);

        $manager->flush();
    }
}
