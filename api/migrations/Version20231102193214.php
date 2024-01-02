<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231102193214 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE image_recipe (id INT AUTO_INCREMENT NOT NULL, recipe_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', picture_name VARCHAR(255) NOT NULL, sort INT NOT NULL, INDEX IDX_7595EFFF59D8A214 (recipe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image_recipe ADD CONSTRAINT FK_7595EFFF59D8A214 FOREIGN KEY (recipe_id) REFERENCES `recipe` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image_recipe DROP FOREIGN KEY FK_7595EFFF59D8A214');
        $this->addSql('DROP TABLE image_recipe');
    }
}
