<?php

namespace App\Admin;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\DoctrineORMAdminBundle\Filter\ChoiceFilter;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Contracts\Translation\TranslatorInterface;

class SubCategoryAdmin extends BaseCategoryAdmin
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository, TranslatorInterface $translator, string $code = null, string $class = null, string $baseControllerName = null)
    {
        parent::__construct($translator, $code, $class, $baseControllerName);

        $this->categoryRepository = $categoryRepository;
    }

    public function configure(): void
    {
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.category_list');
    }

    /**
     * @return array<string>
     */
    private function getCategories(): array
    {
        $categories = $this->categoryRepository->findAll();

        $choices = [];

        foreach ($categories as $category) {
            $label = $category->getLabel();
            $choices[$label] = $category->getLabel();
        }

        return $choices;
    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::SORT_BY] = 'category.label';
    }

    protected function configureFormFields(FormMapper $form): void
    {
        parent::configureFormFields($form);

        $form
            ->with('categoryInfo', [
                'label' => 'sonata_admin.form.tab_label.sub_category_info',
            ])
                ->add('category', EntityType::class, [
                    'label' => 'sonata_admin.label.category.category',
                    'class' => Category::class,
                ])
            ->end()
        ;

        $form
            ->with('categoryInfo', [
                'label' => 'sonata_admin.form.tab_label.category_info',
            ])
                ->reorder([
                    'label',
                    'category',
                    'sort',
                    'createdAt',
                    'updatedAt',
                ])
            ->end()
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        parent::configureDatagridFilters($filter);

        $filter->add('category.label', ChoiceFilter::class, [
            'label' => 'sonata_admin.label.category.category',
            'field_type' => ChoiceType::class,
            'field_options' => [
                'choices' => $this->getCategories(),
            ],
        ]);
    }

    protected function configureListFields(ListMapper $list): void
    {
        parent::configureListFields($list);

        $list->add('category', null, [
            'label' => 'sonata_admin.label.category.category',
        ]);

        $list->reorder([
            'label',
            'category',
            'createdAt',
            'updatedAt',
            'sort',
            ListMapper::NAME_ACTIONS,
        ]);
    }

    protected function configureShowFields(ShowMapper $show): void
    {
        parent::configureShowFields($show);

        $show
            ->with('categoryInfo', [
                'label' => 'sonata_admin.form.tab_label.category_info',
            ])
            ->add('category', null, [
                'label' => 'sonata_admin.label.category.category',
            ])
            ->end()
        ;

        $show
            ->with('categoryInfo', [
                'label' => 'sonata_admin.form.tab_label.category_info',
            ])
                ->reorder([
                    'label',
                    'category',
                    'sort',
                    'createdAt',
                    'updatedAt',
                ])
            ->end()
        ;
    }
}
