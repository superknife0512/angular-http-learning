import { PostService } from './post.service';
import { Post } from './post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.get().subscribe((posts=>{
      this.loadedPosts = posts
    }))
    this.isFetching = false;
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postService.post(postData)
      .subscribe(res=> console.log(res))
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.get().subscribe((posts=>{
      this.loadedPosts = posts
    }))
    this.isFetching = false;
  }

  onClearPosts() {
    // Send Http request
    this.postService.delete()
      .subscribe(res=>{
        console.log(res);
      }, err => {
        console.log(err);
      })
      
  }

  
}
