<?php

namespace App\Admin;

use App\Entity\ImageRecipe;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Route\RouteCollectionInterface;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Contracts\Translation\TranslatorInterface;
use Vich\UploaderBundle\Form\Type\VichFileType;

class ImageRecipeAdmin extends AbstractAdmin
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
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.image_recipe_list');
    }

    protected function configureRoutes(RouteCollectionInterface $collection): void
    {
        $collection->remove('show');
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $imageRecipe = $this->getSubject();

        $picturePathIfExist = ($imageRecipe instanceof ImageRecipe) ?
            $this->picturePathIfExist($imageRecipe->getPictureName())
            :
            'Aucune image'
        ;

        $form
            ->with('ImageRecipeInfo', [
                'label' => 'sonata_admin.form.tab_label.recipe_image_info',
            ])
            ->add('pictureFile', VichFileType::class, [
                'label' => 'image',
                'required' => false,
                'allow_delete' => false,
                'help' => $picturePathIfExist,
                'help_html' => true,
                'download_uri' => false,
            ])
                ->add('sort', NumberType::class, [
                    'label' => 'sonata_admin.label.general.sort',
                ])
            ->end()
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('pictureName', null, [
                'label' => 'sonata_admin.label.recipe.image_name',
            ])
            ->add('recipe', null, [
                'label' => 'sonata_admin.label.recipe.recipe',
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
            ->add('sort', null, [
                'label' => 'sonata_admin.label.general.sort',
                'editable' => true,
            ])
        ;
    }

    private function picturePathIfExist(?string $pictureName): string
    {
        if ($pictureName) {
            $subDirectory = substr($pictureName, 0, 2) . '/';

            return '<img style="width: 100%;" src="/uploads/pictures/recipes/' . $subDirectory . $pictureName . '" alt="User Picture">';
        }

        return 'Aucune image.';
    }
}
