<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231102182902 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE ingredient_recipe (id INT AUTO_INCREMENT NOT NULL, recipe_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', unity_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', ingredient_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', quantity DOUBLE PRECISION NOT NULL, sort INT NOT NULL, INDEX IDX_36F2717659D8A214 (recipe_id), INDEX IDX_36F27176F6859C8C (unity_id), INDEX IDX_36F27176933FE08C (ingredient_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ingredient_recipe ADD CONSTRAINT FK_36F2717659D8A214 FOREIGN KEY (recipe_id) REFERENCES `recipe` (id)');
        $this->addSql('ALTER TABLE ingredient_recipe ADD CONSTRAINT FK_36F27176F6859C8C FOREIGN KEY (unity_id) REFERENCES unity (id)');
        $this->addSql('ALTER TABLE ingredient_recipe ADD CONSTRAINT FK_36F27176933FE08C FOREIGN KEY (ingredient_id) REFERENCES ingredient (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ingredient_recipe DROP FOREIGN KEY FK_36F2717659D8A214');
        $this->addSql('ALTER TABLE ingredient_recipe DROP FOREIGN KEY FK_36F27176F6859C8C');
        $this->addSql('ALTER TABLE ingredient_recipe DROP FOREIGN KEY FK_36F27176933FE08C');
        $this->addSql('DROP TABLE ingredient_recipe');
    }
}
