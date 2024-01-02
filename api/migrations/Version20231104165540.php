<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231104165540 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recipe CHANGE preparation_time preparation_time TIME NOT NULL, CHANGE cooking_time cooking_time TIME NOT NULL, CHANGE resting_time resting_time TIME NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `recipe` CHANGE preparation_time preparation_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', CHANGE cooking_time cooking_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\', CHANGE resting_time resting_time TIME NOT NULL COMMENT \'(DC2Type:time_immutable)\'');
    }
}
