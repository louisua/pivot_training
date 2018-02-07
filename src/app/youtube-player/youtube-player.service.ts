import { Injectable } from '@angular/core';
import { Headers,Response, Http ,RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Video } from './video';

let _window: any = window;
const httpOptions = {headers : new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable()
export class YoutubePlayerService {
	public yt_player;
	private videosUrl = 'api/videos';  // URL to web api
	private videoUrl='http://localhost:8000/api/';
	private currentVideoId: string;

	 constructor(private http: HttpClient,private _http:Http) { }

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

  getVideos() {
		return this._http.get(this.videoUrl).map((res)=>res.json());
  }

	addVideo (video: Video){
		const data = JSON.stringify(video);
		return this._http.post('http://localhost:8000/api/add', data);
	}

 updateVideo (video:Video,id){
	 const data = JSON.stringify(video);
	 return this._http.put('http://localhost:8000/api/edit/'+id, data);
 }

	// updateVideo (video: Video): Observable<any>{
	// 	const id = typeof video === 'number' ? video : video.id;
	// 	const data = JSON.stringify(video);
	// 	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //       let options = new RequestOptions({ headers: cpHeaders ,
	// 			});
  //       return this._http.put(this.videoUrl +"edit/"+ id, data, options).map(success => success.status)
  //
	//   //return this.http.put(this.videosUrl, video, httpOptions);
	// }
	
	deleteVideo (video: Video | number): Observable<number> {
		const id = typeof video === 'number' ? video : video.id;
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	  let options = new RequestOptions({
			headers: cpHeaders,
			body: {
								id:id
			}
		});
	  return this._http.delete(this.videoUrl +"delete/"+ id).map((success:Response) => success.status);
}
private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }

}
