<?php

namespace App\DataFixtures\CategoryFixtures;

use App\Entity\Category;
use App\Entity\SubCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    private const CATEGORIES = [
        'Les bases',
        'Apéritif',
        'Entrées',
        'Plats',
        'Desserts',
        'Boissons',
        'Petits déjeuners et Brunchs',
    ];

    private const SUB_CATEGORIES = [
        'Les bases' => [
            'Assaisonnement',
            'Béchamel',
            'Confits',
            'Fromage',
            'Mayonnaise',
            'Pâte à pain',
            'Pâte à pizza',
            'Pâte feuilletée',
            'Pâte sablée',
            'Sauces',
            'Vinaigrette',
        ],
        'Apéritifs' => [
            'Apéritif dînatoire',
            'Apéro léger',
            'Bouchée ou amuse-bouche',
            'Cocktail apéritif',
            'Apéro pas cher',
            'Apéritif de Noël',
        ],
        'Entrées' => [
            'Entrée froide',
            'Entrée chaude',
            'Bouchée et raviolis',
            'Feuilleté, Brick',
            'Entrée facile',
            'Entrée rapide',
            'Entrée légère',
            'Entrée de Noël',
        ],
        'Plats' => [
            'Viande',
            'Volaille',
            'Gibier',
            'Poisson',
            'Fruits de mer',
            'Plat unique',
            'Oeufs',
            'Plat végétarien',
            'Pâtes, riz, semoule',
            'Pizza, quiche',
            'Plats au fromage',
        ],
        'Desserts' => [
            'Dessert au chocolat',
            'Gâteau',
            'Flan',
            'Crème',
            'Mousse',
            'Crumble',
            'Beignet et friture',
            'Tarte',
            'Choux',
            'Galette des rois',
            'Bûche de Noël',
            'Mille-feuille',
            'Cheesecake',
            'Tiramisu',
            'Salade de fruits',
            'Compote',
            'Pomme au four',
            'Viennoiseries',
            'Brioche',
            'Gaufre',
            'Crêpe',
            'Pain perdu',
            'Pain d\'épices',
            'Entremets',
        ],
        'Boissons' => [
            'Boisson chaude',
            'Boisson froide',
            'Cocktail alcoolisé',
            'Cocktail sans alcool',
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        $categorySort = 1;

        foreach (self::CATEGORIES as $category) {
            $newCategory = new Category();

            $newCategory
                ->setLabel($category)
                ->setSort($categorySort)
            ;

            $manager->persist($newCategory);

            if (array_key_exists($category, self::SUB_CATEGORIES)) {
                $subCategorySort = 1;

                foreach (self::SUB_CATEGORIES[$category] as $subCategory) {
                    $newSubCategory = new SubCategory();
                    $newSubCategory
                        ->setLabel($subCategory)
                        ->setSort($subCategorySort)
                        ->setCategory($newCategory)
                    ;

                    $manager->persist($newSubCategory);

                    ++$subCategorySort;
                }
            }

            ++$categorySort;
        }

        $manager->flush();
    }
}
