import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'enigma-labs';

  constructor(private http: HttpClient) {

  }
  sayHello() {
    this.http.post('http://localhost:5000/auth', {}).subscribe(res => console.log(res))
  }
}
