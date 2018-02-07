
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {Video} from './video';
import {YoutubePlayerService} from './youtube-player.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-youtube-player',
  templateUrl: './youtube-player.component.html',
  styleUrls: ['./youtube-player.component.css']
})
export class YoutubePlayerComponent implements OnInit {
  id: string;
  videos: Video[];
  selectedVideo: Video;
  ytUrl = "https://www.youtube.com/watch?v=";
  modalRef: BsModalRef;
  statusCode:number;
  public loading = false;
  constructor( private youtubeplayerservice: YoutubePlayerService,private modalService: BsModalService , private datepipe:DatePipe) { }

  ngOnInit() {
    let doc = window.document;
    let playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);
    this.youtubeplayerservice.createPlayer();
    this.getVideos();
    this.loading = true;
  }

onSelect(video: Video): void {
      this.selectedVideo = video;
    }

showVideo(url:string): void{
    this.id= url.replace(this.ytUrl,"");
    this.youtubeplayerservice.playVideo(this.id);
}

getVideos(): void {
  this.youtubeplayerservice.getVideos()
                           .subscribe(
                             (res)=>{
                               console.log(res.result);
                               this.videos =res.result;
                             });
}

addVideo(url,title: string): void {
  url = url.trim();
  let thumb=url.replace(this.ytUrl,"");
  let date=new Date();
  console.log(this.datepipe.transform(date, 'hh:mm:ss'));
  let heure = this.datepipe.transform(date, 'hh:mm:ss');
  let thumbnailurl='http://img.youtube.com/vi/'+ thumb +'/hqdefault.jpg';

  let video:any;
  video={
    id:'',
    url:url,
    title:title,
    heure:heure,
    thumbnailurl:thumbnailurl
  }
  if(!url) {return;}
  this.youtubeplayerservice.addVideo(video).subscribe(res=>{console.log(res),error=>console.log('erreur avao itito')});
  this.showVideo(url);
  this.getVideos();
}

deleteVideo(video: Video): void {
  this.videos = this.videos.filter(h => h !== video);
  this.youtubeplayerservice.deleteVideo(video).subscribe(res => {	this.statusCode = 204,error => this.statusCode = error});
}

openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

updateVideo(id,title,url,heure,thumbnailurl: string):void {
  url = url.trim();
  let thumb=url.replace(this.ytUrl,"");
  let date=new Date();
  console.log(this.datepipe.transform(date, 'yyyy-mm-dd h:mm:ss'));
  heure = this.datepipe.transform(date, 'yyyy-mm-dd h:mm:ss');
  thumbnailurl='http://img.youtube.com/vi/'+ thumb +'/hqdefault.jpg';

  let video:any;
  video={
    id:id,
    url:url,
    title:title,
    heure:heure,
    thumbnailUrl:thumbnailurl
  }
  if(!url) {return;}

   this.youtubeplayerservice.updateVideo(video,id).subscribe(res => {	this.statusCode = 204,error => this.statusCode = error});
}
}
