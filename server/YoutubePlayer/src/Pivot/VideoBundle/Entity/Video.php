<?php

namespace Pivot\VideoBundle\Entity;

use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation\Type;
use Doctrine\ORM\Mapping as ORM;

/**
 * Video
 * @ORM\Table(name="video")
 * @ORM\Entity(repositoryClass="Pivot\VideoBundle\Repository\VideoRepository")
 */
class Video
{
    /**
     * @var int
     
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="title", type="string",length=255)
     * @JMS\Serializer\Annotation\Type("string")
     */
    private $title;

    /**
     * @var string
     * @JMS\Serializer\Annotation\Type("string")
     * @ORM\Column(name="url",type="string",length=255)
     */
    private $url;

    /**
     * @var \DateTime
     * @JMS\Serializer\Annotation\Type("datetime")
     * @ORM\Column(name="heure",type="time")
     */
    private $heure;

    /**
     * @var string
     * @JMS\Serializer\Annotation\Type("string")
     * @ORM\Column(name="thumbnailurl",type="string",length=255)
     */
    private $thumbnailurl;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Video
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Video
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set heure
     *
     * @param \DateTime $heure
     *
     * @return Video
     */
    public function setHeure($heure)
    {
        $this->heure = $heure;

        return $this;
    }

    /**
     * Get heure
     *
     * @return \DateTime
     */
    public function getHeure()
    {
        return $this->heure;
    }

    /**
     * Set thumbnailurl
     *
     * @param string $thumbnailurl
     *
     * @return Video
     */
    public function setThumbnailurl($thumbnailurl)
    {
        $this->thumbnailurl = $thumbnailurl;

        return $this;
    }

    /**
     * Get thumbnailurl
     *
     * @return string
     */
    public function getThumbnailurl()
    {
        return $this->thumbnailurl;
    }
}
