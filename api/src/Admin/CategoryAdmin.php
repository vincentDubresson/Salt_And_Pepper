<?php

namespace App\Admin;

use Sonata\AdminBundle\Datagrid\DatagridInterface;
use Sonata\AdminBundle\Route\RouteCollectionInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class CategoryAdmin extends BaseCategoryAdmin
{
    public function __construct(TranslatorInterface $translator, string $code = null, string $class = null, string $baseControllerName = null)
    {
        parent::__construct($translator, $code, $class, $baseControllerName);
    }

    public function configure(): void
    {
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.category_list');
    }

    protected function configureRoutes(RouteCollectionInterface $collection): void
    {
        parent::configureRoutes($collection);
    }

    protected function configureDefaultSortValues(array &$sortValues): void
    {
        $sortValues[DatagridInterface::SORT_BY] = 'sort';
    }
}
