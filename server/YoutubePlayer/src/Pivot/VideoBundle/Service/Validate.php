<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Pivot\VideoBundle\Service;

Use Symfony\Component\Validator\Validator\ValidatorInterface;
Use Doctrine\Bundle\DoctrineBundle\Registry;
use Symfony\Component\Validator\ConstraintViolation;
/**
 * Description of Validate
 *
 * @author root
 */
class Validate {
    private $em;
    private $validator;
    private $registry;
    
    /**
     * Validate constructor
     * @param ValidatorInterface $validator
     *  */
    
    public function _construct(ValidatorInterface $validator, Registry $registry ){
        $this->validator=$validator;
        $this->registry=$registry;
        
    }
    
    public function ValidateRequest($data){
        $errors=$this->validator->validate($data);
        
        $errorsResponse=array();
        
        /** @var ConstraintViolation $error */
        
        foreach ($errors as $error){
            $errorsResponse[]=[
                'field'=> $error->getPropertyPath(),
                'message'=>$error->getMessage()
            ];
        }
        if (count ($errors)){
            
            $response=array(
                'code'=>1,
                'message'=>'validation errors',
                'errors'=>$errorsResponse,
                'result'=>null                
            );
            return $response;
        }
        else{
            return $response=[];
        }
    }
}
