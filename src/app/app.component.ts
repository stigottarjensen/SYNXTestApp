import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SYNXTestApp';
  result: any;
  subject: any;
  taContent: string = "";
  comments:any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.subject = webSocket('ws://localhost:8128');
    this.subject.subscribe({
      next: (msg: any) => {
        console.log('message received: ' + msg.message); 
        this.comments.push({server:msg.message,client:""});  
        return;
      }, 
      error: (err: any) => console.log(err), 
      complete: () => console.log('complete') 
     });
  }

  buttonClick(): void {
    this.http.get('https://localhost:3000').subscribe((res:any) => this.result = res);
  }


  wsClick(): void {
    this.subject.next({message: this.taContent});
    this.comments.push({server:"",client:this.taContent});
    this.taContent = '';
  }


  

}
