<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Pivot\VideoBundle\Service;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManager;
use \Pivot\VideoBundle\Entity\Video;

/**
 * Description of VideoService
 *
 * @author root
 */
class VideoService  {
    //put your code here
    
    protected $em;
    protected $heure;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
        $this->heure=new \DateTime();
    }
    
    public function getAll(){
        $em = $this->em;
        $qb = $em->createQueryBuilder();
        $qb->select('v')
           ->from('PivotVideoBundle:Video', 'v');
   
    $videos = $qb->getQuery()->getArrayResult();
    return $videos;
    
    }
    
    public function getById($id){
        
        $em = $this->em;
        $qb = $em->createQueryBuilder();
        $qb->select('v')
           ->from('PivotVideoBundle:Video', 'v')
           ->Where('v.id=:id')
           ->setParameter('id', $id);
                   
    $videosId = $qb->getQuery()->getArrayResult();
    return $videosId;
    }
    
    public function getByHeure(){
        $em = $this->em;
        $qb = $em->createQueryBuilder();
        $qb->select('v')
           ->from('PivotVideoBundle:Video', 'v')
           ->orderBy('v.heure','DESC');
                   
    $videosPerHour = $qb->getQuery()->getArrayResult();
    return $videosPerHour;
    }
    
   public function create($Video){ 
       $Video->setHeure($this->heure);
       $em = $this->em;
       $em->persist($Video);
       $em->flush();
     
    return $Video;
    }
    
public function delete($id){
    $em = $this->em;
    $videoToDelete=$em->getRepository('PivotVideoBundle:Video')->find($id);
    if(!empty($videoToDelete))
    {
         $this->em->remove($videoToDelete);
         $this->em->flush();
    } 
    return new Response('video not found');
}

public function edit($id,$url,$heure,$title,$thumb){
    $em = $this->em;
   
    $videoToEdit=$em->getRepository('PivotVideoBundle:Video')->find($id);
    
    if(!empty($videoToEdit))
    {
         $videoToEdit->setUrl($url);
         $videoToEdit->setTitle($title);
         $videoToEdit->setHeure($this->heure);
         $videoToEdit->setThumbnailUrl($thumb);
         $this->em->flush();
        return $videoToEdit;
    } 
    return new Response('video not found');
}
}
