import { Component, OnInit, Input } from '@angular/core';
import {Video} from '../video';
import {YoutubePlayerService} from '../youtube-player.service';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'video-detail',
  templateUrl: './video-detail.component.html'
})
export class VideoDetailComponent implements OnInit{
@Input() video: Video;
ytUrl = "https://www.youtube.com/watch?v=";
statusCode:number;

constructor(
  private YoutubePlayerService: YoutubePlayerService,
  private datepipe:DatePipe
){}

ngOnInit(): void{

}


updateVideo(id,title,url,heure,thumbnailurl: string):void {
  url = url.trim();
  let date=new Date();
  console.log(this.datepipe.transform(date, 'h:mm:ss'));
  heure = this.datepipe.transform(date, 'h:mm:ss');
  let thumb=url.replace(this.ytUrl,"");
  thumbnailurl='http://img.youtube.com/vi/'+ thumb +'/hqdefault.jpg';

  let video:any;
  video={
    id:'',
    url:url,
    title:title,
    heure:heure,
    thumbnailurl:thumbnailurl
  }
  if(!url) {return;}

   this.YoutubePlayerService.updateVideo(video,id).subscribe(res => {	this.statusCode = 204,error => this.statusCode = error});
}

}
