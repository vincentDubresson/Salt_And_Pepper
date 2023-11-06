<?php

namespace App\Admin;

use App\Entity\Ingredient;
use App\Entity\Unity;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollectionInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Contracts\Translation\TranslatorInterface;

class IngredientRecipeAdmin extends AbstractAdmin
{
    private TranslatorInterface $translator;

    public function __construct(
        TranslatorInterface $translator,
        string $code = null,
        string $class = null,
        string $baseControllerName = null
    ) {
        parent::__construct($code, $class, $baseControllerName);

        $this->translator = $translator;
    }

    public function configure(): void
    {
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.ingredient_recipe_list');
    }

    protected function configureRoutes(RouteCollectionInterface $collection): void
    {
        $collection->remove('show');
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->with('IngredientRecipeInfo', [
                'label' => 'sonata_admin.form.tab_label.recipe_ingredient_info',
            ])
                ->add('quantity', NumberType::class, [
                    'label' => 'sonata_admin.label.recipe_ingredient.quantity',
                ])
                ->add('unity', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe_ingredient.unity',
                    'class' => Unity::class,
                ])
                ->add('ingredient', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe_ingredient.ingredient',
                    'class' => Ingredient::class,
                ])
                ->add('sort', NumberType::class, [
                    'label' => 'sonata_admin.label.general.sort',
                ])
            ->end()
        ;
    }
}
