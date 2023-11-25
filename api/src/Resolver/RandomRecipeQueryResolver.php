<?php

namespace App\Resolver;

use ApiPlatform\GraphQl\Resolver\QueryItemResolverInterface;
use App\Repository\RecipeRepository;
use Doctrine\ORM\NonUniqueResultException;

class RandomRecipeQueryResolver implements QueryItemResolverInterface
{
    private RecipeRepository $recipeRepository;

    public function __construct(RecipeRepository $recipeRepository)
    {
        $this->recipeRepository = $recipeRepository;
    }

    /**
     * @param array<string, mixed> $context
     *
     * @throws NonUniqueResultException
     */
    public function __invoke(?object $item, array $context): object
    {
        return $this->recipeRepository->findRandomRecipe();
    }
}
