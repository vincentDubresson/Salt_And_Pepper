<?php

namespace App\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Contracts\Translation\TranslatorInterface;

class IngredientAdmin extends AbstractAdmin
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
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.ingredient_list');
    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::SORT_BY] = 'label';
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->with('IngredientInfo', [
                'label' => 'sonata_admin.form.tab_label.ingredient_info',
            ])
                ->add('label', TextType::class, [
                    'label' => 'sonata_admin.label.general.label',
                ])
                ->add('slug', null, [
                    'label' => 'sonata_admin.label.general.slug',
                    'disabled' => true,
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
            ->with('ingredientInfo', [
                'label' => 'sonata_admin.form.tab_label.category_info',
            ])
                ->add('label', null, [
                    'label' => 'sonata_admin.label.general.label',
                ])
                ->add('slug', null, [
                    'label' => 'sonata_admin.label.general.slug',
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
