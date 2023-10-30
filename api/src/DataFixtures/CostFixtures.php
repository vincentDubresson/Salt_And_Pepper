<?php

namespace App\DataFixtures;

use App\Entity\Cost;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CostFixtures extends Fixture
{
    private const COSTS = [
        'Bon marché',
        'Coût moyen',
        'Assez cher',
    ];

    public function load(ObjectManager $manager): void
    {
        $sort = 1;

        foreach (self::COSTS as $cost) {
            $newCost = new Cost();

            $newCost
                ->setLabel($cost)
                ->setSort($sort)
            ;

            $manager->persist($newCost);

            ++$sort;
        }

        $manager->flush();
    }
}
