import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SYNXTestApp';
  result: any;

  constructor(private http: HttpClient) { }

  buttonClick(): void {
    this.http.get('http://localhost:3000').subscribe((res:any) => this.result = res);
  }
}
