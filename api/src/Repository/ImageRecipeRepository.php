<?php

namespace App\Repository;

use App\Entity\ImageRecipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ImageRecipe>
 *
 * @method ImageRecipe|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImageRecipe|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImageRecipe[]    findAll()
 * @method ImageRecipe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageRecipeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImageRecipe::class);
    }

    //    /**
    //     * @return ImageRecipe[] Returns an array of ImageRecipe objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('i.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?ImageRecipe
    //    {
    //        return $this->createQueryBuilder('i')
    //            ->andWhere('i.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
