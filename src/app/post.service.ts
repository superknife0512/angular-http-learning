import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { Post } from './post.model';

const baseURL = 'https://angular-learning-a555e.firebaseio.com';

@Injectable({providedIn: 'root'})
export class PostService {
  constructor(private $http: HttpClient){}
  post(postData: Post){
    return this.$http
      .post<{ name: string }>(baseURL + '/posts.json', postData)
  }

  get(){
    return this._fetchPost();
  }

  delete(){
    return this.$http
        .delete(baseURL + '/posts.json')
  }

  private _fetchPost(){
    return this.$http
      .get<{ [key: string]: Post }>(baseURL + '/posts.json')
      .pipe(map(responseData => {
        const transArr: Post[] = [];
        for(let key in responseData) {
          transArr.push({
            ...responseData[key],
            id: key
          })
        }
        return transArr
    }))
  }
}