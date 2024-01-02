<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Intl\Countries;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;
    private string $userEmail;
    private string $userPassword;
    private string $uploadDirectory;

    public function __construct(
        UserPasswordHasherInterface $passwordHasher,

        #[Autowire(env: 'USER_EMAIL')]
        string $userEmail,

        #[Autowire(env: 'USER_PASSWORD')]
        string $userPassword,
        string $uploadDirectory,
    ) {
        $this->passwordHasher = $passwordHasher;
        $this->userEmail = $userEmail;
        $this->userPassword = $userPassword;
        $this->uploadDirectory = $uploadDirectory;
    }

    public function load(ObjectManager $manager): void
    {
        $file = new File($this->uploadDirectory . '/default/user_default.png');

        $user = new User();

        $user
            ->setFirstname('John')
            ->setLastname('Doe')
            ->setEmail($this->userEmail)
            ->setPassword($this->passwordHasher->hashPassword($user, $this->userPassword))
            ->setRoles(['ROLE_ADMIN'])
            ->setCountry(Countries::getName('FR'))
            ->setIsEnable(true)
            ->setAcceptNewsletter(false)
        ;

        $user->setPictureFile($file);
        $user->setPictureName('user_default.png');
        copy($this->uploadDirectory . '/default/user_default.png', $this->uploadDirectory . '/users/us/user_default.png');
        $manager->persist($user);

        $manager->flush();
    }
}
