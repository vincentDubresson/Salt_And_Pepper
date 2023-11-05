<?php

namespace App\Admin;

use App\Entity\Category;
use App\Entity\CookingType;
use App\Entity\Cost;
use App\Entity\Difficulty;
use App\Entity\Recipe;
use App\Entity\SubCategory;
use App\Entity\User;
use Doctrine\ORM\EntityNotFoundException;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\Form\Type\CollectionType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RecipeAdmin extends AbstractAdmin
{
    private TranslatorInterface $translator;

    private TokenStorageInterface $tokenStorage;

    public function __construct(
        TranslatorInterface $translator,
        TokenStorageInterface $tokenStorage,
        string $code = null,
        string $class = null,
        string $baseControllerName = null
    ) {
        parent::__construct($code, $class, $baseControllerName);

        $this->translator = $translator;
        $this->tokenStorage = $tokenStorage;
    }

    public function configure(): void
    {
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.recipe_list');
    }

    protected function preValidate(object $object): void
    {
        if ($object instanceof Recipe && $this->tokenStorage->getToken() instanceof TokenInterface) {
            $user = $this->tokenStorage->getToken()->getUser();
            if ($user instanceof User) {
                $object->setUser($user);
            }
        }
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->with('RecipeInfo', [
                'label' => 'sonata_admin.form.tab_label.recipe_info',
                'class' => 'col-lg-6',
            ])
                ->add('label', TextType::class, [
                    'label' => 'sonata_admin.label.recipe.label',
                    'help' => 'sonata_admin.help.recipe.label',
                ])
                ->add('description', TextareaType::class, [
                    'label' => 'sonata_admin.label.recipe.description',
                    'help' => 'sonata_admin.help.recipe.description',
                ])
                ->add('subCategory', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe.category',
                    'class' => SubCategory::class,
                    'choice_label' => function (SubCategory $subCategory) {
                        $category = $subCategory->getCategory();
                        if ($category instanceof Category) {
                            return $category->getLabel().' - '.$subCategory->getLabel();
                        }
                        throw new EntityNotFoundException('Not found');
                    },
                ])
                ->add('servingNumber', NumberType::class, [
                    'label' => 'sonata_admin.label.recipe.serving_number',
                    'help' => 'sonata_admin.help.recipe.serving_number',
                ])
                ->add('servingUnit', TextType::class, [
                    'label' => 'sonata_admin.label.recipe.serving_unit',
                    'help' => 'sonata_admin.help.recipe.serving_unit',
                ])
                ->add('preparationTime', TimeType::class, [
                    'label' => 'sonata_admin.label.recipe.preparation_time',
                    'input' => 'datetime',
                    'by_reference' => false,
                ])
                ->add('cookingTime', TimeType::class, [
                    'label' => 'sonata_admin.label.recipe.cooking_time',
                    'input' => 'datetime',
                    'by_reference' => true,
                ])
                ->add('restingTime', TimeType::class, [
                    'label' => 'sonata_admin.label.recipe.rest_time',
                    'input' => 'datetime',
                    'by_reference' => true,
                ])
                ->add('cookingType', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe.cooking_type',
                    'class' => CookingType::class,
                ])
                ->add('difficulty', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe.difficulty',
                    'class' => Difficulty::class,
                ])
                ->add('cost', EntityType::class, [
                    'label' => 'sonata_admin.label.recipe.cost',
                    'class' => Cost::class,
                ])
            ->end()
            ->with('RecipeDetails', [
                'label' => 'sonata_admin.form.tab_label.recipe_details',
                'class' => 'col-lg-6',
            ])
                ->add('ingredientRecipes', CollectionType::class, [
                    'label' => 'sonata_admin.label.recipe.ingredient',
                    'by_reference' => false,
                    'type_options' => [
                        'delete' => true,
                    ],
                ], [
                    'edit' => 'inline',
                    'inline' => 'table',
                    'sortable' => 'position',
                ])
                ->add('stepRecipes', CollectionType::class, [
                    'label' => 'sonata_admin.label.recipe.step',
                    'by_reference' => false,
                    'type_options' => [
                        'delete' => true,
                    ],
                ], [
                    'edit' => 'inline',
                    'inline' => 'table',
                    'sortable' => 'position',
                ])
            ->end()
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter->add('label', null, [
            'label' => 'sonata_admin.label.general.label',
        ]);
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('label', null, [
                'label' => 'sonata_admin.label.general.label',
            ])
            ->add('createdAt', 'date', [
                'label' => 'sonata_admin.label.general.created_at',
                'format' => 'd/m/Y - H:i:s',
                'locale' => 'fr',
                'timezone' => 'Europe/Paris',
            ])
            ->add('updatedAt', 'date', [
                'label' => 'sonata_admin.label.general.updated_at',
                'format' => 'd/m/Y - H:i:s',
                'locale' => 'fr',
                'timezone' => 'Europe/Paris',
            ])
            ->add(ListMapper::NAME_ACTIONS, null, [
                'label' => 'sonata_admin.general.actions',
                'actions' => [
                    'show' => [],
                    'edit' => [],
                    'delete' => [],
                ],
            ])
        ;
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        $show
            ->with('recipeInfo', [
                'label' => 'sonata_admin.form.tab_label.recipe_info',
                'class' => 'col-lg-6',
            ])
                ->add('label', null, [
                    'label' => 'sonata_admin.label.general.label',
                ])
                ->add('description', null, [
                    'label' => 'sonata_admin.label.recipe.description',
                ])
                ->add('createdAt', 'date', [
                    'label' => 'sonata_admin.label.general.created_at',
                    'format' => 'd/m/Y - H:i:s',
                    'locale' => 'fr',
                    'timezone' => 'Europe/Paris',
                ])
                ->add('updatedAt', 'date', [
                    'label' => 'sonata_admin.label.general.updated_at',
                    'format' => 'd/m/Y - H:i:s',
                    'locale' => 'fr',
                    'timezone' => 'Europe/Paris',
                ])
            ->end()
        ;
    }
}
