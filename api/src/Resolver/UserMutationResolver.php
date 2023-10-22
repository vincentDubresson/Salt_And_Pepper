<?php

namespace App\Resolver;

use ApiPlatform\GraphQl\Resolver\MutationResolverInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class UserMutationResolver implements MutationResolverInterface
{
    private UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository,
        private readonly UserPasswordHasherInterface $userPasswordEncoder,
        private readonly JWTTokenManagerInterface $JWTManager,
    ) {
        $this->userRepository = $userRepository;
    }

    /**
     * @param User|null            $item
     * @param array<string, mixed> $context
     */
    public function __invoke($item, array $context): ?User
    {
        // Mutation input arguments are in $context['args']['input'].

        if ('loginCheckUser' == $context['info']->fieldName && $item instanceof User) {
            $user = $this->userRepository->findOneBy(['email' => $item->getEmail()]);
            if ($user instanceof User) {
                if ($this->userPasswordEncoder->isPasswordValid($user, (string) $item->getPlainPassword())) {
                    $token = $this->JWTManager->create($item);
                    $user->setToken($token);
                }
            }

            return $user;
        }

        return null;
    }
}
