<?php

namespace App\DataFixtures;

use App\Entity\CookingType;
use App\Entity\Cost;
use App\Entity\Difficulty;
use App\Entity\ImageRecipe;
use App\Entity\Ingredient;
use App\Entity\IngredientRecipe;
use App\Entity\Recipe;
use App\Entity\StepRecipe;
use App\Entity\SubCategory;
use App\Entity\Unity;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\HttpFoundation\File\File;

class RecipeFixtures extends Fixture implements DependentFixtureInterface
{
    private string $uploadDirectory;

    public function __construct(string $uploadDirectory)
    {
        $this->uploadDirectory = $uploadDirectory;
    }

    public function load(ObjectManager $manager): void
    {
        $subCategories = $manager->getRepository(SubCategory::class)->findAll();
        $cookingTypes = $manager->getRepository(CookingType::class)->findAll();
        $difficulties = $manager->getRepository(Difficulty::class)->findAll();
        $costs = $manager->getRepository(Cost::class)->findAll();
        $ingredients = $manager->getRepository(Ingredient::class)->findAll();
        $unities = $manager->getRepository(Unity::class)->findAll();
        $user = $manager->getRepository(User::class)->findOneBy(['lastname' => 'Doe']);

        $faker = Factory::create('fr');

        // On va partir sur un random entre 5 et 10 recettes par sous catégories.
        foreach ($subCategories as $subCategory) {
            $numberOfRecipes = rand(5, 10);

            for ($i = 1; $i <= $numberOfRecipes; $i++) {
                $recipe = new Recipe();

                $label = $faker->words(rand(3, 6), true);

                $recipe
                    ->setLabel(
                        (is_string($label)) ? $label : 'Lorem Ipsum'
                    )
                    ->setDescription($faker->sentence(rand(20, 50)))
                    ->setSubCategory($subCategory)
                    ->setServingNumber($faker->randomDigitNot(0))
                    ->setServingUnit('Personnes')
                    ->setPreparationTime($faker->dateTime())
                    ->setCookingTime($faker->dateTime())
                    ->setRestingTime($faker->dateTime())
                    ->setCookingType($cookingTypes[rand(0, count($cookingTypes) - 1)])
                    ->setDifficulty($difficulties[rand(0, count($difficulties) - 1)])
                    ->setCost($costs[rand(0, count($costs) - 1)])
                ;

                $manager->persist($recipe);

                // On insère entre 5 et 10 ingrédients
                $numberOfIngredients = rand(5, 10);

                for ($j = 1; $j <= $numberOfIngredients; $j++) {
                    $ingredientRecipe = new IngredientRecipe();

                    $ingredientRecipe
                        ->setQuantity($faker->randomFloat(2, 1, 5))
                        ->setSort($j)
                        ->setRecipe($recipe)
                        ->setUnity($unities[rand(0, count($unities) - 1)])
                        ->setIngredient($ingredients[rand(0, count($ingredients) - 1)])
                    ;

                    $manager->persist($ingredientRecipe);
                }

                // On insère entre 5 et 10 étapes
                $numberOfSteps = rand(5, 10);

                for ($k = 1; $k <= $numberOfSteps; $k++) {
                    $stepRecipe = new StepRecipe();

                    $stepRecipe
                        ->setDescription($faker->sentence(rand(10, 20)))
                        ->setSort($k)
                        ->setRecipe($recipe)
                    ;

                    $manager->persist($stepRecipe);
                }

                // On insère 1 image par recettes (la même)
                $imageRecipe = new ImageRecipe();

                $image = new File($this->uploadDirectory . '/default/recipe_default.png');

                $imageRecipe->setPictureFile($image);
                $imageRecipe
                    ->setPictureName('recipe_default.png')
                    ->setSort(1)
                    ->setRecipe($recipe)
                ;
                copy($this->uploadDirectory . '/default/recipe_default.png', $this->uploadDirectory . '/recipes/re/recipe_default.png');

                $manager->persist($imageRecipe);
            }
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
            CookingTypeFixtures::class,
            CostFixtures::class,
            DifficultyFixtures::class,
            IngredientFixtures::class,
            UnityFixtures::class,
            UserFixtures::class,
        ];
    }
}
