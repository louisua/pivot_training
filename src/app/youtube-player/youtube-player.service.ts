import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Video } from './video';

let _window: any = window;
const httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class YoutubePlayerService {
	public yt_player;
	private videosUrl = 'api/videos';  // URL to web api
	private currentVideoId: string;

	 constructor(private http: HttpClient) { }

	 createPlayer(): void {
	     let interval = setInterval(() => {
	       if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
	         this.yt_player = new _window.YT.Player('ytb-player', {
	           width: '1150',
	           height: '565',
						 //videoId: videoId,
	           playerVars: {
	             iv_load_policy: '3',
	             rel: '0'
	           }
	         });
	         clearInterval(interval);
	       }
	     }, 100);
	   }

	playVideo(videoId: string): void {
	     this.yt_player.loadVideoById(videoId);
	     this.currentVideoId = videoId;
	   }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.videosUrl);
  }

	addVideo (video: Video): Observable<Video>{
		return this.http.post<Video>(this.videosUrl, video, httpOptions);
	}

	updateVideo (video: Video): Observable<any>{
	  return this.http.put(this.videosUrl, video, httpOptions);
	}

	deleteVideo (video: Video | number): Observable<Video> {
		const id = typeof video === 'number' ? video : video.id;
		const url = `${this.videosUrl}/${id}`;
		return this.http.delete<Video>(url, httpOptions);
	}

}
