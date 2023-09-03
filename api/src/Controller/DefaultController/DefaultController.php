<?php

namespace App\Controller\DefaultController;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('Default/default.html.twig');
    }

    #[Route('/form-submit', name: 'form_submit', methods: 'POST')]
    public function formSubmit(Request $request): void
    {
        var_dump($request); die;
    }
}
