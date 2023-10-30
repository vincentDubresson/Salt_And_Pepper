<?php

namespace App\Repository;

use App\Entity\CookingType;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CookingType>
 *
 * @method CookingType|null find($id, $lockMode = null, $lockVersion = null)
 * @method CookingType|null findOneBy(array $criteria, array $orderBy = null)
 * @method CookingType[]    findAll()
 * @method CookingType[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CookingTypeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CookingType::class);
    }

//    /**
//     * @return CookingType[] Returns an array of CookingType objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CookingType
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
