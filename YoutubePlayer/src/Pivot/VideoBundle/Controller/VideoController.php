<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace Pivot\VideoBundle\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Pivot\VideoBundle\Entity\Video;
use FOS\RestBundle\Request\ParamFetcherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\Annotations\QueryParam;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;


class VideoController extends FOSRestController
{
    /**
     *@Get(
     * path="/api/",
     * name="pivot_video_homepage"
     * )
     * @View
     * @QueryParam(
     *     name="list",
     *     requirements="asc|desc",
     *     default="asc",
     *     description="Sort list (asc or desc)"
     * )
     * @return JsonResponse
     */
    
    public function indexAction($list)
    {
        $test= $this->container->get('pivot_video.service');
        $videos=$test->getAll();
        
        if(empty($videos)){
            $response=array(
                'code'=>1,
                'message'=>'video not found',
                'error'=>null,
                'result'=>null
            );   
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }
        
        $data = $this->get('jms_serializer')->serialize($videos, 'json');
        
        
        $response = array(
            'code'=>0,
            'message'=>'sucess',
            'errors'=>null,
            'result'=> json_decode($data)       
        );
        
        //$response = new Response($data);
        //$response->headers->set('Content-Type', 'application/json');
        //return $response; 
        
        return new JsonResponse($response,200);
    }
    
    /** 
     * @Get(
     * path="/api/history/{$id}",
     * name="pivot_video_history",
     * requirements={"id"="\d+"}
     * )
     * @View
     * @return JsonResponse
     */
    
    public function showAction($id)
    {    
        $test= $this->container->get('pivot_video.service');
        $video=$test->getById($id);
        
        if(empty($video)){
            $response=array(
                'code'=>1,
                'message'=>'video not found',
                'error'=>null,
                'result'=>null
            );   
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }
        
        $data = $this->get('jms_serializer')->serialize($video, 'json');
        
        
        $response = array(
            'code'=>0,
            'message'=>'sucess',
            'errors'=>null,
            'result'=> json_decode($data)
            );
        
        //$response = new Response($data);
        //$response->headers->set('Content-Type', 'application/json');
        //return $response; 
        
        return new JsonResponse($response,200);
        
    }
    
    /** 
     * @Rest\Post("/api/history/add",
     *  name="pivot_video_delete")
     * @Rest\View(StatusCode = 201)
     * @param Request $request
     * @return JsonResponse
     */
    public function addAction(Request $request)
    {
        $body=$request->getContent();
        $responses=$this->get('jms_serializer')->deserialize($body,'Pivot\VideoBundle\Entity\Video','json'); 
        
        if(empty ($request)){
            $response = ['code'=>1,
            'message'=>'video not created',
            'errors'=>null,
            'result'=> null
            ];
            return new JsonResponse($response,Response::HTTP_BAD_REQUEST);
        }
       
       $test= $this->container->get('pivot_video.service');
       $videoNew=$test->create($responses);
        
       $data=$this->get('jms_serializer')->serialize($videoNew, 'json');
        $response = ['code'=>0,
            'message'=>'video created',
            'errors'=>null,
            'result'=> json_decode($data)
            ];
        
        //$response = new Response($data);
        //$response->headers->set('Content-Type', 'application/json');
        //return $response; 
        
        return new JsonResponse($response, Response::HTTP_CREATED);
    }
    
    /** 
     *@Get(
     * path="/api/historyHour",
     * name="pivot_video_historyhour"
     * )
     * 
     * @return JsonResponse
     */
    
    public function GetByHourAction(){
        $test= $this->container->get('pivot_video.service');
        $videosPerHour=$test->getByHeure();
        
        if(empty($videosPerHour)){
            $response=array(
                'code'=>1,
                'message'=>'video not found',
                'error'=>null,
                'result'=>null
            );   
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }
        
        $data = $this->get('jms_serializer')->serialize($videosPerHour, 'json');
        
        
        $response = array(
            'code'=>0,
            'message'=>'sucess',
            'errors'=>null,
            'result'=> json_decode($data)
            );
        
        //$response = new Response($data);
        //$response->headers->set('Content-Type', 'application/json');
        //return $response; 
        
        return new JsonResponse($response,200);
    }
    
    /** 
     * @Rest\Delete("/api/delete/{$id}",
     * name="pivot_video_delete")
     * requirements={"id"="\d+"}
     * @Rest\View(StatusCode = 204)
     * @param Request $id
     * @return JsonResponse
     */    
    public function deleteAction($id){
        
        $test= $this->container->get('pivot_video.service');
        $responses=$test->delete($id);
        
        if(empty($responses)){
            $response=array(
                'code'=>1,
                'message'=>'video not deleted, video not found',
                'error'=>null,
                'result'=>null
            );   
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }        
        
        $response = array(
            'code'=>0,
            'message'=>'sucess deletion of video number .$id!!',
            'errors'=>null,
            'result'=> null
            );
        
        return new JsonResponse($response, 204);

    }
    /** 
     * @Rest\Put("/api/edit/{$id}",
     * name="pivot_video_edit")
     * requirements={"id"="\d+"}
     * @Rest\View(StatusCode = 204)
     * @param Request $request
     * @param Integer $id
     * @return JsonResponse
     */   
    public function editAction($id,Request $request){
        $body=$request->getContent();
        $responses=$this->get('jms_serializer')->deserialize($body,'Pivot\VideoBundle\Entity\Video','json');
        
        if(empty ($request)){
            $response = ['code'=>1,
            'message'=>'video not updated',
            'errors'=>null,
            'result'=> null
            ];
            return new JsonResponse($response,Response::HTTP_BAD_REQUEST);
        }
       
       $test= $this->container->get('pivot_video.service');
       $videoedited=$test->edit($id,$responses->geturl(),$responses->getheure(),$responses->gettitle(),$responses->getthumbnailurl());
  
        $data = $this->get('jms_serializer')->serialize($videoedited, 'json');
        $response = ['code'=>0,
            'message'=>'video updated',
            'errors'=>null,
            'result'=> json_decode($body)
            ];
        
        return new JsonResponse($response, 200);
    }
    
}

