<?php

namespace App\Repository;

use App\Entity\StepRecipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<StepRecipe>
 *
 * @method StepRecipe|null find($id, $lockMode = null, $lockVersion = null)
 * @method StepRecipe|null findOneBy(array $criteria, array $orderBy = null)
 * @method StepRecipe[]    findAll()
 * @method StepRecipe[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StepRecipeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StepRecipe::class);
    }

    //    /**
    //     * @return StepRecipe[] Returns an array of StepRecipe objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('s.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?StepRecipe
    //    {
    //        return $this->createQueryBuilder('s')
    //            ->andWhere('s.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
