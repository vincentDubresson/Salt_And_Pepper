<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231102192736 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `step_recipe` (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', recipe_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', description LONGTEXT NOT NULL, sort INT NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_F7967C4D59D8A214 (recipe_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `step_recipe` ADD CONSTRAINT FK_F7967C4D59D8A214 FOREIGN KEY (recipe_id) REFERENCES `recipe` (id)');
        $this->addSql('ALTER TABLE ingredient_recipe ADD created_at DATETIME DEFAULT NULL, ADD updated_at DATETIME DEFAULT NULL, CHANGE id id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `step_recipe` DROP FOREIGN KEY FK_F7967C4D59D8A214');
        $this->addSql('DROP TABLE `step_recipe`');
        $this->addSql('ALTER TABLE `ingredient_recipe` DROP created_at, DROP updated_at, CHANGE id id INT AUTO_INCREMENT NOT NULL');
    }
}
