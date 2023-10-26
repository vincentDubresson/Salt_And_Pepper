<?php

namespace App\DataFixtures;

use App\Entity\Unity;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UnityFixtures extends Fixture
{
    private const UNITIES = [
        ['Milligramme', 'mg'],
        ['Centigramme', 'cg'],
        ['Décigramme', 'dg'],
        ['Gramme', 'g'],
        ['Kilogramme', 'kg'],
        ['Millilitre', 'ml'],
        ['Centilitre', 'cl'],
        ['DéciLitre', 'dl'],
        ['Litre', 'l'],
        ['Cuillère à soupe', 'c. à s.'],
        ['Cuillère à café', 'c. à c.'],
        ['Once', 'oz'],
        ['Livre', 'lb'],
        ['Pinte', 'pt'],
        ['Quart de gallon', 'qt'],
        ['Gallon', 'gal'],
        ['Tasse', 'tasse'],
        ['Pouce', 'po'],
        ['Millimètre', 'mm'],
        ['Centimètre', 'cm'],
        ['Décimètre', 'dm'],
        ['Mètre', 'm'],
        ['Unité', 'unité'],
        ['Gousse', 'gousse'],
        ['Feuille', 'feuille'],
        ['Bouteille', 'bouteille'],
        ['Filet', 'filet'],
        ['Tranche', 'tranche'],
        ['Cuisse', 'cuisse'],
        ['Aile', 'aile'],
        ['Filet mignon', 'filet mignon'],
        ['Pied', 'pied'],
        ['Tête', 'tête'],
        ['Branche', 'branche'],
        ['Pincée', 'pincée'],
        ['Cup', 'cup'],
        ['Demi-tasse', '1/2 tasse'],
        ['Quart de tasse', '1/4 tasse'],
        ['Quart', '1/4'],
        ['Demi', '1/2'],
        ['Trois quart', '3/4'],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::UNITIES as $unity) {
            $newUnity = new Unity();

            $newUnity
                ->setLabel($unity[0])
                ->setAbreviation($unity[1])
            ;

            $manager->persist($newUnity);
        }

        $manager->flush();
    }
}
