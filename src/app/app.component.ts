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
  comments: any[] = [];
  commandHistory: { command: string; response: string; }[] = [];
  commandString: string = '>';

  constructor(private http: HttpClient) { }




  ngOnInit(): void {
    //this.subject = webSocket('wss://localhost:8128');
    this.subject = webSocket('wss://websocket.cioty.com/faciliate/swg/1/channel');
    this.subject.subscribe({
      next: (msg: any) => {
        console.log('message received: ' + msg.message);
        this.comments.push({ server: msg.message, client: "" });
        return;
      },
      error: (err: any) => console.log(err),
      complete: () => console.log('complete')
    });
  }

  enterCommand(event: any): void {
    if (event.key === 'Enter') {
      this.commandHistory.push({ command: this.commandString, response: 'Du skrev:' + this.commandString.substring(1) });
      this.commandString = '>';
    }
  }

  buttonClick(): void {
    // this.http.get('https://localhost:3000').subscribe((res:any) => this.result = res);
    this.http.post('https://faciliate.cioty.com/swg',
      `token=aToken_3003b45b115695e0bfeef3bc124fce7d1efa98685a7ee091df62e479888dc3c1&
    objectid=1&sender=return2sender&receiver=kattamikattadi&topic=røverkollen&
    payLoad=PerSpellmann`, { headers: { "ServerName": "Synx-Cat", "ServerNo": "1"} })
    .subscribe((res: any) => this.result = res);;
  }



  wsClick(): void {
    this.subject.next('{"token":"aToken_249df9c9a7fa8eac91bc21cad0208675b0d1539ff44cfe47bacf58100f5f4da1"}');
    this.subject.next('{"url":"faciliate/swg/1"}');
    this.subject.next('{"txt":"---melding---"}');
    //this.comments.push({server:"",client:this.taContent});
    //this.taContent = '';
  }
}
