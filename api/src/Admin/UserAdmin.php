<?php

namespace App\Admin;

use App\Entity\User;
use App\Service\PasswordService;
use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Sonata\AdminBundle\Show\ShowMapper;
use Sonata\DoctrineORMAdminBundle\Filter\BooleanFilter;
use Sonata\Form\Type\DatePickerType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Intl\Countries;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserAdmin extends AbstractAdmin
{
    private TranslatorInterface $translator;

    private UserPasswordHasherInterface $passwordHasher;

    private PasswordService $passwordService;

    public function __construct(
        TranslatorInterface $translator,
        UserPasswordHasherInterface $passwordHasher,
        PasswordService $passwordService,
        string $code = null,
        string $class = null,
        string $baseControllerName = null,
    ) {
        parent::__construct($code, $class, $baseControllerName);

        $this->translator = $translator;
        $this->passwordHasher = $passwordHasher;
        $this->passwordService = $passwordService;
    }

    public function configure(): void
    {
        $this->classnameLabel = $this->translator->trans('sonata_admin.breadcrum.user_list');
    }

    /**
     * @throws \Exception
     */
    protected function preValidate(object $object): void
    {
        if ($object instanceof User) {
            $object
                ->setPassword($this->passwordHasher->hashPassword($object, $this->passwordService->generatePassword(12)))
                ->setCountry(Countries::getName((string) $object->getCountry()))
            ;
        }
    }

    protected function configureFormFields(FormMapper $form): void
    {
        $form
            ->with('userInfo', [
                'label' => 'sonata_admin.form.tab_label.user_info',
                'class' => 'col-lg-8',
            ])
                ->add('firstname', TextType::class, [
                    'label' => 'sonata_admin.label.user.firstname',
                    'required' => true,
                ])
                ->add('lastname', TextType::class, [
                    'label' => 'sonata_admin.label.user.lastname',
                    'required' => true,
                ])
                ->add('birthDate', DatePickerType::class, [
                    'label' => 'sonata_admin.label.user.birth_date',
                    'input' => 'datetime_immutable',
                    'required' => false,
                ])
                ->add('email', null, [
                    'label' => 'sonata_admin.label.user.email',
                ])
                ->add('phoneNumber', null, [
                    'label' => 'sonata_admin.label.user.phone_number',
                ])
                ->add('address1', null, [
                    'label' => 'sonata_admin.label.user.address_1',
                ])
                ->add('address2', null, [
                    'label' => 'sonata_admin.label.user.address_2',
                ])
                ->add('zipCode', null, [
                    'label' => 'sonata_admin.label.user.zip_code',
                ])
                ->add('city', null, [
                    'label' => 'sonata_admin.label.user.city',
                ])
                ->add('country', ChoiceType::class, [
                    'label' => 'sonata_admin.label.user.country',
                    'choices' => array_flip(\Symfony\Component\Intl\Countries::getNames()),
                    'placeholder' => 'sonata_admin.placeholder.user.select_country',
                ])
            ->end()
            ->with('userOptions', [
                'label' => 'sonata_admin.form.tab_label.user_config',
                'class' => 'col-lg-4',
            ])
                ->add('roles', ChoiceType::class, [
                    'label' => 'sonata_admin.label.user.role',
                    'choices' => [
                        'sonata_admin.value.user.role_user' => 'ROLE_USER',
                        'sonata_admin.value.user.role_admin' => 'ROLE_ADMIN',
                        ],
                    'multiple' => true,
                    'expanded' => false,
                ])
                ->add('isEnable', null, [
                    'label' => 'sonata_admin.label.user.enable',
                ])
            ->end()
        ;
    }

    protected function configureDatagridFilters(DatagridMapper $filter): void
    {
        $filter
            ->add('firstname', null, [
                'label' => 'sonata_admin.label.user.firstname',
            ])
            ->add('lastname', null, [
                'label' => 'sonata_admin.label.user.lastname',
            ])
            ->add('email', null, [
                'label' => 'sonata_admin.label.user.email',
            ])
            ->add('isEnable', BooleanFilter::class, [
                'label' => 'sonata_admin.label.user.enable',
            ])
        ;
    }

    protected function configureListFields(ListMapper $list): void
    {
        $list
            ->add('firstname', null, [
                'label' => 'sonata_admin.label.user.firstname',
            ])
            ->add('lastname', null, [
                'label' => 'sonata_admin.label.user.lastname',
            ])
            ->add('email', null, [
                'label' => 'sonata_admin.label.user.email',
            ])
            ->add('firstRoleAsString', null, [
                'label' => 'sonata_admin.label.user.role',
            ])
            ->add('createdAt', 'date', [
                'label' => 'sonata_admin.label.user.created_at',
                'format' => 'd/m/Y - H:i:s',
                'locale' => 'fr',
                'timezone' => 'Europe/Paris',
            ])
            ->add('updatedAt', 'date', [
                'label' => 'sonata_admin.label.user.updated_at',
                'format' => 'd/m/Y - H:i:s',
                'locale' => 'fr',
                'timezone' => 'Europe/Paris',
            ])
            ->add('isEnable', null, [
                'label' => 'sonata_admin.label.user.enable',
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
            ->with('userInfo', [
                'label' => 'sonata_admin.form.tab_label.user_info',
                'class' => 'col-lg-8',
            ])
                ->add('firstname', null, [
                    'label' => 'sonata_admin.label.user.firstname',
                ])
                ->add('lastname', null, [
                    'label' => 'sonata_admin.label.user.lastname',
                ])
                ->add('birthDate', null, [
                    'label' => 'sonata_admin.label.user.birth_date',
                    'format' => 'd/m/Y',
                    'locale' => 'fr',
                    'timezone' => 'Europe/Paris',
                ])
                ->add('email', null, [
                    'label' => 'sonata_admin.label.user.email',
                ])
                ->add('phoneNumber', null, [
                    'label' => 'sonata_admin.label.user.phone_number',
                ])
                ->add('address1', null, [
                    'label' => 'sonata_admin.label.user.address_1',
                ])
                ->add('address2', null, [
                    'label' => 'sonata_admin.label.user.address_2',
                ])
                ->add('zipCode', null, [
                    'label' => 'sonata_admin.label.user.zip_code',
                ])
                ->add('city', null, [
                    'label' => 'sonata_admin.label.user.city',
                ])
                ->add('country', null, [
                    'label' => 'sonata_admin.label.user.country',
                ])
            ->end()
            ->with('userOptions', [
                'label' => 'sonata_admin.form.tab_label.user_config',
                'class' => 'col-lg-4',
            ])
                ->add('firstRoleAsString', null, [
                    'label' => 'sonata_admin.label.user.role',
                ])
                ->add('isEnable', null, [
                    'label' => 'sonata_admin.label.user.enable',
                ])
                ->add('createdAt', 'date', [
                    'label' => 'sonata_admin.label.user.created_at',
                    'format' => 'd/m/Y - H:i:s',
                    'locale' => 'fr',
                    'timezone' => 'Europe/Paris',
                ])
                ->add('updatedAt', 'date', [
                    'label' => 'sonata_admin.label.user.updated_at',
                    'format' => 'd/m/Y - H:i:s',
                    'locale' => 'fr',
                    'timezone' => 'Europe/Paris',
                ])
            ->end()
        ;
    }
}
