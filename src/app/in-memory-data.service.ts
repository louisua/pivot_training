import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
     const todolist = [
       {id: 1, name: 'shopping', place: 'Anjoma', time : '10:00'},
       {id: 2, name: 'cooking', place: 'kitchen', time : '12:00'},
       {id: 3, name: 'dishes', place: 'kitchen', time : '11:30'},
       {id: 4, name: 'job', place: 'work', time : '13:00'},
       {id: 5, name: 'coding', place: 'work', time : '17:00'},
       {id: 6, name: 'running', place: 'work', time : '15:00'},
       {id: 7, name: 'debugging', place: 'work', time : '13:30'},
       {id: 8, name: 'lunch', place: 'restaurant', time : '21:00'},
       {id: 9, name: 'meeting', place: 'work', time : '14:00'},
       {id: 10, name: 'sleeping', place: ' home', time : '23:00'},
       {id: 11, name: 'swimming', place: 'pool', time : '05:30'},
       {id: 12, name: 'drinking', place: 'bar', time : '20:00'},
    ]

    const videos = [
      {
        id: 0,
        url: 'https://www.youtube.com/watch?v=0eiSO09zrRk',
        thumbnailUrl: 'http://img.youtube.com/vi/0eiSO09zrRk/hqdefault.jpg',
        videoTitle : "The PIVOT Anthem: Advancing Health as a Human Right in Madagascar"
      },
      {
        id: 1,
        url: 'https://www.youtube.com/watch?v=9wg3v-01yKQ',
        thumbnailUrl: 'http://img.youtube.com/vi/9wg3v-01yKQ/hqdefault.jpg',
        videoTitle : "Harry Styles - Kiwi"
      },
      {
        id: 2,
        url: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
        thumbnailUrl: 'http://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
        videoTitle : "Ed Sheeran - Perfect (Official Music Video)"
      },
      {
        id: 3,
        url: 'https://www.youtube.com/watch?v=vQ3XgMKAgxc',
        thumbnailUrl: 'http://img.youtube.com/vi/vQ3XgMKAgxc/hqdefault.jpg',
        videoTitle : "Avicii - Lonely Together ft. Rita Ora"
      },
      {
        id: 4,
        url: 'https://www.youtube.com/watch?v=tVKaN_H35xs',
        thumbnailUrl: 'http://img.youtube.com/vi/tVKaN_H35xs/hqdefault.jpg',
        videoTitle : "DADJU - Reine (Clip Officiel)"
      },
      {
        id: 5,
        url: 'https://www.youtube.com/watch?v=z_4EIsrAuuA',
        thumbnailUrl: 'http://img.youtube.com/vi/z_4EIsrAuuA/hqdefault.jpg',
        videoTitle : "DADJU - Ma Fierté ft. Maître Gims, Alonzo (Clip Officiel)"
      },
    ];

    return {todolist,videos};
  }
}
