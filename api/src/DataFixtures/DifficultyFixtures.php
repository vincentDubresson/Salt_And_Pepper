<?php

namespace App\DataFixtures;

use App\Entity\Difficulty;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class DifficultyFixtures extends Fixture
{
    private const DIFFICULTIES = [
        'Très facile',
        'Facile',
        'Niveau moyen',
        'Difficile',
    ];

    public function load(ObjectManager $manager): void
    {
        $sort = 1;

        foreach (self::DIFFICULTIES as $difficulty) {
            $newDifficulty = new Difficulty();

            $newDifficulty
                ->setLabel($difficulty)
                ->setSort($sort)
            ;

            $manager->persist($newDifficulty);

            $sort++;
        }

        $manager->flush();
    }
}
