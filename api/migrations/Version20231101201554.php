<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231101201554 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE recipe (id INT AUTO_INCREMENT NOT NULL, sub_category_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', cooking_type_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', difficulty_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', cost_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', label VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, serving_number INT NOT NULL, serving_unit VARCHAR(255) NOT NULL, preparation_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', cooking_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', resting_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', slug VARCHAR(255) DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, INDEX IDX_DA88B137F7BFE87C (sub_category_id), INDEX IDX_DA88B1372609125B (cooking_type_id), INDEX IDX_DA88B137FCFA9DAE (difficulty_id), INDEX IDX_DA88B1371DBF857F (cost_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recipe ADD CONSTRAINT FK_DA88B137F7BFE87C FOREIGN KEY (sub_category_id) REFERENCES `sub_category` (id)');
        $this->addSql('ALTER TABLE recipe ADD CONSTRAINT FK_DA88B1372609125B FOREIGN KEY (cooking_type_id) REFERENCES `cooking_type` (id)');
        $this->addSql('ALTER TABLE recipe ADD CONSTRAINT FK_DA88B137FCFA9DAE FOREIGN KEY (difficulty_id) REFERENCES `difficulty` (id)');
        $this->addSql('ALTER TABLE recipe ADD CONSTRAINT FK_DA88B1371DBF857F FOREIGN KEY (cost_id) REFERENCES `cost` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recipe DROP FOREIGN KEY FK_DA88B137F7BFE87C');
        $this->addSql('ALTER TABLE recipe DROP FOREIGN KEY FK_DA88B1372609125B');
        $this->addSql('ALTER TABLE recipe DROP FOREIGN KEY FK_DA88B137FCFA9DAE');
        $this->addSql('ALTER TABLE recipe DROP FOREIGN KEY FK_DA88B1371DBF857F');
        $this->addSql('DROP TABLE recipe');
    }
}
