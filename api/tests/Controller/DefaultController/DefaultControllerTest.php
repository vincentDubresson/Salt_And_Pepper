<?php

namespace App\Tests\Controller\DefaultController;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex(): void
    {
        $client = static::createClient();

        // Effectuez une requête GET vers l'URL du contrôleur
        $client->request('GET', '/');

        // Vérifiez que la réponse a un code HTTP 200 (OK)
        $this->assertSame(200, $client->getResponse()->getStatusCode());

        // Vérifiez que la réponse est au format JSON
        $this->assertSame('application/json', $client->getResponse()->headers->get('Content-Type'));

        // Vérifiez le contenu de la réponse JSON
        $responseData = json_decode((string)$client->getResponse()->getContent(), true);
        $this->assertSame('This is the default page of the API', $responseData);
    }
}