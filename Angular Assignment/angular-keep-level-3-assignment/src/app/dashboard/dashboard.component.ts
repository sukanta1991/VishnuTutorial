import { Component , OnInit } from '@angular/core';
import { NotesService} from '../services/notes.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
data:any;
  constructor(private notesService: NotesService) {
    this.data=this.notesService.fetchNotesFromServer();
    console.log(this.data);
    
  }
}
