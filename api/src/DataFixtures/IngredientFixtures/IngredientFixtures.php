<?php

namespace App\DataFixtures\IngredientFixtures;

use App\Entity\Ingredient;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class IngredientFixtures extends Fixture
{
    private const INGREDIENTS = [
        'Ail', 'Amande', 'Ananas', 'Aneth', 'Artichaut', 'Asperge', 'Avocat', 'Agneau', 'Anchois',
        'Abricot', 'Anis', 'Anguille', 'Anchois salé', 'Ail des ours', 'Abricot sec', 'Airelle',
        'Avocat Hass', 'Amarante', 'Ananas Victoria', 'Aragula (Roquette)', 'Abricot frais',
        'Anis étoilé', 'Arachide (Cacahuète)', 'Ail frais', 'Aubergine', 'Algues',
        'Avoine', 'Ananas en conserve', 'Açaï', 'Anchois en conserve', 'Ail en poudre',
        'Aile de poulet', 'Aneth frais', 'Amande effilée', 'Ail rôti', 'Aubergine violette',
        'Aile de canard', 'Agneau haché', 'Anis vert', 'Avocat Mexicain', 'Aubergine blanche',
        'Airelle rouge', 'Ananas séché', 'Avoine instantanée', 'Abricot en boîte', 'Asperge blanche',
        'Airelle blanche', 'Avocat crémeux', 'Amarante séchée', 'Airelle noire', 'Banane',
        'Basilic', 'Bette', 'Betterave', 'Bigarreau', 'Brede', 'Brocoli', 'Boeuf', 'Beurre', 'Boulgour',
        'Bœuf', 'Bacon', 'Brioche', 'Boudin', 'Blé', 'Beurre d\'arachide', 'Beurre de cacao',
        'Biscotte', 'Carotte', 'Champignon', 'Chayotte', 'Chicorée', 'Chou', 'Chou de Bruxelles',
        'Chou-fleur', 'Citron', 'Citrouille', 'Clémentine', 'Coing', 'Concombre', 'Coriandre',
        'Cornichon', 'Courge', 'Courgette', 'Cresson', 'Crôsne', 'Céleri', 'Cèpe', 'Ciboule',
        'Ciboulette', 'Citron vert', 'Citronnelle', 'Civet', 'Coquille Saint-Jacques', 'Crevette',
        'Canard', 'Cacahuète', 'Cacao', 'Câpre', 'Celeri-rave', 'Cèleri-branche', 'Céleri-rave',
        'Cerfeuil', 'Cerfeuil tubéreux', 'Cerise', 'Cerise de terre', 'Cerise griotte', 'Cerise noire',
        'Champignon de Paris', 'Champignon des bois', 'Champignon enoki', 'Champignon maitake',
        'Champignon pied-de-mouton', 'Champignon portobello', 'Champignon shiitake',
        'Champignon trompette de la mort', 'Champignon chanterelle', 'Champignon morille', 'Chorizo', 'Datte',
        'Dinde', 'Dorade', 'Dattier', 'Dolique', 'Dorade royale', 'Daikon', 'Dulse', 'Daim',
        'Doryphore', 'Dindon', 'Endive', 'Échalote', 'Ellendale', 'Épinard', 'Estragon', 'Fenouil',
        'Fève', 'Figue', 'Fraise', 'Framboise', 'Fruit de la passion', 'Fruits rouges', 'Gambas',
        'Gingembre', 'Gombo', 'Goyave', 'Grenade', 'Griotte', 'Groseille', 'Groseille à maquereau',
        'Haricot', 'Haricot vert', 'Haricot rouge', 'Haricot blanc', 'Igname', 'Kaki', 'Kiwi',
        'Kumquat', 'Laitue', 'Laurier', 'Lime', 'Litchi', 'Longani', 'Lupin', 'Mâche', 'Mandarine',
        'Mangoustan', 'Mangue', 'Manioc', 'Margoze', 'Marron', 'Melon', 'Menthe', 'Mesclun',
        'Minéola', 'Mûre', 'Myrtille', 'Nashi', 'Navet', 'Nectarine', 'Nèfle', 'Noisette', 'Noix',
        'Noix de cajou', 'Noix de coco', 'Oignon', 'Olive', 'Orange', 'Origan', 'Oseille', 'Oursin',
        'Oseille de Guinée', 'Oseille rouge', 'Oseille verte', 'Oeuf', 'Oeuf de caille', 'Oeuf de poule',
        'Pomme', 'Poire', 'Pêche', 'Prune', 'Poireau', 'Poivron vert', 'Poivron rouge', 'Poivron jaune',
        'poivre', 'Piment', 'Pois', 'Pomme de terre', 'Persil', 'Pois-chiche', 'Panais', 'Papaye',
        'Pastèque', 'Patate douce', 'Patisson', 'Physalis', 'Pignon de pin', 'Pissenlit', 'Pistache',
        'Pitahaya', 'Quinoa', 'Radis', 'Roquette', 'Rhubarbe', 'Romarin', 'Riz', 'Riz basmati',
        'Riz gluant', 'Riz complet', 'Riz sauvage', 'Raifort', 'Sel', 'Sucre', 'Sardine', 'Saumon',
        'Sole', 'Saucisse', 'Steak', 'Steak haché', 'Sorbet', 'Saké', 'Sushi', 'Soba', 'Semoule',
        'Sésame', 'Sauge', 'Salsifis', 'Satsuma', 'Sauge', 'Scorsonère', 'Sharon', 'Soja', 'Songe',
        'Safran', 'Stevia', 'Tomate', 'Topinambour', 'Tournesol', 'Truffe', 'Thym', 'Tofu',
        'Tamarillo', 'Tangelo', 'Tamarinde', 'Tahini', 'Tabasco', 'Tapioca', 'Urucum', 'Ugli', 'Vanille',
        'Veau', 'Viande hachée', 'Viande de porc', 'Viande de bœuf', 'Viande de veau',
        'Viande de mouton', 'Viande de poulet', 'Viande de canard', 'Viande de dinde', 'Wakamé',
        'Xérès', 'Xérès sec', 'Xérès doux', 'Xérès amontillado', 'Xérès oloroso', 'Yaourt',
        'Yaourt nature', 'Yaourt aux fruits', 'Yaourt à la vanille', 'Zeste', 'Zeste de citron',
        'Zeste d\'orange', 'Cumin', 'Curcuma', 'Cannelle', 'Paprika', 'Poivre noir', 'Gingembre',
        'Muscade', 'Clou de girofle', 'Coriandre', 'Cardamome', 'Piment de Cayenne', 'Anis étoilé',
        'Fenouil', 'Sésame', 'Sarriette', 'Poudre de chili', 'Poudre de curry', 'Safran',
        'Graines de moutarde', 'Épices garam masala', 'Piment de la Jamaïque', 'Graines de fenugrec',
        'Graines de cumin noir', 'Curry de Madras', 'Curry de Carri', 'Cayenne en poudre', 'Cumin moulu',
        'Aneth', 'Basilic', 'Poudre d\'ail', 'Poudre d\'oignon', 'Herbes de Provence', 'Origan', 'Romarin',
        'Thym', 'Herbe à curry', 'Paprika fumé', 'Paprika doux', 'Mélange d\'épices pour tandoori',
        'Sumac', 'Mélange d\'épices berbères', 'Mélange d\'épices italiennes', 'Mélange d\'épices mexicaines',
        'Mélange d\'épices cajun', 'Mélange d\'épices éthiopiennes', 'Mélange d\'épices chinoises cinq parfums',
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::INGREDIENTS as $ingredient) {
            $newIngredient = new Ingredient();

            $newIngredient->setLabel($ingredient);

            $manager->persist($newIngredient);
        }

        $manager->flush();
    }
}
