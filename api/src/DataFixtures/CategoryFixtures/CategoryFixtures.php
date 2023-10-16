<?php

namespace App\DataFixtures\CategoryFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    private const CATEGORIES = [
        'Les bases',
        'Apréritif',
        'Entrées',
        'Plats',
        'Desserts',
        'Boissons',
        'Petits déjeuners et Brunchs',
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::CATEGORIES as $category) {
            $newCategory = new Category();

            $newCategory->setLabel($category);

            $manager->persist($newCategory);
        }

        $manager->flush();
    }
}
