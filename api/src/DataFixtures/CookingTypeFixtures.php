<?php

namespace App\DataFixtures;

use App\Entity\CookingType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CookingTypeFixtures extends Fixture
{
    private const COOKING_TYPES = [
        'Four',
        'Plaques',
        'Sans cuisson',
        'Autres',
    ];

    public function load(ObjectManager $manager): void
    {
        $sort = 1;
        foreach (self::COOKING_TYPES as $cookingType) {
            $newCookingType = new CookingType();

            $newCookingType
                ->setLabel($cookingType)
                ->setSort($sort)
            ;

            $manager->persist($newCookingType);

            $sort++;
        }

        $manager->flush();
    }
}
